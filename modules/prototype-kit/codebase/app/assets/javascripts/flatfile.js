  const importer = new FlatfileImporter(
    "b673cbe9-dda6-4045-a536-3ecff934d443",
    {
      type: "Import type",
      fields: [
        {
          label: "Age",
          key: "age",
          validators: [
            {
              validate: "regex_matches",
              regex: "^\\d{1,3}$",
              error:
                "Only can be number and must not be more than 3 digits in length.",
            },
          ],
        },
        {
          label: "Gender",
          key: "gender",
          validators: [
            {
              validate: "regex_matches",
              regex: "/\W|(Female)|(Male)|(Other)|(Refused)|\W/gm",
              error:
                "Please use valid gender ('Male','Female','Other' or 'Refused')",
            },
          ],
        },
        {
          label: "Start date",
          key: "start_date",
        },
        { label: "Postcode 1", key: "postcode1" },
        { label: "Postcode 2", key: "postcode2" },
        { label: "Type of letting", key: "letting_type" },
        { label: "previous tenure", key: "previous_tenure" },
        timeInTenancy,
        homelessCombined,
        homeless1, homeless2, homeless3, homeless4, homeless5,
      ],
      managed: false,
    }
  );
  importer.setCustomer({
    userId: "54321",
    name: "John Doe",
    email: "john@doe.com",
    companyName: "Doe Industries",
    companyId: "12345",
  });

  const checkGender = (record) => {
    if (!record.gender) return {}
    let input = record.gender
    let out = {}
    let ilc = input.toLowerCase();
    if(ilc == "m" || ilc == "male") {
      out.gender = {
          value: "Male",
        };
    } else if(ilc == "f" || ilc == "female") {
      out.gender = {
          value: "Female",
        };
    } else if(ilc == "x" || ilc == "other") {
      out.gender = {
          value: "Other",
        };
    } else if(ilc == "r" || ilc == "refused") {
      out.gender = {
          value: "Refused",
        };
    } else {
      out.gender = input;
    }

    return out
  };

  const mapPostcodes = (record) => {
    const pc1 = record.postcode1
    const pc2 = record.postcode2
    let out = {}
    if (pc1 && pc1.length <= 4 && pc2 && pc2.length == 3) {
      out.postcode1 = { value: pc1 };
      out.postcode2 = { value: pc2 };
    } else if (pc1 && pc1.length > 4) {
      let postcode1 = pc1.substr(0, pc1.length - 3);
      let postcode2 = pc1.substr(pc1.length - 3);

      out.postcode1 = { value: postcode1 };
      out.postcode2 = { value: postcode2 };
    }

    return out
  };

  importer.registerFieldHook("hardship", fieldHookForHardship);

  importer.registerRecordHook((record, index, mode) => {
    let out = {};
    
    out = {...out, ...checkGender(record)};
    out = {...out, ...mapPostcodes(record)};
    out = {...out, ...mapHomelessness(record)};

    return out;
  });

  const postProcessors = [mapPostcodes, ];

  const startImport = () => {
    importer.requestDataFromUser().then(function (results) {
      results.data = results.data.map((row) =>
        postProcessors.map((processor) => processor(row))
      );

      importer.displaySuccess("Thank you for your import!");
    });
  };
