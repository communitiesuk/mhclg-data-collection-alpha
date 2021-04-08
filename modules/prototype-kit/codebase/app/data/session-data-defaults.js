/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {
  nextPage: 0,
  mhclg_data_columns: [
    {columnName: "Tenancy Details", columns: [
      {name: "Tenancy start date", mappedTo: null},
      {name: "Type of letting", mappedTo: null},
      {name: "Who is the landlord", mappedTo: "Landlord Name"},
      {name: "Registration no", mappedTo: "Reg no"},
      {name: "LA CORE code", mappedTo: "Local Authority Code"},
      {name: "Management group", mappedTo: "Mgmnt group"},
      {name: "Scheme code", mappedTo: "Our Scheme code column"},
      {name: "Tenant code", mappedTo: "Tenant Cde"},
      {name: "Starter/Introductory tenancy", mappedTo: "Is this a starter or introductory tenancy?"},
      {name: "Type of tenancy", mappedTo: "Tenancy type"},
      {name: "Tenancy Duration", mappedTo: "Duration of tenancy"}
    ]},
    {columnName: "Housing Details", columns: [
      {name: "Age of Person 1", mappedTo: "Person 1 age"},
      {name: "Age of Person 2", mappedTo: "Person 2 age"},
      {name: "Age of Person 3", mappedTo: "Person 3 age"},
      {name: "Age of Person 4", mappedTo: "Person 4 age"},
      {name: "Age of Person 5", mappedTo: "Person 5 age"},
      {name: "Age of Person 6", mappedTo: "Person 6 age"},
      {name: "Age of Person 7", mappedTo: "Person 7 age"},
      {name: "Age of Person 8", mappedTo: "Person 8 age"},
      {name: "Gender of Person 1", mappedTo: "Person 1 gender"},
      {name: "Gender of Person 2", mappedTo: "Person 2 gender"},
      {name: "Gender of Person 3", mappedTo: "Person 3 gender"},
      {name: "Gender of Person 4", mappedTo: "Person 4 gender"},
      {name: "Gender of Person 5", mappedTo: "Person 5 gender"},
      {name: "Gender of Person 6", mappedTo: "Person 6 gender"},
      {name: "Gender of Person 7", mappedTo: "Person 7 gender"},
      {name: "Gender of Person 8", mappedTo: "Person 8 gender"},
      {name: "Person 2 relationship to Person 1", mappedTo: "Person 2 relationship to Person 1"},
      {name: "Person 3 relationship to Person 1", mappedTo: "Person 3 relationship to Person 1"},
      {name: "Person 4 relationship to Person 1", mappedTo: "Person 4 relationship to Person 1"},
      {name: "Person 5 relationship to Person 1", mappedTo: "Person 5 relationship to Person 1"},
      {name: "Person 6 relationship to Person 1", mappedTo: "Person 6 relationship to Person 1"},
      {name: "Person 7 relationship to Person 1", mappedTo: "Person 7 relationship to Person 1"},
      {name: "Person 8 relationship to Person 1", mappedTo: "Person 8 relationship to Person 1"},
      {name: "Economic Status of Person 1", mappedTo: "Person 1 Economic status"},
      {name: "Economic Status of Person 2", mappedTo: "Person 2 Economic status"},
      {name: "Economic Status of Person 3", mappedTo: "Person 3 Economic status"},
      {name: "Economic Status of Person 4", mappedTo: "Person 4 Economic status"},
      {name: "Economic Status of Person 5", mappedTo: "Person 5 Economic status"},
      {name: "Economic Status of Person 6", mappedTo: "Person 6 Economic status"},
      {name: "Economic Status of Person 7", mappedTo: "Person 7 Economic status"},
      {name: "Economic Status of Person 8", mappedTo: "Person 8 Economic status"},
      {name: "Ethnic group of person 1 as defined by applicant", mappedTo: "Person 1 ethnic group"},
      {name: "Nationality of person 1", mappedTo: "Person 1 nationality"},
      {name: "Household member has ever served in the UK Armed Forces", mappedTo:
        "Armed forces status"},
      {name: "Household member has been seriously injured or ill in the UK Armed Forces", mappedTo: "Armed forces injury status"},
      {name: "Does the household contain a pregnant person", mappedTo: "Pregnancy status"},
      {name: "Which benefits does the tenant receive", mappedTo: "Tenant benefits"},
      {name: "How much income comes from these benefits", mappedTo: "Benefit income"},
      {name: "Tenant's net income", mappedTo: "Net income"},
      {name: "Income refused", mappedTo: "Income refused"},
      {name: "Main reason the household left their last settled home", mappedTo:
        "Reason for move"},
      {name: "Accessibility requirements", mappedTo: "Accessibility"},
      {name: "Housing situation", mappedTo: "Prior Housing status"},
    ]},
    {columnName: "Previous Accomodation", columns: [
      {name: "LA in which household lived prior to this letting", mappedTo: null},
      {name: "Postcode of previous accommodation", mappedTo: null},
      {name: "How long has the household lived in the LA", mappedTo: null},
      {name: "How long has the household been on the waiting list", mappedTo: null},
      {name: "Homeless status prior to this letting", mappedTo: null},
      {name: "Reason for Housing Priority", mappedTo: null},
      {name: "Was the letting made under CBL", mappedTo: null},
      {name: "Was the letting made under CHR", mappedTo: null},
      {name: "Was the letting made under CAP", mappedTo: null},
      {name: "Source of referral for this letting", mappedTo: null},
    ]},
    {columnName: "Financials", columns:[
      {name: "Rent and other charges period", mappedTo: null},
      {name: "Basic rent", mappedTo: null},
      {name: "Service charge", mappedTo: null},
      {name: "Personal Service Charge", mappedTo: null},
      {name: "Support charge", mappedTo: null},
      {name: "Care home charge", mappedTo: null},
      {name: "Exempt from accommodation charges", mappedTo: null},
      {name: "After benefits, what is the outstanding rent", mappedTo: null},
    ]},
    {columnName: "Property Details", columns: [
      {name: "Void or newbuild/renewal date", mappedTo: null},
      {name: "Major repairs completion date", mappedTo: null},
      {name: "Supported scheme", mappedTo: null},
      {name: "Number of offers since last tenancy", mappedTo: null},
      {name: "Property Reference", mappedTo: null},
      {name: "UPRN", mappedTo: null},
      {name: "Number of bedrooms", mappedTo: null},
      {name: "Type of unit", mappedTo: null},
      {name: "Type of building", mappedTo: null},
      {name: "Wheelchair accessible", mappedTo: null},
      {name: "For relets, previous basis for rent", mappedTo: null},
      {name: "Reason for vacancy", mappedTo: null},
      {name: "ONS LA code", mappedTo: null},
      {name: "Postcode of property", mappedTo: null},
    ]}
  ]
}
    
    
    
