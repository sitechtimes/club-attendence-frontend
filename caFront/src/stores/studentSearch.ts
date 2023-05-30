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
    fetchURL: "http://localhost:3000/",
    allStudentData: [],
    filteredStudentData: [],
    currentFilter: "Name",
  }),
  actions: {
    updateCurrentFilter(newFilter: string) {
      this.currentFilter = newFilter;
    },

    async getAllStudentData(user: any) {
      await fetch(this.fetchURL + "get-all-user-data", {
        method: "POST",
        body: user,
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
