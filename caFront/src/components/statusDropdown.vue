<template>
    <button class="dropdown" @click="store.statusButton = !store.statusButton" >{{ store.statusFilterCurrent }}</button>
    <div v-if="store.statusButton" class="status">
        <li class="choices" v-for="stat in status" @click="store.filterStatus(stat)" >{{ stat }}</li>
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
.dropdown {
    position: relative;
    display: inline-block;
    background-color: #ddd;
    height: 7rem;
    width: 10rem;
    color: #444;
    font-size: 16px;
    border: none;
    padding: 10px;
    border-radius: 4px 4px 4px 4px;
    margin-right: 1rem;
   
  }

  
  .choices-container {
    
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
    border-radius: 0 0 4px 4px;
    padding: 0;
    margin: 0;
  }
  
  .choices {
    padding: 10px;
    font-size: 16px;
    color: #444;
    cursor: pointer;
    list-style-type: none;
  }
  
  .choices:hover {
    background-color: #f2f2f2;
  }
  
</style>