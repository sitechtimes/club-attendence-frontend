import { defineStore } from "pinia";

export const uploadAttendance = defineStore("Attendance", {
  state: () => ({
    fetchURL: "https://tech-club-attendance.onrender.com/",
    currentClubCode: null,
    clubName: null,
    selectedClub: false,
    memberlist: null,
  }),
  getters: {},
  actions: {
    pushClubCode(param: any) {
      this.currentClubCode = param;
      console.log(this.currentClubCode);
    },
    async getClubData(clubCode: string | undefined) {
      this.memberlist = null;
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
      }).then((res) => res.json());
    },
  },
});
