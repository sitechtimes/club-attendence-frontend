import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useClubActivity = defineStore("clubActivity", {
  state: () => ({
    isOpen: false,
  }),
  actions: {
    openMenu() {
      this.isOpen = true;
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
});
