<template>
    <q-card v-for="(category, categoryIndex) in categories" flat bordered>
        <q-card-section>
            <div class="text-h6">{{category.name}}</div>
        </q-card-section>
    </q-card>
</template>

<script>
export default defineComponent({
    name: "QuestionCategories",
})
</script>

<style lang="scss" scoped></style>