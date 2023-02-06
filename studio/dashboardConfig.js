export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          // {
          //   name: 'netlify',
          //   options: {
          //     description:
          //       'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
          //     sites: [
          //       {
          //         buildHookId: '60f7cf72f25669cefd2e8316',
          //         title: 'Sanity Studio',
          //         name: 'condescending-jones-5d6ed3',
          //         apiId: 'cbf979ab-671d-468a-b6e7-1de383d7ccf3',
          //       },
          //       // {
          //       //   buildHookId: '60f7cf2c19c4fec77b99829d',
          //       //   title: 'Landing pages Website',
          //       //   name: 'reverent-bhaskara-aec63c',
          //       //   apiId: 'bfeed57e-0ab3-494f-a304-68af3b10fbc6'
          //       // }
          //     ],
          //   },
          //   layout: {
          //     width: 'medium', // full width is recommended!
          //   },
          // },
          {
            name: 'vercel',
            layout: {
              width: 'medium', // full width is recommended!
            },
          },
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/pasha-z25/mite',
            category: 'Code',
          },
          { title: 'Frontend', value: 'https://mite-fawn.vercel.app/', category: 'apps' },
        ],
      },
      layout: { width: 'medium' },
    },
    // {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: { title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page'] },
      layout: { width: 'medium' }, // medium width is recommended!
    },
  ],
}
