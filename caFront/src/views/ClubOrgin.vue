<template>
  <div class="whole">
    <div class="container">
      <div class="generate" @click="selectYear()">
        <button>generate</button>
      </div>
      <select
        class="form-select"
        id="month"
        name="month"
        @change="selectYear(date)"
      >
        <option selected value="">--Please select an acdemic year--</option>
        <option v-for="date in dates" value="year" 
          {{ date }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let dates: Array<string> = [];
let yearSelected = ref<string | null>(null);
for (let i = 0; 6 > i; i++) {
  let date1 = new Date().getFullYear() + i;
  let date2 = new Date().getFullYear() + i + 1;
  dates.push(`${date1} - ${date2}`);
}

function selectYear(date: string) {
  yearSelected.value = date;
  console.log(yearSelected.value, "eoiwoiv");
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
</style>
