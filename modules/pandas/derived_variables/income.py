# Derived Income

# earnings is the self-reported net household income
# income_frequency is the frequency of the self-reported net household income (annual, monthly, weekly)
# child_benefit is the number of children in the household multiplied by the external monetary value from the DWP website

def derive_income(dataframe):
    """Return dataframe with derived income added"""
    # Convert all earnings to weekly
    dataframe.loc[dataframe['incfreq'] == 'monthly', ['earnings']] *= 12 / 52
    dataframe.loc[dataframe['incfreq'] == 'annual', ['earnings']] /= 52

    relat_columns = dataframe[["relat2", "relat3"]]
    number_of_children = dataframe[relat_columns == 'C'].count(axis=1)

    dataframe['childben'] = number_of_children.apply(dwp_benefit_value)
    dataframe['income'] = dataframe['earnings'] + dataframe['childben']

    return dataframe[['childben', 'income']]

def dwp_benefit_value(number_of_children):
    return {
        0: 0.0,
        1: 21.05,
        2: 35.00,
        3: 48.95,
        4: 62.90,
        5: 76.85,
        6: 90.80,
        7: 104.75
    }[number_of_children]
