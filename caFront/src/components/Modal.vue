<template>
  <div class="modal-backdrop">
    <div class="calendar">
      <Button @click="close">Close></Button>
<Calendar></Calendar>
   
    </div>
 


  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Calendar from '../components/Calendar.vue'
import Button from '../components/Button.vue'
  export default defineComponent( {
    name:'Modal',
    components: {
      Button,
      Calendar
    },
    props: [],
    methods: {
      close() {
        this.$emit('close');
      },
    },
  })
</script>

<style>
.modal{
  height: 10rem;
  width: 10rem;
}

.calendar {
  background: #2b4450;
  height: 60rem;
  width: 100rem;
  border-radius: 4px;
  position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
}
</style>