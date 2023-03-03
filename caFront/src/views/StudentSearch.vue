<template>
    <div>
        <h2>
            Student Search
        </h2>

        <section class="top">
            <input type="text">
        </section>


    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {studentStore} from "../stores/studentSearch"
export default defineComponent({
    setup () {
        const store = studentStore()
        store.getAllStudentData()
        return {
            store
        }
    }
})
</script>

<style scoped>

</style>