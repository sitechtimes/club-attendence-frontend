<template>
  <div class="page">
    <section class="top">
      <div class="right">
        <input v-model="input" type="text" />
        
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
        <div v-if="store.selectedClub">{{ store.currentAttendance }}</div>

        <tableData
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

export default defineComponent({
  components:{
    clubBox, tableData, dateDropdown
  },
  setup () {
    const store = teacherStore()
    const input = ref<string>("")
    store.getData()
    const headings = ["Osis", "Name", "Grade", "Class"];
    return {store, input, headings }
  },
  computed:{
    clubData(): Array<object> {
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
