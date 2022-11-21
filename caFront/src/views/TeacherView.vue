<template>
    <div>
        <h2 v-for="student in data" key="student" >{{student}}</h2>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import fakeData from "../assets/fakedata.json"

export default defineComponent({
    setup(){
        const data = fakeData

        return{
            data
        }
    }


})
</script>

<style scoped>

</style>