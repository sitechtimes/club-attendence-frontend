<template>
  <div>
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <h2 class="decode-result">
      Last result: <b>{{ result }}</b>
    </h2>
    <h2 class="error">{{ error }}</h2>

    <miniButton
      class="position"
      @click="clubActivity.closeCamera()"
    ></miniButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Camera from "simple-vue-camera";
import {
  QrcodeStream,
  QrcodeDropZone,
  QrcodeCapture,
} from "vue3-qrcode-reader";
import { useClubActivity } from "../stores/clubActivity";
import miniButton from "../components/miniButton.vue";
export default defineComponent({
  components: {
    Camera,
    miniButton,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  data() {
    return {
      result: "",
      error: "",
    };
  },
  methods: {
    onDecode(result) {
      this.result = result;
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
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
