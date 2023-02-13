import { defineStore } from "pinia";

interface ClubState {
  fetchURL: string;
  currentClubCode: string | null;
}

export const useClubStore = defineStore("clubData", {
  state: (): ClubState => ({
    fetchURL: "http://localhost:3000/",
    currentClubCode: null,
  }),
  getters: {},
  actions: {
    pushClubCode(param: any) {
      this.currentClubCode = param;
      console.log(this.currentClubCode);
    },
    async getClubData(clubCode: string | undefined) {
      this.pushClubCode(clubCode);
      const postData = {
        clubCode: clubCode,
      };

      await fetch(this.fetchURL + "one-club-data", {
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
        body: JSON.stringify(postData), // body data type must match "Content-Type" header
      });
    },
  },
});
