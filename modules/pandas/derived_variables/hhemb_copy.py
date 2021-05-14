# ---
# jupyter:
#   jupytext:
#     formats: ipynb,py:light
#     text_representation:
#       extension: .py
#       format_name: light
#       format_version: '1.5'
#       jupytext_version: 1.11.2
#   kernelspec:
#     display_name: Python 3
#     language: python
#     name: python3
# ---

# + [markdown] hide_input=true
# ## Househould member count
# -

def count_household_members(dataframe):
    """Return dataframe with household member count added"""

    gender_columns = dataframe[["sex1","sex2","sex3","sex4","sex5","sex6","sex7","sex8"]]
    dataframe['household_member_count'] = gender_columns.count(axis=1)

    return dataframe

# ## Setup ipytest extension

# + hide_input=true

if __name__ == "__main__":
    try:
        ipy_str = str(type(get_ipython()))
        if 'zmqshell' in ipy_str or 'terminal' in ipy_str:
            import ipytest
            ipytest.autoconfig()
    except:
        pass

# -
# ## Import our dependencies

# + hide_input=true

if __name__ == "__main__":
    import os
    import sys
    from pathlib import Path

    module_path = os.path.abspath('./')
    if module_path not in sys.path:
        sys.path.append(module_path)

    from derived_variables.hhemb import count_household_members

# + hide_input=true

def get_path(filename):
    import os
    return os.path.abspath(os.path.join('fixtures', filename))

def get_data(path):
    import pandas
    return pandas.read_csv(get_path(path), index_col=0)

# -
# ## Set up our input data from a CSV fixture
# This reads in a CSV of values and loads it into memory
#

if __name__ == "__main__":
    print(get_data("input.csv"))

# -
# ## Set up our expected result from a CSV fixture
#

if __name__ == "__main__":
    print(get_data("expected_result.csv"))

# -
# ## Run the model
#

if __name__ == "__main__":
    print(count_household_members(get_data("input.csv")))

# +
# %%run_pytest[clean]

# Check that our actual result matches our expected result

def test_apply_weighting():
    from pandas.testing import assert_frame_equal
    import pandas

    expected_result = get_data("expected_result.csv")
    actual_result = count_household_members(get_data("input.csv"))
    assert_frame_equal(actual_result, expected_result)
