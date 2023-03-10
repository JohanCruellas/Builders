import { boot } from 'quasar/wrappers'
import { useGlobalStore } from "../stores/globalStore.js";


export default boot(({ app }) => {
  //A voir si nécessaire
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
  app.config.globalProperties.$openModal = (object) => {
    
    app.config.globalProperties.$store.modal = true;
    app.config.globalProperties.$store.key = object.key;
    app.config.globalProperties.$store.tooltip = object.tooltip;
    app.config.globalProperties.$store.type = object.type;
    app.config.globalProperties.$store.input = object.input;
  }
  app.config.globalProperties.$store = useGlobalStore()


})
