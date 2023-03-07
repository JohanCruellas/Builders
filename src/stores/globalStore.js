import { defineStore } from "pinia";

export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      lang: 'frFR',
      modal: false,
      index: '',
      type: '',
      input: '',
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        phoneNumber: '05 05 05 05 05',
        password: 'test',
      }
    };
  },
});
