<template>
  <div class="choice">
    <h1>Next Meeting: 12/03/2022</h1>

    <div class="buttons">
      <Button class="edit">Edit</Button>
      <Button class="remove">Remove</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "../components/Button.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Choice",
  components: {
    Button,
  },
});
</script>

<style scoped>
.choice {
  font-size: 3rem;
}
.remove {
  background-color: #ee4b2b;
}

.edit {
  background-color: #2ee59d;
}

.remove:hover {
  background-color: #ee4b2b;
  color: #fff;
  transform: translateY(-7px);
  box-shadow: 0px 15px 20px rgba(252, 0, 0, 0.774);
}
.choice {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 50rem;
  height: 40rem;
  border-radius: 2rem;
}
.buttons {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
