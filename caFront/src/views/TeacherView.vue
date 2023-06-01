<template>
  <div class="table">
    <div v-for="head in headings" :key="head" class="header">{{ head }}</div>
    <div v-for="data in theData" :key="data.osis" class="row">
      <div
        class="test"
        :class="{
          absent: data.presentLocation.inClubToday == false,
          present: data.presentLocation.inClubToday == true,
        }"
      >
        <h2 class="asset osis">
          {{ data.osis }}
        </h2>
        <h2 class="asset name">
          {{ data.firstName + " " + data.lastName }}
        </h2>

        <h2 class="asset email">
          {{ data.email }}
        </h2>
        <h2 class="asset grade">
          {{ data.grade }}
        </h2>
        <h2 class="asset offClass">
          {{ data.officialClass }}
        </h2>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    headings: {
      type: Array<string>,
      required: true,
    },
    theData: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const present = "present";
    const absent = "absent";
    const numColumn = props.headings.length;
    return { present, absent, numColumn };
  },
});
</script>
<style scoped>
h2 {
  font-weight: 400;
}
.table {
  display: grid;
  grid-template-columns: repeat(v-bind(numColumn), auto);
  font-size: 7rem;
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

@media (max-width: 1600px) {
  .header {
    font-size: 3rem;
  }
}

@media (max-width: 1300px) {
  .asset {
    font-size: 2.5rem;
    padding: 1rem;
  }
}

@media (max-width: 800px) {
  .header {
    font-size: 2rem;
  }
  .asset {
    font-size: 1.5rem;
  }
}
@media (max-width: 620px) {
  .header {
    padding: 0.75rem;
  }
  .asset {
    padding: 0.5rem;
  }
}
</style>
