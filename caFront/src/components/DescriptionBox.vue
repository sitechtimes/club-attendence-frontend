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
        <span class="label1">ClubName:</span>
        <span class="label2">ClubAdvisor:</span>
        <span class="label3">ClubPresident:</span>
        <span class="label4">ClubFrequency:</span>
        <span class="label5">ClubDay:</span>
        <span class="label6">ClubRoom:</span>
        <span class="label7">ClubType:</span>
        <span class="label8">Next Meeting:</span>
        <span class="text1">{{ clubName }}</span>
        <span class="text2">{{ clubAdvisor }}</span>
        <span class="text3">{{ clubPresident }}</span>
        <span class="text4">{{ clubFrequency }}</span>
        <span class="text5">{{ clubDay }}</span>
        <span class="text6">{{ clubRoom }}</span>
        <span class="text7">{{ clubActivityType }}</span>
        <span class="text8">{{ meetingDates }}</span>
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

@media (max-width: 1250px) {
  .overlay {
    height: 70rem;
    width: 90rem;
  }
  .popup {
    font-size: 1.5rem;
    gap: 0.5rem;
  }
  .clubdescription {
    font-size: 1.8rem;
  }
}

@media (max-width: 1000px) {
  .overlay {
    height: 70rem;
    width: 70rem;
  }
  .popup {
    font-size: 1.5rem;
    gap: 0.5rem;
  }
  .clubdescription {
    font-size: 1.8rem;
  }
}

@media (max-width: 700px) {
  .overlay {
    height: 70rem;
    width: 40rem;
  }
  .popup {
    font-size: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two equal-width columns */
    grid-template-areas:
      "label1 text1"
      "label2 text2"
      "label3 text3"
      "label4 text4"
      "label5 text5"
      "label6 text6"
      "label7 text7"
      "label8 text8";
    grid-gap: 10px;
  }

  .label1 {
    grid-area: label1;
    text-align: right;
  }

  .label2 {
    grid-area: label2;
    text-align: right;
  }

  .label3 {
    grid-area: label3;
    text-align: right;
  }
  .label4 {
    grid-area: label4;
    text-align: right;
  }
  .label5 {
    grid-area: label5;
    text-align: right;
  }
  .label6 {
    grid-area: label6;
    text-align: right;
  }
  .label7 {
    grid-area: label7;
    text-align: right;
  }

  .label8 {
    grid-area: label8;
    text-align: right;
  }

  /* Repeat the above pattern for label3-label8 */

  .text1 {
    grid-area: text1;
    text-align: left;
  }

  .text2 {
    grid-area: text2;
    text-align: left;
  }
  .text3 {
    grid-area: text3;
    text-align: left;
  }
  .text4 {
    grid-area: text4;
    text-align: left;
  }
  .text5 {
    grid-area: text5;
    text-align: left;
  }
  .text6 {
    grid-area: text6;
    text-align: left;
  }
  .text7 {
    grid-area: text7;
    text-align: left;
  }
  .text8 {
    grid-area: text8;
    text-align: left;
  }

  .clubdescription {
    font-size: 1.2rem;
  }
}
</style>
