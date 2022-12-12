<template>
  <div class="modal-backdrop">
    
<Calendar></Calendar>
    <Button @click="close">Close Modal></Button>

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


.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}
</style>