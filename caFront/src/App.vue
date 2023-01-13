

<template>
  <nav>
    <RouterLink to="/club">Club</RouterLink>
    <RouterLink to="/qrcode">About</RouterLink>
  </nav>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserDataStore } from "./stores/userData";

export default defineComponent({
  name: "App",
  components: {},
  methods: {},
  setup() {
    const userDataStore = useUserDataStore();
  },
});
</script>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
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