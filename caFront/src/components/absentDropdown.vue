<template>
  <div class="dropdown">
    <button @click="changeStatus()">{{ currentFilter }}</button>
    <div v-if="status" class="filters">
      <button
        v-if="getAttendanceAtDate"
        v-for="param in prop"
        :key="param"
        @click="changeFilter(param), store.fetchAttendance()"
      >
        {{ param }}
      </button>

      <button
        v-if="getAttendanceAtDate == false"
        v-for="param in prop"
        :key="param"
        @click="changeFilter(param)"
      >
        {{ param }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/stores/counter";
export default defineComponent({
  props: {
    prop: {
      type: Array<string | number>,
      required: true,
    },
    currentFilter: {
      type: String,
      required: true,
    },
    changeFilter: {
      type: Function,
      required: true,
    },
    changeStatus: {
      type: Function,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    getAttendanceAtDate: {
      type: Boolean,
      required: false,
    },
  },
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  methods: {},
});
</script>

<style scoped>
.dropdown {
  font-size: 3rem;
}
</style>
