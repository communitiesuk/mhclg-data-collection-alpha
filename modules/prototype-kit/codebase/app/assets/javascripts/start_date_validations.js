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

const mapStartDate = (record) => {
    if (! record.start_date) return {};

    const formats = ["DD/MM/YYYY", "D/M/YYYY", "DD MMM YYYY", "D MMM YYYY", "Do MMM YYYY", "DD MMMM YYYY", "D MMMM YYYY", "Do MMMM YYYY"]

    for (var i = 0; i < formats.length; i++){
        let format = formats[i]
        let startdate = dayjs(record.start_date.trim(), format)

        if (startdate.isValid()){
            return { start_date: {value:  startdate.format("DD/MM/YYYY") }}
        }
    }

    return {}
};

