<template>
  <div class="container">
    <div class="left">
      <h4
        class="image-id"
        v-for="imageId in imageIds"
        @click="displayImage(imageId.id)"
      >
        {{ imageId.name }}
      </h4>
    </div>
    <div class="right">
      <img
        v-if="isImageShowing"
        class="attendence-img"
        :src="imageURL"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TwoSection",
};
</script>
<script lang="ts" setup>
import { teacherStore } from "@/stores/teacherVueStore";
import { ref } from "vue";
const storeTeacher = teacherStore();
const imageIds = storeTeacher.imageId;
const clickId = ref<string>("");
const imageURL = ref<string>("");
let isImageShowing = ref(false);
const displayImage = (imageId: string) => {
  isImageShowing.value = true;
  clickId.value = imageId;
  imageURL.value = `https://drive.google.com/uc?export=view&id=${clickId.value}`;
  console.log(imageURL.value, clickId.value);
};
</script>

<style scoped>
.container {
  display: flex;
}
.left {
  width: 30vw;
}
.right {
  width: 70vw;
}
.attendence-img {
  width: 70vw;
  height: 70vh;
  object-fit: contain;
}
.image-id {
  font-size: 2rem;
  cursor: pointer;
  margin: 1rem 0;
}
</style>
