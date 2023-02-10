<template>
  <div @click="store.getClubData(clubCode)" class="clubBox">
    <h2 class="clubName">{{ ClubName }}</h2>

    <div class="bot">
      <h3 class="advisor">Advisor: {{ Advisor }}</h3>
      <h3 class="room">Room #: {{ Room }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { teacherStore } from '@/stores/teacherVueStore'

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
  methods: {


    
  },
});
</script>

<style scoped>
.clubBox {
  height: 15%;
  width: 100%;
  background-color: rgb(240, 240, 240);
  margin-top: 0.7rem;

  border-radius: 0.4rem;
  padding: 1rem;
  font-size: 3rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
.bot {
  display: flex;
}
.advisor {
  margin-right: 1rem;
}
</style>
