# Derived Income

# earnings is the self-reported net household income
# income_frequency is the frequency of the self-reported net household income (annual, monthly, weekly)
# child_benefit is the number of children in the household multiplied by the external monetary value from the DWP website

def derive_income(dataframe):
    """Return dataframe with derived income added"""
    # Convert all earnings to weekly
    dataframe.loc[dataframe['income_frequency'] == 'monthly', ['earnings']] *= 12 / 52
    dataframe.loc[dataframe['income_frequency'] == 'annual', ['earnings']] /= 52
    return 1
