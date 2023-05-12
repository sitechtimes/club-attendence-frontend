<template>
    <div>
        <div class="drop">{{ store.currentFilter }}</div>
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { studentStore } from '@/stores/studentSearch';
export default defineComponent({
    setup () {
        const store = studentStore()


        return {store}
    }
})
</script>

<style scoped>

</style>