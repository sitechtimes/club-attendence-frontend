<template>
  <div>
    <div class="card">
      <div class="half">
        <h3>{{ clubName }}</h3>   

      </div>
      <div class="bottom">
        <ul class="nextdates" v-for="date in meetingDates" :key="date.clubCode">
          <li>
            {{ date }}
          </li> 
        </ul>
       
     
      </div>

<ul  v-if="status">
  <li>
        <img class="calendarpic" src="../assets/logos/calendar.svg" />
      </li>

      <li class="member" @click="clubstore.getClubData(clubCode)">
        <router-link to="/member">
          <img class="human" src="../assets/logos/human.svg" />
        </router-link>
      </li>

      <li
        class="container"
        v-if="ifPresident"
        @click="qrCode.openMenu(clubCode, dateOfToday, clubName)"
      >
        <img class="qrcode" src="../assets/logos/scanicon.png" alt="" />
      </li>
</ul>

  <button  @click="status = !status">
    <img class="open-icon" src="../assets/logos/pointing-left.svg" alt="">
  </button>
      
    </div>
    <div class="overlap">
      <QRScanner v-show="qrCode.isQrCodeOpen"> </QRScanner>
    </div>
  </div>
</template>

<script lang="ts">
import { useClubStore } from "../stores/sendcode";
import { useQrCode } from "../stores/qrCode";
import {useClubActivity} from "../stores/clubActivity"
import QRScanner from "../components/QRScanner.vue";
import { RouterLink } from "vue-router";

import { ref } from "vue";
export default {
  name: "Card",
  components: {
    QRScanner,
    
    RouterLink,
  },
  props: {
    clubName: String,
    meetingDates: Array,
    position: String,
    date: String,
    clubCode: String,
  },
  setup(props) {
    const status = ref(false)

     function display() {
      if (clubActivity.isMenuVisible === true) {
        clubActivity.closeIcon();
      } else if (clubActivity.isMenuVisible === false) {
        clubActivity.openIcon();
      }
    }
    const ifPresident = props.position === "president";
    
    const clubstore = useClubStore();
    const clubActivity = useClubActivity();
    const qrCode = useQrCode();
    let dateOfToday = new Date().toLocaleDateString();
    return { ifPresident, qrCode, dateOfToday, clubstore, clubActivity, display, status };
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

.bottom{
  display: flex;
    flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  position: absolute;
  bottom:0;
}

li{
  font-size: 2rem;
}


.qrcode {
  position: absolute;
  width: 5rem;
  height: 5rem;
  top: 23.5rem;
  left: 13rem;
  cursor: pointer;
}
.human {
  position: absolute;
  width: 5rem;
  height: 5rem;
  top: 23.5rem;
  left: 27rem;
  cursor: pointer;
}

.calendarpic {
  position: absolute;
  width: 5rem;
  height: 5rem;
  top: 23.5rem;
  left: 20rem;
  cursor: pointer;
}
.open-icon{
   position: absolute;
  width: 5rem;
  height: 5rem;
  top: 23.5rem;
  left: 34rem;
  cursor: pointer;
}

@media (max-width: 1150px){
.card {
  position: relative;
  overflow: hidden;
  margin: 2rem;
  width: 35rem;
  height: 30rem;
  border: 0.0625rem solid lightgray;
  border-radius: 1rem;
  border-color: rgb(35, 35, 35);
  transition: 0.5s;
}
.open-icon{
  width: 5rem;
  height: 5rem;
  top: 23.5rem;
  left: 28rem;
}

.human{
  width: 5rem;
  height: 5rem;
  top: 23.5rem;
  left: 21rem;
}.calendarpic{
  width: 5rem;
  height: 5rem;
  top: 23.5rem;
  left: 14rem;
}
.qrcode{
  width: 5rem;
  height: 5rem;
  top: 23.5rem;
  left: 7rem;
}
}

</style>
