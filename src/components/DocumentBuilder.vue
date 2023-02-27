<template>
    <!-- <div class="q-pa-md q-gutter-sm"> -->
        <q-editor v-model="editor" class="editor" />
    <!-- </div> -->
</template>

<script>
import { useTemplateStore } from "src/stores/templateStore";
import { defineComponent } from "vue";
const templateStore = useTemplateStore()


export default defineComponent({
    data() {
        return {
            editor: '',
            indicators: [
                {
                    text: "Pourcentage de femmes dans l'entreprise",
                    formula: "{{#data:d0128a84-8e36-4db4-af91-981bb85aeb60}} / {{d0128a84-8e36-4db4-af91-981bb85aeb61}} * 100"
                },
                {
                    text: "Pourcentage de femmes dans l'entreprise",
                    formula: "{{#data:d0128a84-8e36-4db4-af91-981bb85aeb60}} / {{d0128a84-8e36-4db4-af91-981bb85aeb61}} * 100"
                },
                {
                    text: "Pourcentage de femmes dans l'entreprise",
                    formula: "{{#data:d0128a84-8e36-4db4-af91-981bb85aeb60}} / {{d0128a84-8e36-4db4-af91-981bb85aeb61}} * 100"
                },
                {
                    text: "Pourcentage de femmes dans l'entreprise",
                    formula: "{{#data:d0128a84-8e36-4db4-af91-981bb85aeb60}} / {{d0128a84-8e36-4db4-af91-981bb85aeb61}} * 100"
                },
            ]
        }
    },
    methods: {
        log() {
            console.log(this.sourceDatas)
        }
    }
})
</script>

<style lang="scss" scoped>
.editor {
    // background-color: lightgray;
    width: 100%;
    min-height: 90vh;
}
</style>