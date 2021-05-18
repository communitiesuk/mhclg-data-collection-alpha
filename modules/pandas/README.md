# Experiment aims
Replace some of the SQL/SPSS based statistics models currently being manually run on collected data sets with functional Python Pandas models. Use Jupyter Notebooks with Pytest to facilitate a TDD approach with a UI.

We use Jupytext to pair Jupyter Notebooks (.ipynb files) to .py lightscript so that we can git version just the script files (ipynb files will be automatically recreated from them when running the notebook locally). This also allows us to run pytest on and notebook visualisation on the same script.

Papermill can be used to run notebooks programmatically.

## Setup:

`make pyenv`

This will create a virtual environment to install and run the python code in and ask you to run `. activate` to activate it. That needs to be done each time you re-open the console/terminal.

`make setup`

This will install the dependencies.

## Run tests:

`make test`

This will run the automated tests for all the data models in the console/terminal.

## Start notebook
`jupyter notebook`

This will open the Jupyter Notebook home page in your default browser and allow you to step through the unit test notebooks.

To verify the models against a different input/output simply change the corresponding csv files and re-run.


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
