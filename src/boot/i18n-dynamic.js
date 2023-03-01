import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.config.globalProperties.$APP_NAME = 'The name of your app';
})