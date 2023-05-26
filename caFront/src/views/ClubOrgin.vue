<template>
  <div class="whole">
    <div class="container">
      <div class="generate"><button>generate</button></div>
      <select class="form-select" id="month" name="month">
        <option selected value="">--Please select an acdemic year--</option>
        <option v-for="date in dates" value="">{{ date }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
let dates: Array<string> = [];
for (let i = 0; 6 > i; i++) {
  let date1 = new Date().getFullYear() + i;
  let date2 = new Date().getFullYear() + i + 1;

  dates.push(`${date1} - ${date2}`);
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
