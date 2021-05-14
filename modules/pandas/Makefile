pyenv:
	python -m venv .env
	echo "Now run: '. activate'"

setup:
	# Install python deps.
	pip install -r requirements.txt

# Install the server extension
	jupyter serverextension enable jupytext --user

	# Install and activate the notebook extension
	jupyter nbextension install --py jupytext --user
	jupyter nbextension enable --py jupytext --user

# Install contrib extensions. This lets you enable the hide input extension so we can hide setup cells from the UI.
	jupyter contrib nbextension install --user

test:
	cd tests && pytest

testx:
	find . -path ./.env -prune -false -o -name "*.py" | entr make test

start: setup
	jupyter notebook &

stop:
	pkill jupyter*
