<template>
    <div>
        <FullCalendar :options="calendarOptions" />
    </div>
</template>

<script lang="ts">
import {reactive} from 'vue'
import FullCalendar from '@/fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { defineComponent } from 'vue';

export default defineComponent({
  name:'Calendar',
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth'
      }
    }
  }
})
</script>

<style>

</style>