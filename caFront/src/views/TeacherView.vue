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
    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import teacherStore from "../stores/teacherVueStore"

export default defineComponent({
  setup () {
    const store = teacherStore()
    const input = ref<string>("")

    return {store, input }
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