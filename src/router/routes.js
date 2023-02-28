
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue') },
      {path : 'Document', component: ()=> import('pages/DocumentBuilderPage.vue')},
      {path : 'Indicator', component: ()=> import('pages/IndicatorBuilderPage.vue')},
      {path : 'DataSource', component: ()=> import('pages/SourceDataBuilderPage.vue')},
      {path : 'Question', component: ()=> import('pages/QuestionBuilderPage.vue')},
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
