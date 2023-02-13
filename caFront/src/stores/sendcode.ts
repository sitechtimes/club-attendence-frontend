import { defineStore } from "pinia";

interface dataRes {
  fetchURL: string;
  loading: boolean;
  selectedClub: boolean;
  getDates: boolean;
  currentClubCode: string | null;
}

export const useStore = defineStore("global", {
  state: (): dataRes => ({
    fetchURL: "http://localhost:3000/",
    clubList: [],
    loading: false,
    currentClubCode: null,
  }),

 actions: {
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
      })
        .then((res) => res.json())
        .then((res) => this.pushCurrentAttendance(res));
    },
  })