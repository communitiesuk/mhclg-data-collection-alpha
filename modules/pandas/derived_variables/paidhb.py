# Paid Housing Benefit

NON_DEPENDENT_FULL_TIME_DEDUCTION = 23.35
NON_DEPENDENT_PART_TIME_DEDUCTION = 17.00
NON_DEPENDENT_OTHER_DEDUCTION = 7.40

NON_DEPENDENT_DEDUCTION_CAP = 163.45

def calculate_paid_housing_benefit(dataframe):
    """Return dataframe of rent eligible for housing benefit and paid housing benefit"""

    import ipdb; ipdb.set_trace()
    # RELAT field values
    # C = Child
    # P = Partner
    # X = Other

    # Check if any relation is partner
    # RELAT2,3,4,5,6,7,8 = 'P'
    # If Age of main tenant or of partner is >= 65
    non_dependent_deductions = 0

    # OTHERWISE:

        # ECSTAT = Economic Status
        # 1 = Full-Time work
        # 2 = Part Time work
        # 3 = Government training
        # 4 = Job Seeker
        # 5 = Retired
        # 6 = Not seeking work
        # 7 = Student
        # 8 = Sick or disabled

        # Nondep1 = How many adults in household in full time work, relation other

        # Nondep2 = how many adults in household in part time work, relation other

        # Nondep3 = Adults X with status 3, 4, 5, 6 or 8

        non_dependent_deductions =
            (nondep1 * NON_DEPENDENT_FULL_TIME_DEDUCTION) +
            (Nondep2 * NON_DEPENDENT_PART_TIME_DEDUCTION) +
            (Nondep3 * NON_DEPENDENT_OTHER_DEDUCTION)





    If NEEDSTYPE = 2 (supported housing)

    OR wrent or wscharge is missing then rent_hb = None

    # If flat has more bedrooms than needed according the bedroom standard eligible rent is reduced
    if BED_MINUS_BEDSTANDARD is 1
        # eligbible weekly rent reduced by 14%
        wrent_deduced = wrent * 0.86
    if BED_MINUS_BEDSTANDARD > 1
        # eligible weekly rent reduced by 25%
        wrent_deduced = wrent * 0.75

    rent_housing_benefit (rent_hb_long) = wrent_deduced + weekly service charge (wscharge) + non_dependent_deductions




    ############# Paid Housing benefit
    CHILD_ALLOWANCE = 66.33
    PERSONAL_ALLOWANCE =

    Count number of children * CHILD_ALLOWANCE

    Count number of Adults (already derived in input)

    if lead tenant and no children
        if age < 25
            ptype = 1
        else
            ptype = 2
    if lead tenant and > 0 children
        if age 16 or 17
            ptype = 1
        else
            ptype = 2
    if lead tenant and partner
        if both < 18
            ptype3
        if one > 18
            ptype4

    IF (personaltype=0) personalallowance=0.
IF (personaltype=1) personalallowance=57.35.
IF (personaltype=2) personalallowance=72.40.
IF (personaltype=3) personalallowance=86.65.
IF (personaltype=4) personalallowance=113.70.




# What the hell is ecstat9?!
