import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type clubData = {
  name: string
  osis: number | string
  positon: string
  grade: number | string
  email: string
  numAttendance: string | number
  numAbsence: string | number 

}

interface dataRes {
  data : null | clubData
  fetchURL : string
  clubList: Array<string>
  loading: boolean
  currentAttendance: clubData

 
}


export const useStore = defineStore('global', {
  state: () : dataRes => ({
    fetchURL: "http://localhost:3000",
    clubList: [],
    loading: false,
    currentAttendance: []

  }),
  getters: {

  },
  actions:{
    async getData(){
      this.loading = true
      const res = await fetch(this.fetchURL)
      const data = await res.json()

      this.clubList = data
      this.loading = false

    },

    pushCurrentAttendance(param: clubData) {
      this.currentAttendance = param
      console.log((this.currentAttendance))

    }



  }
})
