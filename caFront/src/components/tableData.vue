<template>
    
    <div class="table">
        <div v-for="head in headings" :key="head" class="header">{{head}}</div>

        <div v-for="data in theData"  :key="data.present" class="row"  >
            <div class="test" :class="{present: data.present == true,  absent: data.present == false, null: data.present == null}"  >

                <div class="asset osis">
                    {{data.osis}}
                </div>

                <div class="asset name">
                    {{data.studentName}}
                </div>

                <div class="asset grade">
                    {{data.grade}}
                </div>
                <div class="asset offClass">
                    {{(data.offClass)}}
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
            theData: Array



        },

    })
    


</script>

<style scoped>

.table{
    display: grid;
    grid-template-columns: repeat(4,auto);
    font-size: 7rem;

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