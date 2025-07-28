const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: '0',
          title: 'Sub Admin',
          type: 'item',
          icon: 'feather icon-home',
          url: '/masters/subAdmin'
        },
        {
          id: '1',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/'
          // url: '/app/dashboard/default'
        },
        {
          id: '2',
          title: 'Users',
          type: 'item',
          icon: 'feather icon-user',
          url: '/masters/users'
        },

        {
          id: 'masters',
          title: 'Masters',
          type: 'collapse',
          icon: 'feather icon-settings',
          children: [
            {
              id: '3',
              title: 'City',
              type: 'item',
              url: '/masters/city',
              icon: 'feather icon-home'
            },
            {
              id: '4',
              title: 'State',
              type: 'item',
              url: '/masters/state',
              icon: 'feather icon-home'
            },
            {
              id: '5',
              title: 'Country',
              type: 'item',
              url: '/masters/country',
              icon: 'feather icon-home'
            },
            {
              id: '6',
              title: 'Education',
              type: 'item',
              url: '/masters/education',
              icon: 'feather icon-book'
            },
            {
              id: '7',
              title: 'Interest',
              type: 'item',
              url: '/masters/interest',
              icon: 'feather icon-trending-up'
            },
            {
              id: '8',
              title: 'Language',
              type: 'item',
              url: '/masters/language',
              icon: 'feather icon-globe'
            },
            {
              id: '9',
              title: 'Skill Category',
              type: 'item',
              url: '/masters/skillsCategory',
              icon: 'feather icon-settings'
            },
            {
              id: '10',
              title: 'Skills',
              type: 'item',
              url: '/masters/skills',
              icon: 'feather icon-settings'
            },
            {
              id: '11',
              title: 'University',
              type: 'item',
              url: '/masters/university',
              icon: 'feather icon-home'
            },
            {
              id: '12',
              title: 'Trade Type',
              type: 'item',
              url: '/masters/TradeType',
              icon: 'feather icon-list'
            },
            {
              id: '13',
              title: 'Trade Type Category',
              type: 'item',
              url: '/masters/CatTradeType',
              icon: 'feather icon-list'
            },
            {
              id: '14',
              title: 'Report',
              type: 'item',
              url: '/report',
              icon: 'feather icon-file-text'
            },
            {
              id: '15',
              title: 'Badge',
              type: 'item',
              url: '/badge',
              icon: 'feather icon-award'
            },
            {
              id: '24',
              title: 'Test',
              type: 'item',
              url: '/test',
              icon: 'feather icon-award'
            }
          ]
        },
        {
          id: 'ai',
          title: 'AI',
          type: 'collapse',
          icon: 'feather icon-cpu',
          children: [
            {
              id: '16',
              title: 'AI Entries',
              type: 'item',
              url: '/AI/all-entry',
              icon: 'feather icon-list'
            }
          ]
        },
        {
          id: 'transaction',
          title: 'Transaction',
          type: 'collapse',
          icon: 'feather icon-refresh-cw',
          children: [
            {
              id: '17',
              title: 'Transaction',
              type: 'item',
              url: '/tansaction',
              icon: 'feather icon-refresh-cw'
            },
            {
              id: '18',
              title: 'Bank Details',
              type: 'item',
              url: '/bankdetails',
              icon: 'feather icon-home'
            },
            {
              id: '19',
              title: 'Project Milestones',
              type: 'item',
              url: '/projectwisepayment',
              icon: 'feather icon-home'
            }
          ]
        },
        {
          id: '20',
          title: 'Project List',
          type: 'item',
          url: '/project',
          icon: 'feather icon-list'
        },
        {
          id: '21',
          title: 'Issue Report',
          type: 'item',
          url: '/issuereport',
          icon: 'feather icon-file-text'
        },
        {
          id: '22',
          title: 'User Badge Request',
          type: 'item',
          url: '/badgerequest',
          icon: 'feather icon-award'
        },
        {
          id: '23',
          title: 'Settings',
          type: 'item',
          url: '/setting',
          icon: 'feather icon-settings'
        },
        {
          id: '24',
          title: 'LeaderBoard',
          type: 'item',
          icon: 'feather icon-user',
          url: '/masters/LeaderBoard'
        },
      ]
    }
  ]
};

// const ids =['5','8'];
// export const getSelectedItems = (ids = []) => {
//   const filterItems = (items) => {
//     return items
//       .map((item) => {
//         if (ids.includes(item.id)) {
//           return { ...item, children: item.children ? filterItems(item.children) : [] };
//         } else if (item.children) {
//           const filteredChildren = filterItems(item.children);
//           if (filteredChildren.length) {
//             return { ...item, children: filteredChildren };
//           }
//         }
//         return null;
//       })
//       .filter(Boolean);
//   };
//   const filteredMenu = filterItems(menuItems.items);
//   return { items: filteredMenu.length ? [{ ...menuItems.items[0], children: filteredMenu }] : [] };
// };

