<template>
    <div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClubStore } from "../stores/sendcode"
export default defineComponent({
    name: "Member",
    setup () {
        const clubstore = useClubStore();

        return {clubstore}
    }
})
</script>

<style scoped>

</style>