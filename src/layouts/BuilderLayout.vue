<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="flex justify-between">
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title align="center"> 
          <h1 class="appTitle">CaSpR</h1>
        </q-toolbar-title>
        <q-select
      v-model="lang"
      :options="langOptions"
      label="Quasar Language"
      bg-color="white"
      filled
      dense
      borderless
      emit-value
      map-options
      options-dense
      
    />
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/builders/DataSource" :label="$t('sourceDataTab')" />
        <q-route-tab to="/builders/Indicator" :label="$t('indicatorTab')" />
        <q-route-tab to="/builders/Question" :label="$t('questionTab')" />
        <q-route-tab to="/builders/Document" :label="$t('documentTab')" />
      </q-tabs>

      
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="q-my-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BuilderLayout",
  data() {
    return {
      left: false,
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
    },
  },
});
</script>

<style scoped>
.appTitle {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0;
}
.language {
  margin: 1em; 
  z-index: 1;
}
</style>