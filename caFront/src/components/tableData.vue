<template>
    
    <div class="table">
        <div v-for="head in headings" :key="head" class="header">{{head}}</div>

        

            <div v-for="element in theData" :key="element" class="row">

                <div v-for="data in element" :key="data" class="asset">
                    {{data}}
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



        }
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
.row{
    height: 5rem;
    display: contents;

}
.asset{
    border-radius: 5px;
    padding: 20px;
    font-size: 3rem;

}

</style>