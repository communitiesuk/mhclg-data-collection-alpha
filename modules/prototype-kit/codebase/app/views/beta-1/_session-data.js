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
  'groups': [
    {
      id: 'household',
      title: 'About the household'
    },
    {
      id: 'submission',
      title: 'Submission'
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