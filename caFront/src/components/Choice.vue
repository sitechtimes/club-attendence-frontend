<template>
    <div>
        <h2>Next Meeting: 12/03/2022</h2>
        <Button class="edit">Edit</Button>
        <Button class="remove">Remove</Button>
    </div>
</template>

<script lang="ts">
import Button from '../components/Button.vue'
import {defineComponent} from 'vue'
    export default defineComponent ({
        name: 'Choice',
        components:{
            Button
        }
    })
</script>

<style scoped>
.remove{
    background-color: #EE4B2B;
}
</style>