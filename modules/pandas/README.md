# Experiment aims
Replace some of the SQL/SPSS based statistics models currently being manually run on collected data sets with functional Python Pandas models. Use Jupyter Notebooks with Pytest to facilitate a TDD approach with a UI.

We use Jupytext to pair Jupyter Notebooks (.ipynb files) to .py lightscript so that we can git version just the script files (ipynb files will be automatically recreated from them when running the notebook locally). This also allows us to run pytest on and notebook visualisation on the same script.

Papermill can be used to run notebooks programmatically.

## Install dependencies:

`make setup`

## Run tests:

`make test`

## Start notebook
`jupyter notebook`


## Development

Each stats operation should be defined in its own module and should be functional.

It should take a dataframe or series input parameter and return a dataframe or series output.

Each module should have a fixture folder with an expected `input.csv` and `expected_result.csv`


### References
https://jupyter.org/<br />
https://github.com/chmp/ipytest<br />
https://docs.pytest.org/en/6.2.x/<br />
https://github.com/nteract/papermill<br />
https://pandas.pydata.org/<br />
