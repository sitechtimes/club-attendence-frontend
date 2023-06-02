<template>
  <div>
    <Camera></Camera>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Camera from "../components/Camera.vue";
export default defineComponent({
  name: "Scanner",
  components: {
    Camera,
  },
  setup() {
    return {};
  },
});
</script>
