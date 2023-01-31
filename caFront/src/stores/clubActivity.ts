import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useClubActivity = defineStore("clubActivity", {
  state: () => ({
    isOpen: false,
    isModalVisible: false,
    isPanelVisible: false,
    isCameraVisible: false,
  }),
  actions: {
    openMenu() {
      this.isOpen = true;
    },
    closeMenu() {
      this.isOpen = false;
    },
    showModal() {
      this.isModalVisible = true;
      this.isPanelVisible = false;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showPanel() {
      this.isPanelVisible = true;
      this.isModalVisible = false;
      this.isOpen = false;
    },
    closePanel() {
      this.isPanelVisible = false;
    },
    openCamera() {
      this.isCameraVisible = true;
    },
    closeCamera() {
      this.isCameraVisible = false;
    },
  },
});
