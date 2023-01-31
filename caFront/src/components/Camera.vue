<template>
  <div>
    <camera :resolution="{ width: 375, height: 812 }" autoplay></camera>
    <minibutton
      class="position"
      @click="clubActivity.closeCamera()"
    ></minibutton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Camera from "simple-vue-camera";
import { useClubActivity } from "../stores/clubActivity";
import miniButton from "../components/miniButton.vue";
export default defineComponent({
  components: {
    Camera,
    miniButton,
  },
  setup() {
    const clubActivity = useClubActivity();
    return {
      clubActivity,
    };
  },
});
</script>

<style scoped></style>
