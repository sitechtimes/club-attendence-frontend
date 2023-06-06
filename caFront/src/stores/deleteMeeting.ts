import { defineStore } from "pinia";

interface DeleteDate {
  currentClubName: string | null;
  currentClubMeeting: string | null;
  selectedClub: boolean;
}

export const useDeleteMeeting = defineStore("delete", {
  state: (): DeleteDate => ({
    currentClubName: null,
    currentClubMeeting: null,
    selectedClub: false,
  }),
  getters: {},
  actions: {
    pushClubName(param: any) {
      this.currentClubName = param;
      console.log(this.currentClubName);
    },
    pushClubMeeting(param: any) {
      this.currentClubMeeting = param;
      console.log(this.currentClubMeeting);
    },

    async deleteMDate(clubName: string | null, date: string | null) {
      this.pushClubName(clubName);
      this.pushClubMeeting(date);
      const postData = {
        clubName: clubName,
        date: date,
      };
      console.log(postData);

      await fetch("http://localhost:3000/deleteMeeting", {
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
