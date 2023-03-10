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



    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {studentStore} from "../stores/studentSearch"
import studentSearchTable from '@/components/studentSearchTable.vue'
export default defineComponent({
    components:{
        
    },
    setup () {
        const store = studentStore()
        store.getAllStudentData()
        const head = ["Name","Email","Grade","Official Class","Osis"]
     
        return {
            store, head
        }
    }
})
</script>

<style scoped>

</style>