<template>
  <div class="page">
    <div class="top">
      <div class="left">
        <input v-model="input" type="text" />
        <h2>Filter By Date:</h2>
        <absentDropdown
          :changeStatus="changeDate"
          :status="date"
          :changeFilter="changeFilterDate"
          :currentFilter="currentFilterDate"
          :prop="store.listOfDates"
          :getAttendanceAtDate="true"
        ></absentDropdown>
      </div>
      <div class="right">
        <h2>Filter By:</h2>
        <absentDropdown
          class="drop"
          :changeStatus="changeAttendance"
          :changeFilter="changeFilterAttendance"
          :currentFilter="currentFilterAttendance"
          :status="attendance"
          :prop="filtersAttendance"
        ></absentDropdown>
      </div>
    </div>

    <div class="bottom">
      <section v-if="(store.loading = false)">Loading...</section>
      <section v-if="clubData" class="left">
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
        <div v-if="store.selectedClub">{{ store.currentAttendance }}</div>

        <tableData
          v-if="store.filterDate == null"
          :headings="headings"
          :theData="store.currentAttendance"
        ></tableData>

        <tableData
          v-if="store.filterDate"
          :headings="headings"
          :theData="returnStudentData"
        ></tableData>
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
import absentDropdown from "../components/absentDropdown.vue";

export default defineComponent({
  components: {
    clubBox,
    tableData,
    absentDropdown,
  },
  setup() {
    const store = useStore();
    store.getData();

    const input = ref<string>("");
    const filtersAttendance: Array<string> = ["All", "Absent", "Present"];
    const filtersDate: Array<string> = ["1/4", "1.2"];
    const currentFilterAttendance = ref<string>("All");
    const currentFilterDate = ref<string>("Select Date");
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
      this.store.pushFilterDate(param);
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
      console.log(this.store.clubList)
      return this.store.clubList.filter((club) =>
        club.clubName.toLowerCase().includes(this.input.toLowerCase())
      );
    },


    returnStudentData(): Array<object> | undefined {
      if (this.currentFilterAttendance == "Present") {
        return this.store.attendanceAtDate.filter(
          (student) => student.status == "present"
        );
      } else if (this.currentFilterAttendance == "Absent") {
        return this.store.attendanceAtDate.filter(
          (student) => student.status == "absent"
        );
      } else if (this.currentFilterAttendance == "All") {
        return this.store.attendanceAtDate;
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
  font-size: 4rem;
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
