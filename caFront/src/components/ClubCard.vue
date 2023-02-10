<template>
  <div class="card">
    <div class="half">
      <h3>{{ clubName }}</h3>
    </div>
    <div class="bottom"></div>
    <div
      class="container"
      v-if="ifPresident"
      @click="qrCode.openMenu(clubCode, dateOfToday, clubName)"
    >
      <img class="qrcode" src="../assets/logos/scanqrcode.svg" alt="" />
    </div>
  </div>
  <div class="overlap">
    <QRScanner v-show="qrCode.isQrCodeOpen"></QRScanner>
  </div>
</template>

<script lang="ts">
import QRScanner from "@/components/QRScanner.vue";
import { useQrCode } from "../stores/qrCode";

export default {
  name: "ClubCard",
  components: {
    QRScanner,
  },
  props: {
    clubName: String,
    position: String,
    date: String,
    clubCode: String,
  },
  setup(props) {
    const ifPresident = props.position === "president";
    const qrCode = useQrCode();
    let dateOfToday = new Date().toLocaleDateString();
    return { ifPresident, qrCode, dateOfToday };
  },
};
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  margin: 2rem;
  width: 40rem;
  height: 30rem;
  border: 0.0625rem solid lightgray;
  border-radius: 1rem;
  border-color: rgb(35, 35, 35);
  transition: 0.5s;
}

.card:hover {
  transform: translateY(-7px);
}
.half {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: rgb(252, 66, 66);
}

.qrcode {
  position: absolute;
  width: 5rem;
  top: 23.5rem;
  left: 34rem;
  cursor: pointer;
}
</style>