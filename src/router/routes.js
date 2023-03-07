
const routes = [
  {
    path: '/builders',
    component: () => import('layouts/BuilderLayout.vue'),
    children: [
      {path : 'Document', name: "DocBuilder", component: ()=> import('pages/DocumentBuilderPage.vue')},
      {path : 'Indicator', name: "IndicatorBuilder", component: ()=> import('pages/IndicatorBuilderPage.vue')},
      {path : 'DataSource', name: "DataSourceBuilder", component: ()=> import('pages/SourceDataBuilderPage.vue')},
      {path : 'Question', name: "QuestionsBuilder", component: ()=> import('src/pages/QuestionsBuilderPage.vue')},
    ]
  },
  {
    path:'/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue') },
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
