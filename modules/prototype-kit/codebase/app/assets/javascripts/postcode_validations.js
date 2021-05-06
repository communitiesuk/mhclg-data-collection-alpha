const outboundPostcodeRegex = "[a-z]{1,2}([0-9]{1,2}|[0-9][a-z])"
const inboundPostcodeRegex = "[0-9][a-z]{2}"

const postcodeFull = {
    label: "Postcode Full", key: "postcode",
    validators: [
        {
            validate: "regex_matches",
            regex: `^ *${outboundPostcodeRegex} *${inboundPostcodeRegex} *$`,
            regexFlags: { ignoreCase: true},
            error: "At least 3 characters",
        },
    ],
}

const postcodeFirstPart = {
    label: "Postcode First Part", key: "postcode1",
    validators: [
        {
            validate: "regex_matches",
            regex: `^ *${outboundPostcodeRegex} *$`,
            regexFlags: { ignoreCase: true},
            error: "At least 3 characters",
        },
    ],
}

const postcodeSecondPart = {
    label: "Postcode Second Part", key: "postcode2",
    validators: [
        {
            validate: "regex_matches",
            regex: `^ *${inboundPostcodeRegex} *$`,
            regexFlags: { ignoreCase: true},
            error: "Only valid in combination with 'Postcode (or first part of)'",
        },
    ],
}

const mapPostcodes = (record) => {
    const postcode = record.postcode ? record.postcode.replace(' ', '') : ""
    const pc1 = record.postcode1 ? record.postcode1.replace(' ', '') : ""
    const pc2 = record.postcode2 ? record.postcode2.replace(' ', '') : ""
    let out = {}

    if (postcode.length > 0) {
        let postcode1 = postcode.substr(0, postcode.length - 3);
        let postcode2 = postcode.substr(postcode.length - 3);

        out.postcode1 = { value: postcode1 };
        out.postcode2 = { value: postcode2 };
    } else {
        out.postcode = { value: `${pc1} ${pc2}`};
    }

    return out
};