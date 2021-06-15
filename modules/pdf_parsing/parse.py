#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import PyPDF2 as ppdf

def flatten(data):
    out = {}
    for key in data:
        value = data[key]
        if isinstance(value, dict):
            out.update({"%s.%s" % (key, k): v for k, v in flatten(value).items()})
        else:
            out[key] = "%s (%s)" % (value, type(value))
    return out


with open(sys.argv[1], "rb") as fh:
    pdf = ppdf.PdfFileReader(fh)

    try:
        fields = pdf.getFields()
        #  print("Form PDF")
        #  print(fields)

        for field in fields.values():
            print("%s: %s" % (field["/T"], field["/V"]))

    except:
        print("No Form")
        raw_data = {k: v for k, v in pdf.resolvedObjects.items()}
        for k,v in flatten(raw_data).items():
            print("%s: %s" % (k, v))
