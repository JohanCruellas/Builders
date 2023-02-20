<template>
  <div class="q-pa-md container bg-amber-2">
    <div class="categories" v-for="(data, dataIndex) in datas" :key="dataIndex">
      <div class="category-title">{{ dataIndex }}</div>
      <q-card class="" style="width: 100%; height: 100%">
        <q-scroll-area class="scroll-area">
          <ul>
            <li>
              <div class="flex">
                <div class="q-mr-md">{{ data.data }}</div>
                <q-icon name="settings" class="cursor-pointer"></q-icon>
              </div>
            </li>
          </ul>
        </q-scroll-area>
      </q-card>
    </div>
  </div>
  <div class="footer">
    <q-btn label="add new data" @click="persistent=true"/>
  </div>

  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
    
    <q-card style="width: 100%">
      <q-card-section>
        <q-form @submit="onSubmit" class="form">
          <q-input v-model="dataName" label="Nom de la donnée"/>
          <q-input v-model="tooltip" label="Info tooltip"/>
          <div class="flex flex-center">
            <q-btn label="Enregistrer" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="justify-end">
      <q-btn flat label="Retour" v-close-popup float-right/>
    </q-card-actions>
    </q-card>
    
    
  </q-dialog>

  <!-- <q-input
                class="cardInput"
                lazy-rules
                :placeholder="'Nom de la donnée'"
                v-model="data.text"
                :dense="true"
              >
                <template v-slot:append>
                  <q-icon
                    name="settings"
                    @click="showDataConfigPanel(dataIndex)"
                    class="cursor-pointer"
                  />
                  <q-icon
                    name="close"
                    @click="removeData(dataIndex)"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>

              <div class="answerAddBtnWrapper">
                <q-btn
                  push
                  class="answerAddBtn"
                  color="primary"
                  size="sm"
                  rounded
                  icon="add"
                  @click="addAnswer(dataIndex)"
                />
              </div> -->

  <!-- <q-card-actions align="center">
            <q-btn
              push
              class="cardActionBtn"
              color="primary"
              label="Add Data"
              @click="addData"
            />
            <q-btn
              push
              color="primary"
              label="ConsoleLog"buttoniconb
              @click="consoleLog"
            />
            <q-btn
              push
              class="cardActionBtn"
              color="primary"
              label="Save"
              @click="toJSON"
            />
          </q-card-actions> -->

  <!-- <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">JSON Output</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <pre>{{ JSONData }}</pre>
      </q-card-section>
    </q-card> -->

  <!-- <q-dialog v-model="confirm" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        
        <div class="text-h6">
          Editing data {{ this.dataDialogContentIndex + 1 }}
        </div>
      </q-card-section>

      <q-card-section id="dataDialogBox" class="q-pt-none">
        <q-item-label header>Tooltip</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-input
            v-model="dataTooltip"
            dense
            @keyup.enter="prompt = false"
          />
        </q-item>
        <q-item-label header>Ratio</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="percent" />
          </q-item-section>
          <q-item-section>
            <q-slider
              color="teal"
              v-model="dataSlider"
              label
              label-always
              :step="1"
            />
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Ok" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog> -->
</template>

<script>
import { defineComponent } from "vue";
import { SourceData } from "../classes/source_data.js";

export default defineComponent({
  name: "sourceDataBuilder",
  data() {
    return {
      datas: {
        categorie1: {
          data: "test",
        },
        categorie2: {
          data: "test",
        },
        categorie3: {
          data: "test",
        },
        categorie4: {
          data: "test",
        },
        categorie5: {
          data: "test",
        },
        categorie6: {
          data: "test",
        },
      },
      persistent: false,
      dataName: '',
      tooltip: '',


      confirm: false,
      dataDialogContentIndex: [],
      JSONData: "",
    };
  },
  methods: {

    onSubmit() {

    },
  


    consoleLog() {
      console.log(this.datas);
    },
    addData() {
      this.datas.push(
        new SourceData(/*`SourceData ${this.datas.length + 1}`*/)
      );
    },
    removeData(dataIndex) {
      this.datas.splice(dataIndex, 1);
    },
    showDataConfigPanel(dataIndex) {
      this.dataDialogContentIndex = dataIndex;
      this.confirm = true;
    },
    toJSON() {
      this.JSONData = JSON.stringify(this.datas, null, 2);
    },
  },
  mounted() {
    //TODO Get default values
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1em;
  row-gap: 1em;
  width: 90%;
  max-height: 80vh;
  height: 100vh;
  border: 2px solid black
}

.categories {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 40%;
}

.scroll-area {
  height: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  row-gap: 1em;
}


</style>
