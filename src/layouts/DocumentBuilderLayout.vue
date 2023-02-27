<template>
    <q-layout view="hHh lpR lFf">

        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    Title
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
            <!-- drawer content -->
            <q-card class="my-card">
        <q-card-section>
            <q-list>
                <q-item-label header>Indicators</q-item-label>
                <q-item v-for="(indicator, indicatorIndex) in indicators" :key="indicatorIndex">
                    <q-item-section>
                        <q-item-label>{{ indicator.text }}</q-item-label>
                        <q-item-label caption> {{ indicator.formula }}</q-item-label>
                    </q-item-section>
                    <!-- <q-item-section side top>
                        <q-item-label caption>5 min ago</q-item-label>
                    </q-item-section> -->
                </q-item>
                <q-separator spaced />
                <q-item-label header>Source Data</q-item-label>
                <q-item v-for="(data, dataIndex) in sourceDatas" :key="dataIndex">
                    <q-item-section>
                        <q-item-label>{{ data.text }}</q-item-label>
                    </q-item-section>
                </q-item>

            </q-list>
        </q-card-section>
        <q-btn @click="log">log</q-btn>
    </q-card>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>

    </q-layout>
</template>
  
<script>
import { defineComponent } from 'vue'
import { useTemplateStore } from "src/stores/templateStore";

const templateStore = useTemplateStore()


export default defineComponent({
    data() {
        return {
            leftDrawerOpen: false
        }
    },
    computed: {
        sourceDatas() {
            let allDatas = [];
            templateStore.sourceDataTemplate.categories.forEach((category) => {
                category.datas.forEach((data) => allDatas.push(data))
            })
            return allDatas;
        }
    },
    methods: {
        toggleLeftDrawer() {
            leftDrawerOpen.value = !leftDrawerOpen.value
        }
    }


})
</script>