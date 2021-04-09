from base64 import b64decode
from io import StringIO
import json
from os import environ
from uuid import uuid4
import boto3
import numpy
import pandas as pd
from fuzzywuzzy import process, fuzz


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
        "column_mapping": map_colums(headers),
        "data": unique_data_values
    }
    return file_structure

def map_colums(input_columns_list):
    # Returns a dictionary of our columns to our best guess of which of their columns maps to it
    # it returns only columns mapped with a "confidence" of 75% or higher, otherwise an empty string
    mhclg_column_list = ["Tenancy start date", "Type of letting", "Who is the landlord", "Registration no", "LA CORE code", "Management group", "Scheme code", "Tenant code", "Starter/Introductory tenancy", "Type of tenancy", "Tenancy Duration", "Age of Person 1", "Age of Person 2", "Age of Person 3", "Age of Person 4", "Age of Person 5", "Age of Person 6", "Age of Person 7", "Age of Person 8", "Gender of Person 1", "Gender of Person 2", "Gender of Person 3", "Gender of Person 4", "Gender of Person 5", "Gender of Person 6", "Gender of Person 7", "Gender of Person 8", "Person 2 relationship to Person 1", "Person 3 relationship to Person 1", "Person 4 relationship to Person 1", "Person 5 relationship to Person 1", "Person 6 relationship to Person 1", "Person 7 relationship to Person 1", "Person 8 relationship to Person 1", "Economic Status of Person 1", "Economic Status of Person 2", "Economic Status of Person 3", "Economic Status of Person 4", "Economic Status of Person 5", "Economic Status of Person 6", "Economic Status of Person 7", "Economic Status of Person 8", "Ethnic group of person 1 as defined by applicant", "Nationality of person 1", "Household member has ever served in the UK Armed Forces", "Household member has been seriously injured or ill in the UK Armed Forces", "Does the household contain a pregnant person", "Which benefits does the tenant receive", "How much income comes from these benefits", "Tenant's net income", "Income refused", "Main reason the household left their last settled home", "Accessibility requirements", "Housing situation", "LA in which household lived prior to this letting", "Postcode of previous accommodation", "How long has the household lived in the LA", "How long has the household been on the waiting list", "Homeless status prior to this letting", "Reason for Housing Priority", "Was the letting made under CBL", "Was the letting made under CHR", "Was the letting made under CAP", "Source of referral for this letting", "Rent and other charges period", "Basic rent", "Service charge", "Personal Service Charge", "Support charge", "Care home charge", "Exempt from accommodation charges", "After benefits,  what is the outstanding rent", "Void or newbuild/renewal date", "Major repairs completion date", "Supported scheme", "Number of offers since last tenancy", "Property Reference", "UPRN", "Number of bedrooms", "Type of unit", "Type of building", "Wheelchair accessible", "For relets,  previous basis for rent", "Reason for vacancy", "ONS LA code", "Postcode of property"]

    df = pd.DataFrame.from_dict({'mhclg_columns': mhclg_column_list, 'input_columns': input_columns_list}, orient='index').transpose().fillna(' ')

    match = []
    similarity = []

    for i in df.mhclg_columns:
            ratio = process.extract(i, df.input_columns, limit=1)
            similarity.append(ratio[0][1])
            if (ratio[0][1] >= 75):
                match.append(ratio[0][0])
            else:
                match.append(' ')

    df['match'] = pd.Series(match)
    df = df[['mhclg_columns', 'match']]
    df.replace(['', ' '], numpy.nan, inplace=True)
    df.dropna(inplace=True)
    return df.set_index('mhclg_columns').to_dict()['match']


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
