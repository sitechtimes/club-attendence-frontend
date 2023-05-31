import { defineStore } from "pinia";

interface ClubDataValues {
  clubCode: string;
  clubName: string;
  position: string;
}
interface Location {
  inClubToday: boolean;
  club: string;
  roomNumber: string;
}

interface StudentData {
  clubData: Array<ClubDataValues>;
  email: string;
  firstName: string;
  grade: string;
  lastName: string;
  officialClass: string;
  osis: string;
  presentLocation: Location;
  type: string;
  uid: string;
}

interface StudentInterface {
  didYouSelectFilter: boolean;
  fetchURL: string;
  allStudentData: Array<StudentData> | [];
  filteredStudentData: Array<StudentData> | [];
  currentFilter: string;
}

export const studentStore = defineStore("studentStore", {
  state: (): StudentInterface => ({
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
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => (this.allStudentData = res))
        .then((res) => (this.filteredStudentData = res))
        .then(() => console.log(this.allStudentData));
    },

    updateFilteredStudentData(updatedAllStudentData: Array<StudentData>) {
      this.filteredStudentData = updatedAllStudentData;
    },
  },
});
