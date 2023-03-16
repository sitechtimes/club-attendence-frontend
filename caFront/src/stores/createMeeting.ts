import { defineStore } from "pinia";

interface CreateMeeting {
  isMeetingOpen: boolean;
  isModalVisible: boolean;
  isPanelVisible: boolean;
  clubName: string | null | undefined;
}

export const useCreateMeeting = defineStore("createMeeting", {
  state: (): CreateMeeting => ({
    isMeetingOpen: false,
    isModalVisible: false,
    isPanelVisible: false,
    clubName: null,
  }),
  actions: {
    openMenu() {
      this.isMeetingOpen = true;
    },
    closeMenu() {
      this.isMeetingOpen = false;
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
      this.isMeetingOpen = false;
    },
    closePanel() {
      this.isPanelVisible = false;
    },
  },
});