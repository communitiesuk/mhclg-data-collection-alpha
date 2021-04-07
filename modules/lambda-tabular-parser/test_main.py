import pytest
import json
import os
from main import *

class TestExcelParser:
    def test_header_parsing(self):
        fixture_path = os.getcwd() + '/fixtures/Capita.xlsx'
        result = json.loads(parse_excel(fixture_path))["columns"]
        assert result[5] == "First letting?"
        assert result[24] == "Gender of Person 6"
