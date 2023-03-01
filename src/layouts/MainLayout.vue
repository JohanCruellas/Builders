<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-select
      v-model="lang"
      :options="langOptions"
      label="Quasar Language"
      filled
      dense
      borderless
      emit-value
      map-options
      options-dense
      style="min-width: 150px"
      class="language fixed-right"
    />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "MainLayout",
    data() {
    return {
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
})
</script>

<style scoped>
.language {
  margin: 1em; 
  z-index: 1
}
</style>