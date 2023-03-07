<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="flex justify-between">
        <q-btn dense flat round icon="menu" @click="left = !left"></q-btn>
        <q-toolbar-title align="center">
          <h1 class="appTitle">CaSpR</h1>
        </q-toolbar-title>
        <q-select v-model="lang" :options="langOptions" label="Quasar Language" bg-color="white" filled dense borderless
          emit-value map-options options-dense />
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/builders/DataSource" :label="$t('sourceDataTab')" />
        <q-route-tab to="/builders/Indicator" :label="$t('indicatorTab')" />
        <q-route-tab to="/builders/Question" :label="$t('questionTab')" />
        <q-route-tab to="/builders/Document" :label="$t('documentTab')" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <!-- drawer content -->
      <div class="q-pa-md q-gutter-sm">
        <q-tree :nodes="treeNodesComputed" node-key="id" v-model:ticked="selectedNodes" tick-strategy="leaf">
          <template v-slot:default-header="prop">
            <q-input v-if="prop.node.parentId" lazy-rules
              :placeholder="'Stake ' + (getParentNode(prop.node).stakes.indexOf(getParentNode(prop.node).stakes.find(stake => stake.id === prop.node.id)) + 1)" 
              v-model="treeNodes.find(axis => axis.id === prop.node.parentId).stakes.find(stake => stake.id === prop.node.id).label"
              dense @click.stop>
              <template v-slot:append>
                <q-icon name="close" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input v-else lazy-rules :placeholder="'Axis ' + (prop.tree.nodes.indexOf(prop.node) + 1)"
              v-model="treeNodes.find(axis => axis.id === prop.node.id).label" dense @click.stop>
              <template v-slot:append>
                <q-icon name="close" class="cursor-pointer" />
              </template>
            </q-input>
          </template>
          <template v-slot:header-add="prop">
            <q-btn @click="addStake(prop.node)">{{ prop.node.label }}</q-btn>
          </template>

        </q-tree>
        <q-btn @click="addAxis()">Add Axis</q-btn>
        <q-btn @click="log()">Log</q-btn>

      </div>
    </q-drawer>

    <q-page-container class="q-my-md">
      <router-view :selected-nodes="this.selectedNodes"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useTemplateStore } from "src/stores/templateStore";
import { Axis } from "src/classes/Axis.js";
import { Stake } from "src/classes/stake.js";

const templateStore = useTemplateStore()

export default defineComponent({
  name: "BuilderLayout",
  data() {
    return {
      left: false,
      lang: this.$i18n.locale,
      langOptions: [
        { value: "enUS", label: "English" },
        { value: "frFR", label: "Français" },
      ],
      treeNodes: templateStore.templateAxis.categories,
      selectedNodes: []
    };
  },
  computed: {
    currentRoute() {
      return this.$route
    },
    treeNodesComputed() {
      let computedTree = JSON.parse(JSON.stringify(this.treeNodes));
      computedTree.forEach(
        (axis) => {
          if(!axis.children || axis.children.at(-1).header !== "add"){
            axis.children = [...axis.stakes,{ label: "Add node", header: "add", parentId: axis.id, noTick: true, tickable: false, tickStrategy :'none'}]
          }
        }
      )
      return computedTree
    }
  },
  methods: {
    log(event) {
      console.log(this.selectedNodes)
      console.log(this.treeNodes)
    },
    getParentNode(node) {
      return this.treeNodes.find(axis => {return axis.id === node.parentId})
    },
    addStake(node) {
      this.treeNodes.find(axis => {return axis.id === node.parentId}).stakes.push(new Stake('', node.parentId))
    },
    addAxis() {
      this.treeNodes.push(new Axis())
    }
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang;
    }
  }
});
</script>

<style scoped>
.appTitle {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0;
}

.language {
  margin: 1em;
  z-index: 1;
}
</style>