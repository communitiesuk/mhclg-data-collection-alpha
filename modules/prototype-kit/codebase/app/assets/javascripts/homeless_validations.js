const homeless_validations = [
    {
        validate: "regex_matches",
        regex: "^\\d{1,3}$",
        error: "Only can be number and must not be more than 3 digits in length.",
    }
]

const homeless = {
    label: "Homeless", key: "homeless",
    validators: homeless_validations
}