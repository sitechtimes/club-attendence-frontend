<template>
  <button class="closebutton">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: "miniButton",
};
</script>

<style scoped>
.closebutton {
  position: absolute;
  right: 2rem;
  top: 2rem;
  width: 32px;
  height: 32px;

}

.closebutton:before, .closebutton:after {
  position: absolute;
  
  content: ' ';
  
  background-color: #333;
}
.closebutton:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}

</style>
