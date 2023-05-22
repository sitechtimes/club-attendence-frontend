<template>
  <button class="closebutton">X</button>
</template>

<script lang="ts">
export default {
  name: "miniButton",
};
</script>

<style scoped>
.closebutton {
  position: fixed;
  right: 1rem;
  top: 1rem;
  width: 6rem;
  height: 6rem;
  border-radius: 1rem;
  display: block;
  margin: auto;
  text-decoration: none;
  font-size: 28px;
  border: 3px solid transparent;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  border-radius: 50%;
}
.closebutton:hover {
  color: red;
  border: 3px solid grey;
  transform: scale(0.8) rotateZ(90deg);
}
</style>
