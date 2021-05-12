import sys
sys.path.append("../pandas")
from pathlib import Path

import pytest
import pandas
from pandas.testing import assert_frame_equal
from weighting.weighting import apply_weighting

path = Path(__file__).parent / "../weighting/fixtures"

def test_apply_weighting():
    expected = pandas.read_csv(path / 'expected_result.csv', index_col=0)
    input = pandas.read_csv(path / 'input.csv', index_col=0)
    actual = apply_weighting(input)
    assert_frame_equal(actual, expected)
