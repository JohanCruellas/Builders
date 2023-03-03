<template>
    <q-card class="catCard">
        <q-tabs v-model="tabIndex" dense class="text-grey tabsColor" active-color="primary" indicator-color="primary"
            align="justify" narrow-indicator>
            <q-tab v-for="(category, categoryIndex) in categories" :key="categoryIndex" :name="categoryIndex"
                :label="category.label" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tabIndex" animated class="tab">
            <q-tab-panel v-for="(category, categoryIndex) in categories" :key="categoryIndex" :name="categoryIndex"
                class="tabsColorWashed">
                <q-card class="subcategoryCard" v-for="(subcategory, subcategoryIndex) in category.stakes"
                    :key="subcategoryIndex">
                    <q-expansion-item expand-icon-toggle switch-toggle-side>
                        <template v-slot:header>
                            <q-item class="cardInput" dense>
                                <q-item-section>{{ subcategory.label }}</q-item-section>
                                <!-- <template v-slot:append>
                                    <q-icon name="close" @click="removeSubcategory(subcategoryIndex)"
                                        class="cursor-pointer" />
                                </template> -->
                            </q-item>
                        </template>
                        <QuestionBuilder :category-data="subcategory"></QuestionBuilder>
                    </q-expansion-item>
                </q-card>
            </q-tab-panel>
        </q-tab-panels>
        <q-card-actions align="center">
            <!-- <q-btn push class="cardActionBtn" color="primary" label="Add Subcategory" @click="addSubcategory" /> -->
            <!-- <q-btn push class="cardActionBtn" color="primary" label="Add Question" @click="addQuestion" /> -->
            <q-btn push class="cardActionBtn" color="primary" label="Save" @click="toJSON" />
        </q-card-actions>
    </q-card>
</template>

<script>
import { useTemplateStore } from "src/stores/templateStore";
import { QuestionCategory } from "src/classes/question_category";
import { defineComponent } from "vue";
import QuestionBuilder from './QuestionBuilder.vue';

const templateStore = useTemplateStore()
// const { templateQuestions } = storeToRefs(templateStore)

export default defineComponent({
    name: "QuestionCategories",
    computed: {
        tabBgColor() {
            return templateStore.templateQuestions.categories[this.tabIndex].color;
        }
    },
    methods: {
        addSubcategory() {
            this.categories[this.tabIndex].children.push(new QuestionCategory("", "", this.categories[this.tabIndex].color));
        },
        removeSubcategory(subcategoryIndex) {

        },
        toJSON() {
            templateStore.templateQuestions.categories.forEach((category) => {
                category.questions.forEach((question) => {
                    delete question.isShown;
                })
            })
            this.JSONData = JSON.stringify(templateStore.templateQuestions, null, 2)
        }
    },
    data() {
        return {
            categories: templateStore.templateAxis.categories,
            tabIndex: 0,
            JSONData: ""
        };
    },
    props: ['selectedNodes'],
    components: { QuestionBuilder }
})
</script>

<style lang="scss" scoped>
.catCard {
    width: 100%;
    margin : 5px;
}

.tab {
    min-height: 75vh;
}
.tabsColor {
    background-color: v-bind(tabBgColor);
}

.tabsColorWashed {
    background-color: v-bind(tabBgColor);
}

.cardInput {
    width: 100%;
    // max-width: fit-content;
}

.subcategoryCard {
    margin: 0 0 10px 0;
}
</style>