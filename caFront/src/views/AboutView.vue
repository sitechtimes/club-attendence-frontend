<template>
    <div class="page">
        <dropdown :prop="filter" ></dropdown>        

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import dropdown from '../components/absentDropdown.vue'
export default defineComponent({
    components:{
        dropdown, 
    },

    setup(){
        const status = ref<boolean>(false)
        const current = ref<string>("name")
        const filter = ["Absent","Present"]

        return{
            status,current, filter

        }
    },
    methods:{
        changeStatus: function(){
            this.status = !this.status
        }


    },
    
})
</script>

<style  scoped>

.page{
    font-size: 4rem;
}
</style>