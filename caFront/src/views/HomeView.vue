<template>
  <div class="home">

<div class="clublist">
  <Card
v-for="club in clubs"
:key="club.name"
:name="club.name"
:date="club.date"

>

</Card>
</div>

  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Card from '../components/Card.vue'
import Button from '../components/Button.vue'
export default {
  name: 'HomeView',
  components: {
    Card,
    Button,
  },
  data: () => {
    return {
      clubs: [
{
    name: "Key Club",
    date: "Next Meeting Date: 12/3/2022"
},
{
    name: "Self Defense Club",
    date: "Next Meeting Date: 12/3/2022"
},
{
    name: "Chinese Culture Club",
    date: "Next Meeting Date: 12/3/2022"
},

]
    }
  },

}

</script>

<style scoped>
.clublist{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>