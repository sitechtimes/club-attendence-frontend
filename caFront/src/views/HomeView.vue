<template>
 
 
    <div>
        <div id="g_id_onload"
         data-client_id="696624175161-fjet2s1pbefuqnmn42o65p33b5tqa5p1.apps.googleusercontent.com"
         data-login_uri="https://localhost:5173"
         data-auto_prompt="true">
      </div>
      <div class="g_id_signin " ref="googleBtn"
         data-type="standard"
         data-size="large"
         data-theme="outline"
         data-text="sign_in_with"
         data-shape="pill"
         data-width="400"
         data-logo_alignment="left">
      </div>

      <h2>Name {{name}} = {{num}}</h2>

      <button @click="addNum(num)" >Sheesh</button>




    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref} from 'vue';

export default defineComponent({

    setup(){
        const state = reactive({
            name: "The Name",
            num: 31 as number,
            googleBTN: ref(null)
            
        })
        return{
            ...toRefs(state)
        }
    },
    methods: {
        addNum(){
            this.$refs["googleBtn"].click()
    
        }

    }

   
})


</script>

<style scoped>
.googleBtn{
    display: none;
}


</style>