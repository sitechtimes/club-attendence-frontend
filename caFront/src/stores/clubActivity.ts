import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useClubActivity = defineStore("clubActivity", {
  state: () => ({
    isOpen: false,
    isModalVisible: false,
    isPanelVisible: false,
    isMenuVisible: false,
    isCameraVisible: false,
    isCameraAllowed: false,
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
      this.isCameraVisible = false;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showPanel() {
      this.isPanelVisible = true;
      this.isModalVisible = false;
      this.isOpen = false;
      this.isCameraVisible = false;
    },
    closePanel() {
      this.isPanelVisible = false;
    },
    openCamera() {
      this.isCameraAllowed = true;
      this.isCameraVisible = true;
      this.isModalVisible = false;
      this.isPanelVisible = false;
    },
    closeCamera() {
      this.isCameraVisible = false;
    },
    showMenu() {
      this.isMenuVisible = true;
    }
  },
});
