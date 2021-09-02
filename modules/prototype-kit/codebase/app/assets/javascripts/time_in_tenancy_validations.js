const timeInTenancyOptions = [
    { label: "Just moved to Local Authority area", value: "just_moved" },
    { label: "Less than 1 year", value: "<1" },
    { label: "1 year but under 2 years", value: "<2" },
    { label: "2 year but under 3 years", value: "<3" },
    { label: "3 year but under 4 years", value: "<4" },
    { label: "4 year but under 5 years", value: "<5" },
    { label: "5 years or more", value: ">5" },
    { label: "Do not know", value: "unknown" },
]

const timeInTenancy = {
    label: "How long has the tenant been in the local authority",
    key: "time_in_tenancy",
    type: 'select',
    options: timeInTenancyOptions,
    matchStrategy: 'fuzzy'
};

// const timeInTenancyFixer = values => {
//     return values.map(value => {
//         let time = value[0];
//         let index = value[1];

//         var out = [{value: "unknown"}, index];

//         if (isNaN(time))    out = [{}, index];
//         else if (time == 0) out = [{value: timeInTenancyOptions[0].value}, index];
//         else if (time < 1)  out = [{value: timeInTenancyOptions[1].value}, index];
//         else if (time < 2)  out = [{value: timeInTenancyOptions[2].value}, index];
//         else if (time < 3)  out = [{value: timeInTenancyOptions[3].value}, index];
//         else if (time < 4)  out = [{value: timeInTenancyOptions[4].value}, index];
//         else if (time < 5)  out = [{value: timeInTenancyOptions[5].value}, index];
//         else if (time >= 5) out = [{value: timeInTenancyOptions[6].value}, index];

//         return out
//     });
// }