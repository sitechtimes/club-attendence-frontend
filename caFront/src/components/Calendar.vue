<template>
    <div>
        <FullCalendar :options="calendarOptions" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@fullcalendar/core/vdom' 
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
    export default defineComponent( {
        name: 'Calendar',
        components:{
            FullCalendar
        },
        data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth'
      }
    }
  }
    })
</script>

<style>

</style>