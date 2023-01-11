<template>
  <div class="box"><h1 class="test">hello</h1></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddCard from "../components/Card.vue";

export default defineComponent({
  name: "AdditionalInformation",
  components: {},
  methods: {},
});
</script>

<style>
.test {
  size: 100rem;
}
</style>
