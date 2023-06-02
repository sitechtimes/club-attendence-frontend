<template>
  
  <RouterLink to="/club"> <miniButton></miniButton></RouterLink>
  <div class="whole">
    <div class="container">
      <div class="left">
        <div class="generate" @click="selectYear()">
          <button>generate</button>
        </div>
        <select v-model="yearSelected" class="year-select">
          <option disabled value="">Select an academic year</option>
          <option v-for="date in dates">
            {{ date }}
          </option>
        </select>
        <div>
          <h2 class="status">{{ status }}</h2>
        </div>
      </div>
    </div>
    <div class="right">
      <h2>Clear</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserDataStore } from "@/stores/userData";
import miniButton from "@/components/miniButton.vue";



let userDataStore = useUserDataStore();
let status = ref<string | null>(null);
let dates: Array<string> = [];
let yearSelected = ref<string | null>(null);

for (let i = 0; 3 > i; i++) {
  let date1 = new Date().getFullYear() + i;
  let date2 = new Date().getFullYear() + i + 1;
  dates.push(`${date1} - ${date2}`);
}

async function selectYear() {
  if (yearSelected.value === null) {
    return (status.value = "Please select an academic year!");
  }
  status.value = "Pending";
  await fetch("http://localhost:3000/update-club-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      acdemicYear: yearSelected.value,
      user: userDataStore.user,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      status.value = res;
    });
}
</script>

<style scoped>
.whole {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70rem;
}
.container {
  font-size: 5rem;
}
.left {
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.right {
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
