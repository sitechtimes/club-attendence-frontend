<template>
  <div class="modal-backdrop">
   
<GlobalCard>
  <form id="form">
    <miniButton class="position" @click="clubActivity.closePanel()">x</miniButton>
    <span></span>
    <label for="name">Input Code: </label>
    <input type="text" required id="name" />
  </form>
</GlobalCard>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import miniButton from "../components/miniButton.vue";
import GlobalCard from "../components/GlobalCard.vue"
export default defineComponent({
  name: "AddClub",
  components: {
    miniButton,
    GlobalCard
  },
  props: [],
  methods: {
    close() {
      this.$emit("close");
    },
  },
  setup() {
    const clubActivity = useClubActivity();

    return { clubActivity };
  },
});
</script>

<style>

#form {
  font-size: 3.25rem;

}
.position {
  position: fixed;
  top: 3rem;
  right: 3rem;
}
</style>
