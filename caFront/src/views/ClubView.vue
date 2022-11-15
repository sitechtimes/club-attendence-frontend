<template>
    <div class="home">
        <div class="nav">
            <img id="cpic" src="https://cdn-icons-png.flaticon.com/512/4320/4320241.png" alt="">
            <Button>12/02/2022</Button>
        </div>
  
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
  import Card from '../components/Card.vue'
  import Button from '../components/Button.vue'
  
  export default {
    name: 'ClubView',
    components: {
      Card,
      Button
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
  .home{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .nav{
    display: flex;
    justify-content: space-around;
   align-items: center;
    background-color: #F3C87C;
    height: 5rem;
    width: 100%;
  }
  #cpic{
    height: 50px;
    width: 50px;
  }

  </style>