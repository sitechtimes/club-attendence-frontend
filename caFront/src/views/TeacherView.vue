<template>
  <div class="page">
    <section class="top">
      <div class="right">
        <input v-model="input" type="text" />
      </div>

      <div class="top-left left">
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
      <div class="right">


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
import clubBox from '@/components/ClubBox.vue'
import tableData from '@/components/tableData.vue'
import dateDropdown from '@/components/dateDropdown.vue'
import statusDropdown from '@/components/statusDropdown.vue'

interface Club {
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
    clubBox, tableData, dateDropdown, statusDropdown,
  },
  setup () {
    const store = teacherStore()
    const input = ref<string>("")
    store.getData()
    const headings = ["Osis", "Name", "Grade", "Class", "Email"];
    return {store, input, headings }

    
  },
  computed:{
    clubData(): Array<Club> {
      console.log(this.store.clubList);
      return this.store.clubList.filter((club) =>
        club.clubName.toLowerCase().includes(this.input.toLowerCase())
      );
    },
  }
})
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
  height: 10vh;
  display: flex;
  font-size: 4rem;
  align-items: center;
}
.bottom {
  display: flex;
  width: 100%;
  height: 80vh;
}
.left {
  width: 25%;
  overflow-y: auto;
  position: relative;
  padding: 1rem;
}
.top-left{
  display: flex;
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
