## Data Lake

General idea here is to have an S3 bucket that various file formats can be uploaded into. These can then be acted on by a variety of Python based Lambda functions for munging, processing, converting to a standard schema etc and then crawled and cataloged by Glue.
