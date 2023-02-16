<template>
    <button @click="store.statusButton = !store.statusButton" >{{ store.statusFilterCurrent }}</button>
    <div v-if="store.statusButton" class="status">
        <button v-for="stat in status" @click="store.filterStatus(stat)" >{{ stat }}</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { teacherStore } from '@/stores/teacherVueStore'

export default defineComponent({
    setup () {
        const store = teacherStore()
        const status = ["All", "Present", "Absent"]

        return {status, store}
    }
})
</script>

<style scoped>

</style>