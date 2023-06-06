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
import { computed, defineComponent, ref, onMounted } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import miniButton from "../components/miniButton.vue";
import "v-calendar/style.css";

type club = {
  clubName: string;
  meetingDates: string[];
};

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
    const transformedArray = ref<club[]>([]);

    onMounted(() => {
      if (clubData !== null) {
        transformedArray.value = clubData.map((club) => {
          if (club.meetingDates[0] === "No meeting date yet.") {
            club.meetingDates = [];
          }
          return {
            clubName: club.clubName,
            meetingDates: club.meetingDates,
          };
        });
      }

      console.log(transformedArray);
    });

    // let newClubData = ref(objectData.user?.clubData);

    let attrs;

    if (objectData.user?.clubData === null) {
      attrs = null;
    } else {
      attrs = computed(() => [
        // Attributes for todos
        ...transformedArray.value!.map((clubData) => ({
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
  top: 28rem;
  right: 28rem;
}

@media (max-width: 1250px) {
  .static {
    z-index: 11;
    position: fixed;
    top: 24rem;
    right: 16rem;
  }
}

@media (max-width: 1050px) {
  .my-calendar :deep(.vc-container) {
    height: 43rem;
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
    bottom: -5rem;
    right: 30rem;
  }
}
@media (max-width: 700px) {
  .static {
    bottom: -5rem;
    right: 10rem;
  }
}
@media (max-width: 500px) {
  .my-calendar :deep(.vc-container) {
    height: 42rem;
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
    bottom: -5rem;
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
