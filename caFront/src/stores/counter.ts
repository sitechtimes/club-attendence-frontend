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

type studentsAtDate = {
  firstName: string;
  lastName: string;
  status: string,
  uid: string,
}

interface dataRes {
  fetchURL: string;
  clubList: Array<string> | null;
  loading: boolean;
  currentAttendance: clubData | null;
  selectedClub: boolean;
  getDates: boolean;
  listOfDates: Array<number|string>;
  currentClubCode: string | null,
  attendanceAtDate: studentsAtDate | Array<object>,
  filterDate: string | null,
}

export const useStore = defineStore("global", {
  state: (): dataRes => ({
    fetchURL: "http://localhost:3000",
    clubList: null,
    loading: false,
    currentAttendance: null,
    selectedClub: false,
    getDates: false,
    listOfDates: [],
    currentClubCode: null, 
    attendanceAtDate: [],
    filterDate:null,
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

      this.currentAttendance = param;
      console.log(this.currentAttendance)
      this.selectedClub = true;

    },
    pushListOfDates(param: Array<number|string>){
      this.listOfDates = param
      console.log(this.listOfDates)
      this.getDates = true
    },
    pushClubCode( param:any){
      this.currentClubCode = param
      console.log(this.currentClubCode)
    },
    pushFilterDate( param: string | null){
      this.filterDate = param
    },

    pushAttendanceAtDate(param: studentsAtDate ){
      this.attendanceAtDate = param
      console.log(this.attendanceAtDate)
    },

    clearData(){
      this.clubList = null
      this.loading = false
      this.currentAttendance = null

      this.getDates = false
      this.listOfDates = []
      this.currentClubCode = null
      this.attendanceAtDate = []
      this.filterDate = null
    },
  },
});
