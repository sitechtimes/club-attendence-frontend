<template>

  <div class="page">
    
    <RouterLink to="/club"> <miniButton></miniButton></RouterLink>
    <section class="top">
      <div class="right">
        <input v-model="input" type="text" />
      </div>

      <div class="top-right ">
        <statusDropdown></statusDropdown>
        <dateDropdown></dateDropdown>
      </div>

    </section>
    <section class="bottom">
      <div v-if="clubData" class="left">
        <clubBox
          v-for="club in clubData"
          :key="club.clubName"
          :ClubName="club.clubName"
          :Advisor="club.advisor"
          :Room="club.roomNumber"
          :clubCode="club.clubCode"
        ></clubBox>
      </div>
      <div class="table-right">


        <tableData v-if="store.selectedStatus"
          :headings="headings"
          :theData="store.filteredAttendance"
        ></tableData>
        <tableData v-if="!store.selectedStatus"
          :headings="headings"
          :theData="store.currentAttendance"
        ></tableData>



      </div>

    </section>


  </div>
</template>
<script lang="ts">

import { defineComponent, ref } from 'vue'
import { teacherStore } from '@/stores/teacherVueStore'
import { useUserDataStore } from '@/stores/userData'
import clubBox from '@/components/ClubBox.vue'
import tableData from '@/components/tableData.vue'
import dateDropdown from '@/components/dateDropdown.vue'
import statusDropdown from '@/components/statusDropdown.vue'
import miniButton from '@/components/miniButton.vue'

interface eachClub {
    advisor: string;
    advisorEmail: string;
    clubCode: string;
    clubName:string;
    clubSpreadsheetId:string;
    memberCount: string;
    nextMeeting: string;
    president: string;
    presidentEmail: string;
    presidentUID: string;
    qeCode: string;
    roomNumber: string;
  }

export default defineComponent({
  components:{
    clubBox, tableData, dateDropdown, statusDropdown, miniButton

  },
  setup(props) {
    const present = "present";
    const absent = "absent";
    const numColumn = props.headings.length;
    return { present, absent, numColumn };
  },
});
</script>
<style scoped>
h2 {
  font-weight: 400;
}
.table {
  display: grid;
  grid-template-columns: repeat(v-bind(numColumn), auto);
  font-size: 7rem;
}
.card {
  display: flex;
  flex-direction: column;
}
.header {
  padding: 1rem;
  position: sticky;
  z-index: 2;
  top: 0;
  background-color: white;
}
.row {
  height: 5rem;
  display: contents;
}
.test {
  display: inherit;
}
.asset {
  padding: 20px;
  font-size: 3rem;
}
.present .asset {
  background-color: rgb(130, 255, 130);
}
.absent .asset {
  background-color: rgb(255, 135, 135);
}
.null .asset {
  background-color: inherit;
}
.here {
  background-color: rgb(130, 255, 130);
}

@media (max-width: 1600px) {
  .header {
    font-size: 3rem;
  }
}

@media (max-width: 1300px) {
  .asset {
    font-size: 2.5rem;
    padding: 1rem;
  }
}

@media (max-width: 800px) {
  .header {
    font-size: 2rem;
  }
  .asset {
    font-size: 1.5rem;
  }
}
@media (max-width: 620px) {
  .header {
    padding: 0.75rem;
  }
  .asset {
    padding: 0.5rem;
  }
}
</style>
