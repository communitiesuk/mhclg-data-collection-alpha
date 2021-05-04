const previousTenureOptions = [
    { label: "Private sector tenancy", value: "3" },
    { label: "Tied housing or renting with job", value: "4" },
    { label: "Supported housing", value: "6" },
    { label: "Direct access hostel", value: "7" },
    { label: "Sheltered accommodation", value: "8" },
    { label: "Residential care home", value: "9" },
    { label: "Hospital", value: "10" },
    { label: "Children's home or foster care", value: "11" },
    { label: "Bed and breakfast", value: "14" },
    { label: "Any other temporary accom", value: "18" },
    { label: "Rough sleeping", value: "19" },
    { label: "Refuge", value: "21" },
    { label: "Mobile home or caravan", value: "23" },
    { label: "Housed by National Asylum Support Service", value: "24" },
    { label: "Other", value: "25" },
    { label: "Owner  occupation (private)", value: "26" },
    { label: "Owner Occupation (low cost home ownership)", value: "27" },
    { label: "Living with friends and family", value: "28" },
    { label: "Prison/ Approved Probation Hostel", value: "29" },
    { label: "Fixed term Local Authority General Needs tenancy", value: "30" },
    { label: "Lifetime Local Authority General Needs tenancy", value: "31" },
    { label: "Fixed term Private Registered Provider General Needs tenancy", value: "32" },
    { label: "Lifetime Private Registered Provider General Needs tenancy", value: "33" },
]

const previousTenure = {
    label: "Previous tenure",
    key: "previous_tenure",
    type: 'select',
    options: previousTenureOptions,
    matchStrategy: 'fuzzy'
}
