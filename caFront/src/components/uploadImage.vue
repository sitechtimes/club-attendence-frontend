<template>
  <div class="imagebox">
    <div class="cardbox">
      <img class="showAttendance" :src="state.pickImage" alt="" />
      <input
        @change="handleImage"
        id="image"
        type="file"
        ref="fileInput"
        accept="image/*"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useClubActivity } from "../stores/clubActivity";

export default defineComponent({
  name: "UploadImage",
  components: {},

  setup() {
    let imageFile: any = null;

    const state: any = reactive({ pickImage: "" });

    async function handleImage(event: any) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        state.pickImage = fileReader.result;
        console.log(state.pickImage);
      });
      fileReader.readAsDataURL(files[0]);
      imageFile = files[0];

      console.log(imageFile);
    }

    const clubActivity = useClubActivity();
    return { clubActivity, handleImage, state, imageFile };
  },
});
</script>

<style>
.imagebox {
  background-color: white;
  border-radius: 2rem;
  border: black solid;
  height: 60rem;
  width: 100rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  margin-right: -50%;
}
</style>
