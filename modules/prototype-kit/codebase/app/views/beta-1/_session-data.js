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
      tag: 'notstarted'
    },
    {
      id: 'needs',
      title: 'Household needs',
      group: 'household',
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
  questions: {
    'ethnic-group': [
      {
        value: 'white-british',
        text: 'White - English, Scottish, Welsh, Northen Irish or British'
      },
      {
        value: 'white-irish',
        text: 'White - Irish'
      },
      {
        value: 'white-gypsy',
        text: 'White - Gypsy or Irish Traveller'
      },
      {
        value: 'white-other',
        text: 'White - other'
      },
      {
        value: 'asian-indian',
        text: 'Asian or Asian British - Indian'
      },
      {
        value: 'asian-pakistani',
        text: 'Asian or Asian British - Pakistani'
      },
      {
        value: 'asian-bangladeshi',
        text: 'Asian or Asian British - Bangladeshi'
      },
      {
        value: 'asian-chinese',
        text: 'Asian or Asian British - Chinese'
      },
      {
        value: 'asian-other',
        text: 'Asian or Asian British - other'
      },
      {
        value: 'black-caribien',
        text: 'Black - Caribbean'
      }
    ]
  }
}