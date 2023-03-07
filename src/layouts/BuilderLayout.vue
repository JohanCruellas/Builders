<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
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

    <q-drawer show-if-above v-model="left" side="left" bordered> <q-tree :nodes="treeNodesComputed" node-key="id"
        v-model:ticked="selectedNodes" @update:ticked="log(event)" tick-strategy="leaf" :no-nodes-label="$t('noAxis')">
        <template v-slot:default-header="prop">
          <q-input v-if="prop.node.parentId" lazy-rules
            :placeholder="$t('stake') + ' ' + (getParentNode(prop.node).stakes.indexOf(getParentNode(prop.node).stakes.find((stake) => stake.id === prop.node.id)) + 1)"
            v-model="treeNodes.find((axis) => axis.id === prop.node.parentId).stakes.find((stake) => stake.id === prop.node.id).label"
            dense @click.stop>
            <template v-slot:append>
              <q-icon name="close" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input v-else lazy-rules :placeholder="
            $t('axis') + ' ' + (prop.tree.nodes.indexOf(prop.node) + 1)
          " v-model="treeNodes.find((axis) => axis.id === prop.node.id).label" dense @click.stop>
            <template v-slot:append>
              <q-icon name="close" class="cursor-pointer" />
            </template>
          </q-input>
        </template>
        <template v-slot:header-add="prop">
          <q-btn @click="addStake(prop.node)">{{ prop.node.label }}</q-btn>
        </template>
      </q-tree>
      <q-btn @click="addAxis()">{{ $t("axisAddBtn") }}</q-btn>
      <q-btn @click="log()">Log</q-btn>
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


const templateStore = useTemplateStore();

export default defineComponent({
  name: "BuilderLayout",
  data() {
    return {
      left: false,
      treeNodes: templateStore.axisTemplate.categories,
      selectedNodes: [],
    };
  },
  computed: {
    currentRoute() {
      return this.$route;
    },
    treeNodesComputed() {
      let computedTree = JSON.parse(JSON.stringify(this.treeNodes));
      computedTree.forEach(
        (axis) => {
          if (!axis.children || axis.children.at(-1).header !== "add") {
            axis.children = [...axis.stakes, { label: this.$t("stakeAddBtn"), header: "add", parentId: axis.id, noTick: true, tickable: false, tickStrategy: 'none' }]
          }
        })
      return computedTree;
    },
  },
  methods: {
    log(event) {
      console.log(this.selectedNodes)
      console.log(this.treeNodes)
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
  },
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
</style>
