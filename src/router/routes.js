
const routes = [
  {
    path: '/builders',
    component: () => import('layouts/BuilderLayout.vue'),
    children: [
      {path : 'Document', component: ()=> import('pages/DocumentBuilderPage.vue')},
      {path : 'Indicator', component: ()=> import('pages/IndicatorBuilderPage.vue')},
      {path : 'DataSource', component: ()=> import('pages/SourceDataBuilderPage.vue')},
      {path : 'Question', component: ()=> import('pages/QuestionBuilderPage.vue')},
      {path : 'Axis', component: ()=> import('pages/AxisBuilderPage.vue')}
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
