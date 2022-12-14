<template>
    <div class="page">
        <div class="top">
            <div class="left">
                <input  v-model="input" type="text"  >
            </div>
            <div class="right">
                
            </div>

        </div>
        <div class="bottom">
            <section class="left"  >
                <clubBox v-for="club in clubData" :key="club.clubName" :ClubName="club.clubName" :Advisor="club.advisor" :Room="club.roomNumber"  ></clubBox>


            </section>
            <section class="right"  >
                <tableData :headings="headings" :theData="studentData"></tableData>
            </section>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
        const input = ref<string>("")

        

        const headings = [
            "Osis",
            "Name",
            "Grade",
            "Class",]

        
        return{
            data,headings, studentData, input,
        }
    },
    
    computed:{
        clubData():Array<object>{
            return this.data.filter(club => club.clubName.toLowerCase().includes(this.input.toLowerCase()))
        }
    }


})
</script>

<style scoped>


input{
    font-size: 2rem;
    border-radius: 0.4rem;
    width: 100%;
    height: 4rem;
    padding: 1rem;
}
.page{
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    padding: 4rem;
}
.top{
    height: 20vh;
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