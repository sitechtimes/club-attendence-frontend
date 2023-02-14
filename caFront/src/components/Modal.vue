<template>
  <div class="modal-backdrop">
    <div class="calendar">
      <Calendar></Calendar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import Calendar from "../components/Calendar.vue";
import Button from "../components/Button.vue";
export default defineComponent({
  name: "Modal",
  components: {
    Button,
    Calendar,
  },
  setup() {
    const clubActivity = useClubActivity();

    return { clubActivity };
  },
});
</script>

<style>
.calendar {
  background: #2b4450;
  height: 60rem;
  width: 100rem;
  border-radius: 3rem;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  position: fixed;
}
</style>
