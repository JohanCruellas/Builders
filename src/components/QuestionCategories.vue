<template>
    <q-card>
        <q-tabs v-model="tabIndex" dense class="text-grey tabs" active-color="primary" indicator-color="primary"
            align="justify" narrow-indicator>
            <q-tab v-for="(category, categoryIndex) in categories" :key="categoryIndex" :name="categoryIndex"
                :label="category.name" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tabIndex" animated>
            <q-tab-panel v-for="(category, categoryIndex) in categories" :key="categoryIndex" :name="categoryIndex">
                <QuestionBuilder :category-data="category"></QuestionBuilder>
            </q-tab-panel>
        </q-tab-panels>
        <q-card-actions align="center">
            <q-btn push class="cardActionBtn" color="primary" label="Add Question" @click="addQuestion" />
            <!-- <q-btn push color="primary" label="ConsoleLog" @click="consoleLog" /> -->
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
import { Question } from '../classes/question.js'
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
        addQuestion() {
            templateStore.questionsTemplate.categories[this.tabIndex].questions.push(new Question(/*`Question ${this.questions.length + 1}`*/))
            // console.log(questionsTemplate.categories)
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
.tabs {
    background-color: v-bind(tabBgColor);
}
</style>