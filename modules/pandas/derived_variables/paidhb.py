# Paid Housing Benefit

# Relat field values
# C = Child
# P = Partner
# X = Other

# ECSTAT = Economic Status
# 1 = Full-Time work
# 2 = Part Time work
# 3 = Government training
# 4 = Job Seeker
# 5 = Retired
# 6 = Not seeking work
# 7 = Student
# 8 = Sick or disabled
# 9 = Child under 16

from numpy import sin


NON_DEPENDENT_FULL_TIME_DEDUCTION = 23.35
NON_DEPENDENT_PART_TIME_DEDUCTION = 17.00
NON_DEPENDENT_OTHER_DEDUCTION = 7.40

NON_DEPENDENT_DEDUCTION_CAP = 163.45

CHILD_ALLOWANCE = 66.33

PERSONAL_ALLOWANCE_TYPE1 = 57.35
PERSONAL_ALLOWANCE_TYPE2 = 72.40
PERSONAL_ALLOWANCE_TYPE3 = 86.65
PERSONAL_ALLOWANCE_TYPE4 = 113.70

CHILD = 'C'

def calculate_paid_housing_benefit(dataframe):
    """Return dataframe of rent eligible for housing benefit and paid housing benefit"""

    dataframe["non_dependent_deductions"] = non_dependent_deductions(dataframe)
    dataframe["RENTHB"] = rent_hb(dataframe)
    dataframe["child_allowance"] = child_allowance(dataframe)
    dataframe["personal_allowance"] = personal_allowance(dataframe)
    dataframe["hb_earnings_disregard"] = hb_earnings_disregard(dataframe)
    dataframe["PAIDHB"] = paid_hb(dataframe)
    dataframe["RENTHB"] = dataframe["RENTHB"].round(2)
    dataframe["PAIDHB"] = dataframe["PAIDHB"].round(2)
    return dataframe[["RENTHB", "PAIDHB"]]


def paid_hb(dataframe):
    dataframe["monetary_allowance"] = (dataframe["child_allowance"] + dataframe["personal_allowance"])
    dataframe["PAIDHB"] = dataframe["RENTHB"] - ((dataframe["INCOME"] - dataframe["monetary_allowance"]) * 0.65) + dataframe["hb_earnings_disregard"]

    # Can't have negative value
    dataframe.loc[(dataframe["PAIDHB"] < 0), ["PAIDHB"]] = 0

    # Overwrite PAID_HB as missing if not actually receiving HB (as indicated on log)
    dataframe.loc[(dataframe["HB"].isin([6,7,9])), ["PAIDHB"]] = None

    # Overwrite PAID_HB as missing if Supported Housing (don't calculate as no beds info)
    dataframe.loc[(dataframe["NEEDSTYPE"] == 2), ["PAIDHB"]] = None

    # Overwrite PAID_HB as missing if components missing
    dataframe.loc[ \
    (dataframe["RENTHB"].isnull()) | \
    (dataframe["INCOME"].isnull()), ["PAIDHB"]] = None

    return dataframe["PAIDHB"]


def hb_earnings_disregard(dataframe):
    dataframe["hb_earnings_disregard"] = 0

    dataframe.loc[(dataframe["HHMEMB"] == 1), ["hb_earnings_disregard"]] = 5

    dataframe.loc[ \
        (dataframe["TOTADULT"] == 2) & ((dataframe["RELAT2"] == "P") | \
            (dataframe["RELAT3"] == "P") | \
            (dataframe["RELAT4"] == "P") | \
            (dataframe["RELAT5"] == "P") | \
            (dataframe["RELAT6"] == "P") | \
            (dataframe["RELAT7"] == "P") | \
            (dataframe["RELAT8"] == "P")), ["hb_earnings_disregard"]] = 10

    dataframe.loc[(dataframe["TOTADULT"] == 1) & (dataframe["TOTCHILD"] > 0), ["hb_earnings_disregard"]] = 25

    return dataframe["hb_earnings_disregard"]


def child_count(dataframe, tenant_number):
    """Returns 0 if this tenant is an adult, 1 if a child"""
    relationship = dataframe["RELAT%s" % tenant_number]
    age = dataframe["AGE%s" % tenant_number]
    is_child = relationship == CHILD
    has_been_born = age >= 0
    is_under_20 = age <= 19

    return (is_child & has_been_born & is_under_20) * 1


def child_allowance(dataframe):
    child_count_per_row = [child_count(dataframe, tenant_no) for tenant_no in range(2,9)]
    number_of_children = sum(child_count_per_row)
    return number_of_children * CHILD_ALLOWANCE


