FROM public.ecr.aws/lambda/python:3.8

COPY requirements.txt ./
RUN pip install -r requirements.txt

WORKDIR /app

COPY convert-xlsx-to-parquet.py /app
ENTRYPOINT ["python", "convert-xlsx-to-parquet.py"]
