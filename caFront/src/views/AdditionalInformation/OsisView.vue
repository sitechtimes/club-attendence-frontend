<template>
  <div class="box">
    <AddCard osisGradeOfficalClass="OSIS"
      ><template v-slot:name>OSIS Number</template>
      <template v-slot:context>
        Please enter your correct OSIS number or else it will be hard to
        identify you!
      </template></AddCard
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddCard from "../../components/AddCard.vue";

export default defineComponent({
  name: "AdditionalInformation",
  setup() {},
  components: { AddCard },
});
</script>

<style>
.test {
  size: 100rem;
}
</style>
