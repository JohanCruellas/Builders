<template>
  <div class="q-pa-md" style="max-width: 800px">
    <q-card>
      <q-card-section>
        <q-form class="q-gutter-md q-pa-md">
          <q-scroll-area style="height: 400px; width:500px; max-width: 800px;">
          <div v-for="(question, questionIndex) in questions" :key="questionIndex">
            <q-input class="cardInput" lazy-rules :placeholder="'Question ' + (questionIndex + 1)" v-model=question.text
              :dense="true">
              <template v-slot:append>
                <q-icon name="settings" @click="showQuestionConfigPanel(questionIndex)" class="cursor-pointer" />
                <q-icon name="close" @click="removeQuestion(questionIndex)" class="cursor-pointer" />
              </template>
            </q-input>
            <div v-for="(answer, answerIndex) in question.options" :key="answerIndex">
              <q-input class="cardInput" lazy-rules :placeholder="'Answer ' + (answerIndex + 1)" v-model="answer.text"
                :dense="true">
                <template v-slot:before>
                  <q-btn round dense flat icon="circle" size="5px" />
                </template>
                <template v-slot:append>
                  <q-input></q-input>
                  <q-icon name="close" @click="removeAnswer(questionIndex, answerIndex)" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
            <div class="answerAddBtnWrapper">
              <q-btn push class="answerAddBtn" color="primary" size="sm" rounded icon="add"
                @click="addAnswer(questionIndex)" />
            </div>
          </div>
          </q-scroll-area>
          <q-card-actions align="center">
            <q-btn push class="cardActionBtn" color="primary" label="Add Question" @click="addQuestion" />
            <!-- <q-btn push color="primary" label="ConsoleLog" @click="consoleLog" /> -->
            <q-btn push class="cardActionBtn" color="primary" label="Save" @click="toJSON"/>
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">JSON Output</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <pre>{{ JSONData }}</pre>
      </q-card-section>
    </q-card>
  </div>

  <q-dialog v-model="confirm" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <!-- Add question text if exist -->
        <div class="text-h6">Editing question {{ this.questionDialogContentIndex + 1 }}</div>
      </q-card-section>

      <q-card-section id="questionDialogBox" class="q-pt-none">
        <q-item-label header>Tooltip</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-input v-model="questionTooltip" dense @keyup.enter="prompt = false" />
        </q-item>
        <q-item-label header>Ratio</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="percent" />
          </q-item-section>
          <q-item-section>
            <q-slider color="teal" v-model="questionSlider" label label-always :step="1" />
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Ok" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { Question } from '../classes/question.js'
import { Answer } from '../classes/answer.js'

export default defineComponent({
  name: "QuestionBuilder",
  data() {
    return {
      questions: [],
      confirm: false,
      questionDialogContentIndex: [],
      ratioSlider: 1,
      JSONData: ""
    };
  },
  computed: {
    questionSlider: {
      get() {
        return this.questions[this.questionDialogContentIndex].ratio
      },
      set(newvalue) {
        this.questions[this.questionDialogContentIndex].ratio = newvalue
      }
    },
    questionTooltip: {
      get() {
        return this.questions[this.questionDialogContentIndex].info
      },
      set(newvalue) {
        this.questions[this.questionDialogContentIndex].info = newvalue
      }
    }
  },
  methods: {
    consoleLog() {
      console.log(this.questions)
    },
    addQuestion() {
      this.questions.push(new Question(/*`Question ${this.questions.length + 1}`*/))
    },
    addAnswer(questionIndex) {
      this.questions[questionIndex].options.push(new Answer(/*`Answer ${this.questions[questionIndex].options.length + 1}`*/))
    },
    removeQuestion(questionIndex) {
      this.questions.splice(questionIndex, 1);
    },
    removeAnswer(questionIndex, answerIndex) {
      console.log(questionIndex)
      this.questions[questionIndex].options.splice(answerIndex, 1);
    },
    showQuestionConfigPanel(questionIndex) {
      this.questionDialogContentIndex = questionIndex;
      this.confirm = true;
    },
    toJSON() {
      this.JSONData = JSON.stringify(this.questions, null, 2)
    }
  },
  mounted() {
    //TODO Get default values
  }
})
</script>

<style lang="scss" scoped>
.answerAddBtnWrapper {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.answerAddBtn {
  margin: auto;
  padding: 5px;
}

.cardActions {
  display: flex;
  justify-content: center;
}

.cardActionBtn {
  margin: auto;
}

.cardInput {
  width: 25vw;
  // max-width: fit-content;
}
</style>