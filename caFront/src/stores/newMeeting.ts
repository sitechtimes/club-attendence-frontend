import { defineStore } from "pinia";

interface meeting {
  isMeetingOpen: boolean;
  isModalVisible: boolean,
  isPanelVisible: boolean,
  clubName: string | null | undefined;
};

export const useNewMeeting = defineStore("NewMeeting", {
  state: (): meeting => ({
    isMeetingOpen: false,
    isModalVisible: false,
    isPanelVisible: false,
    clubName: null,
  }),
  actions: {
    openMenu(
      clubName: string | undefined
    ) {
      this.isMeetingOpen = true;
      this.clubName = clubName;
    },
    closeMenu() {
      this.isMeetingOpen = false;
      this.clubName = null;
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
    async getMeeting() {
      await fetch("http://localhost:3000/newMeeting", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(this.clubName), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
    },
  },
});