<template>
    <div>
     <div class="overlap">
          <QRScanner v-show="qrCode.isQrCodeOpen"> </QRScanner>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QRScanner from "../components/QRScanner.vue";
import { useQrCode } from "../stores/qrCode";
import { RouterLink } from "vue-router";
export default defineComponent({
    name: "Scanner",
    components: {
        QRScanner,
        RouterLink,
    },
    setup() {
        const qrCode = useQrCode();   

        return {qrCode}
    }
})
</script>

<style scoped>

</style>