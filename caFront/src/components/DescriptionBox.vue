<template>
  <div>
    <div class="card">
      <div class="half">
        <h1 class="clubname">{{ clubName }}</h1>
        <div class="content" v-show="showItem === true">
          <h2 class="message">{{ clubCode }}</h2>
        </div>
      </div>

      <div class="bottom">
        <div class="description">
          {{ clubDescription?.slice(0, 200)
          }}<span class="read" @click="appear = !appear">..Learn More</span>
        </div>
      </div>
    </div>
    <div class="overlay" v-if="appear" @click.self="appear = !appear">
      <div class="popup">
        <span>ClubName:</span>
        <span>ClubAdvisor:</span>
        <span>ClubPresident:</span>
        <span>ClubFrequency:</span>
        <span>ClubDay:</span>
        <span>ClubRoom:</span>
        <span>ClubType:</span>
        <span>Next Meeting:</span>
        <span>{{ clubName }}</span>
        <span>{{ clubAdvisor }}</span>
        <span>{{ clubPresident }}</span>
        <span>{{ clubFrequency }}</span>
        <span>{{ clubDay }}</span>
        <span>{{ clubRoom }}</span>
        <span>{{ clubActivityType }}</span>
        <span>{{ meetingDates }}</span>
      </div>
      <div class="popup2">
        <h2 class="clubdescription">{{ clubDescription }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserDataStore } from "../stores/userData";
import { useClubStore } from "../stores/sendcode";
import { useQrCode } from "../stores/qrCode";
import { useUploadImage } from "@/stores/uploadImage";
import { useClubActivity } from "../stores/clubActivity";
import QRScanner from "../components/QRScanner.vue";
import miniButton from "../components/miniButton.vue";
import { RouterLink } from "vue-router";
import UploadImage from "../components/uploadImage.vue";

import { ref } from "vue";

export default {
  name: "DescriptionCard",
  components: {
    QRScanner,
    UploadImage,
    RouterLink,
    miniButton,
  },

  props: {
    clubName: {
      type: String,
      required: true,
    },
    meetingDates: {
      type: Array<string>,
      required: false,
    },
    position: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    clubCode: {
      type: String,
      required: false,
      default: null,
    },
    clubDescription: {
      type: String,
      require: false,
    },
    clubDay: {
      type: String,
      require: false,
    },
    clubAdvisor: {
      type: String,
      require: false,
    },
    clubPresident: {
      type: String,
      require: false,
    },
    clubRoom: {
      type: String,
      require: false,
    },
    clubActivityType: {
      type: String,
      require: false,
    },
    clubFrequency: {
      type: String,
      require: false,
    },
    showItem: {
      type: Boolean,
      require: false,
      default: null,
    },
  },

  setup(props) {
    console.log(props.showItem);
    console.log(props.clubRoom);

    const appear = ref(false);

    const objectData = useUserDataStore();
    const user = objectData.user;
    const clubData = user?.clubData;
    const clubstore = useClubStore();
    const clubActivity = useClubActivity();
    const UploadImage = useUploadImage();
    const qrCode = useQrCode();
    let dateOfToday = new Date().toLocaleDateString();

    return {
      qrCode,
      dateOfToday,
      clubstore,
      clubActivity,

      user,
      clubData,

      UploadImage,
      appear,
    };
  },
};
</script>

<style scoped>
.overlay {
  text-align: center;
  border: black solid;
  background: white;
  height: 70rem;
  width: 130rem;
  border-radius: 3rem;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 10;
}
.static {
  top: 60rem;
}
.popup {
  margin-top: 3rem;
  margin-bottom: 3rem;
  font-size: 3rem;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr 2fr;

  gap: 1rem;
}

.read {
  cursor: pointer;
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

.clubname {
  font-size: 2.5rem;
  position: absolute;
}

.clubdescription {
  font-size: 2rem;
}
.card:hover {
  transform: translateY(-7px);
}
.half {
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: #f0342e;
}

.half:hover .content {
  visibility: visible;
  position: relative;
}
.active {
  position: relative;
  visibility: hidden;
}
.message {
  font-size: 5rem;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  text-align: center;
  height: 5rem;
  width: 26rem;
  visibility: hidden;
  background: white;
  position: absolute;
}

.content::before {
  content: "";
  position: absolute;
}

.bottom {
  display: flex;
  flex-direction: column;
  list-style-type: circle;
  bottom: 0;
  height: 50%;
  width: 100%;
  position: absolute;
  overflow: auto;
}

.description {
  font-size: 2rem;
}

@media (max-width: 450px) {
  .overlay {
    height: 70rem;
    width: 40rem;
  }
}
</style>
