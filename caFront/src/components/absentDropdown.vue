<template>
    <div class="dropdown" >
        <button @click="changeStatus" >{{currentFilter}}</button>
        <div v-if="status" class="filters">
            <button @click="changeFilter('All')" >All</button>
            <button @click="changeFilter(prop[0])" >{{prop[0]}}</button>
            <button @click="changeFilter(prop[1])" >{{prop[1]}}</button>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
    export default defineComponent({
        props:{
            prop:{
                type: Object,
                required: true
            },
            currentFilter:{
                type: String,
                required: true
            },
            changeFilter:{
                type: Function,
                required: true
                
            },
            changeStatus:{
                type:Function,
                required: true,
            },
            status:{
                type:Boolean,
                required:true,
            }

        },
        setup(){
            // const status = ref<boolean>(false)
             
            
            return{
                // status,
            }
        },
        methods:{
            // changeStatus(){
            //     this.status = !this.status
            // },
            // changeFilter(param:string){
            //     this.currentFilter = param
            //     this.changeStatus()
                
            // }
        }
    })
</script>

<style scoped>

.dropdown{
    font-size: 3rem;
}

</style>