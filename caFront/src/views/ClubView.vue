<template>
  <div class="home">
    <div class="nav">
      <img
        id="cpic"
        src="https://cdn-icons-png.flaticon.com/512/4320/4320241.png"
        alt=""
      />
      <Button @click="showModal">
        <h3>12/03/2022</h3>
      </Button>
    </div>

    <div class="clublist">
      <Card
        v-for="positionOfClub in userDataStore.user"
        :key="positionOfClub.clubCode"
      >
      </Card>
      <div class="overlap">
        <Modal v-show="isModalVisible" @close="closeModal"></Modal>
      </div>
    </div>
    <ClubActivity />
  </div>
</template>

<script lang="ts">
import Card from "../components/Card.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import { defineComponent } from "vue";
import { useUserDataStore } from "../stores/userData";
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
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
  data: () => {
    return {
      isModalVisible: false,
    };
  },

  setup() {
    const userDataStore = useUserDataStore();
    
    type UserObject = {
      email: string;
      emailDomain: string;
      firstName: string;
      grade: string;
      lastName: string;
      officalClass: string;
      osis: string;
      positionOfClub: [
        {
          clubCode: string;
          clubName: string;
          postion: string;
        }
      ];
      type: string;
      uid: string;
    };

    return { userDataStore };
  },
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
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
  display: grid;
  align-content: center;
  grid-template-columns: auto auto auto;
}
</style>
