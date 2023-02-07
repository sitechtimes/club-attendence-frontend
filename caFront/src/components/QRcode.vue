<template>
  <div>
    <StreamBarcodeReader
      @decode="onDecode"
      @loaded="onLoaded"
    ></StreamBarcodeReader>
    <h2>{{ decodedText }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";
export default defineComponent({
  name: "QRcode",
  component: {
    StreamBarcodeReader,
  },
  setup() {
    const decodedText = ref("");
    const onLoaded = () => {
      console.log("loaded");
    };
    const onDecode = (text) => {
      decodedText.value = text;
    };
    return { onLoaded, onDecode, decodedText };
  },
});
</script>

<style scoped></style>
