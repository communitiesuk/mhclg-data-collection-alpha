import os
import pandas as pd
import boto3

def handler(event, context):
    s3 = boto3.resource('s3', region_name='eu-west-2')
    bucket = s3.Bucket('mhclg-core-data-upload')
    for record in event['Records']:
        filename = unquote_plus(record['s3']['object']['key'])
        tmpkey = filename.replace('/', '')
        download_path = '/tmp/{}{}'.format(uuid.uuid4(), tmpkey)
        convert(download_path)

def convert():
    file = 'Downloads/Capita.xlsx'
    df = pd.read_excel(file, sheet_name='Data Extract', usecols='B:DO', nrows=31, skiprows=[1,2,3,4,5], na_values=[' '])
    print(df)
    df.to_parquet(f'{os.path.splitext(file)[0]}.parquet')


if __name__ == "__main__":
    convert()
