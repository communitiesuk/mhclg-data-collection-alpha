import os
import papermill as pm

notebook_path = os.path.join(os.getcwd(), 'tests/weighting.ipynb')

pm.execute_notebook(
    notebook_path,
    'output.ipynb'
)
