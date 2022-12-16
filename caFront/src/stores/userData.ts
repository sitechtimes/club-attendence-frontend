import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserDataStore = defineStore("userData", {
  state: () => ({ user: null }),
  getters: {},
  actions: {
    addUserData(data) {
      this.user = data;
    },
  },
});
