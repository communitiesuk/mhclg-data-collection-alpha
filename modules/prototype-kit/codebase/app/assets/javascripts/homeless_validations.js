const homeless_validations = [
]

const homeless_options = [
    { label: "Not Homeless", value: "not_homeless" },
    { label: "Homeless or about to lose their home (within 56  days)", value: "homeless" },
    { label: "Living in insanitary, overcrowded or unsatisfactory housing", value: "unsatisfactory_housing" },
    { label: "A need to move on medical and welfare grounds (including a disability)", value: "welfare" },
    { label: "A need to move to avoid hardship to themselves or others", value: "hardship" },
    { label: "Don't know", value: "unknown" },
]

const homelessCombined = {
    label: "Homeless Status in Words (only if the other homeless columns cannot be mapped)", key: "homeless_status",
    type: 'select',
    options: homeless_options,
    matchStrategy: 'fuzzy'
}

const homeless1 = {
    label: "Homeless or about to lose home", key: "homeless",
    alternates: ["Homeless or about to lose their home (within 56 days)"],
    type: 'checkbox',
}

const homeless2 = {
    label: "Insanitary or overcrowded housing", key: "unsatisfactory_housing",
    alternates: ["Living in insanitary, overcrowded or unsatisfactory housing"],
    type: 'checkbox',
}

const homeless3 = {
    label: "Move due to medical or welfare", key: "welfare",
    alternates: ["A need to move on medical and welfare grounds (including a disability)"],
    type: 'checkbox',
}

const homeless4 = {
    label: "Move to avoid hardship", key: "hardship",
    alternates: ["A need to move to avoid hardship to themselves or others"],
    type: 'checkbox',
}

const homeless5 = {
    label: "Unknown", key: "unknown",
    alternates: ["Don't know"],
    type: 'checkbox',
}

const mapHomelessness = (originalRecord, index, mode) => {
    const record = {}

    console.log(originalRecord)

    if (originalRecord.homeless_status) {
        switch (originalRecord.homeless_status){
            case 'homeless':
                record.homeless = {value: true}; break;
            case 'unsatisfactory_housing':
                record.unsatisfactory_housing = {value: true}; break;
            case 'welfare':
                record.welfare = {value: true}; break;
            case 'hardship':
                record.hardship = {value: true}; break;
            case 'unknown':
                record.unknown = {value: true}; break;
        }
    }
    record.homeless_status = {value: ""}

    return record;
}

const fieldHookForHardship = (data) => {
    data.map(value => {
        let val = value[0];
        let index = value[1];

        return [{value: val || false}, index]
    })
}