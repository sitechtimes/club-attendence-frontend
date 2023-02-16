<template>
    <div>
        <div class="listmember" v-for="member in clubstore.memberlist" :key="member.email">
            <div class="test" :class="{
                      present: member.status === present,
                      absent: member.status === absent,
                      null: member.status == null,
                    }">
                <div class="asset osis">
                    {{ member.osis }}
                </div>
            
                <div class="asset name">
                    {{ member.firstName + " " + member.lastName }}
                </div>
            
                <div class="asset grade">
                    {{ member.grade }}
                </div>
                <div class="asset offClass">
                    {{ member.officalClass }}
                </div>
            </div>
        </div>
    </div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClubStore } from "../stores/sendcode"
export default defineComponent({
    name: "Member",
    setup () {
        const clubstore = useClubStore();

        function showlist() {
        console.log(clubstore.memberlist)
      }  
        return {clubstore, showlist}
    }
})
</script>

<style scoped>
.listmember{
    font-size: 3rem;
}
</style>