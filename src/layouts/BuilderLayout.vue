<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar class="flex justify-between">
        <q-btn dense flat round icon="menu" @click="left = !left"></q-btn>
        <q-toolbar-title align="center">
          <h1 class="appTitle">CaSpR</h1>
        </q-toolbar-title>

        <!-- account settings button + menu -->
        <q-btn round>
          <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            <!-- avatar à modifier -->
          </q-avatar>

          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md text-center">{{ $t("account") }}</div>
                <div class="account">
                  <div @click="goToAccount('profil')" class="accountOption">
                    <q-icon name="account_circle" />
                    <label class="cursor-pointer">{{ $t('accountProfile') }}</label>
                  </div>
                  <div @click="goToAccount('password')" class="accountOption">
                    <q-icon name="key" />
                    <label class="cursor-pointer">{{ $t('accountPassword') }}</label>
                  </div>
                  <div @click="goToAccount('notifications')" class="accountOption">
                    <q-icon name="notifications" />
                    <label class="cursor-pointer"> {{ $t('accountNotifications') }}</label>
                  </div>
                  <div @click="goToAccount('settings')" class="accountOption">
                    <q-icon name="manage_accounts" />
                    <label class="cursor-pointer">{{ $t("accountSettings") }}</label>
                  </div>
                </div>

                <!-- paramètres à ajouter -->
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>
                <!-- nom à modifier -->

                <q-btn color="primary" :label="$t('logout')" push size="sm" v-close-popup />
                <!-- bouton de déconnexion, méthode à ajouter -->
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/builders/DataSource" :label="$t('sourceDataTab')" />
        <q-route-tab to="/builders/Indicator" :label="$t('indicatorTab')" />
        <q-route-tab to="/builders/Question" :label="$t('questionTab')" />
        <q-route-tab to="/builders/Document" :label="$t('documentTab')" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <span v-if="!docTree">
        <q-item class="row">
          <q-space />
          <q-icon v-if="editOn === false" name="edit_note" size="sm" color="grey" class="cursor-pointer editIcon"
            @click.stop @click="editOn = !editOn"></q-icon>
          <q-icon v-if="editOn === true" name="save" size="sm" color="grey" class="cursor-pointer editIcon" @click.stop
            @click="saveToTemplate()"></q-icon>
        </q-item>
        <q-item>
          <q-tree :nodes="treeNodesComputed" node-key="id" :no-nodes-label="$t('noAxis')" v-model:ticked="selectedNodes"
            :tick-strategy="tickStrategy" dense>
            <template v-slot:default-header="prop" v-if="editOn === true">
              <q-item>
                <q-item-section @keypress.space.stop>
                  <q-input v-if="prop.node.parentId" lazy-rules
                    :placeholder="$t('stake') + ' ' + (getParentNode(prop.node).stakes.indexOf(getParentNode(prop.node).stakes.find((stake) => stake.id === prop.node.id)) + 1)"
                    v-model="treeNodes.find((axis) => axis.id === prop.node.parentId).stakes.find((stake) => stake.id === prop.node.id).label[this.$store.lang]"
                    dense @click.stop @click="log(prop.node)">
                  </q-input>
                  <q-input v-else lazy-rules :placeholder="$t('axis') + ' ' + (prop.tree.nodes.indexOf(prop.node) + 1)"
                    v-model="treeNodes.find((axis) => axis.id === prop.node.id).label[this.$store.lang]" dense
                    @click.stop>
                  </q-input>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="close" size="xs" class="cursor-pointer" @click.stop
                    @click="deleteNode(prop.node)"></q-icon>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:default-header="prop" v-else>
              <q-item>
                <q-item-section v-if="prop.node.parentId" dense>
                  {{ treeNodes.find((axis) => axis.id === prop.node.parentId).stakes.find((stake) => stake.id ===
                  prop.node.id).label[this.$store.lang] }}
                </q-item-section>
                <q-item-section v-else lazy-rules dense>
                  {{treeNodes.find((axis) => axis.id === prop.node.id).label[this.$store.lang]}}
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:header-add="prop">
              <q-btn v-if="editOn === true" @click="addStake(prop.node)">{{ prop.node.label }}</q-btn>
            </template>
          </q-tree>

        </q-item>
        <q-item>
          <q-btn @click="addAxis()" v-if="editOn === true">{{ $t("axisAddBtn") }}</q-btn>
          <q-btn @click="log()">log</q-btn>
        </q-item>
      </span>
      <span>
        <q-list bordered padding class="rounded-borders text-primary">
          <q-item clickable v-ripple :active="selectedDocId === document.id" v-for="(document, documentIndex) in documents" @click="selectDocument(document)"
          :key="documentIndex" active-class="selectedDoc">
            <q-item-section>{{ document.name }}</q-item-section>
          </q-item>
        </q-list>
      </span>
    </q-drawer>

    <q-page-container class="q-my-md">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useTemplateStore } from "src/stores/templateStore";
