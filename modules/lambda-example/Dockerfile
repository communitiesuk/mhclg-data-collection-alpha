FROM public.ecr.aws/lambda/python:3.8

RUN pip install --upgrade pip

COPY ./requirements.txt ./

# Add RUN lines here to install any system
# dependencies for the function

RUN pip install -r requirements.txt

COPY ./* ./

CMD [ "main.handler" ]
