

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
<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from './stores/counter';
import { defineComponent } from 'vue';

// export default defineComponent({
//   setup(){
//     const store = useStore()
//     store.getData()

//     return {store,   }
//   }
  
// })
</script>