<template>
  <div class="page">
    <div class="top">
      <div class="left">
        <input v-model="input" type="text" />
        <h2>Filter By Date:</h2>
        <dropdown
          :changeStatus="changeDate"
          :status="date"
          :changeFilter="changeFilterDate"
          :currentFilter="currentFilterDate"
          :prop="filtersDate"
        ></dropdown>
      </div>
      <div class="right">
        <h2>Filter By:</h2>
        <dropdown
          class="drop"
          :changeStatus="changeAttendance"
          :changeFilter="changeFilterAttendance"
          :currentFilter="currentFilterAttendance"
          :status="attendance"
          :prop="filtersAttendance"
        ></dropdown>
      </div>
    </div>

    <div class="bottom">
      <section v-if="store.loading" class="left">
        <h1>Loading...</h1>
      </section>

      <section class="left">
        <clubBox
          v-for="club in clubData"
          :key="club.clubName"
          :ClubName="club.clubName"
          :Advisor="club.advisor"
          :Room="club.roomNumber"
          :clubCode="club.clubCode"
        ></clubBox>
      </section>
      <section class="right">
        <tableData v-if="(store.selectedClub = true)">
          :headings="headings" :theData="showAllStudents"
        </tableData>

        <!-- <tableData
          :headings="headings"
          :theData="returnStudentData"
        ></tableData> -->
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/stores/counter";
import specificClub from "../assets/specificClub.json";
import studentData from "../assets/fakeData2.json";
import clubBox from "../components/ClubBox.vue";
import tableData from "../components/tableData.vue";
import dropdown from "../components/absentDropdown.vue";

export default defineComponent({
  components: {
    clubBox,
    tableData,
    dropdown,
  },
  setup() {
    const store = useStore();
    store.getData();

    const input = ref<string>("");
    const filtersAttendance: Array<string> = ["Absent", "Present"];
    const filtersDate: Array<string> = ["1/4", "1.2"];
    const currentFilterAttendance = ref<string>("All");
    const currentFilterDate = ref<string>("1/4");
    const attendance = ref<boolean>(false);
    const date = ref<boolean>(false);
    const headings = ["Osis", "Name", "Grade", "Class"];

    return {
      headings,
      studentData,
      input,
      filtersAttendance,
      currentFilterAttendance,
      attendance,
      date,
      currentFilterDate,
      filtersDate,
      store,
    };
  },

  methods: {
    changeFilterAttendance(param: string) {
      this.currentFilterAttendance = param;
      this.changeAttendance();
    },
    changeFilterDate(param: string) {
      this.currentFilterDate = param;
      this.changeDate();
    },
    changeAttendance() {
      this.attendance = !this.attendance;
    },
    changeDate() {
      this.date = !this.date;
    },
  },

  computed: {
    clubData(): Array<object> {
      return this.store.clubList.filter((club) =>
        club.clubName.toLowerCase().includes(this.input.toLowerCase())
      );
    },

    showAllStudents() {
      return this.store.currentAttendance;
    },

    returnStudentData(currentList: object) {
      if (this.currentFilterAttendance == "Present") {
        console.log(
          this.studentData.filter((student) => student.present == true)
        );

        return this.studentData.filter((student) => student.present == true);
      } else if (this.currentFilterAttendance == "Absent") {
        console.log(
          this.studentData.filter((student) => student.present == false)
        );
        return this.studentData.filter((student) => student.present == false);
      } else if (this.currentFilterAttendance == "All") {
        console.log(this.studentData);
        return this.studentData;
      }
    },
  },
});
</script>

<style scoped>
input {
  font-size: 2rem;
  border-radius: 0.4rem;
  width: 100%;
  height: 4rem;
  padding: 1rem;
}
.page {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 4rem;
}
.top {
  height: 20vh;
  display: flex;
  font-size: 4rem;
}
.bottom {
  display: flex;
  width: 100%;
  height: 80vh;
}
.left {
  width: 30%;
  overflow-y: auto;
  position: relative;
  padding: 1rem;
}

.left::-webkit-scrollbar {
  display: none;
}
.right {
  width: 70%;
  overflow-y: auto;
}

.right::-webkit-scrollbar {
  display: none;
}

.head {
  font-size: 5rem;
}
.drop {
  position: absolute;
  z-index: 2;
}
</style>
