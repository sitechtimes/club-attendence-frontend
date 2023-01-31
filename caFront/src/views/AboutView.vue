<template>
  <div class="stevenHomePagePOG">
    <section class="left" > </section>
    <section class="right" >
      <h2 class="title" > Staten Island Technical High School Club Attendance </h2>  
      <div class="circle"></div>
      <div class="circle2"></div>
    </section>


  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
.stevenHomePagePOG{
  display: flex;
  position: relative;
  overflow: hidden;
}
.left{
  background-color: #F3C87C;
  height: 100vh;
  width: 40vw;
}
.right{
  height: 100vh;
  width: 60vw;
}
.circle{
  position: absolute;
  z-index: 1;
  width: 1200px;
height: 900.45px;
left: -656px;
top: 438px;
  border-radius: 50%;
  background-color: black;

}

.circle2{
  position: absolute;
  background-color: black;
  border-radius: 100%;
  z-index: 1;
  width: 1000px;
  height: 500px;
  top: -300px;
  right: -850px;

}
</style>