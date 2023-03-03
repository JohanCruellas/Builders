<template>
      <div class="q-pa-md q-gutter-sm">
    <q-tree
      :nodes="treeNodes"
      node-key="label"
    />
  </div>
    <!-- <q-card>
        <q-tabs v-model="tabIndex" dense class="text-grey tabsColor" active-color="primary" indicator-color="primary"
            align="justify" narrow-indicator>
            <q-tab v-for="(category, categoryIndex) in categories" :key="categoryIndex" :name="categoryIndex"
                :label="category.name" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tabIndex" animated>
            <q-tab-panel v-for="(category, categoryIndex) in categories" :key="categoryIndex" :name="categoryIndex"
                class="tabsColorWashed">
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
                    </q-expansion-item>
                </q-card>
            </q-tab-panel>
        </q-tab-panels>
        <q-card-actions align="center">
            <q-btn push class="cardActionBtn" color="primary" label="Add Subcategory" @click="addSubcategory" />
            <q-btn push class="cardActionBtn" color="primary" label="Save" @click="toJSON" />
        </q-card-actions>
    </q-card> -->
</template>

<script>
import { useTemplateStore } from "src/stores/templateStore";
// import { QuestionCategory } from "src/classes/question_category";
import { defineComponent } from "vue";

const templateStore = useTemplateStore()

export default defineComponent({
    name: "AxisBuilder",
    computed: {
        tabBgColor() {
            return templateStore.templateQuestions.categories[this.tabIndex].color;
        }
    },
    data() {
        return {
            categories: templateStore.templateQuestions.categories,
            tabIndex: 0,
            JSONData: "",
            treeNodes: [

            ]
        };
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

    mounted() {
    }
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
}

.subcategoryCard {
    margin: 0 0 10px 0;
}
</style>