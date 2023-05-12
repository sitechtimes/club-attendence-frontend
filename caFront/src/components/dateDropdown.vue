<template>

  <div class="dropdown2">

    <button class="button2"  @click="store.datesButton = !store.datesButton" >{{ store.datesCurrent }}</button>
    <div v-if="store.datesButton == true" class="status">
        <li class="choices2" @click="store.fetchAttendance(dates)" v-for="dates in store.listOfDates" >{{ dates }}</li>
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
.dropdown2{
  position: relative;
  margin-left: 2rem;
  margin-right: 2rem;
}

.button2 {
  width: 10rem;
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
  width: 150%;
  text-align: center;
  background: #FFFFFF;
  margin:auto;
  z-index: 5;
border: 1px solid #D0D0D0;
border-radius: 5px;
padding-top: 10px;
padding-bottom: 10px;
}


.choices2{
  position: relative;
  list-style-type: none;
  font-weight: 300;
  padding-left: 10px;
  padding-right: 10px;
  margin: auto;
  text-align: left;
  font-size: 2rem;
}

.choices2:hover{
  background-color:#dbdbdb;
}

</style>