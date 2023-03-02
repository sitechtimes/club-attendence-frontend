<template>
  <div>
    <div class="card">
      <div class="half">
        <h3>{{ clubName }}</h3>
      </div>
      <div class="bottom"></div>
<button class="menu" @click="clubActivity.showMenu()">Menu</button>
<Icon></Icon>
 
    </div>
    <div class="overlap">
      <QRScanner v-show="qrCode.isQrCodeOpen"> </QRScanner>
      <Icon v-show="clubActivity.isMenuVisible"></Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { useClubStore } from "../stores/sendcode";
import { useClubActivity } from "../stores/clubActivity";
import { useQrCode } from "../stores/qrCode";
import QRScanner from "../components/QRScanner.vue";
import Icon from "../components/Icon.vue"
import { RouterLink } from "vue-router";
export default {
  name: "ClubCard",
  components: {
    QRScanner,
    RouterLink,
    Icon
  },
  props: {
    clubName: String,
    position: String,
    date: String,
    clubCode: String,
  },
  setup(props) {
    const ifPresident = props.position === "president";
    const clubstore = useClubStore();
    const clubActivity = useClubActivity();
    const qrCode = useQrCode();
    let dateOfToday = new Date().toLocaleDateString();
    return { ifPresident, qrCode, dateOfToday, clubstore, clubActivity };
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

.menu{
  width: 5rem;
  height: 5rem;
    position: absolute;
  width: 5rem;
  height: 5rem;
  top: 23.5rem;
  left: 34rem;
  cursor: pointer;
}
</style>
