<template>
  <div class="card" @click="clubstore.getClubData(clubCode)">
    <div class="half">
      <h3>{{ name }}{{ clubCode }}</h3>
    </div>
    <div class="bottom"></div>
    <div class="container" v-if="ifPresident" @click="qrCode.openMenu">
      <img class="qrcode" src="../assets/logos/scanqrcode.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { useClubStore } from "../stores/sendcode";
import { useQrCode } from "../stores/qrCode";

export default {
  name: "Card",
  components: {},
  props: {
    name: String,
    position: String,
    date: String,
    clubCode: String,
  },
  setup(props) {
    const ifPresident = props.position === "president";
    const clubstore = useClubStore();
    const qrCode = useQrCode();
    const clubCode = props.clubCode;
    return { ifPresident, clubCode, qrCode, clubstore };
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
