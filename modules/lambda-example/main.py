def handler(event, context):
    print("event: {}".format(event))

    return {
        'bucket': event['Records'][0]['s3']['bucket']['name'],
        'object': event['Records'][0]['s3']['object']['key'],
    }
