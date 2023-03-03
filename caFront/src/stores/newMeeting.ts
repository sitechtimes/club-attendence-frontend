import { defineStore } from "pinia";

export const NewMeeting = defineStore("NewMeeting", {
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
      this.isCameraVisible = true;
      this.isModalVisible = false;
      this.isPanelVisible = false;
    },
    closeCamera() {
      this.isCameraVisible = false;
    },
  },
});