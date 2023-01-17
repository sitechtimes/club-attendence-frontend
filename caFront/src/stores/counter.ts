import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('global', {
  state: () => ({
    fetchURL: "http://localhost:3000",
    clubList: [],
    loading: false,

  }),
  actions:{
    async getData(){
      this.loading = true
      const res = await fetch(this.fetchURL)
      const data = await res.json()

      this.clubList = data
      this.loading = false

    },



  }
})
