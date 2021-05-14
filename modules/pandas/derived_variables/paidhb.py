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

NON_DEPENDENT_FULL_TIME_DEDUCTION = 23.35
NON_DEPENDENT_PART_TIME_DEDUCTION = 17.00
NON_DEPENDENT_OTHER_DEDUCTION = 7.40

NON_DEPENDENT_DEDUCTION_CAP = 163.45

CHILD_ALLOWANCE = 66.33

PERSONAL_ALLOWANCE_TYPE1 = 57.35
PERSONAL_ALLOWANCE_TYPE2 = 72.40
PERSONAL_ALLOWANCE_TYPE3 = 86.65
PERSONAL_ALLOWANCE_TYPE4 = 113.70


def calculate_paid_housing_benefit(dataframe):
    """Return dataframe of rent eligible for housing benefit and paid housing benefit"""

    dataframe["non_dependent_deductions"] = non_dependent_deductions(dataframe)
    dataframe["rent_hb"] = rent_hb(dataframe)
    dataframe["paid_hb"] = paid_hb(dataframe)
    import ipdb; ipdb.set_trace()



def paid_hb(dataframe):
    dataframe["child_allowance"] = \
        (((dataframe["RELAT2"] == 'C') & ((dataframe["AGE2"] >= 0) & (dataframe["AGE2"] <= 19))) * 1 + \
        ((dataframe["RELAT3"] == 'C') & ((dataframe["AGE3"] >= 0) & (dataframe["AGE3"] <= 19))) * 1 + \
        ((dataframe["RELAT4"] == 'C') & ((dataframe["AGE4"] >= 0) & (dataframe["AGE4"] <= 19))) * 1 + \
        ((dataframe["RELAT5"] == 'C') & ((dataframe["AGE5"] >= 0) & (dataframe["AGE5"] <= 19))) * 1 + \
        ((dataframe["RELAT6"] == 'C') & ((dataframe["AGE6"] >= 0) & (dataframe["AGE6"] <= 19))) * 1 + \
        ((dataframe["RELAT7"] == 'C') & ((dataframe["AGE7"] >= 0) & (dataframe["AGE7"] <= 19))) * 1 + \
        ((dataframe["RELAT8"] == 'C') & ((dataframe["AGE8"] >= 0) & (dataframe["AGE8"] <= 19))) * 1) * CHILD_ALLOWANCE

    dataframe["personal_allowance"] = 0

    # Single Adult under 25
    dataframe.loc[(dataframe["AGE1"] < 25) & (dataframe["TOTADULT"] == 1) & (dataframe["TOTCHILD"] == 0), ["personal_allowance"]] = PERSONAL_ALLOWANCE_TYPE1

    # Single Parent aged 16-17
    dataframe.loc[(dataframe["AGE1"] >= 16) & (dataframe["AGE1"] <= 17) & (dataframe["TOTCHILD"] > 0), ["personal_allowance"]] = PERSONAL_ALLOWANCE_TYPE1

    # Single adult over 25
    dataframe.loc[(dataframe["AGE1"] >= 25) & (dataframe["TOTADULT"] == 1) & (dataframe["TOTCHILD"] == 0), ["personal_allowance"]] = PERSONAL_ALLOWANCE_TYPE2

    # Single Parent aged 18+
    dataframe.loc[(dataframe["AGE1"] >= 18) & (dataframe["TOTCHILD"] > 1), ["personal_allowance"]] = PERSONAL_ALLOWANCE_TYPE2

    # Couple, both under 18
    dataframe.loc[ \
        ((dataframe["AGE1"] < 18) & (dataframe["AGE2"] < 18) & (dataframe["RELAT2"] == "P")) | \
        ((dataframe["AGE1"] < 18) & (dataframe["AGE3"] < 18) & (dataframe["RELAT3"] == "P")) | \
        ((dataframe["AGE1"] < 18) & (dataframe["AGE4"] < 18) & (dataframe["RELAT4"] == "P")) | \
        ((dataframe["AGE1"] < 18) & (dataframe["AGE5"] < 18) & (dataframe["RELAT5"] == "P")) | \
        ((dataframe["AGE1"] < 18) & (dataframe["AGE6"] < 18) & (dataframe["RELAT6"] == "P")) | \
        ((dataframe["AGE1"] < 18) & (dataframe["AGE7"] < 18) & (dataframe["RELAT7"] == "P")) | \
        ((dataframe["AGE1"] < 18) & (dataframe["AGE8"] < 18) & (dataframe["RELAT8"] == "P")), ["personal_allowance"]] = PERSONAL_ALLOWANCE_TYPE3

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

    dataframe["rent_hb"] = dataframe["wrent_deduced"] + dataframe["WSCHARGE"] - dataframe["non_dependent_deductions"]

    # If supported housing (NEEDSTYPE == 2) or
    # Weekly Rent or Weekly Charge are missing or
    # number of bedrooms are missing or Economic status has been refused (10) then
    # no rent housing benefit is calculated
    dataframe.loc[ \
    (dataframe["NEEDSTYPE"] == 2) | \
    (dataframe["WRENT"].isnull()) | \
    (dataframe["WSCHARGE"].isnull()) | \
    (dataframe["BED_MINUS_BEDSTANDARD"].isnull()) | \
    (dataframe["ECSTAT1"].eq(10)), ["rent_hb"]] = None

    return dataframe["rent_hb"]


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
