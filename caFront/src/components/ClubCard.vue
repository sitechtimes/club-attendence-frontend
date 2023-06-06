<template>
  <div>
    <div class="card">
      <div class="half">
        <h1 class="clubname">{{ clubName }}</h1>
        <div class="content">
          <h2 class="message">{{ clubCode }}</h2>
        </div>
      </div>

      <div class="bottom">
        <ul class="nextdates" v-for="date in meetingDates" :key="date">
          <li class="delete">
            {{ date }}
            <img
              src="../assets/logos/trashcan.png"
              class="trashcan"
              alt="trashcan"
            />
          </li>
        </ul>
      </div>
      <div class="menubar" v-if="ifPresident">
        <ul v-if="status">
          <li>
            <img class="trashCanPic" src="../assets/logos/trash-can.png" />
          </li>
          <li>
            <img
              @click="clubActivity.openDMeeting(clubName)"
              class="deleteCalendar"
              src="../assets/logos/Calendar-Delete.png"
            />
          </li>
          <li>
            <img
              @click="clubActivity.openMeeting(clubName)"
              class="calendarpic"
              src="../assets/logos/calendar.svg"
            />
          </li>
          <li @click="UploadImage.displayUpload(clubCode, clubName)">
            <img
              @click="clubActivity.openUpload()"
              class="upload"
              src="../assets/logos/upload.png"
              alt="upload"
            />
          </li>
          <li class="member" @click="clubstore.getClubData(clubCode)">
            <router-link to="/president">
              <img class="human" src="../assets/logos/human.svg" alt="human" />
            </router-link>
          </li>

          <li
            class="container"
            @click="qrCode.openMenu(clubCode, dateOfToday, clubName)"
          >
            <img class="qrcode" src="../assets/logos/scanicon.png" alt="scan" />
          </li>
        </ul>
        <img
          @click="status = !status"
          class="open-icon"
          src="../assets/logos/pointing-left.svg"
          alt="open"
        />
      </div>
    </div>
    <div class="overlap">
      <QRScanner v-show="qrCode.isQrCodeOpen"> </QRScanner>
    </div>
    <div>
      <newMeeting v-show="clubActivity.isMeetingVisible"></newMeeting>
    </div>
    <div>
      <deleteMeeting v-show="clubActivity.isDMeetingVisible"></deleteMeeting>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserDataStore } from "../stores/userData";
import { useClubStore } from "../stores/sendcode";
import { useQrCode } from "../stores/qrCode";
import { useUploadImage } from "@/stores/uploadImage";
import { useClubActivity } from "../stores/clubActivity";
import newMeeting from "../components/newMeeting.vue";
import deleteMeeting from "../components/deleteMeeting.vue";
import QRScanner from "../components/QRScanner.vue";
import { RouterLink } from "vue-router";
import UploadImage from "../components/uploadImage.vue";

import { ref } from "vue";

export default {
  name: "Card",
  components: {
    QRScanner,
    UploadImage,
    RouterLink,
    newMeeting,
    deleteMeeting,
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
      required: true,
    },
  },

  setup(props) {
    const status = ref(false);
    let image: string = "";

    function handleImage(event: any) {
      const selectedImage = event.target.files[0];
      createBase64Image(selectedImage);
    }
    function createBase64Image(fileObject: any) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        image = event.target.result;
      };
      reader.readAsBinaryString(fileObject);
    }
    const ifPresident = ref(props.position === "president");

    const objectData = useUserDataStore();
    const user = objectData.user;
    const clubData = user?.clubData;
    const clubstore = useClubStore();
    const clubActivity = useClubActivity();
    const UploadImage = useUploadImage();
    const qrCode = useQrCode();
    let dateOfToday = new Date().toLocaleDateString();
    return {
      ifPresident,
      qrCode,
      dateOfToday,
      clubstore,
      clubActivity,
      status,
      user,
      clubData,
      handleImage,
      createBase64Image,
      image,
      UploadImage,
    };
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

.clubname {
  font-size: 2.5rem;
  position: absolute;
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
  height: 35%;
  width: 100%;
  bottom: 15%;
  position: absolute;
  overflow: auto;
}

li {
  font-size: 2rem;
  margin-left: 3rem;
}
.trashcan {
  visibility: hidden;
}

.delete:hover {
  .trashcan {
    visibility: visible;
  }
}
.trashcan {
  width: 2rem;
  height: 2rem;
}

.upload {
  position: absolute;
  width: 5rem;
  height: 5rem;
  bottom: 0.5rem;
  right: 29rem;
  cursor: pointer;
}

.qrcode {
  position: absolute;
  width: 5rem;
  height: 5rem;
  bottom: 0.5rem;
  right: 23.5rem;
  cursor: pointer;
}
.human {
  position: absolute;
  width: 5rem;
  height: 5rem;
  bottom: 0.5rem;
  right: 18rem;

  cursor: pointer;
}

.calendarpic {
  position: absolute;
  width: 5rem;
  height: 5rem;
  bottom: 0.5rem;
  right: 6.3rem;
  cursor: pointer;
}
.deleteCalendar {
  position: absolute;
  width: 5rem;
  height: 5rem;
  bottom: 0.5rem;
  right: 12rem;
  cursor: pointer;
}
.trashCanPic {
  position: absolute;
  width: 5rem;
  height: 5rem;
  bottom: 0.5rem;
  right: 34.5rem;
  cursor: pointer;
}
.open-icon {
  position: absolute;
  width: 5rem;
  height: 5rem;

  bottom: 0.5rem;
  right: 1rem;

  cursor: pointer;
}
input {
  display: none;
}
label {
  cursor: pointer;
}
.container {
  display: flex;
  justify-content: center;
  margin-top: 10rem;
  width: 100%;
  height: 100%;
}
.cardbox {
  position: absolute;
  z-index: 1;
  height: 50rem;
  width: 50rem;
  border-radius: 2rem;
  padding: 1rem;
  text-align: center;
}
.showAttendance {
  width: 15rem;
}
@media (max-width: 1150px) {
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
  .open-icon {
    width: 5rem;
    height: 5rem;
    top: 23.5rem;
    left: 28rem;
  }

  .human {
    width: 5rem;
    height: 5rem;
    top: 23.5rem;
    left: 23rem;
  }
  .calendarpic {
    width: 5rem;
    height: 5rem;
    top: 23.5rem;
    left: 18rem;
  }
  .deleteCalendar {
    width: 5rem;
    height: 5rem;
    top: 23.5rem;
    left: 18rem;
  }
  .trashCanPic {
    width: 5rem;
    height: 5rem;
    top: 23.5rem;
    left: 18rem;
  }
  .qrcode {
    width: 5rem;
    height: 5rem;
    top: 23.5rem;
    left: 13rem;
  }
  .upload {
    width: 5rem;
    height: 5rem;
    top: 23.5rem;
    left: 8rem;
  }
  .qrcode,
  .trashCanPic,
  .calendarpic,
  .deleteCalendar,
  .human,
  .open-icon,
  .upload {
    transform: scale(0.7);
  }
  .bottom {
    right: 3rem;
    transform: scale(0.8);
  }
}
</style>
