<template>
  <div class="box">
    <AddCard osisGradeOfficialClass="Grade"
      ><template v-slot:name>Grade</template>
      <template v-slot:context>
        Please enter your correct grade in order to better identify you!
      </template></AddCard
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddCard from "../../components/InformationCard.vue";

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
