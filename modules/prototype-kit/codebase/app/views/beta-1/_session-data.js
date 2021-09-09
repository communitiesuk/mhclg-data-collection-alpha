module.exports = {
  'groups': [
    {
      id: 'household',
      title: 'About the household',
      sections: [
        {
          id: 'household-characteristics',
          title: 'Household characteristics',
          tag: 'notstarted',
          firstPage: 'tenant-code'
        },
        {
          id: 'household-situation',
          title: 'Household situation',
          tag: 'notstarted'
        },
        {
          id: 'household-needs',
          title: 'Household needs',
          tag: 'notstarted'
        }
      ]
    },
    {
      id: 'submission',
      title: 'Submission',
      sections: [
        {
          id: 'decloration',
          title: 'Decloration',
          tag: 'cannotstart'
        }
      ] 
    }
  ],
  'tags': [
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
  ]
}