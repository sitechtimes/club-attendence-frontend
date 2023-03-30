<template>
    <div>
        <h2>
            Student Search
        </h2>

        <section class="top">
            <input v-model="searchBy" class="input" type="text" @input="logValue">
            <button @click="changeFilter" class="dropdown">{{ store.currentFilter }}</button>
                <li v-if="filterStatus == true" class="choices" @click="selectFilter(heading)" v-for="heading in head" >{{ heading }}</li>
        </section>
       <studentSearchTable :theData="store.filteredStudentData" :headings="head" ></studentSearchTable>




    </div>
</template>

<script lang="ts">
import { defineComponent , ref } from 'vue'
import {studentStore} from "../stores/studentSearch"
import studentSearchTable from '@/components/studentSearchTable.vue'
export default defineComponent({
    components:{
        studentSearchTable
    },
    setup () {
        const store = studentStore()
        store.getAllStudentData()
        const head = ["Osis","Name","Email","Grade","Official Class"]
        const searchBy = ref("")
        const filterStatus = ref(false)

        console.log(filterStatus)

        return {
            store, head, searchBy, filterStatus, 
        }
    },
    methods:{
        changeFilter(){
            this.filterStatus = !this.filterStatus
            console.log(this.filterStatus, this.searchBy)
        },

        logValue(){
            console.log(this.searchBy)
            
            if(this.store.currentFilter == "Name"){
                            this.store.updateFilteredStudentData(this.store.allStudentData.filter((student) => (student.firstName + student.lastName).replace(/ /g,"").toLowerCase().includes(this.searchBy.toLowerCase().replace(/ /g,""))))
            }
            if(this.store.currentFilter == "Osis"){
                            this.store.updateFilteredStudentData(this.store.allStudentData.filter((student) => student.osis.toLowerCase().includes(this.searchBy.replace(/ /g,""))))
            }
            if(this.store.currentFilter == "Email"){
                            this.store.updateFilteredStudentData(this.store.allStudentData.filter((student) => student.email.toLowerCase().includes(this.searchBy.toLowerCase().replace(/ /g,""))))
            }
            if(this.store.currentFilter == "Official Class"){
                            this.store.updateFilteredStudentData(this.store.allStudentData.filter((student) => student.officialClass.toLowerCase().includes(this.searchBy.toLowerCase().replace(/ /g,""))))
            }
            if(this.store.currentFilter == "Grade"){
                            this.store.updateFilteredStudentData(this.store.allStudentData.filter((student) => student.grade.includes(this.searchBy.toLowerCase().replace(/ /g,""))))
            }
      
        },

        selectFilter(param: string){
            this.store.updateCurrentFilter(param)
            this.filterStatus = !this.filterStatus
            console.log(this.store.currentFilter)
        }
    },
    computed:{
        allData(){
            const data = this.store.allStudentData
            
        },
    }
})
</script>

<style scoped>

.top{
    width: 100%;

}
.input{
    width: 50%;
    height: 3rem;
    font-size: 2.5rem;
}

li{
    font-size: 3rem;
}

</style>