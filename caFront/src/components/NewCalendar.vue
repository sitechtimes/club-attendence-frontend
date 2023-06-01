<template>
  <div class="my-calendar">
    <VCalendar :attributes="attrs" />

    <miniButton class="static" @click="clubActivity.closeModal()">
      x
    </miniButton>
  </div>
</template>

<script lang="ts">
import { Calendar, DatePicker } from "v-calendar";
import { useUserDataStore } from "../stores/userData";
import { computed, defineComponent, ref } from "vue";
import { useClubActivity } from "../stores/clubActivity";
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
  computed: {},
  setup() {
    const objectData = useUserDataStore();
    const user = objectData.user;
    const clubData = user!.clubData;
    const allDates: Array<string> = [];

    let newClubData = ref(objectData.user?.clubData);

    let attrs;

    if (objectData.user?.clubData === null) {
      attrs = null;
    } else {
      attrs = computed(() => [
        // Attributes for todos
        ...newClubData.value!.map((clubData) => ({
          dates: clubData.meetingDates,
          popover: {
            label: clubData.clubName,
          },
          highlight: true,
        })),
      ]);
    }

    const clubActivity = useClubActivity();
    return { clubActivity, clubData, allDates, objectData, attrs };
  },
});
</script>

<style scoped>
.my-calendar :deep(.vc-weekday-1, .vc-weekday-7) {
  color: #6366f1;
}

.my-calendar :deep(.vc-title) {
  font-size: 7rem;

  background: none;
  color: inherit;
}
.my-calendar :deep(.vc-container) {
  width: 100rem;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 10;
}

.my-calendar :deep(.vc-arrow) {
  font-size: 7rem;
  margin-left: 30rem;
  margin-right: 30rem;
  background: none;
  color: inherit;
}
.my-calendar :deep(.vc-header) {
  margin-bottom: 3rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
}

.my-calendar :deep(.vc-popover-content-wrapper is-interactive) {
  display: flex;
  align-content: center;
}

.static {
  z-index: 11;
  position: fixed;
  top: 29rem;
  right: 28rem;
}

@media (max-width: 1250px) {
  .static {
    z-index: 11;
    position: fixed;
    top: 30rem;
    right: 20 rem;
  }
}

@media (max-width: 1050px) {
  .my-calendar :deep(.vc-container) {
    height: 37rem;
    width: 50rem;
  }
  .my-calendar :deep(.vc-arrow) {
    font-size: 7rem;
    margin-left: 18rem;
    margin-right: 18rem;
    background: none;
    color: inherit;
  }
  .static {
    z-index: 11;
    position: fixed;
    bottom: 2rem;
    right: 27rem;
  }
}
@media (max-width: 700px) {
  .static {
    bottom: 1rem;
    right: 10rem;
  }
}
@media (max-width: 500px) {
  .my-calendar :deep(.vc-container) {
    height: 38rem;
    width: 35rem;
  }
  .my-calendar :deep(.vc-title) {
    font-size: 4rem;
  }

  .my-calendar :deep(.vc-arrow) {
    font-size: 4rem;
    margin-left: 10rem;
    margin-right: 10rem;
  }
  .static {
    z-index: 11;
    position: fixed;
    bottom: -4rem;
    right: 8rem;
  }
}
@media (max-width: 375px) {
  .static {
    z-index: 11;
    position: fixed;
    bottom: -5rem;
    right: 3rem;
  }
}
</style>
