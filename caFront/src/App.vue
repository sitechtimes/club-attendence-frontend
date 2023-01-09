<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const url:string = "http://localhost:3000/"

return{
  url
}

</script>

<template>
  <nav>
    <RouterLink to="/" >Home</RouterLink>
    <RouterLink to="/about" >About</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
nav{
  position: absolute;
  top: 0;
  
}

</style>
