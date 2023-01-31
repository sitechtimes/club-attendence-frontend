<template>
  <div class="home">
    <div class="nav">
      <img
        id="cpic"
        src="https://cdn-icons-png.flaticon.com/512/4320/4320241.png"
        alt=""
      />
      <Button @click="clubActivity.showModal()">
        <h3>{{ currentDate() }}</h3>
      </Button>
    </div>

    <div class="clublist">
      <Card
        v-for="club in clubs"
        :name="club.clubName"
        :position="club.position"
        :key="club.clubCode"
      >
      </Card>
    </div>
    <div class="overlap">
      <Modal v-show="clubActivity.isModalVisible"></Modal>
    </div>
    <ClubActivity />
  </div>
</template>

<script lang="ts">
import Card from "../components/Card.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import Camera from "../components/Camera.vue";
import { defineComponent } from "vue";
import { useUserDataStore } from "../stores/userData";
import { useClubActivity } from "../stores/clubActivity";
import Calendar from "../components/Calendar.vue";
import ClubActivity from "../components/ClubActivity.vue";

export default defineComponent({
  name: "ClubView",
  components: {
    Card,
    Button,
    Modal,
    Calendar,
    ClubActivity,
    Camera,
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${
        current.getMonth() + 1
      }/${current.getDate()}/${current.getFullYear()}`;
      return date;
    },
  },
  setup() {
    const userDataStore = useUserDataStore();
    const clubActivity = useClubActivity();
    const clubs = userDataStore.user!.positionOfClub;

    return { userDataStore, clubs, clubActivity };
  },
});
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f3c87c;
  height: 10rem;
  width: 100%;
}
#cpic {
  height: 50px;
  width: 50px;
}
.clublist {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
</style>
