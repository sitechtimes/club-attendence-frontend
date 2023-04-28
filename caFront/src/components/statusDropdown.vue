<template  >


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
  width: 10rem;
  height: 4rem;
  padding: 1rem;
  text-align: center;
  background: #FFFFFF;
  magin:auto;
border: 1px solid #D0D0D0;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 10px;
display: flex;
align-items: center;


}

.status{
  text-align: center;
  align-items: center;
}
/* CSS */
/* button {
  align-items: center;
  background: #FFFFFF;
  border: 0 solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  color: #1A202C;
  display: inline-flex;
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  height: 56px;
  justify-content: center;
  line-height: 24px;
  overflow-wrap: break-word;
  padding: 24px;
  text-decoration: none;
  width: auto;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
} */
</style>