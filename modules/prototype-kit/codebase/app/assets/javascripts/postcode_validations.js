const mapPostcodesToDouble = (record) => {
    const pc1 = record.postcode1
    const pc2 = record.postcode2
    let out = {}
    if (pc1 && pc1.length <= 4 && pc2 && pc2.length == 3) {
        out.postcode1 = { value: pc1.replace(' ', '') };
        out.postcode2 = { value: pc2 };
    } else if (pc1 && pc1.length > 4) {
        let postcode1 = pc1.substr(0, pc1.length - 3);
        let postcode2 = pc2 || pc1.substr(pc1.length - 3);

        out.postcode1 = { value: postcode1.replace(' ', '') };
        out.postcode2 = { value: postcode2 };
    }

    return out
};

const mapPostcodesToSingle = (record) => {
    const pc1 = record.postcode1
    const pc2 = record.postcode2
    let out = {}
    if (pc1 && pc1.length <= 4 && pc2) {
        out.postcode1 = { value: `${pc1} ${pc2}` }
        out.postcode2 = { value: "" }
    }
    return out
};
