<template>
  <div>
    <div
      id="g_id_onload"
      data-client_id="696624175161-fjet2s1pbefuqnmn42o65p33b5tqa5p1.apps.googleusercontent.com"
      data-login_uri="https://localhost:5173"
      data-auto_prompt="true"
    ></div>
    <div
      class="g_id_signin"
      data-type="standard"
      data-size="large"
      data-theme="outline"
      data-text="sign_in_with"
      data-shape="pill"
      data-width="400"
      data-logo_alignment="left"
      ref="googleBtn"
    ></div>

    <h2>Name {{ state.name }} = {{ state.num }}</h2>

    <button @click="clickGoogle">Sheesh</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  setup() {
    const googleBtn = ref<HTMLElement | null>(null);
    const state = reactive({
      name: "The Name",
      num: 31 as number,
    });
    function clickGoogle() {
      googleBtn.value?.firstChild?.firstElementChild?.firstElementChild.click();
    }
    return {
      state,
      googleBtn,
      clickGoogle,
    };
  },

  methods: {},
});
</script>

<style scoped>
.googleBtn {
  display: none;
}
</style>