import { Axis } from "src/classes/axis.js";
import { Stake } from "src/classes/stake.js";
import { AxisTemplateSave } from "src/helpers/TemplateHelper.js"

const templateStore = useTemplateStore();

export default defineComponent({
  name: "BuilderLayout",
  data() {
    return {
      editOn: false,
      left: false,
      documents: templateStore.documents,
      // selectedNodes: templateStore.selectedNodes,
      treeNodes: [],
      selectedDocId: null
    };
  },
  computed: {
    selectedNodes: {
      get() {
        return templateStore.selectedNodes;
      },
      set(value) {
        templateStore.selectedNodes = value;
      }
    },
    docTree() {
      if (this.$route.name === "DocBuilder") {
        return true;
      }
      else {
        return false;
      }
    },
    treeNodesComputed() {
      //Deepclone todo OPTI
      let computedTree = JSON.parse(JSON.stringify(this.treeNodes));
      if (this.editOn === true) {
        computedTree.forEach(
          (axis) => {
            if (!axis.children || axis.children.at(-1).header !== "add") {
              axis.children = [...axis.stakes, { label: this.$t("stakeAddBtn"), header: "add", parentId: axis.id, noTick: true, tickable: false, tickStrategy: 'none' }]
            }
          })
      }
      else {
        computedTree.forEach(
          (axis) => {
            axis.children = axis.stakes
          })
      }
      return computedTree;
    },
    treeNodeTemplate() {
      return templateStore.axisTemplate.categories;
    },
    tickStrategy() {
      if (this.editOn === true) {
        return 'none'
      }
      else {
        return 'leaf'
      }
    }
  },
  methods: {
    log() {
      console.log(this.selectedNodes)
    },
    getParentNode(node) {
      return this.treeNodes.find((axis) => {
        return axis.id === node.parentId;
      });
    },
    addStake(node) {
      this.treeNodes
        .find((axis) => {
          return axis.id === node.parentId;
        })
        .stakes.push(new Stake("", node.parentId));
    },
    addAxis() {
      this.treeNodes.push(new Axis());
    },
    deleteNode(node) {
      //TODO: Delete node from treeNodes
      if (node.parentId) {
        let nodeAxis = this.treeNodes.find((axis) => { return axis.id == node.parentId; });
        let childToDelete = nodeAxis.stakes.find((stake) => { return stake.id == node.id; });
        let childToDeleteIndex = nodeAxis.stakes.indexOf(childToDelete);
        nodeAxis.stakes.splice(childToDeleteIndex, 1);
      }
      else {
        this.treeNodes.splice(this.treeNodes.indexOf(node), 1);
      }
    },
    goToAccount(route) {
      switch (route) {
        case 'profil':
          this.$router.push("../account/userAccount/profile");
          break
        case 'password':
          this.$router.push("../account/userAccount/password");
          break
        case 'notifications':
          this.$router.push("../account/userAccount/notifications");
          break
        case 'settings':
          this.$router.push("../account/userAccount/settings");
          break
      }
    },
    saveToTemplate() {
      templateStore.axisTemplate.categories = this.treeNodes;
      this.editOn = false;
      // AxisTemplateSave([templateStore.questionsTemplate, templateStore.indicatorsTemplate, templateStore.sourceDataTemplate], this.treeNodes);
    },
    selectDocument(document) {
      this.selectedDocId = document.id;
      // console.log(this.selectedDocId)
    },
  },
  mounted() {
    this.treeNodes = JSON.parse(JSON.stringify(templateStore.axisTemplate.categories));
  },
  watch: {
    treeNodeTemplate() {
      console.log('passed in watcher')
      this.treeNodes = JSON.parse(JSON.stringify(templateStore.axisTemplate.categories));
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

.account {
  display: flex;
  flex-direction: column;
  row-gap: 1em;
}

.accountOption {
  display: flex;
  align-items: center;
  column-gap: 1em;
  background-color: beige;
  cursor: pointer;
}

.selectedDoc {
  color: white;
  background-color: #1976d2;
}
/* .editIcon {} */
</style>
