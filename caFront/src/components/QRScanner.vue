<template>
  <div class="modal-backdrop">
    <div class="create-attendence">
      <miniButton class="position" @click="qrCode.closeMenu()">x</miniButton>
      <div>
        <h3>
          You want to record attendance for {{ qrCode.clubName }} for today?
        </h3>
        <h3>{{ currentDate }}</h3>
        <button @click="getQrCode" v-if="qrCode.base64QrCode === null">
          <h3>Yes {{ qrCode.clubCode }}</h3>
        </button>
        <img
          v-if="qrCode.base64QrCode !== null"
          :src="qrCode.base64QrCode"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQrCode } from "../stores/qrCode";
import miniButton from "../components/miniButton.vue";
export default defineComponent({
  name: "qrcode",
  components: {
    miniButton,
  },
  props: {},
  methods: {
    close() {
      this.$emit("close");
    },
  },
  setup() {
    const qrCode = useQrCode();
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${month}/${day}/${year}`;

    const bundle = { clubCode: qrCode.clubCode, dateOfToday: currentDate };

    function getQrCode() {
      qrCode.getQrCode(bundle);
      console.log(currentDate);
    }

    return { qrCode, currentDate, getQrCode };
  },
});
</script>

<style>
.create-attendence {
  background: white;
  height: 30rem;
  width: 50rem;
  border-radius: 1rem;
  border: 1px solid black;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  display: flex;
}
#form {
  font-size: 4rem;
}
.position {
  position: fixed;
  top: 3rem;
  right: 3rem;
}
button {
  width: 10rem;
  height: 10rem;
}
</style>
