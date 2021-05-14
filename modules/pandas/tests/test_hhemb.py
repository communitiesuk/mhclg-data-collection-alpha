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

# + hide_input=true
# Setup ipytest extension
try:
    ipy_str = str(type(get_ipython()))
    if 'zmqshell' in ipy_str or 'terminal' in ipy_str:
        import ipytest
        ipytest.autoconfig()
except:
    pass


# + hide_input=true
# Import our dependencies

import os
import sys
from pathlib import Path
import pytest
import pandas
from pandas.testing import assert_frame_equal

module_path = os.path.abspath('../')
if module_path not in sys.path:
    sys.path.append(module_path)

from derived_variables.hhemb import count_household_members

def get_path(filename):
    return os.path.join(module_path, 'tests/fixtures', filename)

# -
# ## Show function definition

# +
# count_household_members??
# -

# ## Set up our input data from a CSV fixture
# This reads in a CSV of values and loads it into memory
#

input_data = pandas.read_csv(get_path('input.csv'), index_col=0)
input_data

input_data[["sex1","sex2"]]

# ## Set up our expected result from a CSV fixture

expected_result = pandas.read_csv(get_path('expected_result_hhemb.csv'), index_col=0)
expected_result

# ## Run the model

actual_result = count_household_members(input_data)
actual_result


# +
# %%run_pytest[clean]

# Check that our actual result matches our expected result

def test_apply_weighting():
    assert_frame_equal(actual_result, expected_result)



# -

__name__
