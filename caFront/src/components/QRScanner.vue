<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <miniButton class="position" @click="qrCode.closeMenu()">x</miniButton>
        <div class="container">
          <h2 class="club-name">{{ qrCode.clubData.clubName }}</h2>
          <div class="body-container">
            <h3>Create attendance for {{ qrCode.clubData.dateOfToday }}?</h3>
            <button
              class="button"
              @click="getQrCode"
              v-if="qrCode.storeQr === null"
            >
              <h3>Yes</h3>
            </button>

            <img
              class="qr-code"
              v-if="qrCode.base64QrCode !== null"
              :src="qrCode.base64QrCode"
              alt=""
            />
            <h3>Qr-code will only last ten minute before it is gone!</h3>
            <h3 v-if="qrCode.base64QrCode !== null">
              <div>{{ minutes }}:{{ seconds }}</div>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useQrCode } from "../stores/qrCode";
import miniButton from "../components/miniButton.vue";
export default defineComponent({
  name: "QRScanner",
  components: {
    miniButton,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  setup() {
    const qrCode = useQrCode();

    onMounted(() => {
      qrCode.closeMenu();
      qrCode.removeStoreClub();
    });

    async function getQrCode() {
      await qrCode.getQrCode();
      qrCode.addStoreClub(qrCode.clubData.clubName);
      startTimer();
    }

    let minutes = ref(0);
    let seconds = ref(10);
    let timer: any;

    const countdown = () => {
      if (seconds.value > 0) {
        seconds.value--;
      } else if (minutes.value > 0) {
        minutes.value--;
        seconds.value = 59;
      } else {
        // Timer has finished, do something here
        console.log("Timer finished");
      }
    };

    function startTimer() {
      timer = setInterval(countdown, 1000);
    }

    watch([minutes, seconds], ([newMinutes, newSeconds]) => {
      if (newMinutes === 0 && newSeconds === 0) {
        console.log("Timer finished");
        clearInterval(timer);
        qrCode.base64QrCode = null;
        qrCode.removeStoreClub();
        minutes.value = 10;
        seconds.value = 0;
      }
    });

    return { qrCode, getQrCode, minutes, seconds };
  },
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.modal {
  background: #ffffff;
  overflow-x: auto;
  width: 60rem;
  height: 60rem;
  border-radius: 1rem;
}
.position {
  position: fixed;
  top: 3rem;
  right: 3rem;
}
.container {
  margin: 3rem;
}
.club-name {
  font-size: 4rem;
  padding-bottom: 1rem;
  border-bottom: 0.2rem solid #aaabb0;
  text-align: center;
}
.body-container {
  margin-top: 1rem;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.qr-code {
  width: 75%;
}
.button {
  appearance: button;
  background-color: transparent;
  background-image: linear-gradient(to bottom, #fff, #f8eedb);
  border: 0 solid #e5e7eb;
  border-radius: 0.5rem;
  box-sizing: border-box;
  color: #482307;
  column-gap: 1rem;
  cursor: pointer;
  display: flex;
  font-size: 100%;
  font-weight: 700;
  line-height: 24px;
  margin: 0;
  outline: 2px solid transparent;
  padding: 1rem 1.5rem;
  text-align: center;
  text-transform: none;
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: -6px 8px 10px rgba(81, 41, 10, 0.1),
    0px 2px 2px rgba(81, 41, 10, 0.2);
}

.button:active {
  background-color: #f3f4f6;
  box-shadow: -1px 2px 5px rgba(81, 41, 10, 0.15),
    0px 1px 1px rgba(81, 41, 10, 0.15);
  transform: translateY(0.125rem);
}

.button:focus {
  box-shadow: rgba(72, 35, 7, 0.46) 0 0 0 4px,
    -6px 8px 10px rgba(81, 41, 10, 0.1), 0px 2px 2px rgba(81, 41, 10, 0.2);
}

@media (max-width: 675px) {
  .modal {
    background: #ffffff;
    overflow-x: auto;
    width: 40rem;
    height: 40rem;
    border-radius: 1rem;
  }
}

@media (max-width: 500px) {
  .modal {
    background: #ffffff;
    overflow-x: auto;
    width: 35rem;
    height: 40rem;
    border-radius: 1rem;
  }
}
</style>