def couple_and_both_are_under_18(dataframe, tenant_number):
    lead_tenant_under_18 = dataframe["AGE1"] < 18
    this_tenant_under_18 = dataframe["AGE%s" % tenant_number] < 18 
    this_tenant_is_partner = dataframe["RELAT2"] == "P"

    return lead_tenant_under_18 & this_tenant_under_18 & this_tenant_is_partner

def personal_allowance(dataframe):
    dataframe["personal_allowance"] = 0

    single_adult_under_25 = (dataframe["AGE1"] < 25) & (dataframe["TOTADULT"] == 1) & (dataframe["TOTCHILD"] == 0)
    dataframe.loc[single_adult_under_25, ["personal_allowance"]] = PERSONAL_ALLOWANCE_TYPE1

    single_parent_age_16_17 = (dataframe["AGE1"] >= 16) & (dataframe["AGE1"] <= 17) & (dataframe["TOTCHILD"] > 0)
    dataframe.loc[single_parent_age_16_17, ["personal_allowance"]] = PERSONAL_ALLOWANCE_TYPE1

    single_adult_over_25 = (dataframe["AGE1"] >= 25) & (dataframe["TOTADULT"] == 1) & (dataframe["TOTCHILD"] == 0)
    dataframe.loc[single_adult_over_25, ["personal_allowance"]] = PERSONAL_ALLOWANCE_TYPE2

    single_parent_over_18 = (dataframe["AGE1"] >= 18) & (dataframe["TOTCHILD"] > 1)
    dataframe.loc[single_parent_over_18, ["personal_allowance"]] = PERSONAL_ALLOWANCE_TYPE2

    # Couple, both under 18
    dataframe.loc[ \
        couple_and_both_are_under_18(dataframe, 2) | \
        couple_and_both_are_under_18(dataframe, 3) | \
        couple_and_both_are_under_18(dataframe, 4) | \
        couple_and_both_are_under_18(dataframe, 5) | \
        couple_and_both_are_under_18(dataframe, 6) | \
        couple_and_both_are_under_18(dataframe, 7) | \
        couple_and_both_are_under_18(dataframe, 8), ["personal_allowance"]] = PERSONAL_ALLOWANCE_TYPE3

    # Couple, at least one over 18
    dataframe.loc[ \
        (((dataframe["AGE1"] > 18) | (dataframe["AGE2"] > 18)) & (dataframe["RELAT2"] == "P")) | \
        (((dataframe["AGE1"] > 18) | (dataframe["AGE3"] > 18)) & (dataframe["RELAT3"] == "P")) | \
        (((dataframe["AGE1"] > 18) | (dataframe["AGE4"] > 18)) & (dataframe["RELAT4"] == "P")) | \
        (((dataframe["AGE1"] > 18) | (dataframe["AGE5"] > 18)) & (dataframe["RELAT5"] == "P")) | \
        (((dataframe["AGE1"] > 18) | (dataframe["AGE6"] > 18)) & (dataframe["RELAT6"] == "P")) | \
        (((dataframe["AGE1"] > 18) | (dataframe["AGE7"] > 18)) & (dataframe["RELAT7"] == "P")) | \
        (((dataframe["AGE1"] > 18) | (dataframe["AGE8"] > 18)) & (dataframe["RELAT8"] == "P")), ["personal_allowance"]] = PERSONAL_ALLOWANCE_TYPE4

    return dataframe["personal_allowance"]


def rent_hb(dataframe):
    dataframe["wrent_deduced"] = dataframe["WRENT"]

    # If property has more bedrooms than needed according the bedroom standard eligible rent is reduced
    # For one extra bedroom reduction is 14%
    dataframe.loc[(dataframe['BED_MINUS_BEDSTANDARD'] == 1), ["wrent_deduced"]] = dataframe["WRENT"] * 0.86

    # For more than one extra bedroom rent reduction is 25%
    dataframe.loc[(dataframe['BED_MINUS_BEDSTANDARD'] > 1), ["wrent_deduced"]] = dataframe["WRENT"] * 0.75

    dataframe["RENTHB"] = dataframe["wrent_deduced"] + dataframe["WSCHARGE"] - dataframe["non_dependent_deductions"]

    # If supported housing (NEEDSTYPE == 2) or
    # Weekly Rent or Weekly Charge are missing or
    # number of bedrooms are missing or Economic status has been refused (10) then
    # no rent housing benefit is calculated
    dataframe.loc[ \
    (dataframe["NEEDSTYPE"] == 2) | \
    (dataframe["WRENT"].isnull()) | \
    (dataframe["WSCHARGE"].isnull()) | \
    (dataframe["BED_MINUS_BEDSTANDARD"].isnull()) | \
    (dataframe["ECSTAT1"].eq(10)), ["RENTHB"]] = None

    return dataframe["RENTHB"]


