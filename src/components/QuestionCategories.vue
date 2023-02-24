<template>
    <q-card>
        <q-tabs v-model="tabIndex" dense class="text-grey tabsColor" active-color="primary" indicator-color="primary"
            align="justify" narrow-indicator>
            <q-tab v-for="(category, categoryIndex) in categories" :key="categoryIndex" :name="categoryIndex"
                :label="category.name" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tabIndex" animated>
            <q-tab-panel v-for="(category, categoryIndex) in categories" :key="categoryIndex" :name="categoryIndex"
                class="tabsColorWashed">


                <!-- <div v-if="category.children.length === 0">
                    <QuestionBuilder :category-data="category"></QuestionBuilder>
                </div> -->
                <q-card class="subcategoryCard" v-for="(subcategory, subcategoryIndex) in category.children"
                    :key="subcategoryIndex">
                    <q-expansion-item expand-icon-toggle switch-toggle-side>
                        <template v-slot:header>
                            <q-input class="cardInput" lazy-rules :placeholder="'Subcategory ' + (subcategoryIndex + 1)"
                                v-model=subcategory.name :dense="true">
                                <template v-slot:append>
                                    <q-icon name="close" @click="removeSubcategory(subcategoryIndex)"
                                        class="cursor-pointer" />
                                </template>
                            </q-input>
                        </template>
                        <QuestionBuilder :category-data="subcategory"></QuestionBuilder>
                    </q-expansion-item>
                </q-card>
            </q-tab-panel>
        </q-tab-panels>
        <q-card-actions align="center">
            <q-btn push class="cardActionBtn" color="primary" label="Add Subcategory" @click="addSubcategory" />
            <!-- <q-btn push class="cardActionBtn" color="primary" label="Add Question" @click="addQuestion" /> -->
            <q-btn push class="cardActionBtn" color="primary" label="Save" @click="toJSON" />
        </q-card-actions>
    </q-card>

    <!-- <q-card v-for="(category, categoryIndex) in categories" :key="categoryIndex" flat bordered>
        <q-card-section>
            <div class="text-h6">{{ category.name }} / {{ categoryIndex }}</div>
            <QuestionBuilder></QuestionBuilder>
        </q-card-section>
    </q-card> -->
    <!-- <q-card dark bordered class="bg-grey-9 my-card">
        <q-card-section>
            <div class="text-h6">JSON Output</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
            <pre>{{ JSONData }}</pre>
        </q-card-section>
    </q-card> -->
</template>

<script>
import { useTemplateStore } from "src/stores/templateStore";
import { QuestionCategory } from "src/classes/questionCategory";
import { defineComponent } from "vue";
import QuestionBuilder from './QuestionBuilder.vue';
import { storeToRefs } from "pinia";

const templateStore = useTemplateStore()
// const { questionsTemplate } = storeToRefs(templateStore)

export default defineComponent({
    name: "QuestionCategories",
    computed: {
        tabBgColor() {
            return templateStore.questionsTemplate.categories[this.tabIndex].color;
        }
    },
    methods: {
        addSubcategory() {
            this.categories[this.tabIndex].children.push(new QuestionCategory("", "", this.categories[this.tabIndex].color));
        },
        removeSubcategory(subcategoryIndex) {

        },
        toJSON() {
            templateStore.questionsTemplate.categories.forEach((category) => {
                category.questions.forEach((question) => {
                    delete question.isShown;
                })
            })
            this.JSONData = JSON.stringify(templateStore.questionsTemplate, null, 2)
        }
    },
    data() {
        return {
            categories: templateStore.questionsTemplate.categories,
            tabIndex: 0,
            JSONData: ""
        };
    },
    mounted() {
    },
    components: { QuestionBuilder }
})
</script>

<style lang="scss" scoped>
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