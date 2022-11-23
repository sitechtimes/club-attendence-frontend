<template>
    <div class="page">
        <div class="top"></div>
        <div class="bottom">
            <section class="left">
                <clubBox v-for="club in data" key="club" :ClubName="club[0]" :Advisor="club[1]" :Room="club[4]" ></clubBox>


            </section>
            <section class="right">
                <table>
                    <tr class="head">
                        <th>Osis</th>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Class</th>
                    </tr>
                    
                    <tableData v-for="student in data" key="student" :Osis="student[0]" :Grade="student[1]" :Name="student[2]" :Class="student[3]" ></tableData>

                </table>
            </section>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import fakeData from "../assets/fakedata.json"
import clubBox from "../components/ClubBox.vue"
import tableData from "../components/tableData.vue"

export default defineComponent({
    components:{
        clubBox, tableData
    },
    setup(){
        const data = fakeData

        return{
            data,
        }
    }


})
</script>

<style scoped>
.page{
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
}
.bottom{
    display: flex;
    width: 100%;
    height: 80vh;
    background-color: rgb(211, 211, 211);
}
.left{
    width: 30%;
}
.right{
    width: 70%;

}
table{
    height: 100%;
    width: 100%;
}
.head{
    font-size: 5rem;
}
</style>