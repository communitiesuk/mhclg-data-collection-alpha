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

# + hide_input=false
# Setup ipytest extension
try:
    ipy_str = str(type(get_ipython()))
    if 'zmqshell' in ipy_str or 'terminal' in ipy_str:
        import ipytest
        ipytest.autoconfig()
except:
    pass


# + hide_input=false
# Import our dependencies

import os
import sys
from pathlib import Path
import pytest
import pandas
from pandas.testing import assert_frame_equal

# + hide_input=false
# Import our data model

module_path = os.path.abspath(os.path.join('../'))
if module_path not in sys.path:
    sys.path.append(module_path)

from weighting.weighting import apply_weighting
# -

path = os.path.normpath(os.path.join(Path().absolute(), '../weighting/fixtures'))

# +
# Set up our input data from a CSV fixture

input_data = pandas.read_csv(path + '/input.csv', index_col=0)
input_data

# +
# Set up our expected result from a CSV fixture

expected_result = pandas.read_csv(path + '/expected_result.csv', index_col=0)
expected_result

# +
# Run the model

actual_result = apply_weighting(input_data)
actual_result


# +
# %%run_pytest[clean]

# Check that our actual result matches our expected result

def test_apply_weighting():
    assert_frame_equal(actual_result, expected_result)
# -


