const startDate = {
    label: "Start date",
    key: "start_date",
    validators: [
        {
            validate: "regex_matches", 
            regex: "^ *[0-3][0-9]/[0-1][0-9]/[1-2][0-9]{3} *$",
            error: "Date must be of the form DD/MM/YYYY. e.g. 31/04/2021",
        }
    ]
  }
