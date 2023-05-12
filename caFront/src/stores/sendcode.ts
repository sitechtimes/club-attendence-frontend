import { defineStore } from "pinia";

type eachMember = {
  firstName: string;
  lastName: string;
  grade: string;
  email: string;
  status: string;
  uid: string;
};

interface ClubState {
  fetchURL: string;
  currentClubCode: string | null;
  selectedClub: boolean;
  memberlist: any | Array<eachMember>;
}

export const useClubStore = defineStore("clubData", {
  state: (): ClubState => ({
    fetchURL: "http://localhost:3000/",
    currentClubCode: null,
    memberlist: [],
    selectedClub: false,
  }),
  getters: {},
  actions: {
    pushClubCode(param: any) {
      this.currentClubCode = param;
      console.log(this.currentClubCode);
    },
    showMemberList(param: eachMember) {
      this.memberlist = param;
      console.log(this.memberlist);
      this.selectedClub = true;
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
      })
        .then((res) => res.json())
        .then((res) => this.showMemberList(res));
    },
  },
});
