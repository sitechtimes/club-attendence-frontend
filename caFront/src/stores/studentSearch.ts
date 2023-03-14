import { defineStore } from "pinia";

interface clubDataValues {
    clubCode: string,
    clubName: string,
    position: string,
}
interface location{
    inClubToday:boolean,
    club: string,
    roomNumber: string,
}


interface studentData {
    clubData: Array<clubDataValues>,
    email: string,
    firstName: string,
    grade: string,
    lastName: string,
    officialClass: string,
    osis: string,
    presentLocation: location,
    type: string,
    uid: string


}

interface studentInterface {
    fetchURL: string,
    allStudentData: Array<studentData> | []
}

export const studentStore = defineStore("studentStore",{
    state:(): studentInterface => ({
        fetchURL: "http://localhost:3000/",
        allStudentData: [],

    }),
    actions:{

        async getAllStudentData(){
            await fetch(this.fetchURL + 'get-all-user-data').then((res) => res.json()).then((res) => this.allStudentData = res).then(()=> console.log(this.allStudentData))


        }
    }

} )