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
    advisor: string;
    advisorEmail: string;
    clubCode: string;
    clubName:string;
    clubSpreadsheetId:string;
    memberCount: string;
    nextMeeting: string;
    president: string;
    presidentEmail: string;
    presidentUID: string;
    qeCode: string;
    roomNumber: string;
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
    selectedClub: boolean;
    currentClubCode: string | null;
    currentAttendance: clubData | Array<clubData>;
    filteredAttendance: clubData | Array<clubData>;
    filterDate: string | null;
    listOfDates: Array<string | number>;
    getDates: boolean;
    datesButton: boolean;
    statusButton: boolean;
    datesCurrent: string;
    statusFilterCurrent: string;
    selectedStatus: boolean;

    

  }

export const teacherStore = defineStore("teacher", {
    state:(): dataRes =>({
        fetchURL: "http://localhost:3000/",
        clubList: [],
        loading: false,
        selectedClub: false,
        currentClubCode: null,
        currentAttendance: [],
        filteredAttendance: [],
        filterDate: null,
        listOfDates: [],
        getDates: false,
        datesButton: false,
        statusButton: false,
        datesCurrent: "Select Date",
        statusFilterCurrent: "All",
        selectedStatus: false,
        



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
      pushFilteredAttendance(param: clubData){
        this.filteredAttendance = param
        console.log(this.filteredAttendance)
      },
      pushStatusFilter(param: string){
        this.statusFilterCurrent = param
        this.statusButton = false
      },
      clearPrevData(){
        this.datesCurrent = "Select Date"
        this.statusFilterCurrent = "All"
        this.datesButton = false
        this.selectedStatus = false
      },

      filterStatus(param: string){
        this.pushStatusFilter(param)
        this.selectedStatus = true

       if(this.statusFilterCurrent == "Present"){
        this.pushFilteredAttendance(this.currentAttendance.filter((student) => student.status == "present"))
       }
       if(this.statusFilterCurrent == "Absent"){
        this.pushFilteredAttendance(this.currentAttendance.filter((student) => student.status == "absent"))
       }
       if(this.statusFilterCurrent == "All"){
        this.pushFilteredAttendance(this.currentAttendance)
       }

      },


      async getData() {
        this.loading = true;
        const res = await fetch(this.fetchURL + "all-club-data");
        const data = await res.json();
        
        this.clubList = data;
        this.loading = false;
      },

      async getClubData(clubCode: string | undefined) {
      
        this.clearPrevData()

        this.pushClubCode(clubCode);
        console.log(clubCode, this.currentClubCode)
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

      async fetchAttendance(dates: string) {
        this.datesCurrent = dates
        this.datesButton = !this.datesButton
        this.filterDate = dates
        console.log(this.filterDate, this.currentClubCode);
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
          .then((res) => this.pushCurrentAttendance(res));
      },
      

    }
    }
    )