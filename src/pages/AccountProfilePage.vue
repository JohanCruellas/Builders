<template>
  <q-page class="flex column flex-center">
    <h1>{{ $t('accountProfile') }}</h1>
    <div class="settings">
      <q-form
        class="flex profileForm q-gutter-lg"
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-input
          class="profileInput"
          filled
          v-model="accountFirstName"
          :label="$t('labelFirstName')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('unfilledInput')]"
        ></q-input>
        <q-input
          class="profileInput"
          filled
          v-model="accountLastName"
          :label="$t('labelLastName')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('unfilledInput')]"
        ></q-input>
        <q-input
          class="profileInput"
          filled
          v-model="accountEmail"
          :label="$t('labelEmail')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('unfilledInput')]"
        ></q-input>
        <q-input
          class="profileInput"
          filled
          v-model="accountPhoneNumber"
          :label="$t('labelPhoneNumber')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('unfilledInput')]"
        ></q-input>
        <!-- <q-input class="profileInput" v-model=""></q-input>
          <q-input class="profileInput" v-model=""></q-input> -->

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
      user: this.$store.user,
      accountFirstName: this.$store.user.firstName,
      accountLastName: this.$store.user.lastName,
      accountEmail: this.$store.user.email,
      accountPhoneNumber: this.$store.user.phoneNumber,
    };
  },
  methods: {
    onSubmit() {
      this.user.firstName = this.accountFirstName;
      this.user.lastName = this.accountLastName;
      this.user.email = this.accountEmail;
      this.user.phoneNumber = this.accountPhoneNumber;

      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: this.$t('successfulProfileUpdate'),
      });
    },

    onReset() {
      this.accountFirstName = null;
      this.accountLastName = null;
      this.accountEmail = null;
      this.accountPhoneNumber = null;
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

.profileInput {
  width: 45%;
}
</style>
