FROM public.ecr.aws/lambda/python:3.8

RUN yum install -y amazon-linux-extras

RUN pip install --upgrade pip

COPY ./requirements.txt ./

RUN pip install -r requirements.txt

COPY ./main.py ./

CMD [ "main.handler" ]
