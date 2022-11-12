<template>
    <div class="card">
        <h2>{{name}}</h2>
        <h2>{{date}}</h2>
    </div>
</template>

<script lang="ts">
export default {
    name: "Card",
    props: {
        name: String,
        date: String,
    },
}
</script>

<style scoped>
.card{
    padding:2rem;
    width: 30rem;
    height: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 0.0625rem solid lightgray;
    border-radius: 1rem;
    box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.555);
}

</style>