<template>
  <button class="staticbutton">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: "miniButton",
};
</script>

<style scoped>
.staticbutton {
  background-color: white;
  font-size: 4rem;
  height: 6rem;
  width: 6rem;
  border: none;
  border-radius: 50%;
  text-align: center;
}
</style>
