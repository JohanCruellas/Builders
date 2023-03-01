import { boot } from 'quasar/wrappers'


export default boot(({app}) => {
  app.config.globalProperties.$getTrad = (objectText, localLanguage) => {
    const fallback = ["enUS", "frFR"];
    if (typeof objectText === "object") {
      let currentLocale = Object.entries(objectText).find(([key, value]) => {
        return key === localLanguage;
      });

      if (!currentLocale) {
        currentLocale = Object.entries(objectText).find(([key, value]) => {
          let fallbackLanguage = fallback.some((fb) => {
            return key == fb;
          });
          return fallbackLanguage;
        });
      }

      return currentLocale[1];
    } else {
      return "";
    }
  };
})
