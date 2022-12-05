<template>
    
    <div class="table">
        <div v-for="head in headings" :key="head" class="header">{{head}}</div>

        <div v-for="student in theData"  :key="student.studentName" class="row"  >
            <div class="present test" v-if="(student.present == true)" >

                <div class="asset osis">
                    {{student.osis}}
                </div>

                <div class="asset name">
                    {{student.studentName}}
                </div>

                <div class="asset grade">
                    {{student.grade}}
                </div>
                <div class="asset offClass">
                    {{(student.offClass)}}
                </div>
            </div>
            <div class="absent test" v-if="(student.present == false)" >

                <div class="asset osis">
                    {{student.osis}}
                </div>

                <div class="asset name">
                    {{student.studentName}}
                </div>

                <div class="asset grade">
                    {{student.grade}}
                </div>
                <div class="asset offClass">
                    {{(student.offClass)}}
                </div>
            </div>
            <div class="null test" v-if="(student.present == null)" >

                <div class="asset osis">
                    {{student.osis}}
                </div>

                <div class="asset name">
                    {{student.studentName}}
                </div>

                <div class="asset grade">
                    {{student.grade}}
                </div>
                <div class="asset offClass">
                    {{(student.offClass)}}
                </div>
            </div>

        </div>

        

    </div>


</template>

<script lang="ts">
import {defineComponent} from "vue";
    export default defineComponent({
        props:{
            headings:Array,
            theData: Array,



        },

    })
    


</script>

<style scoped>

.table{
    display: grid;
    grid-template-columns: repeat(4,auto);
    font-size: 7rem;
    background-color: antiquewhite;
}
.card{
    display: flex;
    flex-direction: column;
}
.header{
    padding: 1rem;
}
.row{
    height: 5rem;
    display: contents;

}
.test{
    display: inherit;
}
.asset{
    border-radius: 5px;
    padding: 20px;
    font-size: 3rem;

}
.present .asset{
    background-color: rgb(130, 255, 130);
    
}
.absent .asset{
    background-color: rgb(255, 135, 135);
    
}
.null .asset{
    background-color: inherit;
    
}

</style>