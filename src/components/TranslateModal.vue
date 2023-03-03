<template>

  <Teleport to="body">
    <q-dialog v-model="this.$store.modal" persistent>
      <q-card class="modal">
        <q-card-section v-for="(lang, key, index) in this.translations" :key="index" class="flex justify-between">
          <q-input type="text" :label="key.slice(0, 2)" v-model="translations[key]" class="translateInput"></q-input>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat :label="$t('closeBtn')" v-close-popup /> <!-- @click="closeModal"-->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </Teleport>
</template>

<script>
import { defineComponent } from "vue";
import { useTemplateStore } from "src/stores/templateStore";
const templateStore = useTemplateStore();

export default defineComponent({
  data() {
    return {
      modal: true,
      persistent: false,
      store: '',
      translations: {},
    };
  },
  // methods: {
  //   closeModal() {
  //     console.log(this.translations)
  //   },
  // },
  computed: {
    open() {
      return this.$store.modal;
    },
  },
  watch: {
    'open': {
      handler: function() {
        switch (this.$store.type) {
        case 'indicators':
          this.store = templateStore.indicatorsTemplate.indicators;
          break;
        case 'sourceData':
          this.store = templateStore.sourceDataTemplate.categories;
          break;
      }

      switch (this.$store.input) {
        case 'text':
          this.translations = this.store[this.$store.index].text;
          break;
        case 'tooltip':
          this.translations = this.store[this.$store.index].info;
          break;
          case 'select':
          this.translations = this.store[this.$store.index].type;
          break;
      }
      
      }, deep: true}
  },
 
});
</script>

<style lang="scss" scoped>
.modal {
    width: 100%
}

.translateInput {
    width: 70%
}
</style>
