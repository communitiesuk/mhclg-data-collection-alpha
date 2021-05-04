const checkGender = (record) => {
    if (!record.gender) return {}
    let input = record.gender
    let out = {}
    let ilc = input.toLowerCase();
    if (ilc == "m" || ilc == "male") {
        out.gender = {
            value: "Male",
        };
    } else if (ilc == "f" || ilc == "female") {
        out.gender = {
            value: "Female",
        };
    } else if (ilc == "x" || ilc == "other") {
        out.gender = {
            value: "Other",
        };
    } else if (ilc == "r" || ilc == "refused") {
        out.gender = {
            value: "Refused",
        };
    } else {
        out.gender = input;
    }

    return out
};