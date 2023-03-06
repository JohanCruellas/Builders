<template>
  <q-page class="flex flex-center">
    
    <q-select
      v-model="lang"
      :options="langOptions"
      :label="$t('lang')"
      bg-color="white"
      filled
      dense
      borderless
      emit-value
      map-options
      options-dense
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountPage",
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
});
</script>

<style lang="scss" scoped></style>
