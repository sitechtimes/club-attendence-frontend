<template>
    <div v-if="clubActivity.isMenuVisible">
     <div>
            <img class="calendarpic" src="../assets/logos/calendar.svg" />
          </div>

          <div class="member" @click="clubstore.getClubData(clubCode)">
            <router-link to="/member">
              <img class="human" src="../assets/logos/human.svg" />
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClubStore } from "../stores/sendcode";
import { useClubActivity } from "../stores/clubActivity";
import { useQrCode } from "../stores/qrCode";
export default defineComponent({
    name: "Icon",
     props: {
        clubName: String,
        position: String,
        date: String,
        clubCode: String,
    },
    setup (props) {
        const clubstore = useClubStore();
             const ifPresident = props.position === "president";
        const qrCode = useQrCode();
         const clubActivity = useClubActivity();
            let dateOfToday = new Date().toLocaleDateString();
        return {clubstore, qrCode, ifPresident, dateOfToday, clubActivity}
    }
})
</script>

<style scoped>

</style>