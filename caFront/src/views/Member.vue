<template>
  <div class="table">
    <div class="row" v-for="member in clubstore.memberlist" :key="member.email">
      <div
        class="test"
        :class="{
          present: member.status === present,
          absent: member.status === absent,
          null: member.status == null,
        }"
      >
        <div class="asset osis">
          {{ member.osis }}
        </div>

        <div class="asset name">
          {{ member.firstName + " " + member.lastName }}
        </div>

        <div class="asset grade">
          {{ member.grade }}
        </div>
        <div class="asset offClass">
          {{ member.officalClass }}
        </div>
        <div class="asset email">
          {{ member.email }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useClubStore } from "../stores/sendcode";
export default defineComponent({
  name: "Member",

  setup() {
    const clubstore = useClubStore();
    console.log(clubstore.currentClubCode);
    onMounted(() => {
      clubstore.getClubData(clubstore.currentClubCode); // <- This fails in the unit test
    });
    const present = "present";
    const absent = "absent";

    return { clubstore, present, absent };
  },
});
</script>

<style scoped>
.listmember {
  font-size: 3rem;
}
.table {
  display: grid;
  grid-template-columns: repeat(5, auto);
  font-size: 7rem;
}
.card {
  display: flex;
  flex-direction: column;
}
.header {
  padding: 1rem;
}
.row {
  height: 5rem;
  display: contents;
}
.test {
  display: inherit;
}
.asset {
  padding: 20px;
  font-size: 3rem;
}
.present .asset {
  background-color: rgb(130, 255, 130);
}
.absent .asset {
  background-color: rgb(255, 135, 135);
}
.null .asset {
  background-color: inherit;
}
.here {
  background-color: rgb(130, 255, 130);
}
</style>
