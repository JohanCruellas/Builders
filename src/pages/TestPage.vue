<template>
    <ejs-documenteditorcontainer ref="docEditorContainer" :documentEditorSettings='settings' :serviceUrl='serviceUrl' :enableToolbar='true' @beforeCommentAction="debounce"> </ejs-documenteditorcontainer>
</template>
  
<script>
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-vue-documenteditor';
import { defineComponent } from 'vue';


//Component registeration
export default defineComponent({
    name: 'DocPage',
    components: {
        // Declaring component
        'ejs-documenteditorcontainer': DocumentEditorContainerComponent
    },
    data() {
        return {
            serviceUrl: 'http://192.168.1.35:6002/api/documenteditor/',
            settings:{ enableOptimizedTextMeasuring : false}
        };
    },
    provide: {
        DocumentEditorContainer: [Toolbar]
    },
    methods: {
        debounce(event) {
            console.log(event)
            console.log(this.$refs.docEditorContainer)
            event.preventDefaultAction = true;
            // this.$refs.docEditorContainer.contentChange(event);
        }
    }
})
</script>
  
<style>

</style>