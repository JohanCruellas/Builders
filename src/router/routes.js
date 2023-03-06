
const routes = [
  {
    path: '/builders',
    component: () => import('layouts/BuilderLayout.vue'),
    children: [
      {path : 'Document', name: "DocBuilder", component: ()=> import('pages/DocumentBuilderPage.vue')},
      {path : 'Indicator', name: "IndicatorBuilder", component: ()=> import('pages/IndicatorBuilderPage.vue')},
      {path : 'DataSource', name: "DataSourceBuilder", component: ()=> import('pages/SourceDataBuilderPage.vue')},
      {path : 'Question', name: "QuestionBuilder", component: ()=> import('pages/QuestionBuilderPage.vue')},
    ]
  },
  {
    path:'/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue') },
    ] 
  },
  {
    path: '/account',
    component: () => import('layouts/MainLayout.vue'),
    children : [
      {path: 'userAccount', name: "userAccount", component: () => import('pages/AccountPage.vue')},
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
