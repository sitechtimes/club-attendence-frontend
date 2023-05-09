<template>
  <div class="table">
    <div v-for="head in headings" :key="head" class="header">{{ head }}</div>

    <div v-for="data in theData" :key="data.osis" class="row">
      <div
        class="test"
        :class="{
          present: data.status === present,
          absent: data.status === absent,
          null: data.status == null,
        }"
      >
        <h3 class="asset osis">
          {{ data.osis }}
        </h3>

        <h3 class="asset name">
          {{ data.firstName + " " + data.lastName }}
        </h3>

        <h3 class="asset grade">
          {{ data.grade }}
        </h3>
        <h3 class="asset offClass">
          {{ data.officalClass }}
        </h3>
        <h3 class="asset email">
          {{ data.email }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    headings:{
      type: Array<string>,
      required: true,

    } ,
    theData: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const present = "present";
    const absent = "absent";
    const numColumn = props.headings.length
    return { present, absent, numColumn };
  },
});
</script>

<style scoped>


h3{
  font-weight: 400;
}
.table {
  display: grid;
  grid-template-columns: repeat(v-bind(numColumn), auto);
  font-size: 7rem;
  background-color: antiquewhite;

}
.card {
  display: flex;
  flex-direction: column;
}
.header {
  padding: 1rem;
  position: sticky;
  z-index: 2;
  top: 0;
  background-color: white;
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
