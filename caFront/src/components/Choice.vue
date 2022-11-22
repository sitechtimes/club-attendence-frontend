<template>
    <div class="choice">
        <h2>Next Meeting: 12/03/2022</h2>

        <div class="buttons">
             <Button class="edit">Edit</Button>
        <Button class="remove">Remove</Button>


        <Button @click="close">Close Modal></Button>
        </div>
       
    </div>
</template>

<script lang="ts">
import Modal from '../components/Modal.vue'
import Button from '../components/Button.vue'
import {defineComponent} from 'vue'
    export default defineComponent ({
        name: 'Choice',
        components:{
            Button,
            Modal,
        },
        methods: {
      close() {
        this.$emit('close');
      },
    },
    })
</script>

<style scoped>
.remove{
    background-color: #EE4B2B;
}

.edit{
    background-color: #2EE59D;
}

.remove:hover {
  background-color: #EE4B2B;
  color: #fff;
  transform: translateY(-7px);
}
.choice{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color:white;
    width: 50rem;
    height: 40rem;
    border-radius: 2rem;
}
.buttons{
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>