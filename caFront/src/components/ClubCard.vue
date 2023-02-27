<template>
  <div>
    <div class="card">
      <div class="half">
        <h3>{{ clubName }}</h3>
      </div>
      <div class="bottom"></div> 
  
  
      <div @click="ClubCard.showPanel()">
        <img class="calendarpic" src="../assets/logos/calendar.svg"/>
      </div>
  
    
      <div class="member" @click="clubstore.getClubData(clubCode)">  
        <router-link to="/member">
  
           <img class="human" src="../assets/logos/human.svg"/>
        </router-link>
       
      </div>
      
      <div
        class="container"
        v-if="ifPresident"
        @click="qrCode.openMenu(clubCode, dateOfToday, clubName)"
      >
   
     
         <img class="qrcode" src="../assets/logos/scanicon.png" alt="" />
     
      </div> 
  
    </div>
    <div class="overlap">
      <QRScanner v-show="qrCode.isQrCodeOpen">
      </QRScanner>
      <NewMeeting v-if="showNewMeeting" @close="showNewMeeting=false" />
    </div>
  </div>
    
  </template>
  
  <script lang="ts">
  import { useClubStore } from "../stores/sendcode";
  import { useQrCode } from "../stores/qrCode";
  import QRScanner from '../components/QRScanner.vue'
  import { RouterLink } from 'vue-router'
  import NewMeeting from '../components/NewMeeting.vue'
  export default {
    name: "ClubCard",
    components: {
      QRScanner,
      RouterLink,
      NewMeeting
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
      const qrCode = useQrCode();
      let dateOfToday = new Date().toLocaleDateString();
      let showNewMeeting = false;
      const openNewMeeting = () =&gt; (showNewMeeting = true);
      return { ifPresident, qrCode, dateOfToday, clubstore, showNewMeeting, openNewMeeting };
    },
  };
  </script>
  
  <style scoped>
  
  .newMeet {
    border: .0625rem solid lightgreen;
  }
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
    height: 5rem;
    top: 23.5rem;
    left: 34rem;
    cursor: pointer;
  } 
  .human{
    position: absolute;
    width: 5rem;
    height: 5rem;
    top: 23.5rem;
    left: 27rem;
    cursor: pointer;
  }
  
  .calendarpic{
    position: absolute;
    width: 5rem;
    height: 5rem;
    top: 23.5rem;
    left: 20rem;
    cursor: pointer;
  }
  
  </style>
