<template>
  <q-layout view="hHh lpR lFf">
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-item @click="openSidePanelList(indicators)">
        <q-item-section avatar class="iconWrapper">
          <q-icon name="home" @click="backHome" />
        </q-item-section>
        <q-item-section>{{ sidePanelPath }}</q-item-section>
      </q-item>
      <q-separator />
      <!-- drawer content -->
      <!-- <q-list>
                <q-item-label header>Indicators</q-item-label>
                <q-item v-for="(indicator, indicatorIndex) in indicators" :key="indicatorIndex">
                    <q-item-section>
                        <q-item-label>{{ indicator.text }}</q-item-label>
                        <q-item-label caption> {{ indicator.formula }}</q-item-label>
                    </q-item-section> -->
      <!-- <q-item-section side top>
                        <q-item-label caption>5 min ago</q-item-label>
                    </q-item-section> -->
      <!-- </q-item>
                <q-separator spaced />
                <q-item-label header>Source Data</q-item-label>
                <q-item v-for="(data, dataIndex) in sourceDatas" :key="dataIndex">
                    <q-item-section>
                        <q-item-label>{{ data.text }}</q-item-label>
                    </q-item-section>
                </q-item>

            </q-list> -->
      <!-- <q-btn @click="log">log</q-btn> -->
      <div v-if="sidePanelHome">
        <q-item
          clickable
          v-ripple
          @click="openSidePanelList(indicators, 'indicator')"
        >
          <q-item-section> Indicators </q-item-section>
          <q-item-section avatar>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          @click="openSidePanelList(sourceDatas, 'sourceData')"
        >
          <q-item-section> Source Data </q-item-section>
          <q-item-section avatar>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>
      </div>
      <div v-else>
        <q-item
          clickable
          v-for="(data, dataIndex) in selectedDatas"
          :key="dataIndex"
          v-ripple
          @click="addToText(data)"
        >
          <q-item-section>
            {{ data.text }}
            <q-item-label caption v-if="data.formula">
              {{ data.formula }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </div>
    </q-drawer>

    <q-page-container>
      <q-editor ref="editorPanel" v-model="editor" class="editor" />
      <q-card flat bordered>
        <q-card-section>
          <pre style="white-space: pre-line">{{ editor }}</pre>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useTemplateStore } from "src/stores/templateStore";

const templateStore = useTemplateStore();

export default defineComponent({
  data() {
    return {
      editor: "",
      sidePanelHome: true,
      selectedDatas: null,
      leftDrawerOpen: false,
      indicators: templateStore.indicatorsTemplate.indicators,
      sidePanelPath: "",
      sidePanelType: null,
    };
  },
  computed: {
    sourceDatas() {
      let allDatas = [];
      templateStore.sourceDataTemplate.categories.forEach((category) => {
        category.datas.forEach((data) =>
          allDatas.push(data, (data.color = category.color))
        );
      });
      return allDatas;
    },
  },
  methods: {
    toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    },
    openSidePanelList(datas, type) {
      this.sidePanelType = type;
      switch (type) {
        case "indicator":
          this.sidePanelPath += "/ Indicators";
          break;
        case "sourceData":
          this.sidePanelPath += "/ Source Datas";
      }
      this.sidePanelHome = false;
      this.selectedDatas = datas;
    },
    backHome() {
      // console.log(templateStore.templateDataSource.name[this.$i18n.locale])
      this.sidePanelPath = "";
      this.sidePanelHome = true;
      this.selectedDatas = null;
    },
    addToText(data) {
      console.log(data);
      // let caretPosition = this.$refs.editorPanel.caret.range.startOffset
      if (this.sidePanelType === "indicator") {
        this.$refs.editorPanel.runCmd(
          "insertHTML",
          `<span class="editor_token row inline items-center" 
                contenteditable="false" 
                style='background : ${data.color}' 
                data-keys='${data.data_keys}' 
                data-indicator-key='${data.indicator_key}' 
                data-formula='${data.formula}}'>
                    ${data.text}
                    <i class="q-icon material-icons cursor-pointer"
                    onclick="this.parentNode.parentNode.removeChild(this.parentNode)">
                        close
                    </i>
                </span>&nbsp;`
        );
      } else {
        console.log("in source data");
        this.$refs.editorPanel.runCmd(
          "insertHTML",
          `<span class="editor_token row inline items-center" 
                contenteditable="false" 
                style='background : ${data.color}' 
                data-key='${data.data_key}}'>
                    ${data.text}
                    <i class="q-icon material-icons cursor-pointer" 
                    onclick="this.parentNode.parentNode.removeChild(this.parentNode)">
                        close
                    </i>
                </span>&nbsp;`
        );
      }
      // console.log(caretPosition)
    },
  },
});
</script>

<style>
.iconWrapper {
  padding: 0;
}

.editor_token {
  background: rgba(1, 52, 45, 0.6);
  color: black;
  padding: 3px;
}
</style>