export default menuItems;
// {
//   id: 'Trade Type Sub-Category',
//   title: 'Trade Type Sub-Category',
//   type: 'item',
//   url: '/masters/SubCatTradeType'
// }
//----------------------
// {
//   id: 'ui-element',
//   title: 'UI ELEMENT',
//   type: 'group',
//   icon: 'icon-ui',
//   children: [
//     {
//       id: 'component',
//       title: 'Component',
//       type: 'collapse',
//       icon: 'feather icon-box',
//       children: [
//         {
//           id: 'button',
//           title: 'Button',
//           type: 'item',
//           url: '/basic/button'
//         },
//         {
//           id: 'badges',
//           title: 'Badges',
//           type: 'item',
//           url: '/basic/badges'
//         },
//         {
//           id: 'breadcrumb',
//           title: 'Breadcrumb',
//           type: 'item',
//           url: '/basic/breadcrumb'
//         },
//         {
//           id: 'pagination',
//           title: 'Pagination',
//           type: 'item',
//           url: '/basic/pagination'
//         },
//         {
//           id: 'collapse',
//           title: 'Collapse',
//           type: 'item',
//           url: '/basic/collapse'
//         },
//         {
//           id: 'tabs-pills',
//           title: 'Tabs & Pills',
//           type: 'item',
//           url: '/basic/tabs-pills'
//         },
//         {
//           id: 'typography',
//           title: 'Typography',
//           type: 'item',
//           url: '/basic/typography'
//         }
//       ]
//     }
//   ]
// }
// {
//   id: 'ui-forms',
//   title: 'FORMS & TABLES',
//   type: 'group',
//   icon: 'icon-group',
//   children: [
//     {
//       id: 'forms',
//       title: 'Form Elements',
//       type: 'item',
//       icon: 'feather icon-file-text',
//       url: '/forms/form-basic'
//     },
//     {
//       id: 'table',
//       title: 'Table',
//       type: 'item',
//       icon: 'feather icon-server',
//       url: '/tables/bootstrap'
//     }
//   ]
// },
// {
//   id: 'chart',
//   title: 'Chart & Maps',
//   type: 'group',
//   icon: 'icon-charts',
//   children: [
//     {
//       id: 'charts',
//       title: 'Charts',
//       type: 'item',
//       icon: 'feather icon-pie-chart',
//       url: '/charts/nvd3'
//     }
//     // {
//     //   id: 'maps',
//     //   title: 'Maps',
//     //   type: 'item',
//     //   icon: 'feather icon-map',
//     //   url: '/maps/google-map'
//     // }
//   ]
// }
// {
//   id: 'pages',
//   title: 'Pages',
//   type: 'group',
//   icon: 'icon-pages',
//   children: [
//     {
//       id: 'auth',
//       title: 'Authentication',
//       type: 'collapse',
//       icon: 'feather icon-lock',
//       badge: {
//         title: 'New',
//         type: 'label-danger'
//       },
//       children: [
//         {
//           id: 'signup-1',
//           title: 'Sign up',
//           type: 'item',
//           url: '/auth/signup-1',
//           target: true,
//           breadcrumbs: false
//         },
//         {
//           id: 'signin-1',
//           title: 'Sign in',
//           type: 'item',
//           url: '/auth/signin-1',
//           target: true,
//           breadcrumbs: false
//         }
//       ]
//     },
//     {
//       id: 'sample-page',
//       title: 'Sample Page',
//       type: 'item',
//       url: '/sample-page',
//       classes: 'nav-item',
//       icon: 'feather icon-sidebar'
//     },
//     {
//       id: 'documentation',
//       title: 'Documentation',
//       type: 'item',
//       icon: 'feather icon-book',
//       classes: 'nav-item',
//       url: 'https://codedthemes.gitbook.io/datta/',
//       target: true,
//       external: true
//     },
//     {
//       id: 'menu-level',
//       title: 'Menu Levels',
//       type: 'collapse',
//       icon: 'feather icon-menu',
//       children: [
//         {
//           id: 'menu-level-1.1',
//           title: 'Menu Level 1.1',
//           type: 'item',
//           url: '#!'
//         },
//         {
//           id: 'menu-level-1.2',
//           title: 'Menu Level 2.2',
//           type: 'collapse',
//           children: [
//             {
//               id: 'menu-level-2.1',
//               title: 'Menu Level 2.1',
//               type: 'item',
//               url: '#'
//             },
//             {
//               id: 'menu-level-2.2',
//               title: 'Menu Level 2.2',
//               type: 'collapse',
//               children: [
//                 {
//                   id: 'menu-level-3.1',
//                   title: 'Menu Level 3.1',
//                   type: 'item',
//                   url: '#'
//                 },
//                 {
//                   id: 'menu-level-3.2',
//                   title: 'Menu Level 3.2',
//                   type: 'item',
//                   url: '#'
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       id: 'disabled-menu',
//       title: 'Disabled Menu',
//       type: 'item',
//       url: '#',
//       classes: 'nav-item disabled',
//       icon: 'feather icon-power'
//     }
//   ]
// }
