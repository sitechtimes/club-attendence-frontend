<template>
    <div class="page">
        <div class="top">
            <input @input="getInput(input)" v-model="input" type="text"  >

        </div>
        <div class="bottom">
            <section class="left"  >
                <clubBox v-for="club in data" key="club" :ClubName="club.clubName" :Advisor="club.advisor" :Room="club.roomNumber"  ></clubBox>


            </section>
            <section class="right"  >
                <tableData v-if="(click==true)" :headings="headings" :theData="studentData"></tableData>
            </section>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import specificClub from "../assets/specificClub.json";
import studentData from "../assets/fakeData2.json"
import clubBox from "../components/ClubBox.vue";
import tableData from "../components/tableData.vue";


export default defineComponent({
    components:{    
        clubBox, tableData
    },
    setup(){
        const data = specificClub
        let click:boolean = true

        

        const headings = [
            "Osis",
            "Name",
            "Grade",
            "Class",]

        
        return{
            data,headings, studentData, click, input:"",
        }
    },
    methods:{
        getInput(input:string|number){
            console.log(input)
            const result = this.data.filter((club)=>{
                input in club.clubName;
            })
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


}
.left{
    width: 30%;
    overflow-y: auto;
    position: relative;
    padding: 1rem;
}

.left::-webkit-scrollbar{
    display: none;
}
.right{
    width: 70%;
    overflow-y: auto;

}

.right::-webkit-scrollbar{
    display: none;
}

.head{
    font-size: 5rem;
}




</style>