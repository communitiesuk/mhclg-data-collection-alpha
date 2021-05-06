dayjs.extend(window.dayjs_plugin_customParseFormat)

const allFields = [
  {
    label: "Tenancy Id",
    key: "tenancy_id",
  },
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
  startDate,
  postcodeFull, postcodeFirstPart, postcodeSecondPart,
  { label: "Type of letting", key: "letting_type" },
  previousTenure,
  timeInTenancy,
  homelessCombined,
  homeless1, homeless2, homeless3, homeless4, homeless5,
]

const importer = new FlatfileImporter(
  "b673cbe9-dda6-4045-a536-3ecff934d443",
  {
    type: "Import type",
    fields: allFields,
    managed: false,
    theme: {
      buttons: {
        primary: { backgroundColor: "#00703C", border: "#00703C" }
      }
    }
  }
);
importer.setCustomer({
  userId: "54321",
  name: "John Doe",
  email: "john@doe.com",
  companyName: "Doe Industries",
  companyId: "12345",
});

importer.registerFieldHook("hardship", fieldHookForHardship);

importer.registerRecordHook((record, index, mode) => {
  let out = {};

  out = { ...out, ...checkGender(record) };
  out = { ...out, ...mapPostcodes(record) };
  out = { ...out, ...mapHomelessness(record) };
  out = { ...out, ...mapStartDate(record) };

  return out;
});

const startImport = () => {
  importer.requestDataFromUser().then(function (results) {
    importer.displaySuccess("Thank you for your import!");
  });
};
