from base64 import b64decode
from io import StringIO
import json
from os import environ
from uuid import uuid4
import boto3
import numpy
import pandas as pd


def handler(event, context):
    uploaded_data = json.loads(b64decode(event['body']))

    file_name = uploaded_data['filename']
    mimetype = uploaded_data['mimetype']
    uploaded_file = b64decode(uploaded_data['file'])

    log(context, {
        'event': "upload:received",
        'filename': file_name,
        'mimetype': mimetype,
    })

    s3 = boto3.resource('s3')
    upload_key = f"{environ.get('S3_PREFIX')}{uuid4()}-{file_name}"
    upload = s3.Object(environ.get("S3_BUCKET"), upload_key)
    upload.put(Body=uploaded_file, ContentType=mimetype)

    log(context, {
        'event': "upload:stored",
        'filename': file_name,
        'mimetype': mimetype,
        's3_location': upload_key,
    })

    parsed_data = parse_tabular(uploaded_file)

    log(context, {
        'event': "upload:parsed",
        's3_location': upload_key,
        'parsed_data': parsed_data,
    })

    return {
        'statusCode': 200,
        'body': json.dumps({
            'meta': {
                'stored': f"s3://{environ.get('S3_BUCKET')}/{upload_key}",
                'request_id': context.aws_request_id,
            },
            'data': parsed_data,
        }, cls=NumpyEncoder),
        'isBase64Encoded': False,
    }


def parse_tabular(file):
    try:
        df = pd.read_excel(file, na_values=[' '])
    except ValueError:
        s = StringIO(str(file, 'utf-8'))
        df = pd.read_csv(s, na_values=[' '])

    headers = df.columns.values.tolist()

    unique_data_values = []
    for column in df:
        unique_data_values.append(df[column].unique())

    file_structure = {
        "columns": headers,
        "data": unique_data_values
    }
    return file_structure


class NumpyEncoder(json.JSONEncoder):
    """ json encoder for numpy types """
    def default(self, obj):
        if isinstance(obj, (numpy.int_, numpy.intc, numpy.intp, numpy.int8,
                            numpy.int16, numpy.int32, numpy.int64, numpy.uint8,
                            numpy.uint16, numpy.uint32, numpy.uint64)):
            return int(obj)
        elif isinstance(obj, (numpy.float_, numpy.float16, numpy.float32,
                              numpy.float64)):
            return float(obj)
        elif isinstance(obj, (numpy.ndarray,)):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


def log(context, event):
    event['request_id'] = context.aws_request_id
    print(json.dumps(event, cls=NumpyEncoder))
