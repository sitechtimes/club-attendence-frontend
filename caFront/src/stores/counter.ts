import { ref, computed } from "vue";
import { defineStore } from "pinia";

type clubData = {
  firstName: string;
  lastName: string;
  uid: string;
  osis: string;
  position: string;
  grade: string;
  email: string;
  officalClass: string;
  numbOfAttendence: string;
  numbOfAbsent: string;
};

interface dataRes {
  fetchURL: string;
  clubList: Array<string> | null;
  loading: boolean;
  currentAttendance: clubData | null;
  selectedClub: boolean;
}

export const useStore = defineStore("global", {
  state: (): dataRes => ({
    fetchURL: "http://localhost:3000",
    clubList: null,
    loading: false,
    currentAttendance: null,
    selectedClub: false,
  }),
  getters: {},
  actions: {
    async getData() {
      this.loading = true;
      const res = await fetch(this.fetchURL);
      const data = await res.json();

      this.clubList = data;
      this.loading = false;
    },

    pushCurrentAttendance(param: clubData) {
      console.log(this.currentAttendance);
      this.currentAttendance = param;
      console.log(this.currentAttendance);
    },
  },
});
