<template>
  <div>
    <qrcode-stream />
    <h2 class="decode-result">
      Last result: <b>{{ result }}</b>
    </h2>

    <miniButton class="position" @click="clubActivity.closeCamera()">
    </miniButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { QrcodeStream } from "vue3-qrcode-reader";
import { useClubActivity } from "../stores/clubActivity";
import miniButton from "../components/miniButton.vue";
export default defineComponent({
  components: {
    miniButton,
    QrcodeStream,
  },
  data() {
    return {
      result: "",
    };
  },
  methods: {
    onDecode(result: string) {
      this.result = result;
    },
  },

  setup() {
    const clubActivity = useClubActivity();
    return {
      clubActivity,
    };
  },
});
</script>

<style scoped></style>
