<template>
    <div class="page">
        <button @click="changeStatus" >{{current}}</button>

        <div v-if="status">
            <button @click="current = 'name'" >name</button>
            <button @click="current = 'date'" >date</button>
            <button @click="current = 'time'" >time</button>

        </div>

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    setup(){
        const status = ref<boolean>(true)
        const current = ref<string>("name")


        return{
            status,current

        }
    },
    methods:{
        changeStatus: function(){
            this.status = !this.status
            console.log(this.status)
        }

    },
    
})
</script>

<style  scoped>

.page{
    font-size: 4rem;
}
</style>