<template>
  <q-page class="flex column flex-center">
    <h1>{{ $t('accountPassword') }}</h1>
    <div class="settings">
      <q-form
        class="flex profileForm q-gutter-lg"
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-input
          class="passwordInput"
          filled
          v-model="currentPassword"
          :label="$t('labelCurrentPassword')"
        ></q-input>
        <q-input
          class="passwordInput"
          filled
          v-model="newPassword"
          :label="$t('labelNewPassword')"
          lazy-rules
          :rules="[(val) => (val && val.length > 4) || $t('unfilledInput')]"
        ></q-input>
        

        <div>
          <q-btn :label="$t('saveBtn')" type="submit" color="primary" />
          <q-btn
            :label="$t('resetBtn')"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from 'quasar'
const $q = useQuasar()

export default defineComponent({
  name: "profilPage",
  data() {
    return {
      currentPassword: this.$store.user.password,
      newPassword: "",
    };
  },
  methods: {
    onSubmit() {
      this.$store.user.password = this.newPassword;

      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: this.$t('successfulPasswordUpdate'),
      });
    },

    onReset() {
      this.newPassword = null;
    },
  },
});
</script>

<style lang="scss" scoped>
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  height: 80vh;
  width: 80vw;
  // background-color: lightblue;
}

.profileForm {
  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
}

.passwordInput {
  width: 45%;
}
</style>
