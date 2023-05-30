<template>
  <div @click="store.getClubData(clubCode)" class="clubBox">
    <h1 class="clubName">{{ ClubName }}</h1>

    <div class="bot">
      <h2 class="advisor">Advisor: {{ Advisor }}</h2>
      <h2 class="room">Room #: {{ Room }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { teacherStore } from "@/stores/teacherVueStore";

export default defineComponent({
  props: {
    ClubName: String,
    Advisor: String,
    Room: String || Number,
    clubCode: String,
  },
  setup() {
    const store = teacherStore();

    return {
      store,
    };
  },
  methods: {},
});
</script>

<style scoped>
.clubBox {
  height: 15%;
  width: 100%;

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
    width: 33%;
    margin-right: 1rem;
  }
  .app {
    width: 300px;
  }
}
</style>
