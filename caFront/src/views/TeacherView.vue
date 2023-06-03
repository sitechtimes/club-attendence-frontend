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
        <input type="text" v-model="goneOsis"  placeholder="Remove Student From Club Code" @submit="removeStudent()"  >
      </div>

    </section>
    <section class="bottom">
      <div v-if="clubData" class="left">
        <clubBox 
        v-for="club in clubData"
        @click="currentClubCode = club.clubCode"
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
  setup () {
    const store = teacherStore()
    const userStore = useUserDataStore()
    const input = ref<string>("")
    const currentClubCode = ref<string|null>(null)
    store.getData(userStore.user)
    const headings = ["Osis", "Name", "Grade", "Class", "Email"];
    
    console.log(userStore.user)
    return {store, input, headings, currentClubCode, goneOsis:ref<string>("") }

    

    
  },

  methods:{
    removeStudent(){
        //goneOsis is the student's osis number
        //currentClubCode is the current club code use that to determine which club 

    }
  },


  computed:{
    clubData(): Array<eachClub> {
      console.log(this.store.clubList);
      let a =  this.store.clubList.filter((club) =>
        club.clubName.toLowerCase().includes(this.input.toLowerCase())
      );

      return a
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
 
  position: relative;
  padding: 1rem;
  overflow-y: scroll;
  max-height: 80vh;
}
.top-right{
  display: flex;
  justify-content: space-around;
}

::-webkit-scrollbar {
  width: 5px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.right{
  width: 65%;
}
.table-right {
  width: 100%;
  overflow-y: scroll;
  overflow-x:visible;


}

.right::-webkit-scrollbar {

}

.head {
  font-size: 5rem;
}
.drop {
  position: absolute;
  z-index: 2;
}

@media (max-width: 1600px){
  
  .bottom{
    flex-direction: column;
   
  }
  .left{
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: scroll;
  
  }
  .left::-webkit-scrollbar {
  display:inline;
}

}

</style>