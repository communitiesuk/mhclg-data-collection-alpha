from base64 import b64decode
import json
import numpy
import pandas as pd


def handler(event, context):
    print("event: {}".format(event))

    sheet = b64decode(event['body'])

    return {
        'statusCode': 200,
        'body': parse_excel(sheet),
        'isBase64Encoded': False,
    }


def parse_excel(file):
    df = pd.read_excel(file, na_values=[' '])

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
