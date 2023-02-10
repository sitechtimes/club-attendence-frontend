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
    fetchURL: string,
    clubList: Array<eachClub>,
    loading: boolean,
    selectedClub: boolean,
    currentClubCode: string | null,
    currentAttendance: clubData | Array<clubData>;
    filterDate: string | null;
    listOfDates: Array<number|string>
    getDates: boolean,
    

  }

export const teacherStore = defineStore("teacher", {
    state:(): dataRes =>({
        fetchURL: "http://localhost:3000/",
        clubList: [],
        loading: false,
        selectedClub: false,
        currentClubCode: null,
        currentAttendance: [],
        filterDate: null,
        listOfDates: [],
        getDates: false,

    }),
    actions:{
      pushClubCode(param: any) {
        this.currentClubCode = param;
        console.log(this.currentClubCode);
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

      async getData() {
        this.loading = true;
        const res = await fetch(this.fetchURL + "all-club-data");
        const data = await res.json();
  
        this.clubList = data;
        this.loading = false;
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

      

    }
    }
    )