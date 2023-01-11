<template>
  <div class="container">
    <ul class="dropdown-item">
      <li><button>Add Club</button></li>
      <li><button>Scan QR Code</button></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AddCard",
  setup() {
    return {};
  },
});
</script>

<style scoped>
.container {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}
li {
  list-style: none;
  font-size: 2rem;
  width: 18rem;
  height: 3rem;
  border: 3px solid black;
  border-radius: 1rem;
  background-color: #f3c87c;
}
li button {
  font-size: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
}
</style>
