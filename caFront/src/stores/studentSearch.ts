import { defineStore } from "pinia";

interface clubDataValues {
  clubCode: string;
  clubName: string;
  position: string;
}
interface location {
  inClubToday: boolean;
  club: string;
  roomNumber: string;
}

interface studentData {
  clubData: Array<clubDataValues>;
  email: string;
  firstName: string;
  grade: string;
  lastName: string;
  officialClass: string;
  osis: string;
  presentLocation: location;
  type: string;
  uid: string;
}

interface studentInterface {
  didYouSelectFilter: boolean;
  fetchURL: string;
  allStudentData: Array<studentData> | [];
  filteredStudentData: Array<studentData> | [];
  currentFilter: string;
}

export const studentStore = defineStore("studentStore", {
  state: (): studentInterface => ({
    didYouSelectFilter: false,
    fetchURL: "https://tech-club-attendance.onrender.com/",
    allStudentData: [],
    filteredStudentData: [],
    currentFilter: "Name",
  }),
  actions: {
    updateCurrentFilter(newFilter: string) {
      this.currentFilter = newFilter;
    },

    async getAllStudentData(user: any) {
      const postData = {
        user: user,
      };

      await fetch(this.fetchURL + "get-all-user-data", {
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
        .then((res) => (this.allStudentData = res))
        .then((res) => (this.filteredStudentData = res))
        .then(() => console.log(this.allStudentData));
    },

    updateFilteredStudentData(updatedAllStudentData: Array<studentData>) {
      this.filteredStudentData = updatedAllStudentData;
    },
  },
});