def non_dependent_deductions(dataframe):
    # Count number of other adults in full time work
    dataframe["nondep1"] = \
    ((dataframe["RELAT2"] == 'X') & (dataframe["ECSTAT2"] == 1)) * 1 + \
    ((dataframe["RELAT3"] == 'X') & (dataframe["ECSTAT3"] == 1)) * 1 + \
    ((dataframe["RELAT4"] == 'X') & (dataframe["ECSTAT4"] == 1)) * 1 + \
    ((dataframe["RELAT5"] == 'X') & (dataframe["ECSTAT5"] == 1)) * 1 + \
    ((dataframe["RELAT6"] == 'X') & (dataframe["ECSTAT6"] == 1)) * 1 + \
    ((dataframe["RELAT7"] == 'X') & (dataframe["ECSTAT7"] == 1)) * 1 + \
    ((dataframe["RELAT8"] == 'X') & (dataframe["ECSTAT8"] == 1)) * 1

    # Count number of other adults in part time work
    dataframe["nondep2"] = \
    ((dataframe["RELAT2"] == 'X') & (dataframe["ECSTAT2"] == 2)) * 1 + \
    ((dataframe["RELAT3"] == 'X') & (dataframe["ECSTAT3"] == 2)) * 1 + \
    ((dataframe["RELAT4"] == 'X') & (dataframe["ECSTAT4"] == 2)) * 1 + \
    ((dataframe["RELAT5"] == 'X') & (dataframe["ECSTAT5"] == 2)) * 1 + \
    ((dataframe["RELAT6"] == 'X') & (dataframe["ECSTAT6"] == 2)) * 1 + \
    ((dataframe["RELAT7"] == 'X') & (dataframe["ECSTAT7"] == 2)) * 1 + \
    ((dataframe["RELAT8"] == 'X') & (dataframe["ECSTAT8"] == 2)) * 1

    # Count number of other adults non-dependent for other reasons
    dataframe["nondep3"] = \
    ((dataframe["RELAT2"] == 'X') & (dataframe["ECSTAT2"].isin([3,4,5,6,8,9]))) * 1 + \
    ((dataframe["RELAT3"] == 'X') & (dataframe["ECSTAT3"].isin([3,4,5,6,8,9]))) * 1 + \
    ((dataframe["RELAT4"] == 'X') & (dataframe["ECSTAT4"].isin([3,4,5,6,8,9]))) * 1 + \
    ((dataframe["RELAT5"] == 'X') & (dataframe["ECSTAT5"].isin([3,4,5,6,8,9]))) * 1 + \
    ((dataframe["RELAT6"] == 'X') & (dataframe["ECSTAT6"].isin([3,4,5,6,8,9]))) * 1 + \
    ((dataframe["RELAT7"] == 'X') & (dataframe["ECSTAT7"].isin([3,4,5,6,8,9]))) * 1 + \
    ((dataframe["RELAT8"] == 'X') & (dataframe["ECSTAT8"].isin([3,4,5,6,8,9]))) * 1

    dataframe["non_dependent_deductions"] = \
        dataframe["nondep1"] * NON_DEPENDENT_FULL_TIME_DEDUCTION + \
        dataframe["nondep2"] * NON_DEPENDENT_PART_TIME_DEDUCTION + \
        dataframe["nondep3"] * NON_DEPENDENT_OTHER_DEDUCTION

    # If any relation is a partner and the lead tenant or the tenant is 65+,
    # they are not eligbible for non dependent deductions
    relat_columns = ["RELAT2", "RELAT3", "RELAT4", "RELAT5", "RELAT6", "RELAT6", "RELAT7", "RELAT8"]
    dataframe.loc[(dataframe[relat_columns].eq('P').any(axis=1) & dataframe["AGE1"] >= 65) | \
        (dataframe["RELAT2"] == "P") & (dataframe["AGE2"] >= 65) | \
        (dataframe["RELAT3"] == "P") & (dataframe["AGE3"] >= 65) | \
        (dataframe["RELAT4"] == "P") & (dataframe["AGE4"] >= 65) | \
        (dataframe["RELAT5"] == "P") & (dataframe["AGE5"] >= 65) | \
        (dataframe["RELAT6"] == "P") & (dataframe["AGE6"] >= 65) | \
        (dataframe["RELAT7"] == "P") & (dataframe["AGE7"] >= 65) | \
        (dataframe["RELAT8"] == "P") & (dataframe["AGE8"] >= 65), ["non_dependent_deductions"]] = 0

    return dataframe["non_dependent_deductions"]
