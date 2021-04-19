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
        form: {
          head: [
            {
              key: {
                text: 'Privacy Notice'
              },
              value: {
                text: 'Yes'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'name'
                  }
                ]
              }
            },
          ],
          tenancy: [
            {
              key: {
                text: 'Tenancy Start Date'
              },
              value: {
                text: '5 January 2021'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'date of birth'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Type of provider'
              },
              value: {
                html: 'Private'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact information'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Landlord'
              },
              value: {
                html: 'This landlord'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Starter Tenancy'
              },
              value: {
                html: 'No'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Main tenancy type'
              },
              value: {
                html: 'Assured Shorthold'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Tenant Code'
              },
              value: {
                html: '239S23GH'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Length of fixed term tenancy'
              },
              value: {
                html: '6 months'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            }
          ],
          demographics: {
            person1: [
              {
                key: {
                  text: 'Person 1 Age'
                },
                value: {
                  html: '24'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Person 1 Age Refused'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Person 1 Economic Status'
                },
                value: {
                  html: 'Part Time'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Person 1 Ethnicity'
                },
                value: {
                  html: 'White: Irish'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Person 1 Nationality'
                },
                value: {
                  html: 'UK national resident in UK'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
            ],
            household: [
              {
                key: {
                  text: 'Armed Forces'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Pregnancy'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Benefits'
                },
                value: {
                  html: 'Don\'t know'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Benefits portion of income'
                },
                value: {
                  html: 'Don\'t know'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Net income'
                },
                value: {
                  html: '&pound; 14000'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Income is'
                },
                value: {
                  html: 'Annual'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              }
            ]
          },
          needs: {
            access: [
              {
                key: {
                  text: 'Fully wheelchair accessible'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Wheelchair access to essential rooms'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Level access housing'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'No access requirements'
                },
                value: {
                  html: 'Yes'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
            ],
            health: [
              {
                key: {
                  text: 'Chronic Mental or Physical illnesses'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Vision Impaired'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Hearing Impaired'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Mobility Impaired'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Dexterity Impaired'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Learning Difficulty'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Memory Impaired'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Mental Health'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Fatigue'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
              {
                key: {
                  text: 'Social or Behavioural'
                },
                value: {
                  html: 'No'
                },
                actions: {
                  items: [
                    {
                      href: '#',
                      text: 'Change',
                      visuallyHiddenText: 'contact details'
                    }
                  ]
                }
              },
            ]
          },
          circumstances: [
            {
              key: {
                text: 'Reason for move'
              },
              value: {
                html: 'Repossession'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Prior living situation'
              },
              value: {
                html: 'Owner occupation (private)'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Previous Local Authority'
              },
              value: {
                html: 'Coventry (E08000026)'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Previous Postcode'
              },
              value: {
                html: 'CV8 2LZ'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Time living in new let area'
              },
              value: {
                html: 'More than 4 but less than 5 years'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Time on LA waiting list'
              },
              value: {
                html: 'Less than 1 year'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Homelessness'
              },
              value: {
                html: 'Assessed as homeless'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Given Reasonable Preference'
              },
              value: {
                html: 'Yes'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'If given reasonable preference, why?'
              },
              value: {
                html: 'Homeless or about to lose their home (within 56 days)'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Letting under Choice-based Lettings?'
              },
              value: {
                html: 'Yes'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Letting under Common housing register?'
              },
              value: {
                html: 'No'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Letting under Common Allocation Policy?'
              },
              value: {
                html: 'No'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Source of letting referral'
              },
              value: {
                html: 'Tenant Applied Directly'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
          ],
          costs: [
            {
              key: {
                text: 'Rental period'
              },
              value: {
                html: 'Weekly for 52 weeks'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Basic Rent'
              },
              value: {
                html: '&pound; 52'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Service Charge'
              },
              value: {
                html: '&pound; 14'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Personal service charge'
              },
              value: {
                html: '&pound; 0'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Support charge'
              },
              value: {
                html: '&pound; 0'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Total Charge'
              },
              value: {
                html: '&pound; 66'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Is total charge covered by benefits?'
              },
              value: {
                html: 'Yes'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
          ],
          property: [
            {
              key: {
                text: 'Property Reference'
              },
              value: {
                html: 'PT238500'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Void date'
              },
              value: {
                html: '14 December 2020'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Major Repairs date'
              },
              value: {
                html: 'N/A'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Number of times let previously offered'
              },
              value: {
                html: '1'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Number of Bedrooms'
              },
              value: {
                html: '1'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Type of Unit'
              },
              value: {
                html: 'Flat / Maisonette'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Type of Building'
              },
              value: {
                html: 'Purpose Built'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Adapted for wheelchair'
              },
              value: {
                html: 'No'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Property previously let under'
              },
              value: {
                html: 'A social rent basis'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Reason for Vacancy'
              },
              value: {
                html: 'First let of leased property'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Property LA'
              },
              value: {
                html: 'Coventry (E08000026)'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },
            {
              key: {
                text: 'Property Postcode'
              },
              value: {
                html: 'CV6 2KP'
              },
              actions: {
                items: [
                  {
                    href: '#',
                    text: 'Change',
                    visuallyHiddenText: 'contact details'
                  }
                ]
              }
            },

          ]
        }
      }
    }
  }
}
