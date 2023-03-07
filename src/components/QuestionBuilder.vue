<template>
  <q-expansion-item
    v-for="(question, questionIndex) in questions"
    :key="questionIndex"
    expand-icon-toggle
    switch-toggle-side
    :header-inset-level="0.25"
    :content-inset-level="1.5"
  >
    <template v-slot:header>
      <q-input
        class="cardInput"
        lazy-rules
        :placeholder="$t('question') + ' ' + (questionIndex + 1)"
        v-model="question.text"
        :dense="true"
      >
        <template v-slot:append>
          <q-icon
            name="settings"
            @click="showQuestionConfigPanel(questionIndex)"
            class="cursor-pointer"
          />
          <q-icon
            name="close"
            @click="removeQuestion(questionIndex)"
            class="cursor-pointer"
          />
        </template>
        <template v-slot:before>
          <q-icon name="circle" size="xs" />
        </template>
      </q-input>
    </template>
    <q-item
      v-for="(answer, answerIndex) in question.options"
      :key="answerIndex"
    >
      <q-input
        class="cardInput"
        lazy-rules
        :placeholder="$t('answer') + ' ' + (answerIndex + 1)"
        v-model="answer.text"
        :dense="true"
      >
        <template v-slot:before>
          <q-icon name="radio_button_unchecked" size="xs" />
        </template>
        <template v-slot:append>
          <q-input
            class="answerRatioInput"
            type="number"
            v-model="answer.ratio"
            prefix="%"
            :readonly="
              (answerIndex === 0 && question.type === 'QCU') ||
              (answerIndex + 1 === question.options.length &&
                question.type === 'QCU')
            "
          ></q-input>
          <q-icon
            name="close"
            @click="removeAnswer(questionIndex, answerIndex)"
            class="cursor-pointer"
          />
        </template>
      </q-input>
    </q-item>
    <q-item>
      <q-input
        class="cardInput"
        lazy-rules
        :placeholder="$t('addAnswer')"
        :dense="true"
        v-model="newAnswerTexts[questionIndex]"
        @change="addAnswer(questionIndex)"
      >
        <template v-slot:before>
          <q-icon name="add_circle_outline" size="xs" />
        </template>
      </q-input>
    </q-item>
  </q-expansion-item>
  <q-item :inset-level="1.25">
    <q-input
      class="cardInput"
      v-model="newQuestionText"
      lazy-rules
      :placeholder="$t('addQuestion')"
      :dense="true"
      @change="addQuestion()"
    >
      <template v-slot:before>
        <q-icon name="add_circle" size="xs" />
      </template>
    </q-input>
  </q-item>
  <q-dialog v-model="isQuestionDialogOpen" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <!-- Add question text if exist -->
        <div
          class="text-h6"
          v-if="!this.questions[this.questionDialogContentIndex].text"
        >
          {{ $t('questionEditing') }} {{ this.questionDialogContentIndex + 1 }}
        </div>
        <div class="text-h6" v-else>
          {{}} : "{{
            this.questions[this.questionDialogContentIndex].text
          }}"
        </div>
      </q-card-section>
      <q-card-section id="questionDialogBox" class="q-pt-none">
        <q-item-label header>{{ $t('tooltip') }}</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-input
            v-model="questionTooltip"
            dense
            @keyup.enter="prompt = false"
          />
        </q-item>
        <q-item-label header>{{ $t('ratio') }}</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="percent" />
          </q-item-section>
          <q-item-section>
            <q-slider color="teal" v-model="questionSlider" :step="1" />
          </q-item-section>
          <q-item-section avatar>
            <q-input
              v-model.number="questionSlider"
              teal
              type="number"
              filled
              style="max-width: 75px"
            />
          </q-item-section>
        </q-item>
        <q-item-label header>{{ $t('type') }}</q-item-label>
        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-icon name="checklist" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('type') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-select v-model="questionType" :options="questionTypeOptions"
              @update:model-value="questionTypeChanged(questionType, this.questionDialogContentIndex)" />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-icon name="notes" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('openEnded') }}</q-item-label>
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
  <q-btn @click="consoleLog">Log</q-btn>
