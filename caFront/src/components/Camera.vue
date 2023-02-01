<template>
    <div>
        <QrcodeStream></QrcodeStream>
        <miniButton class="position" @click="clubActivity.closeCamera()"></miniButton>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Camera from "simple-vue-camera";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import { useClubActivity } from "../stores/clubActivity";
import miniButton from "../components/miniButton.vue";
export default defineComponent({
    components: {
        Camera,
        miniButton,
        QrcodeStream,
        QrcodeDropZone,
        QrcodeCapture
    },
   
    setup() {
        const clubActivity = useClubActivity();
        return {
            clubActivity,
        };
    },
});
</script>

<style scoped>

</style>