# Experiment aims
Replace some of the SQL/SPSS based statistics models currently being manually run on collected data sets with functional Python Pandas models. Use Jupyter Notebooks with Pytest to facilitate a TDD approach with a UI.

Papermill is used to run notebooks programmatically.

We use Jupytext to pair Jupyter Notebooks (.ipynb files) to markdown so that we can git version just the markdown files (ipynb files will be automatically recreated from them when running the notebook locally)

## Install dependencies:

`make setup`

## Run tests:

```cd tests
pytest```


## Start notebook
`jupyter notebook`


## Development

Each stats operation should be defined in its own module and should be functional.

It should take a dataframe or series input parameter and return a dataframe or series output.

Each module should have a fixture folder with an expected `input.csv` and `expected_result.csv`


### References
https://jupyter.org/
https://github.com/chmp/ipytest
https://docs.pytest.org/en/6.2.x/
https://github.com/nteract/papermill
https://pandas.pydata.org/
