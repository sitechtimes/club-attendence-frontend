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

interface eachClub {
  clubName: string;
  advisor: string;
  advisorEmail: string;
}

interface studentsAtDate {
  firstName: string;
  lastName: string;
  status: string;
  uid: string;
}

interface studentsAtDate extends Array<studentsAtDate> {}

interface dataRes {
  fetchURL: string;
  clubList: Array<eachClub>;
  loading: boolean;
  currentAttendance: clubData | Array<clubData>;
  selectedClub: boolean;
  getDates: boolean;
  listOfDates: Array<number | string>;
  currentClubCode: string | null;
  attendanceAtDate: studentsAtDate | Array<studentsAtDate>;
  filterDate: string | null;
  currentFilterDate: string;
  filtersAttendance: Array<string>;

  currentFilterAttendance: string,


}

export const useStore = defineStore("global", {
  state: (): dataRes => ({
    fetchURL: "http://localhost:3000/",

    clubList: [],
    loading: false,
    currentAttendance: [],
    selectedClub: false,
    getDates: false,
    listOfDates: [],
    currentClubCode: null,
    attendanceAtDate: [],
    filterDate: null,
    currentFilterDate: "Select Date",
    filtersAttendance: ["All", "Absent", "Present"],
  
    currentFilterAttendance: ("All"),
  }),
  getters: {},
  actions: {
    async getData() {
      this.loading = true;
      const res = await fetch(this.fetchURL + "all-club-data");
      const data = await res.json();

      this.clubList = data;
      this.loading = false;
    },

    pushCurrentAttendance(param: clubData) {
      this.currentAttendance = param;
      console.log(this.currentAttendance);
      this.selectedClub = true;
    },
    pushListOfDates(param: Array<number | string>) {
      this.listOfDates = param;
      console.log(this.listOfDates);
      this.getDates = true;
    },
    pushClubCode(param: any) {
      this.currentClubCode = param;
      console.log(this.currentClubCode);
    },
    pushFilterDate(param: string | null) {
      this.filterDate = param;
    },

    pushAttendanceAtDate(param: studentsAtDate) {
      this.attendanceAtDate = param;
      console.log(this.attendanceAtDate);
    },

    clearData() {
 
 
      this.currentAttendance = [];

      this.getDates = false;
      this.listOfDates = [];
      this.currentClubCode = null;
      this.attendanceAtDate = [];
      this.filterDate = null;
      this.currentFilterDate = "Select Date"
      this.currentFilterAttendance = "All"
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
      })
        .then((res) => res.json())
        .then((res) => this.pushCurrentAttendance(res));

      await fetch(this.fetchURL + "get-club-attendence-date", {
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
        body: JSON.stringify(postData),
      })
        .then((dates) => dates.json())
        .then((dates) => this.pushListOfDates(dates));
    },

    async fetchAttendance() {
      console.log("hi");
      const postData = {
        clubCode: this.currentClubCode,
        attendenceDate: this.filterDate,
      };

      await fetch(this.fetchURL + "get-club-attendence-data", {
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
        .then((res) => this.pushAttendanceAtDate(res));
    },
  },
});
