<template>
  <div class="page">
    <section class="top">
      <div class="right">
        <input v-model="input" type="text" />
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
          v-if="store.filterDate == null"
          :headings="headings"
          :theData="store.currentAttendance"
        ></tableData>

        <tableData
          v-if="store.filterDate"
          :headings="headings"
          :theData="returnStudentData"
        ></tableData>
      </div>

    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { teacherStore } from '@/stores/teacherVueStore'
import clubBox from '@/components/ClubBox.vue'

export default defineComponent({
  components:{
    clubBox
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

</style>