</template>

<script>
import { Question } from 'src/classes/question';
import { defineComponent } from 'vue';
import { Answer } from '../classes/answer.js'
import { useTemplateStore } from "src/stores/templateStore";

const templateStore = useTemplateStore()

export default defineComponent({
  name: "QuestionBuilder",
  props: ['stakeData'],
  data() {
    return {
      questions: this.stakeData.questions,
      isQuestionDialogOpen: false,
      questionDialogContentIndex: null,
      ratioSlider: 1,
      newQuestionText: "",
      newAnswerTexts: [],
      questionTypeOptions: ["QCM", "QCU"],
    };
  },
  computed: {
    questionType: {
      get() {
        return this.questions[this.questionDialogContentIndex].type;
      },
      set(newvalue) {
        this.questions[this.questionDialogContentIndex].type = newvalue;
      },
    },
    questionSlider: {
      get() {
        return this.questions[this.questionDialogContentIndex].ratio;
      },
      set(newvalue) {
        this.questions[this.questionDialogContentIndex].ratio = newvalue;
      },
    },
    questionTooltip: {
      get() {
        return this.questions[this.questionDialogContentIndex].info;
      },
      set(newvalue) {
        this.questions[this.questionDialogContentIndex].info = newvalue;
      },
    },
    questionOpenEnded: {
      get() {
        return this.questions[this.questionDialogContentIndex].hasOpenEnd;
      },
      set(newvalue) {
        this.questions[this.questionDialogContentIndex].hasOpenEnd = newvalue;
      },
    },
  },
  methods: {
    consoleLog() {
      console.log(this.newAnswerTexts);
    },
    questionTypeChanged(questionType, questionIndex) {
      if (questionType == "QCU") {
        this.questions[questionIndex].options[0].ratio = 0;
        this.questions[questionIndex].options.at(-1).ratio = 100;
      }
    },
    setDefaultRatio(answer, index, nbAnswers) {
      let defaultRatio = Math.round(100 / (nbAnswers - 1));
      switch (index) {
        case 0:
          answer.ratio = 0;
          break;
        case nbAnswers - 1:
          answer.ratio = 100;
          break;
        default:
          answer.ratio = defaultRatio * index;
      }
    },
    addQuestion() {
      this.questions.push(new Question(this.newQuestionText));
      this.newQuestionText = "";
      // templateStore.questionsTemplate.categories[this.tabIndex].questions.push(new Question(/*`Question ${this.questions.length + 1}`*/))
      // console.log(questionsTemplate.categories)
    },
    addAnswer(questionIndex) {
      this.questions[questionIndex].options.push(
        new Answer(this.newAnswerTexts[questionIndex])
      );
      let nbAnswers = this.questions[questionIndex].options.length;
      this.questions[questionIndex].options.forEach((answer, i) => {
        this.setDefaultRatio(answer, i, nbAnswers);
      });
      this.newAnswerTexts[questionIndex] = "";
    },
    removeQuestion(questionIndex) {
      this.questions.splice(questionIndex, 1);
    },
    removeAnswer(questionIndex, answerIndex) {
      console.log(questionIndex);
      this.questions[questionIndex].options.splice(answerIndex, 1);
      let nbAnswers = this.questions[questionIndex].options.length;
      this.questions[questionIndex].options.forEach((answer, i) => {
        this.setDefaultRatio(answer, i, nbAnswers);
      });
    },
    showQuestionConfigPanel(questionIndex) {
      this.questionDialogContentIndex = questionIndex;
      this.isQuestionDialogOpen = true;
    },
    toggleDropdown(question) {
      question.isShown = !question.isShown;
    },
  },
  mounted() {
    //TODO Get default values
    // let stakeQuestions = templateStore.questionsTemplate.categories.find(category => category.name == this.stakeData.name).questions) 
    //get parent stake
    // console.log(this.stakeData)
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
  width: 100%;
  // max-width: fit-content;
}

.answerRatioInput {
  width: 65px;
}
</style>
