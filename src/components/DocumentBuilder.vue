<template>
    <div class="q-pa-md q-gutter-sm">
        <q-editor v-model="editor" min-height="5rem" class="editor" />
    </div>
</template>

<script>

export default {
    data() {
        return {
            editor: '',
        }
    }
}
</script>

<style lang="scss" scoped>
.editor {
    background-color: lightgray;
}
</style>