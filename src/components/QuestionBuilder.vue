<template>
  <q-expansion-item
    v-for="([question_key, question_value], questionIndex) in Object.entries(questions)"
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
        v-model="question_value.text"
        :dense="true"
      >
        <template v-slot:append>
          <q-icon
            name="settings"
            @click="showQuestionConfigPanel(question_key)"
            class="cursor-pointer"
          />
          <q-icon
            name="close"
            @click="removeQuestion(question_key)"
            class="cursor-pointer"
          />
        </template>
        <template v-slot:before>
          <q-icon name="circle" size="xs" />
        </template>
      </q-input>
    </template>
    <q-item
      v-for="(answer, answerIndex) in question_value.options"
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
              (answerIndex === 0 && question_value.type === 'QCU') ||
              (answerIndex + 1 === question_value.options.length &&
              question_value.type === 'QCU')
            "
          ></q-input>
          <q-icon
            name="close"
            @click="removeAnswer(question_key, question_value, answerIndex)"
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
        @change="addAnswer(question_key, questionIndex)"
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
        <div class="text-h6" v-if="!this.questions[this.questionDialogContentKey].text">
          {{ $t('questionEditing') }} :
        </div>
        <div class="text-h6" v-else>
          {{ $t('questionEditing') }} : "{{
            this.questions[this.questionDialogContentKey].text
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
              @update:model-value="questionTypeChanged(questionType, this.questionDialogContentKey)" />
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
      // questions: {},
      isQuestionDialogOpen: false,
      questionDialogContentKey: null,
      ratioSlider: 1,
      newQuestionText: "",
      newAnswerTexts: [],
      questionTypeOptions: ["QCM", "QCU"],
    };
  },
  computed: {
    questionType: {
      get() {
        return templateStore.questionsTemplate[this.questionDialogContentKey].type;
      },
      set(newvalue) {
        templateStore.questionsTemplate[this.questionDialogContentKey].type = newvalue;
      },
    },
    questionSlider: {
      get() {
        return templateStore.questionsTemplate[this.questionDialogContentKey].ratio;
      },
      set(newvalue) {
        templateStore.questionsTemplate[this.questionDialogContentKey].ratio = newvalue;
      },
    },
    questionTooltip: {
      get() {
        return templateStore.questionsTemplate[this.questionDialogContentKey].info;
      },
      set(newvalue) {
        templateStore.questionsTemplate[this.questionDialogContentKey].info = newvalue;
      },
    },
    questionOpenEnded: {
      get() {
        return templateStore.questionsTemplate[this.questionDialogContentKey].hasOpenEnd;
      },
      set(newvalue) {
        templateStore.questionsTemplate[this.questionDialogContentKey].hasOpenEnd = newvalue;
      },
    },
    questions() {
      let questionsFiltered = {};
      Object.entries(templateStore.questionsTemplate).forEach(([key, object]) => {
          if(object.stakeId == this.stakeData.id) {
            questionsFiltered[key] = object
          }
        })
      return questionsFiltered;
    }
  },
  methods: {
    consoleLog() {
      console.log('questionsTemplate')
      console.log(templateStore.questionsTemplate);
      console.log('this.questions')
      console.log(this.questions);
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
      const newQuestion = new Question(this.newQuestionText, this.stakeData.parentId, this.stakeData.id);
      templateStore.questionsTemplate[newQuestion.question_key] = newQuestion;
      this.newQuestionText = "";
    },
    addAnswer(question_key, questionIndex) {
      templateStore.questionsTemplate[question_key].options.push(
        new Answer(this.newAnswerTexts[questionIndex])
      );
      let nbAnswers = templateStore.questionsTemplate[question_key].options.length;
      templateStore.questionsTemplate[question_key].options.forEach((answer, i) => {
        this.setDefaultRatio(answer, i, nbAnswers);
      });
      this.newAnswerTexts[questionIndex] = "";
    },
    removeQuestion(question_key) {
      delete templateStore.questionsTemplate[question_key];
    },
    removeAnswer(question_key, question_value, answerIndex) {
      templateStore.questionsTemplate[question_key].options.splice(answerIndex, 1);
      let nbAnswers = question_value.options.length;
      question_value.options.forEach((answer, i) => {
        this.setDefaultRatio(answer, i, nbAnswers);
      });
    },
    showQuestionConfigPanel(question_key) {
      this.questionDialogContentKey = question_key;
      this.isQuestionDialogOpen = true;
    },
    toggleDropdown(question) {
      question.isShown = !question.isShown;
    },
  },
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
