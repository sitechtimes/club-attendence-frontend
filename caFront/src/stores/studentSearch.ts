import { defineStore } from "pinia";


interface studentInterface {
    input: any,

}

export const studentStore = defineStore("studentStore",{
    state:(): studentInterface => ({
        
    })

} )