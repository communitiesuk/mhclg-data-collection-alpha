#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime as dt
import sys
import yaml


def red(text):
    return "\u001b[31;1m%s\u001b[0m" % text


def yellow(text):
    return "\u001b[33;1m%s\u001b[0m" % text


def run_section(section):
    print()
    print(yellow(section['label']))

    for question in section['questions']:
        answer = ask(question)


def validate_select(question, answer):
    options = [opt['label'] for opt in question["answer_options"]]

    if answer not in options:
        print(red("Answer must be one of: %s" % "; ".join(options)))
        return False

    return True


def validate_date(question, answer):
    try:
        dt.strptime(answer, "%d/%m/%Y")
    except:
        print(red("Invalid date format. Use: DD/MM/YYYY"))
        return False

    return True

validators = {
    'multiple_choice_select': validate_select,
    'date': validate_date
}


def validate(question, answer):
    if question['mandatory'] and not answer:
        print(red("This question is mandatory"))
        return False

    return validators[question['question_type']](question, answer)

def ask(question):
    answer = input("%s " % question["label"])
    if validate(question, answer):
        return answer

    ask(question)





if __name__ == "__main__":
    filename = sys.argv[1]

    with open(filename) as fh:
        data = yaml.load(fh, Loader=yaml.SafeLoader)

    for section in data['sections']:
        run_section(section)


