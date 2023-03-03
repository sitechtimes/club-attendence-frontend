import { defineStore } from "pinia";


interface studentInterface {
    fetchURL: string,
}

export const studentStore = defineStore("studentStore",{
    state:(): studentInterface => ({
        fetchURL: "http://localhost:3000/",
    }),
    actions:{
        async getAllStudentData(){
            await fetch(this.fetchURL + 'get-all-user-data').then((res) => {console.log(res)})
        }
    }

} )