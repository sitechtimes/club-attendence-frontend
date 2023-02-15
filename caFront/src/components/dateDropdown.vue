<template>
    <div class="dropdown" >
        <button @click="store.datesButton = !store.datesButton" >{{ store.datesCurrent }}</button>
        <div v-if="store.datesButton == true"  class="dates">
            <button @click="store.fetchAttendance(dates)" v-for="dates in store.listOfDates" >{{ dates }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { teacherStore } from '@/stores/teacherVueStore';

export default defineComponent({
    setup () {
        props:{
            
        }
        const store = teacherStore()

        return {store, }
    }
})
</script>

<style scoped>

</style>