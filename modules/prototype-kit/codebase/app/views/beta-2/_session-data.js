module.exports = {
  sections: [
    {
      id: 'characteristics',
      title: 'Household characteristics',
      group: 'household',
      tag: 'notstarted',
      firstPage: 'tenant-code'
    },
    {
      id: 'situation',
      title: 'Household situation',
      group: 'household',
      tag: 'notstarted',
      firstPage: 'previous-housing-situation'
    },
    {
      id: 'needs',
      title: 'Household needs',
      group: 'household',
      tag: 'notstarted',
      firstPage: 'armed-forces'
    },
    {
      id: 'information',
      title: 'Tenancy information',
      tag: 'notstarted',
      group: 'tenancy',
      firstPage: 'start-date'
    },
    {
      id: 'property',
      title: 'Property information',
      tag: 'notstarted',
      group: 'tenancy'
    },
    {
      id: 'income-and-benefits',
      title: 'Income and benefits',
      group: 'rent-and-charges',
      tag: 'notstarted'
    },
    {
      id: 'rent',
      title: 'Rent',
      group: 'rent-and-charges',
      tag: 'notstarted'
    },
    {
      id: 'local-authority',
      title: 'Local authority',
      group: 'local-authority',
      tag: 'notstarted'
    },
    {
      id: 'declaration',
      title: 'Declaration',
      group: 'submission',
      tag: 'cannotstart'
    }
  ],
  groups: [
    {
      id: 'household',
      title: 'About the household'
    },
    {
      id: 'tenancy',
      title: 'Tenancy and property information'
    },
    {
      id: 'rent-and-charges',
      title: 'Rent and charges'
    },
    {
      id: 'local-authority',
      title: 'Local authority'
    },
    {
      id: 'submission',
      title: 'Submission'
    }
  ],
  tags: [
    {
      id: 'cannotstart',
      title: 'Cannot start yet',
      color: 'grey'
    },
    {
      id: 'notstarted',
      title: 'Not started',
      color: 'grey'
    },
    {
      id: 'inprogress',
      title: 'In progress',
      color: 'blue'
    },
    {
      id: 'completed',
      title: 'Completed',
      color: ''
    }
  ],
  radios: {
    'yes-no': require('./_radios/yes-no.js'),
    'yes-no-dunno': require('./_radios/yes-no-dunno.js'),
    'yes-no-only': require('./_radios/yes-no-only.js'),
    'gender': require('./_radios/gender.js'),
    'ethnic-group': require('./_radios/ethnic-group.js'),
    'nationality': require('./_radios/nationality.js'),
    'economic-status': require('./_radios/economic-status.js'),
    'housing-situation': require('./_radios/housing-situation.js'),
    'homelessness': require('./_radios/homelessness.js'),
    'reasons-for-leaving': require('./_radios/reasons-for-leaving.js'),
    'reasons-for-leaving-benefits-cap': require('./_radios/reasons-for-leaving-benefit-cap.js'),
    'armed-forces': require('./_radios/armed-forces.js'),
    'armed-forces-service-length': require('./_radios/armed-forces-service-length.js'),
    'armed-forces-spouse': require('./_radios/armed-forces-spouse.js'),
    'type-of-tenancy': require('./_radios/type-of-tenancy.js'),
    'sale-or-letting': require('./_radios/sale-or-letting.js'),
    'letting-rent-type': require('./_radios/letting-rent-type.js'),
    'letting-need-type': require('./_radios/letting-need-type.js')
  },
  checkboxes: {
    'disability-needs': require('./_checkboxes/disability-needs.js')
  }
}
