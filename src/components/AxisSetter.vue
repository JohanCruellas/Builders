<template>
    <q-card v-for="(axis, axisIndex) in axisTemplateFiltered" :key="axisIndex" :name="axisIndex" class="catCard"
        :style="{ backgroundColor: axis.color }">
        <q-card-section>
            <div class="text-h6">{{ axis.label[this.$store.lang] }}</div>
        </q-card-section>
        <q-card class="subcategoryCard" v-for="(stake, stakeIndex) in axis.stakes.filter(stake => selectedNodes.includes(stake.id))" :key="stakeIndex">
            <q-expansion-item expand-icon-toggle switch-toggle-side>
                <template v-slot:header>
                    <q-item class="cardInput" dense>
                        <q-item-section>{{ stake.label[this.$store.lang] }}</q-item-section>
                    </q-item>
                </template>
                <QuestionBuilder v-if="currentRoute === 'QuestionsBuilder'" :stake-data="stake">
                </QuestionBuilder>
                <SourceDataBuilder v-if="currentRoute === 'DataSourceBuilder'" @current-datas-settings="parentEmit"
                    :stake-data="stake">
                </SourceDataBuilder>
            </q-expansion-item>
        </q-card>
    </q-card>
    <q-card-actions align="center">
        <q-btn push class="cardActionBtn" color="primary" label="Save" />
        <q-btn push class="cardActionBtn" color="primary" label="Log" @click="log()" />
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
    methods: {
        log() {
            console.log(templateStore.selectedNodes)
        },
        bgColor(color) {
            console.log(color)
            return color;
        },

        parentEmit(event) {
            this.$emit('newEmit', event)
        },

        // ouvre la modale d'ajout de données
        openAddModal() {
            this.persistent = true;
            this.isEdited = false;

            //  rénitialisation à zéro pour éviter d'afficher les données si ajout de données après modification de données

            this.dataText = "";
            this.tooltip = "";
            this.selectCategory = "";
        },
    },
    data() {
        return {
            tabIndex: 0,
            JSONData: ""
        };
    },
    emits: ['currentDatasSettings'],
    computed: {
        selectedNodes() {
            return templateStore.selectedNodes
        },
        currentRoute() {
            return this.$route.name
        },
        axisTemplateFiltered() {
            let filteredTemplate = []
            filteredTemplate = templateStore.axisTemplate.categories.filter((axis) => {
                return axis.stakes.some((stake) => {
                    return this.selectedNodes.includes(stake.id)
                })
            })
            return filteredTemplate
        }
    },
    components: {
        QuestionBuilder,
        SourceDataBuilder
    },

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