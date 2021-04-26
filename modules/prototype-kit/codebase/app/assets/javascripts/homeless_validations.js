const homeless_validations = [
    // {
    //     validate: "regex_matches",
    //     regex: "^\\d{1,3}$",
    //     error: "Only can be number and must not be more than 3 digits in length.",
    // }
]

const homeless_options = [
    { label: "Homeless or about to lose their home (within 56  days)", value: "homeless" },
    { label: "Living in insanitary, overcrowded or unsatisfactory housing", value: "unsatisfactory_housing" },
    { label: "A need to move on medical and welfare grounds (including a disability)", value: "welfare" },
    { label: "A need to move to avoid hardship to themselves or others", value: "hardship" },
    { label: "Don't know", value: "unknown" },
]


const homeless1 = {
    label: "Homeless 1", key: "homeless1",
    validators: homeless_validations,
    type: 'select',
    options: homeless_options,
    matchStrategy: 'fuzzy'
}
const homeless2 = {
    label: "Homeless 2", key: "homeless2",
    validators: homeless_validations,
    type: 'select',
    options: homeless_options,
    matchStrategy: 'fuzzy'
}

const homeless3 = {
    label: "Homeless 3", key: "homeless3",
    validators: homeless_validations,
    type: 'select',
    options: homeless_options,
    matchStrategy: 'fuzzy'
}

const homeless4 = {
    label: "Homeless 4", key: "homeless4",
    validators: homeless_validations,
    type: 'select',
    options: homeless_options,
    matchStrategy: 'fuzzy'
}

const homeless5 = {
    label: "Homeless 5", key: "homeless5",
    validators: homeless_validations,
    type: 'select',
    options: homeless_options,
    matchStrategy: 'fuzzy'
}


function mapHomelessness(entry){

    if (entry.homeless1){
        switch (entry.homeless1) {
            case 'homeless':
                entry.homeless = true; break;
            case 'unsatisfactory_housing':
                entry.unsatisfactory_housing = true; break;
            case 'welfare':
                entry.welfare = true; break;
            case 'hardship':
                entry.hardship = true; break;
            case 'unknown':
                entry.unknown = true; break;
        }
    }

    console.log(entry.homeless);
    return entry;
}