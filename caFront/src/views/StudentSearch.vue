<template>
    <div>
        <h2>
            Student Search
        </h2>

        <section class="top">
            <input type="text">
        </section>
        <div>
            {{store.allStudentData }}
        </div>
        <tableData :headings="[]"></tableData>


    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {studentStore} from "../stores/studentSearch"
import tableData from '@/components/tableData.vue'
export default defineComponent({
    components:{
        tableData
    },
    setup () {
        const store = studentStore()
        store.getAllStudentData()

     
        return {
            store, 
        }
    }
})
</script>

<style scoped>

</style>