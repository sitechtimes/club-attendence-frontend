<template>
  <div class="containter">
    <Card
      v-for="club in clubs"
      :clubName="club.clubName"
      :clubAdvisor="club.advisor"
      :clubPresident="club.president"
      :clubFrequency="club.frequency"
      :clubDay="club.day"
      :clubRoom="club.room"
      :clubActivityType="club.activityType"
      :meetingDates="club.nextMeeting"
      :clubDescription="club.clubDescription"
      :showItem="false"
      :key="club.clubName"
    ></Card>
  </div>
</template>

<script lang="ts" setup>
import Card from "@/components/ClubCard.vue";
import { onMounted, ref } from "vue";
type Clubs = {
  clubName: string;
  advisor: string;
  president: string;
  frequency: string;
  day: string;
  room: string;
  activityType: string;
  nextMeeting: Array<string>;
  clubDescription: string;
};
let clubs = ref<Array<Clubs> | null>(null);
async function getClubs() {
  const response = await fetch("http://localhost:3000/get-all-club-student");
  const data = await response.json();
  clubs.value = data; // Assuming the fetched data is an array of club objects
}
onMounted(() => {
  getClubs();
});
</script>

<style scoped>
.containter {
  display: flex;
  flex-wrap: wrap;
}
</style>
