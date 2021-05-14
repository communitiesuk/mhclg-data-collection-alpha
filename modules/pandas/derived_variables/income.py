# Derived Income

# earnings is the self-reported net household income
# income_frequency is the frequency of the self-reported net household income (annual, monthly, weekly)
# child_benefit is the number of children in the household multiplied by the external monetary value from the DWP website

def derive_income(dataframe):
    """Return dataframe with derived income added"""
    # Convert all earnings to weekly
    dataframe.loc[dataframe['income_frequency'] == 'monthly', ['earnings']] *= 12 / 52
    dataframe.loc[dataframe['income_frequency'] == 'annual', ['earnings']] /= 52

    relat_columns = dataframe[["relat2", "relat3"]]
    number_of_children = dataframe[relat_columns == 'C'].count(axis=1)

    dwp_benefit_value = 5

    dataframe['childben'] = number_of_children * dwp_benefit_value
    dataframe['income'] = dataframe['earnings'] + dataframe['childben']

    return dataframe[['childben', 'income']]


def dwp_benefit_values():
    return {
        1: 21.05,
        2: 35.00,
        3: 48.95,
        4: 62.90,
        5: 76.85,
        6: 90.80,
        7: 104.75
    }
