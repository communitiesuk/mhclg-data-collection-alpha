# Househould member count

def count_household_members(dataframe):
    """Return dataframe with household member count added"""

    gender_columns = dataframe[["sex1","sex2","sex3","sex4","sex5","sex6","sex7","sex8"]]
    dataframe['household_member_count'] = gender_columns.count(axis=1)

    return dataframe
