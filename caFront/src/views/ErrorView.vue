<template>
  <div class="screen">
    <div class="box">
      <h1>ERROR 404 PAGE NOT FOUND</h1>
      <img src="../assets/logos/saegal.svg" alt="Funny looking seagul" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 7rem;
  margin: auto;
  text-align: center;
  animation: color-change 3s infinite;
}

img {
  width: 50%;
  margin: auto;
}
.screen {
  height: 100vh;
  width: 100vw;
  animation: bacco-change 3s infinite;
}

@keyframes color-change {
  0% {
    color: red;
  }
  10% {
    color: orange;
  }
  20% {
    color: yellow;
  }
  30% {
    color: green;
  }
  40% {
    color: blue;
  }
  50% {
    color: indigo;
  }
  60% {
    color: violet;
  }
  70% {
    color: white;
  }
  100% {
    color: red;
  }
}

@keyframes bacco-change {
  0% {
    background-color: orange;
  }
  10% {
    background-color: yellow;
  }
  20% {
    background-color: green;
  }
  30% {
    background-color: blue;
  }
  40% {
    background-color: indigo;
  }
  50% {
    background-color: violet;
  }
  60% {
    background-color: white;
  }
  70% {
    background-color: red;
  }
  100% {
    background-color: orange;
  }
}
</style>
