<template>
  <div>
    <h2>Student Search</h2>

    <section class="top">
      <input v-model="searchBy" class="input" type="text" @input="logValue" />
      <button @click="changeFilter" class="dropdown">
        {{ store.currentFilter }}
      </button>
      <li
        v-if="filterStatus == true"
        class="choices"
        @click="selectFilter(heading)"
        v-for="heading in head"
      >
        {{ heading }}
      </li>
    </section>
    <studentSearchTable
      :theData="store.filteredStudentData"
      :headings="head"
    ></studentSearchTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { studentStore } from "../stores/studentSearch";
import studentSearchTable from "@/components/studentSearchTable.vue";
import { useUserDataStore } from "@/stores/userData";
export default defineComponent({
  components: {
    studentSearchTable,
  },
  async setup() {
    const userDataStore = useUserDataStore;
    const store = studentStore();
    await store.getAllStudentData(userDataStore?.user);
    const head = ["Osis", "Name", "Email", "Grade", "Official Class"];
    const searchBy = ref("");
    const filterStatus = ref(false);

    console.log(filterStatus);

    return {
      store,
      head,
      searchBy,
      filterStatus,
    };
  },
  methods: {
    changeFilter() {
      this.filterStatus = !this.filterStatus;
      console.log(this.filterStatus, this.searchBy);
    },

    logValue() {
      console.log(this.searchBy);

      if (this.store.currentFilter == "Name") {
        this.store.updateFilteredStudentData(
          this.store.allStudentData.filter((student) =>
            (student.firstName + student.lastName)
              .replace(/ /g, "")
              .toLowerCase()
              .includes(this.searchBy.toLowerCase().replace(/ /g, ""))
          )
        );
      }
      if (this.store.currentFilter == "Osis") {
        this.store.updateFilteredStudentData(
          this.store.allStudentData.filter((student) =>
            student.osis.toLowerCase().includes(this.searchBy.replace(/ /g, ""))
          )
        );
      }
      if (this.store.currentFilter == "Email") {
        this.store.updateFilteredStudentData(
          this.store.allStudentData.filter((student) =>
            student.email
              .toLowerCase()
              .includes(this.searchBy.toLowerCase().replace(/ /g, ""))
          )
        );
      }
      if (this.store.currentFilter == "Official Class") {
        this.store.updateFilteredStudentData(
          this.store.allStudentData.filter((student) =>
            student.officialClass
              .toLowerCase()
              .includes(this.searchBy.toLowerCase().replace(/ /g, ""))
          )
        );
      }
      if (this.store.currentFilter == "Grade") {
        this.store.updateFilteredStudentData(
          this.store.allStudentData.filter((student) =>
            student.grade.includes(
              this.searchBy.toLowerCase().replace(/ /g, "")
            )
          )
        );
      }
    },

    selectFilter(param: string) {
      this.store.updateCurrentFilter(param);
      this.filterStatus = !this.filterStatus;
      console.log(this.store.currentFilter);
    },
  },
  computed: {
    allData() {
      const data = this.store.allStudentData;
    },
  },
});
</script>

<style scoped>
.top {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 50px;
  margin-left: 1rem;
}

.input {
  border: 1px solid black;
  padding: 1rem;
  margin-right: 2rem;
  font-size: 2rem;
  border-radius: 4px 4px 4px 4px;
}

.dropdown {
  position: relative;
  display: inline-block;
  background-color: #ddd;
  height: 100%;
  color: #444;
  font-size: 16px;
  border: none;
  padding: 10px;
  border-radius: 4px 4px 4px 4px;
  margin-right: 1rem;
}

.choices-container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 0 0 4px 4px;
  padding: 0;
  margin: 0;
}

.choices {
  padding: 10px;
  font-size: 16px;
  color: #444;
  cursor: pointer;
  list-style-type: none;
}

.choices:hover {
  background-color: #f2f2f2;
}

@media (max-width: 768px) {
  /* Styles for screens smaller than 768px */
  .top {
    flex-wrap: wrap;
    height: auto;
    margin: 0.5rem;
    justify-content: center;
  }

  .input {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .dropdown {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .choices-container {
    position: static;
    width: 100%;
    max-height: none;
    overflow-y: visible;
  }
}

@media (max-width: 576px) {
  /* Styles for screens smaller than 576px */
  .input {
    font-size: 1.5rem;
  }

  .dropdown {
    font-size: 1.2rem;
  }

  .choices {
    font-size: 1.2rem;
  }
}
</style>
