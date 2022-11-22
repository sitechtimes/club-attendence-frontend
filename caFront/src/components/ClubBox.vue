<template>
    <div class="clubBox">
        <h2 class="clubName">{{ClubName}}</h2>

        <div class="bot">
            <h3 class="advisor">Advisor: {{Advisor}}</h3>
            <h3 class="room">Room #: {{Room}}</h3>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

    export default defineComponent({
        props:{
            ClubName: String,
            Advisor: String,
            Room: String | Number
        },
        setup(){

            return{

            }
        }
    })
</script>

<style scoped>
.clubBox{
    height: 3rem;
    width:100%;
    background-color: grey;
    margin-top: 0.1rem;
    border-radius: 0.4rem;
    padding: 00.1rem;
}
.bot{
    display: flex;
    
}
.advisor{
    margin-right: 1rem;
}

</style>