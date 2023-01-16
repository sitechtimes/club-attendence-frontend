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
        v-for="club in clubs"
        :key="club.name"
        :name="club.name"
        :date="club.date"
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
      clubs: [
        {
          name: "Key Club",
          date: "Next Meeting Date: 12/3/2022",
        },
        {
          name: "Self Defense Club",
          date: "Next Meeting Date: 12/3/2022",
        },
        {
          name: "Chinese Culture Club",
          date: "Next Meeting Date: 12/3/2022",
        },
        {
          name: "Chinese Culture Club",
          date: "Next Meeting Date: 12/3/2022",
        },
        {
          name: "Chinese Culture Club",
          date: "Next Meeting Date: 12/3/2022",
        },
        {
          name: "Chinese Culture Club",
          date: "Next Meeting Date: 12/3/2022",
        },
        {
          name: "Chinese Culture Club",
          date: "Next Meeting Date: 12/3/2022",
        },
      ],
    };
  },

  setup() {
    const userDataStore = useUserDataStore();
    async function getData() {
      // Default options are marked with *
      await fetch("http://localhost:3000/")
        .then((returnData) => {
          return returnData.json();
        })
        .then((data) => {
          // `data` is the parsed version of the JSON returned from the above endpoint.
          console.log(data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
        });
    }
    return { getData };
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
