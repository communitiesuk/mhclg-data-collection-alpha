from base64 import b64decode
from io import StringIO
import json
from os import environ
from uuid import uuid4
import boto3
import numpy
import pandas as pd


def handler(event, context):
    print("event: {}".format(event))

    uploaded_file = b64decode(event['body'])

    s3 = boto3.resource('s3')
    upload_key = f"{environ.get('S3_PREFIX')}{uuid4()}"
    upload = s3.Object(environ.get("S3_BUCKET"), upload_key)
    upload.put(Body=uploaded_file)

    print(f"Uploaded file to: {upload_key}")

    return {
        'statusCode': 200,
        'body': json.dumps({
            'meta': {
                'stored': f"s3://{environ.get('S3_BUCKET')}::{upload_key}"
            },
            'data': parse_excel(uploaded_file),
        }),
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
    return json.dumps(file_structure, cls=NumpyEncoder)


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
