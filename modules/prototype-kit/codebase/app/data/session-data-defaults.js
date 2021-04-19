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
  columnMappings: {
    'Who is the landlord': 'Landlord Name',
    'Registration no': 'Reg no',
    'LA CORE code': 'Local Authority Code',
    'Management group': 'Mgmnt group',
    'Scheme code': 'Our Scheme code column',
    'Tenant code': 'Tenant Cde',
    'Starter/Introductory tenancy': 'Is this a starter or introductory tenancy?',
    'Type of tenancy': 'Tenancy type',
    'Tenancy Duration': 'Duration of tenancy',
    'Age of Person 2': 'Person 2 age',
    'Age of Person 3': 'Person 3 age',
    'Age of Person 4': 'Person 4 age',
    'Age of Person 5': 'Person 5 age',
    'Age of Person 6': 'Person 6 age',
    'Age of Person 7': 'Person 7 age',
    'Age of Person 8': 'Person 8 age',
    'Gender of Person 2': 'Person 2 gender',
    'Gender of Person 3': 'Person 3 gender',
    'Gender of Person 4': 'Person 4 gender',
    'Gender of Person 5': 'Person 5 gender',
    'Gender of Person 6': 'Person 6 gender',
    'Gender of Person 7': 'Person 7 gender',
    'Gender of Person 8': 'Person 8 gender',
    'Person 2 relationship to Person 1': 'Person 2 relationship to Person 1',
    'Person 3 relationship to Person 1': 'Person 3 relationship to Person 1',
    'Person 4 relationship to Person 1': 'Person 4 relationship to Person 1',
    'Person 5 relationship to Person 1': 'Person 5 relationship to Person 1',
    'Person 6 relationship to Person 1': 'Person 6 relationship to Person 1',
    'Person 7 relationship to Person 1': 'Person 7 relationship to Person 1',
    'Person 8 relationship to Person 1': 'Person 8 relationship to Person 1',
    'Economic Status of Person 1': 'Person 1 Economic status',
    'Economic Status of Person 2': 'Person 2 Economic status',
    'Economic Status of Person 3': 'Person 3 Economic status',
    'Economic Status of Person 4': 'Person 4 Economic status',
    'Economic Status of Person 5': 'Person 5 Economic status',
    'Economic Status of Person 6': 'Person 6 Economic status',
    'Economic Status of Person 7': 'Person 7 Economic status',
    'Economic Status of Person 8': 'Person 8 Economic status',
    'Ethnic group of person 1 as defined by applicant': 'Person 1 ethnic group',
    'Nationality of person 1': 'Person 1 nationality',
    'Household member has ever served in the UK Armed Forces': 'Armed forces status',
    'Does the household contain a pregnant person': 'Pregnancy status',
    'Which benefits does the tenant receive': 'Tenant benefits',
    'How much income comes from these benefits': 'Benefit income',
    'Tenant\'s net income': 'Net income',
    'Income refused': 'Income refused',
    'Main reason the household left their last settled home': 'Reason for move',
    'Accessibility requirements': 'Accessibility',
    'Housing situation': 'Prior Housing status',
    'LA in which household lived prior to this letting': 'LA in which household lived prior to this letting',
    'Homeless status prior to this letting': 'Homeless status prior to this letting',
    'Reason for Housing Priority': 'Reason for Housing Priority',
    'Was the letting made under CBL': 'Was the letting made under CBL',
    'Was the letting made under CHR': 'Was the letting made under CHR',
    'Was the letting made under CAP': 'Was the letting made under CAP',
    'Source of referral for this letting': 'Source of referral for this letting',
    'Basic rent': 'Basic rent',
    'Service charge': 'Service charge',
    'Support charge': 'Support charge',
    'Care home charge': 'Care home charge',
    'Exempt from accommodation charges': 'Exempt from accommodation charges',
    'After benefits, what is the outstanding rent': 'After benefits, what is the outstanding rent',
    'Void or newbuild/renewal date': 'Void or newbuild/renewal date',
    'Major repairs completion date': 'Major repairs completion date',
    'Supported scheme': 'Supported scheme',
    'Number of offers since last tenancy': 'Number of offers since last tenancy',
    'Property Reference': 'Property Reference',
    'UPRN': 'UPRN',
    'Type of unit': 'Type of unit',
    'Type of building': 'Type of building',
    'Wheelchair accessible': 'Wheelchair accessible',
    'For relets, previous basis for rent': 'For relets, previous basis for rent',
    'Reason for vacancy': 'Reason for vacancy',
    'Postcode of property': 'Postcode of property',
  },
  mhclgSections: [
    {
      sectionName: 'Tenancy Details', columns: [
        'Tenancy start date',
        'Type of letting',
        'Who is the landlord',
        'Registration no',
        'LA CORE code',
        'Management group',
        'Scheme code',
        'Tenant code',
        'Starter/Introductory tenancy',
        'Type of tenancy',
        'Tenancy Duration',
      ]
    },
    {
      sectionName: 'Housing Details', columns: [
        'Age of Person 1',
        'Age of Person 2',
        'Age of Person 3',
        'Age of Person 4',
        'Age of Person 5',
        'Age of Person 6',
        'Age of Person 7',
        'Age of Person 8',
        'Gender of Person 1',
        'Gender of Person 2',
        'Gender of Person 3',
        'Gender of Person 4',
        'Gender of Person 5',
        'Gender of Person 6',
        'Gender of Person 7',
        'Gender of Person 8',
        'Person 2 relationship to Person 1',
        'Person 3 relationship to Person 1',
        'Person 4 relationship to Person 1',
        'Person 5 relationship to Person 1',
        'Person 6 relationship to Person 1',
        'Person 7 relationship to Person 1',
        'Person 8 relationship to Person 1',
        'Economic Status of Person 1',
        'Economic Status of Person 2',
        'Economic Status of Person 3',
        'Economic Status of Person 4',
        'Economic Status of Person 5',
        'Economic Status of Person 6',
        'Economic Status of Person 7',
        'Economic Status of Person 8',
        'Ethnic group of person 1 as defined by applicant',
        'Nationality of person 1',
        'Household member has ever served in the UK Armed Forces',
        'Household member has been seriously injured or ill in the UK Armed Forces',
        'Does the household contain a pregnant person',
        'Which benefits does the tenant receive',
        'How much income comes from these benefits',
        'Tenant\'s net income',
        'Income refused',
        'Main reason the household left their last settled home',
        'Accessibility requirements',
        'Housing situation',
      ]
    },
    {
      sectionName: 'Previous Accomodation', columns: [
        'LA in which household lived prior to this letting',
        'Postcode of previous accommodation',
        'How long has the household lived in the LA',
        'How long has the household been on the waiting list',
        'Homeless status prior to this letting',
        'Reason for Housing Priority',
        'Was the letting made under CBL',
        'Was the letting made under CHR',
        'Was the letting made under CAP',
        'Source of referral for this letting',
      ]
    },
    {
      sectionName: 'Financials', columns: [
        'Rent and other charges period',
        'Basic rent',
        'Service charge',
        'Personal Service Charge',
        'Support charge',
        'Care home charge',
        'Exempt from accommodation charges',
        'After benefits, what is the outstanding rent',
      ]
    },
    {
      sectionName: 'Property Details', columns: [
        'Void or newbuild/renewal date',
        'Major repairs completion date',
        'Supported scheme',
        'Number of offers since last tenancy',
        'Property Reference',
        'UPRN',
        'Number of bedrooms',
        'Type of unit',
        'Type of building',
        'Wheelchair accessible',
        'For relets, previous basis for rent',
        'Reason for vacancy',
        'ONS LA code',
        'Postcode of property',
      ]
    }
  ],
  sprint3: {
    individualCases: {
      '234fnskdjd23': {
        data: [
          {
            title: null,
            rows: [
              {
                label: 'Privacy notice shown',
                value: 'Yes',
              }
            ],
          },
          {
            title: 'Tenancy details',
            rows: [
              {
                label: 'Tenancy Start Date',
                value: '5 January 2021',
                invalid: true,
              },
              {
                label: 'Type of provider',
                value: 'Private',
                details: {
                  type: 'widgets',
                  widgets: [
                    {
                      title: 'Validation Error stats',
                      content: '56% of the time this date is incorrect'
                    }
                  ]
                }
              },
              {
                label: 'Landlord',
                value: 'This landlord',
              },
              {
                label: 'Starter Tenancy',
                value: 'No',
              },
              {
                label: 'Main tenancy type',
                value: 'Assured Shorthold',
              },
              {
                label: 'Tenant Code',
                value: '239S23GH',
              },
              {
                label: 'Length of fixed term tenancy',
                value: '6 months',
                details: {
                  type: 'widgets',
                  widgets: [
                    {
                      title: 'Length',
                      content: '56% of your agreements are for 12 months'
                    }
                  ]
                }
              }
            ]
          },
          {
            title: 'Demographics',
            sections: [
              {
                title: 'First Person',
                rows: [
                  {
                    label: 'Person 1 Age',
                    value: '24',
                  },
                  {
                    label: 'Person 1 Age Refused',
                    value: 'No',
                  },
                  {
                    label: 'Person 1 Economic Status',
                    value: 'Part Time',
                  },
                  {
                    label: 'Person 1 Ethnicity',
                    value: 'White: Irish',
                  },
                  {
                    label: 'Person 1 Nationality',
                    value: 'UK national resident in UK',
                  },
                ]
              },
              {
                title: 'Household',
                rows: [
                  {
                    label: 'Armed Forces',
                    value: 'No',
                  },
                  {
                    label: 'Pregnancy',
                    value: 'No',
                  },
                  {
                    label: 'Benefits',
                    value: 'Don\'t know',
                  },
                  {
                    label: 'Benefits portion of income',
                    value: 'Don\'t know',
                  },
                  {
                    label: 'Net income',
                    value: '&pound; 14000',
                  },
                  {
                    label: 'Income is',
                    value: 'Annual',
                  }
                ]
              }
            ]
          },
          {
            title: 'Access and Health needs',
            sections: [
              {
                title: 'Access',
                rows: [
                  {
                    label: 'Fully wheelchair accessible',
                    value: 'No',
                  },
                  {
                    label: 'Wheelchair access to essential rooms',
                    value: 'No',
                  },
                  {
                    label: 'Level access housing',
                    value: 'No',
                  },
                  {
                    label: 'No access requirements',
                    value: 'Yes',
                  },
                ]
              },
              {
                title: 'Health',
                rows: [
                  {
                    label: 'Chronic Mental or Physical illnesses',
                    value: 'No',
                  },
                  {
                    label: 'Vision Impaired',
                    value: 'No',
                  },
                  {
                    label: 'Hearing Impaired',
                    value: 'No',
                  },
                  {
                    label: 'Mobility Impaired',
                    value: 'No',
                  },
                  {
                    label: 'Dexterity Impaired',
                    value: 'No',
                  },
                  {
                    label: 'Learning Difficulty',
                    value: 'No',
                  },
                  {
                    label: 'Memory Impaired',
                    value: 'No',
                  },
                  {
                    label: 'Mental Health',
                    value: 'No',
                  },
                  {
                    label: 'Fatigue',
                    value: 'No',
                  },
                  {
                    label: 'Social or Behavioural',
                    value: 'No',
                  },
                ]
              }
            ]
          },
          {
            title: 'Circumstances of move',
            rows: [
              {
                label: 'Reason for move',
                value: 'Repossession',
              },
              {
                label: 'Prior living situation',
                value: 'Owner occupation (private)',
              },
              {
                label: 'Previous Local Authority',
                value: 'Coventry (E08000026)',
              },
              {
                label: 'Previous Postcode',
                value: 'CV8 2LZ',
              },
              {
                label: 'Time living in new let area',
                value: 'More than 4 but less than 5 years',
              },
              {
                label: 'Time on LA waiting list',
                value: 'Less than 1 year',
              },
              {
                label: 'Homelessness',
                value: 'Assessed as homeless',
              },
              {
                label: 'Given Reasonable Preference',
                value: 'Yes',
              },
              {
                label: 'If given reasonable preference, why?',
                value: 'Homeless or about to lose their home (within 56 days)',
              },
              {
                label: 'Letting under Choice-based Lettings?',
                value: 'Yes',
              },
              {
                label: 'Letting under Common housing register?',
                value: 'No',
              },
              {
                label: 'Letting under Common Allocation Policy?',
                value: 'No',
              },
              {
                label: 'Source of letting referral', // Do something here for "OTHER"
                value: 'Tenant Applied Directly',
              },
            ]
          },
          {
            title: 'Cost of letting',
            rows: [
              {
                label: 'Rental period',
                value: 'Weekly for 52 weeks',
              },
              {
                label: 'Basic Rent',
                value: '&pound; 52',
              },
              {
                label: 'Service Charge',
                value: '&pound; 14',
              },
              {
                label: 'Personal service charge',
                value: '&pound; 0',
              },
              {
                label: 'Support charge',
                value: '&pound; 0',
              },
              {
                label: 'Total Charge',
                value: '&pound; 66',
              },
              {
                label: 'Is total charge covered by benefits?',
                value: 'Yes',
              },
            ]
          },
          {
            title: 'Property details',
            rows: [
              {
                label: 'Property Reference',
                value: 'PT238500',
              },
              {
                label: 'Void date',
                value: '14 December 2020',
              },
              {
                label: 'Major Repairs date',
                value: 'N/A',
              },
              {
                label: 'Number of times let previously offered',
                value: '1',
              },
              {
                label: 'Number of Bedrooms',
                value: '1',
              },
              {
                label: 'Type of Unit',
                value: 'Flat / Maisonette',
              },
              {
                label: 'Type of Building',
                value: 'Purpose Built',
              },
              {
                label: 'Adapted for wheelchair',
                value: 'No',
              },
              {
                label: 'Property previously let under',
                value: 'A social rent basis',
              },
              {
                label: 'Reason for Vacancy',
                value: 'First let of leased property',
              },
              {
                label: 'Property LA',
                value: 'Coventry (E08000026)',
              },
              {
                label: 'Property Postcode',
                value: 'CV6 2KP',
              },
            ]
          }
        ],
      }
    }
  }
}
