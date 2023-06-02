<template>
  <div class="container" v-if="clubActivity.isCameraAllowed === true">
    <div class="camera">
      <qrcode-stream @decode="onDecode" @init="onInit" />
    </div>
    <div>
      <h1 class="decode-result">{{ state.response }}</h1>
    </div>

    <miniButton class="position" @click="goBackHome()"> </miniButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import { useClubActivity } from "../stores/clubActivity";
import { useQrCode } from "../stores/qrCode";
import { useUserDataStore } from "../stores/userData";
import { useRouter } from "vue-router";
import miniButton from "../components/miniButton.vue";
export default defineComponent({
  components: {
    miniButton,
    QrcodeStream,
  },
  data() {
    return {
      error: "",
    };
  },
  methods: {
    async onInit(promise: any) {
      try {
        await promise;
      } catch (error: any) {
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
    const userData = useUserDataStore();
    const qrCodeStore = useQrCode();
    const router = useRouter();

    async function goBackHome() {
      clubActivity.closeCamera();
      await router.push("/club");
    }

    interface State {
      data: null | string;
      response: string;
    }
    const state: State = reactive({
      data: null,
      response: "No QR Code Detected",
    });

    let dateOfToday = new Date().toLocaleDateString();

    async function onDecode(data: string) {
      state.data = data;
      qrCodeStore.qrCode = data;
      let info = {
        qrCode: qrCodeStore.qrCode,
        user: userData.user,
        dateOfToday: dateOfToday,
      };
      await qrCodeStore.markAttendence(info);
      state.response = qrCodeStore.qrcodeResponse;
    }

    return {
      clubActivity,
      goBackHome,
      onDecode,
      state,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5rem;
}
.camera {
  width: 100rem;
}
.decode-result {
  font-size: 4rem;
}
</style>
