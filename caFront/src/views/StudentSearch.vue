<template>
    <div>
        <h2>
            Student Search
        </h2>

        <section class="top">
            <input v-model="searchBy" class="input" type="text" @input="logValue">
            <button @click="changeFilter" class="dropdown">filter</button>
                <li v-if="filterStatus == true" class="choices" @click="selectFilter(heading)" v-for="heading in head" >{{ heading }}</li>
        </section>
       <studentSearchTable :theData="store.allStudentData" :headings="head" ></studentSearchTable>



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
        const currentFilter = ref("name")
        console.log(filterStatus)

        return {
            store, head, searchBy, filterStatus, currentFilter
        }
    },
    methods:{
        changeFilter(){
            this.filterStatus = !this.filterStatus
            console.log(this.filterStatus, this.searchBy)
        },

        logValue(){
            console.log(this.searchBy)
        },

        selectFilter(param: string){
            this.currentFilter = param
            console.log(this.currentFilter)
        }
    },
    computed:{
        allData(){
            const data = this.store.allStudentData
            
        }
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

</style>