<template>
  <div
    @click="store.getClubData(clubCode, userStore.user, ClubName)"
    class="clubBox"
  >
    <div class="app">
      <div class="top">
        <h2 class="clubName">{{ ClubName }}</h2>
      </div>
      <div class="bot">
        <h3 class="advisor">Advisor: {{ Advisor }}</h3>
        <h3 class="room">Room #: {{ Room }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserDataStore } from "@/stores/userData";
import { teacherStore } from "@/stores/teacherVueStore";

export default defineComponent({
  props: {
    ClubName: {
      type: String,
      required: true,
    },
    Advisor: String,
    Room: String || Number,
    clubCode: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = teacherStore();
    const userStore = useUserDataStore();
    return {
      store,
      userStore,
    };
  },
  methods: {},
});
</script>

<style scoped>
.clubBox {
  height: 15%;

  margin-top: 0.7rem;

  padding: 1rem;

  background: #ffffff;
  border: 1px solid #d0d0d0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
}
.bot {
  display: flex;
  text-align: left;
  font-size: 3rem;
}
.advisor {
  margin-right: 4rem;
  font-weight: 300;
}
.room {
  font-weight: 300;
}
.clubName {
  text-align: left;
  font-weight: 400;
  font-size: 2rem;
}

@media (max-width: 1700px) {
  .clubName {
    font-size: 2rem;
  }
  .bot {
    font-size: 2rem;
  }
}

@media (max-width: 1600px) {
  .clubBox {
    height: 10rem;
    margin-right: 1rem;
  }
  .app {
    width: 300px;
  }
}
</style>
