<template>
  <div class="imagebox">
    <div class="cardbox">
      <img class="showAttendance" src="image" alt="" />
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
import { defineComponent } from "vue";
import { useClubActivity } from "../stores/clubActivity";

export default defineComponent({
  name: "UploadImage",
  components: {},

  setup() {
    let imageFile: any = null;
    let imageBinary: any = "";
    function handleImage(event: any) {
      console.log(event.target.files);
      const selectedImage = event.target.files[0];
      createBase64Image(selectedImage);
    }
    function createBase64Image(files: any) {
      const reader = new FileReader();
      reader.onload = () => {
        imageFile = reader.result;
      };
      reader.readAsDataURL(files[0]);
      imageFile = files[0];

      console.log(imageBinary);
    }

    const clubActivity = useClubActivity();

    return { clubActivity, handleImage, createBase64Image, image };
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
