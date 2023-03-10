<template>
    <div class="table">
        <div class="head" v-for="head in header" >
            {{ head }}
        </div>





    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        header:{
            type:Array<string>,
                required: true,

        }
    },
    setup () {
        

        return {}
    }
})
</script>

<style scoped>

.table{
    display: grid;
    grid-template-columns: repeat(5,auto);
    font-size: 7rem;
    background-color: aliceblue;
}
.head {
  padding: 1rem;
  position: sticky;
  z-index: 2;
  top: 0;
  background-color: white;
}
.row {
  height: 5rem;
  display: contents;
}

</style>