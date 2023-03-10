<template>
  <div>
    <h1>hi</h1>
 

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import studentSearchTable from '@/components/studentSearchTable.vue';
import { studentStore } from '@/stores/studentSearch';
export default defineComponent({
  components:{
    studentSearchTable
  },
  setup () {
    const store = studentStore()
    const header = ["Name","Class","Osis"]
    store.getAllStudentData()
    
    for(const el in store.allStudentData[0]){
      console.log(el)
    }

    return {header, store}
  }
})
</script>

<style scoped>

</style>