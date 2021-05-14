# Derived Income

# earnings is the self-reported net household income
# income_frequency is the frequency of the self-reported net household income (annual, monthly, weekly)
# child_benefit is the number of children in the household multiplied by the external monetary value from the DWP website

FIRST_CHILD_BENEFIT = 21.05
SUBSEQUENT_CHILD_BENEFIT = 13.95

def derive_income(dataframe):
    """Return dataframe with child benefit and derived income"""

    # Convert all earnings to weekly
    dataframe.loc[dataframe['incfreq'] == 'monthly', ['earnings']] *= 12 / 52
    dataframe.loc[dataframe['incfreq'] == 'annual', ['earnings']] /= 52

    number_of_children = dataframe[dataframe[["relat2", "relat3"]] == 'C'].count(axis=1)

    dataframe['childben'] = number_of_children.apply(dwp_benefit_value)
    dataframe['income'] = dataframe['earnings'] + dataframe['childben']

    return dataframe[['childben', 'income']]

def dwp_benefit_value(number_of_children):
    if number_of_children == 0:
        return 0.0

    return FIRST_CHILD_BENEFIT + ((number_of_children - 1) * SUBSEQUENT_CHILD_BENEFIT)
