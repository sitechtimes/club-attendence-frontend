<template>
    <div class="page">
        <div class="top"></div>
        <div class="bottom">
            <section class="left">
                <clubBox v-for="club in data" key="club" :ClubName="club[0]" :Advisor="club[1]" :Room="club[4]" ></clubBox>


            </section>
            <section class="right">
                <tableData :headings="headings" :theData="studentData"></tableData>
            </section>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import fakeData from "../assets/fakedata.json";
import studentData from "../assets/fakeData2.json"
import clubBox from "../components/ClubBox.vue";
import tableData from "../components/tableData.vue";


export default defineComponent({
    components:{
        clubBox, tableData
    },
    setup(){
        const data = fakeData
        const headings = [
            "Osis",
            "Name",
            "Grade",
            "Class",]

        const asdf = []
        return{
            data,headings, studentData, asdf,
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
    padding: 4rem;
}
.top{
    height: 20vh;
    background-color: rgb(163, 163, 163);
}
.bottom{
    display: flex;
    width: 100%;
    height: 80vh;
    background-color: wheat;
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