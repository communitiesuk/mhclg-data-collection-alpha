from functools import reduce

# Paid Housing Benefit

# ECSTAT = Economic Status
# 1 = Full time
# 2 = Part time
# 3 = Government training
# 4 = Job Seeker
# 5 = Retired
# 6 = Not seeking work
# 7 = Student
# 8 = Sick or disabled
# 9 = Child under 16
FULLTIME = [1]
PARTTIME = [2]
NOT_FULL_OR_PART_TIME = [3,4,5,6,7,8,9]


NON_DEPENDENT_FULL_TIME_DEDUCTION = 23.35
NON_DEPENDENT_PART_TIME_DEDUCTION = 17.00
NON_DEPENDENT_OTHER_DEDUCTION = 7.40

NON_DEPENDENT_DEDUCTION_CAP = 163.45

CHILD_ALLOWANCE = 66.33

PERSONAL_ALLOWANCE_TYPE1 = 57.35
PERSONAL_ALLOWANCE_TYPE2 = 72.40
PERSONAL_ALLOWANCE_TYPE3 = 86.65
PERSONAL_ALLOWANCE_TYPE4 = 113.70

# Relat field values
CHILD = 'C'
PARTNER = 'P'
OTHER = 'X'


def for_each_tenant(function, dataframe):
    return [function(dataframe, tenant_no) for tenant_no in range(2, 9)]


def any_of(filters):
    return reduce(lambda x, y: x | y, filters)


def set_column_for_matching_rows_to(dataframe, column, filter, value):
    dataframe.loc[filter, column] = value

def calculate_paid_housing_benefit(dataframe):
    """Return dataframe of rent eligible for housing benefit and paid housing benefit"""

    add_non_dependent_deductions(dataframe)
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


def count_children(dataframe, tenant_number):
    """Returns 0 if this tenant is an adult, 1 if a child"""
    relationship = dataframe["RELAT%s" % tenant_number]
    age = dataframe["AGE%s" % tenant_number]
    is_child = relationship == CHILD
    has_been_born = age >= 0
    is_under_20 = age <= 19

    return (is_child & has_been_born & is_under_20) * 1


def child_allowance(dataframe):
    child_count_per_row = for_each_tenant(count_children, dataframe)
    number_of_children = sum(child_count_per_row)
    return number_of_children * CHILD_ALLOWANCE


def are_a_couple_and_both_are_under_18(dataframe, tenant_number):
    lead_tenant_under_18 = dataframe["AGE1"] < 18
    this_tenant_under_18 = dataframe["AGE%s" % tenant_number] < 18
    this_tenant_is_partner = dataframe["RELAT%s" % tenant_number] == "P"

    return lead_tenant_under_18 & this_tenant_under_18 & this_tenant_is_partner


def are_a_couple_and_one_is_over_18(dataframe, tenant_number):
    lead_tenant_over_18 = dataframe["AGE1"] >= 18
    this_tenant_over_18 = dataframe["AGE%s" % tenant_number] >= 18
    this_tenant_is_partner = dataframe["RELAT%s" % tenant_number] == "P"

    return (lead_tenant_over_18 | this_tenant_over_18) & this_tenant_is_partner


def personal_allowance(dataframe):
    dataframe["personal_allowance"] = 0

    single_adult_under_25 = (dataframe["AGE1"] < 25) & (dataframe["TOTADULT"] == 1) & (dataframe["TOTCHILD"] == 0)
    single_parent_age_16_17 = (dataframe["AGE1"] >= 16) & (dataframe["AGE1"] <= 17) & (dataframe["TOTCHILD"] > 0)
    type_one_filter = single_adult_under_25 | single_parent_age_16_17
    set_column_for_matching_rows_to(dataframe, "personal_allowance", type_one_filter, PERSONAL_ALLOWANCE_TYPE1)

    single_adult_over_25 = (dataframe["AGE1"] >= 25) & (dataframe["TOTADULT"] == 1) & (dataframe["TOTCHILD"] == 0)
    single_parent_over_18 = (dataframe["AGE1"] >= 18) & (dataframe["TOTCHILD"] > 0)
    type_two_filter = single_adult_over_25 | single_parent_over_18
    set_column_for_matching_rows_to(dataframe, "personal_allowance", type_two_filter, PERSONAL_ALLOWANCE_TYPE2)

    possible_young_couples = for_each_tenant(are_a_couple_and_both_are_under_18, dataframe)
    young_couple = any_of(possible_young_couples)
    set_column_for_matching_rows_to(dataframe, "personal_allowance", young_couple, PERSONAL_ALLOWANCE_TYPE3)

    possible_couples = for_each_tenant(are_a_couple_and_one_is_over_18, dataframe)
    couple = any_of(possible_couples)
    set_column_for_matching_rows_to(dataframe, "personal_allowance", couple, PERSONAL_ALLOWANCE_TYPE4)

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


def whose_work_is(work_types):
    def _filter(dataframe, tenant_no):
        return ((dataframe["RELAT2"] == OTHER) & (dataframe["ECSTAT%s" % tenant_no].isin(work_types))) * 1
    return _filter


def are_a_couple_and_one_is_over_65(dataframe, tenant_number):
    lead_tenant_over_65 = dataframe["AGE1"] >= 65
    this_tenant_over_65 = dataframe["AGE%s" % tenant_number] >= 65
    this_tenant_is_partner = dataframe["RELAT%s" % tenant_number] == "P"

    return (lead_tenant_over_65 | this_tenant_over_65) & this_tenant_is_partner


def add_non_dependent_deductions(dataframe):
    full_time_tenant_counts = for_each_tenant(whose_work_is(FULLTIME), dataframe)
    full_time_tenant_deductions = sum(full_time_tenant_counts) * NON_DEPENDENT_FULL_TIME_DEDUCTION 

    part_time_tenant_counts = for_each_tenant(whose_work_is(PARTTIME), dataframe)
    part_time_tenant_deductions = sum(part_time_tenant_counts) * NON_DEPENDENT_PART_TIME_DEDUCTION

    other_tenant_counts = for_each_tenant(whose_work_is(NOT_FULL_OR_PART_TIME), dataframe)
    other_tenant_deductions = sum(other_tenant_counts) * NON_DEPENDENT_OTHER_DEDUCTION

    dataframe["non_dependent_deductions"] = sum([full_time_tenant_deductions, part_time_tenant_deductions, other_tenant_deductions])

    old_couple_filter = for_each_tenant(are_a_couple_and_one_is_over_65, dataframe)
    set_column_for_matching_rows_to(dataframe, "non_dependent_deductions", any_of(old_couple_filter), 0)

    return dataframe["non_dependent_deductions"]
