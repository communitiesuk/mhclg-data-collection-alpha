# Househould member count

def count_household_members(dataframe):
    """Return series with household member count"""

    gender_columns = dataframe[["sex1","sex2","sex3","sex4","sex5","sex6","sex7","sex8"]]
    series = gender_columns.count(axis=1).rename('household_member_count')
    return series

