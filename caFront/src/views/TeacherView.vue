<template>
    <div class="page">
        <div class="top">
            <div class="left">
                <input  v-model="input" type="text" >
            </div>
            <div class="right">
                <h2>Filter By:</h2>
                <dropdown class="drop" :changeStatus="changeStatus" :changeFilter="changeFilter" :currentFilter="currentFilter" :status="status" :prop="filters" ></dropdown>
                
            </div>

        </div>


        <div class="bottom">
            <section class="left"  >
                <clubBox v-for="club in clubData" :key="club.clubName" :ClubName="club.clubName" :Advisor="club.advisor" :Room="club.roomNumber"  ></clubBox>


            </section>
            <section class="right"  >
                <tableData :headings="headings" :theData="returnStudentData"></tableData>
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
import dropdown from "../components/absentDropdown.vue"

export default defineComponent({
    components:{    
        clubBox, tableData, dropdown
    },
    setup(){
        const data = specificClub
        const input = ref<string>("")
        const filters:Array<string> = ["Absent", "Present"]
        const currentFilter = ref<string>("All")
        const status = ref<boolean>(false)
        const headings = [
            "Osis",
            "Name",
            "Grade",
            "Class",]

        
        return{
            data,headings, studentData, input, filters, currentFilter, status
        }
    },
    
    methods:{
        changeFilter(param:string){
            this.currentFilter = param
            this.changeStatus()

           
        },
        changeStatus(){
            this.status = !this.status
        }
    },


    computed:{
        clubData():Array<object>{
            return this.data.filter(club => club.clubName.toLowerCase().includes(this.input.toLowerCase()))
            
        },

        returnStudentData(currentList:object){
            if(this.currentFilter == "Present"){
                console.log( this.studentData.filter(student => student.present == true))
                 
                
                return this.studentData.filter(student => student.present == true)
            }
            else if(this.currentFilter == "Absent"){
                console.log( this.studentData.filter(student => student.present == false))
                return this.studentData.filter(student => student.present == false)
                
            } 
            else if(this.currentFilter == "All"){
                console.log(this.studentData)
                return this.studentData
            } 
        }
            
        }

    }
)
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
    display: flex;
    font-size: 4rem;
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
.drop{
    position: absolute;
    z-index: 2;
}


</style>