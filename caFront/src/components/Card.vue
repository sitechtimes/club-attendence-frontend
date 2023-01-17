<template>
  <div class="card">
    <div class="half">
      <h2>{{ name }}</h2>
    </div>

    <div class="bottom"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Card",
  props: {
    name: String,
    date: String,
  },
};
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  margin: 2rem;
  width: 40rem;
  height: 30rem;
  border: 0.0625rem solid lightgray;
  border-radius: 1rem;
  border-color: rgb(35, 35, 35);
  transition: 0.5s;
}

.card:hover {
  transform: translateY(-7px);
}
.half {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: rgb(252, 66, 66);
}

.bottom {
  position: absolute;
}
</style>
