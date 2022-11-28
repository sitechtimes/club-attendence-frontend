<template>
    <table>
        <div class="heading">
            <th  v-for="header in data" :key="header">{{header}}</th>

        </div>
        <div class="content">
            <tr v-for="student in studentData" :key="student" >
                <td>{{student[0]}}</td>
                <td>{{student[1]}}</td>
                <td>{{student[2]}}</td>
                <td>{{student[3]}}</td>
            </tr>

        </div>
        
 



    </table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
    export default defineComponent({
        props:{
            data: Array,
            studentData: Array,


        }
    })
</script>

<style scoped>
 .heading{
    font-size: 3rem;
 }
 .content{
    font-size: 3rem;
 }
</style>