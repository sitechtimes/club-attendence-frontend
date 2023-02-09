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
    

  }

export const teacherStore = defineStore("teacher", {
    state:(): dataRes =>({
        fetchURL: "http://localhost:3000/",
        clubList: [],
        loading: false
    }),
    actions:{

    }
    }
    )