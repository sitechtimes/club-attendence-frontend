<template>
  <div class="home">
    <div class="nav">
      <Button @click="clubActivity.showModal()">
        <h3>{{ currentDate() }}</h3>
      </Button>
    </div>

    <div class="clublist">
      <Card
        v-for="club in clubs"
        :clubName="club.clubName"
        :position="club.position"
        :clubCode="club.clubCode"
        :meetingDates="club.meetingDates"
        :key="club.clubCode"
      >
      </Card>
    </div>
    <div class="scan">
      <Camera v-show="clubActivity.isCameraVisible"></Camera>
    </div>

    <div class="overlap">
      <Modal v-show="clubActivity.isModalVisible"></Modal>
    </div>
    <div class="test">
      <UploadImage v-show="clubActivity.isUploadVisible"> </UploadImage>
    </div>

    <ClubActivity />
  </div>
</template>

<script lang="ts">
import Card from "../components/ClubCard.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import Camera from "../components/Camera.vue";
import { defineComponent } from "vue";
import { useUserDataStore } from "../stores/userData";
import { useClubActivity } from "../stores/clubActivity";
import Calendar from "../components/Calendar.vue";
import ClubActivity from "../components/ClubActivity.vue";
import UploadImage from "../components/uploadImage.vue";

export default defineComponent({
  name: "ClubView",
  components: {
    Card,
    Button,
    Modal,
    Calendar,
    ClubActivity,
    Camera,
    UploadImage,
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
    const clubs = userDataStore.user!.clubData;
    return { userDataStore, clubs, clubActivity };
  },
});
</script>

<style scoped>
.nav {
  display: block;
  display: flex;
  justify-content: end;
  padding-right: 5rem;
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
@media (max-width: 1150px) {
  .nav {
    display: flex;
    justify-content: center;
  }
}
</style>
