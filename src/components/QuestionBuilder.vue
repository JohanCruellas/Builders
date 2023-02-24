<template>
        <q-form class="q-gutter-md q-pa-md questionWrapper">
          <q-scroll-area style="height: 400px;">
            <div v-for="(question, questionIndex) in questions" :key="questionIndex">
              <q-input class="cardInput" lazy-rules :placeholder="'Question ' + (questionIndex + 1)" v-model=question.text
                :dense="true">
                <template v-slot:append>
                  <q-icon :name="question.isShown ? 'keyboard_arrow_down' : 'keyboard_arrow_left'"
                    @click="toggleDropdown(question)" class="cursor-pointer" />
                  <q-icon name="settings" @click="showQuestionConfigPanel(questionIndex)" class="cursor-pointer" />
                  <q-icon name="close" @click="removeQuestion(questionIndex)" class="cursor-pointer" />
                </template>
              </q-input>
              <div v-if="question.isShown">
                <div v-for="(answer, answerIndex) in question.options" :key="answerIndex">
                  <q-input class="cardInput" lazy-rules :placeholder="'Answer ' + (answerIndex + 1)" v-model="answer.text"
                    :dense="true">
                    <template v-slot:before>
                      <q-btn round dense flat icon="circle" size="5px" />
                    </template>
                    <template v-slot:append>
                      <q-input class="answerRatioInput" type="number" v-model="answer.ratio" prefix="%"
                        :readonly="answerIndex === 0 || answerIndex + 1 === question.options.length"></q-input>
                      <q-icon name="close" @click="removeAnswer(questionIndex, answerIndex)" class="cursor-pointer" />
                    </template>
                  </q-input>
                </div>
                <div class="answerAddBtnWrapper">
                  <q-btn push class="answerAddBtn" color="primary" size="sm" rounded icon="add"
                    @click="addAnswer(questionIndex)" />
                </div>
              </div>
            </div>
          </q-scroll-area>
        </q-form>

  <q-dialog v-model="isQuestionDialogOpen" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <!-- Add question text if exist -->
        <div class="text-h6" v-if="!(this.questions[this.questionDialogContentIndex].text)">Editing question {{
          this.questionDialogContentIndex + 1 }}</div>
        <div class="text-h6" v-else>Editing question : "{{ this.questions[this.questionDialogContentIndex].text }}"</div>
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
            <q-slider color="teal" v-model="questionSlider" :step="1" />
          </q-item-section>
          <q-item-section avatar>
            <q-input v-model.number="questionSlider" teal type="number" filled style="max-width: 75px" />
          </q-item-section>
        </q-item>
        <q-item-label header>Other</q-item-label>
        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-icon name="notes" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Open ended</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-checkbox v-model="questionOpenEnded" color="teal" />
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
import { Answer } from '../classes/answer.js'

// const templateStore = useTemplateStore()

export default defineComponent({
  name: "QuestionBuilder",
  props: ['categoryData'],
  data() {
    return {
      questions: this.categoryData.questions,
      isQuestionDialogOpen: false,
      questionDialogContentIndex: null,
      ratioSlider: 1
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
    },
    questionOpenEnded: {
      get() {
        return this.questions[this.questionDialogContentIndex].hasOpenEnd
      },
      set(newvalue) {
        this.questions[this.questionDialogContentIndex].hasOpenEnd = newvalue
      }
    }
  },
  methods: {
    consoleLog() {
      console.log(this.questions)
    },
    setDefaultRatio(answer, index, nbAnswers) {
      let defaultRatio = Math.round(100 / (nbAnswers - 1))
      switch (index) {
        case 0:
          answer.ratio = 0;
          break;
        case nbAnswers - 1:
          answer.ratio = 100;
          break;
        default:
          answer.ratio = defaultRatio * index
      }
    },
    addAnswer(questionIndex) {
      this.questions[questionIndex].options.push(new Answer(/*`Answer ${this.questions[questionIndex].options.length + 1}`*/))
      let nbAnswers = this.questions[questionIndex].options.length;
      this.questions[questionIndex].options.forEach((answer, i) => {
        this.setDefaultRatio(answer, i, nbAnswers)
      })
    },
    removeQuestion(questionIndex) {
      this.questions.splice(questionIndex, 1);
    },
    removeAnswer(questionIndex, answerIndex) {
      console.log(questionIndex)
      this.questions[questionIndex].options.splice(answerIndex, 1);
      let nbAnswers = this.questions[questionIndex].options.length;
      this.questions[questionIndex].options.forEach((answer, i) => {
        this.setDefaultRatio(answer, i, nbAnswers)
      })
    },
    showQuestionConfigPanel(questionIndex) {
      this.questionDialogContentIndex = questionIndex;
      this.isQuestionDialogOpen = true;
    },
    toggleDropdown(question) {
      question.isShown = !(question.isShown)
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
  width:100%;
  // max-width: fit-content;
}

.answerRatioInput {
  width: 65px;
}
</style>