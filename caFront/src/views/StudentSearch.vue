<template>
    <div>
        <h2>
            Student Search
        </h2>

        <section class="top">
            <input type="text">
        </section>
       <studentSearchTable :theData="store.allStudentData" :headings="head" ></studentSearchTable>



    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
        
        return {
            store, head
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

</style>