<template>
  <div class="my-calendar">
    <Calendar expanded :attributes="attrs" title-position="right" />

    <miniButton class="static" @click="clubActivity.closeModal()">
      x
    </miniButton>
  </div>
</template>

<script lang="ts">
import { Calendar, DatePicker } from "v-calendar";
import { useUserDataStore } from "../stores/userData";
import { defineComponent, onMounted } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import { ref } from "vue";
import miniButton from "../components/miniButton.vue";
import "v-calendar/style.css";

export default defineComponent({
  name: "NewCalendar",
  components: {
    Calendar,
    DatePicker,
    miniButton,
  },
  data() {
    return {};
  },

  setup() {
    const objectData = useUserDataStore();
    const user = objectData.user;
    const clubData = user!.clubData;
    const allDates: Array<string> = [];
    const attrs: any = ref();
    onMounted(() =>
      clubData.forEach((element: any) => {
        for (let i = 0; element.meetingDates.length > i; i++) {
          console.log(element.meetingDates[i]);
          allDates.push(element.meetingDates[i]);
        }
        console.log(allDates);
        attrs.value = [
          {
            key: "allDates",
            highlight: true,
            dates: allDates,
          },
        ];
      })
    );

    const clubActivity = useClubActivity();
    return { clubActivity, clubData, allDates, objectData, attrs };
  },
});
</script>

<style scoped>
.my-calendar :deep(.vc-weekday-1, .vc-weekday-7) {
  color: #6366f1;
}
.my-calendar {
  height: fit-content;
  width: 80rem;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 10;
}
.my-calendar :deep(.vc-title) {
  font-size: 7rem;
  margin-right: 20rem;
  background: none;
  color: inherit;
}

.my-calendar :deep(.vc-arrow) {
  font-size: 7rem;
  background: none;
  color: inherit;
}
.my-calendar :deep(.vc-header) {
  margin-bottom: 5rem;
}

.static {
  position: fixed;
  top: 2rem;
  right: 2rem;
}
</style>
