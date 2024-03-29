import { defineStore } from "pinia";

export const useClubActivity = defineStore("clubActivity", {
  state: () => ({
    isOpen: false,
    isModalVisible: false,
    isPanelVisible: false,
    isCameraVisible: false,
    isCameraAllowed: false,
    isMenuVisible: false,
    isUploadVisible: false,
    isImageVisible: false,
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
      this.isCameraAllowed = false;
    },
    openIcon() {
      this.isMenuVisible = true;
    },
    closeIcon() {
      this.isMenuVisible = false;
    },
    openUpload() {
      this.isUploadVisible = true;
    },
    closeUpload() {
      this.isUploadVisible = false;
    },
    openImage() {
      this.isImageVisible = true;
    },
    closeImage() {
      this.isImageVisible = false;
    },
  },
});
