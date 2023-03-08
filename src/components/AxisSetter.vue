<template>
    <q-card v-for="(axis, axisIndex) in axisTemplate" :key="axisIndex" :name="axisIndex" class="catCard"
        :style="{ backgroundColor: axis.color }">
        <q-card-section>
            <div class="text-h6">{{ axis.label }}</div>
        </q-card-section>
        <q-card class="subcategoryCard" v-for="(stake, stakeIndex) in axis.stakes" :key="stakeIndex">
            <q-expansion-item expand-icon-toggle switch-toggle-side>
                <template v-slot:header>
                    <q-item class="cardInput" dense>
                        <q-item-section>{{ stake.label }}</q-item-section>
                    </q-item>
                </template>
                <QuestionBuilder v-if="currentRoute === 'QuestionsBuilder'" :stake-data="stake">
                </QuestionBuilder>
                <SourceDataBuilder v-if="currentRoute === 'DataSourceBuilder'" :categoryIndexProp="categoryIndex" @currentDatasSettings="showDataSettings"></SourceDataBuilder>
            </q-expansion-item>
        </q-card>
    </q-card>
    <q-card-actions align="center">
        <q-btn push class="cardActionBtn" color="primary" label="Save" />
    </q-card-actions>
</template>

<script>
import { useTemplateStore } from "src/stores/templateStore";
import { defineComponent } from "vue";
import QuestionBuilder from './QuestionBuilder.vue';
import SourceDataBuilder from './SourceDataBuilder.vue';

const templateStore = useTemplateStore()
// const { questionsTemplate } = storeToRefs(templateStore)

export default defineComponent({
    name: "AxisSetter",
    props: ['selectedNodes'],
    methods: {
        bgColor(color) {
            console.log(color)
            return color;
        }
    },
    data() {
        return {
            // axisTemplate: templateStore.axisTemplate.categories,
            tabIndex: 0,
            JSONData: ""
        };
    },
    computed: {
        selectedAxis() {
            return this.selectedNodes
        },
        currentRoute() {
            return this.$route.name
        },
        axisTemplate() {
            return templateStore.axisTemplate.categories
        }
    },
    components: {
        QuestionBuilder,
        SourceDataBuilder
    },
    mounted() {
    }
})
</script>

<style lang="scss" scoped>
.catCard {
    width: 100%;
    margin: 5px;
}

.tab {
    min-height: 75vh;
}

.cardInput {
    width: 100%;
}

.subcategoryCard {
    margin: 10px 10px 10px 10px;
}
</style>