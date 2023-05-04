<template>

  <div class="dropdown">

    <button class="button"  @click="store.datesButton = !store.datesButton" >{{ store.datesCurrent }}</button>
    <div v-if="store.datesButton == true" class="status">
        <li class="choices" @click="store.fetchAttendance(dates)" v-for="dates in store.listOfDates" >{{ dates }}</li>
    </div>
  </div>
   




</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { teacherStore } from '@/stores/teacherVueStore';

export default defineComponent({
    setup () {

        const store = teacherStore()

        return {store, }
    }
})
</script>

<style scoped>
.dropdown{
  position: relative;
  margin-left: 3rem;
  margin-right: 2rem;
}

.button {
  width: 14rem;
  height: 4rem;
  font-size: 100%;
  padding: 1rem;
  text-align: center;
  background: #FFFFFF;
  magin:auto;
border: 1px solid #D0D0D0;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 10px;
display: flex;
align-items: center;
position: relative;


}

.status{
  text-align: center;
  align-items: center;
  position: absolute;
  padding: 10px;
  overflow-y: auto;
  width: 150%;
  text-align: center;
  background: #FFFFFF;
  margin:auto;
  z-index: 5;
border: 1px solid #D0D0D0;
border-radius: 5px;

}
.status li{
  font-size: 2rem;
  position: relative;
  margin: auto;
  font-weight: 300;
  text-align: left;
} 

.choices{
  list-style-type: none;
}


</style>