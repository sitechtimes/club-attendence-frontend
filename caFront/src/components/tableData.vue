<template>
    <tr>
        <td>{{Osis}}</td>
        <td>{{Name}}</td>
        <td>{{Grade}}</td>
        <td>{{Class}}</td>

    </tr>
</template>

<script>
import {defineComponent} from "vue";
    export default defineComponent({
        props:{
            Osis: String | Number,
            Name: String,
            Grade: String | Number,
            Class: String | Number
        }
    })
</script>

<style scoped>

</style>