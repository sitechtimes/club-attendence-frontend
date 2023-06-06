import { defineStore } from "pinia";

type State = {
  description: string;
  isDescription: boolean;
  clubName: string;
};

export const useClubsDescription = defineStore("clubDescription", {
  state: (): State => ({
    description: "",
    isDescription: false,
    clubName: "",
  }),
  getters: {},
  actions: {
    openDescription(clubName: string) {
      this.isDescription = true;
      this.clubName = clubName;
    },
    closeDescription() {
      this.isDescription = false;
      this.clubName = "";
    },
  },
  persist: true,
});
