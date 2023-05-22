<template>
  <div class="page">
    <section class="top">
      <div class="right">
        <input v-model="input" type="text" />
        <button @click="test" >asdfasdf</button>


      </div>

      <div class="top-right ">
        <statusDropdown></statusDropdown>
        <dateDropdown></dateDropdown>
      </div>

    </section>
    <section class="bottom">
      <div  class="left">
        <clubBox
          v-for="club in userClubPresident"
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

    <div>
        <li v-for="club in userClubPresident" >
          {{ club.clubName }}
        </li></div>

    

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { teacherStore } from '@/stores/teacherVueStore'
import clubBox from '@/components/ClubBox.vue'
import tableData from '@/components/tableData.vue'
import dateDropdown from '@/components/dateDropdown.vue'
import statusDropdown from '@/components/statusDropdown.vue'
import { useUserDataStore } from '@/stores/userData'

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

interface clubDataInfo{
  clubCode: string,
  positoin: string,
  clubName: string, 
  
}

interface clubDataTemp{
  email: string;
  emailDomain: string;
  firstName: string;
  grade: string;
  lastName: string;
  officalClass: string;
  osis: string;
  clubData: Array<clubDataInfo>
  clientAuthority: string;
  uid: string;
};

export default defineComponent({
  components:{
    clubBox, tableData, dateDropdown, statusDropdown,
  },
  setup () {
    const store = teacherStore()
    const userStore = useUserDataStore()
    const input = ref<string>("")
    store.getData()
    const headings = ["Osis", "Name", "Grade", "Class", "Email"];

 

    return {store, input, headings, userStore }

    
  },
  methods:{
    getUserData() {
      console.log(this.userStore.user)

    },

    test(){
      console.log(this.userStore.user?.clubData)

      let a = this.userStore.user?.clubData.filter((club) => club.position != "member")

      console.log(a)
    }
  },

  computed:{
   
    clubData(): Array<Club> {
      console.log(this.store.clubList);
      this.getUserData()
      return this.store.clubList.filter((club) =>
        club.clubName.toLowerCase().includes(this.input.toLowerCase())
      );
    },
    userClubPresident(): Array<clubDataInfo>{
      console.log(this.userStore.user?.clubData)
      let a = this.userStore.user?.clubData.filter((club) => club.position != "member")

      let presidentList = this.userStore.user?.clubData.forEach((presidentClub) => {
        this.store.clubList.filter((allClub) => { allClub.clubCode = presidentClub.clubCode })        
      });
      

      return a
    }

   
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

.left::-webkit-scrollbar {
  display: none;
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
  display: none;
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
  
  }

}

</style>
