<template>
  <q-page class="flex column flex-center">
    <h1>{{ $t('accountSettingsTitle') }}</h1>
    <div class="settings">
      <div class="lang">
        <label>{{ $t('langSwitcherLabel') }}</label>
        <div class="langSettings">
          <q-icon name="language" size="2em"></q-icon>
          <q-select
            v-model="lang"
            :options="langOptions"
            :label="$t('lang')"
            filled
            dense
            borderless
            emit-value
            map-options
            options-dense
            class="langSwitcher"
          />
        </div>
      </div>
      <div class="darkTheme">
        <label>{{ $t('themeLabel') }}</label>
        <div class="">
          <q-icon name="dark_mode" size="2em"></q-icon>
        <q-toggle v-model="theme" @click="$q.dark.toggle()"
          >{{ $t('darkTheme') }}</q-toggle
        >
        </div>
        
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "settingsPage",
  data() {
    return {
      theme: this.$q.dark.isActive,
      lang: this.$i18n.locale,
      langOptions: [
        { value: "enUS", label: "English" },
        { value: "frFR", label: "Français" },
      ],
    };
  },

  watch: {
    lang(lang) {
      this.$i18n.locale = lang;
      this.$store.lang = lang;
      console.log(this.$store.lang);
    },
    theme(val) {
      if (val) {
        // mettre ajustement couleur
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  height: 80vh;
  width: 80vw;
  // background-color: lightblue;
}

.lang, .darkTheme {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  width: 100%;
}

.langSettings {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
}

.langSwitcher {
  width: 20%;
}
</style>
