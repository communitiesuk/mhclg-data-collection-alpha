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

function mapHomelessness(entry){
    entry.homeless = false;
    entry.unsatisfactory_housing = false;
    entry.welfare = false;
    entry.hardship = false;
    entry.unknown = false;

    if (entry.homeless_status) {
        switch (entry.homeless_status){
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

    console.log(`Homeless: ${entry.homeless}; Unsatisfactory: ${entry.unsatisfactory_housing}; Welfare: ${entry.welfare}; Hardship: ${entry.hardship}; Unknown: ${entry.unknown}`);
    return entry;
}