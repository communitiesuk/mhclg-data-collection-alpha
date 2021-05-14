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

def calculate_paid_housing_benefit(dataframe):
    """Return dataframe of rent eligible for housing benefit and paid housing benefit"""

    dataframe["non_dependent_deductions"] = non_dependent_deductions(dataframe)
    dataframe["rent_hb"] = rent_hb(dataframe)
    import ipdb; ipdb.set_trace()
    dataframe["paid_hb"] = paid_hb(dataframe)

    #     ############# Paid Housing benefit
    #     CHILD_ALLOWANCE = 66.33
    #     PERSONAL_ALLOWANCE =

    #     Count number of children * CHILD_ALLOWANCE

    #     Count number of Adults (already derived in input)

    #     if lead tenant and no children
    #         if age < 25
    #             ptype = 1
    #         else
    #             ptype = 2
    #     if lead tenant and > 0 children
    #         if age 16 or 17
    #             ptype = 1
    #         else
    #             ptype = 2
    #     if lead tenant and partner
    #         if both < 18
    #             ptype3
    #         if one > 18
    #             ptype4

    #     IF (personaltype=0) personalallowance=0.
    # IF (personaltype=1) personalallowance=57.35.
    # IF (personaltype=2) personalallowance=72.40.
    # IF (personaltype=3) personalallowance=86.65.
    # IF (personaltype=4) personalallowance=113.70.

def paid_hb(dataframe):
    return dataframe

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












# What the hell is ecstat9?!
