<template>
    <div class="card">
        <h2>{{name}}</h2>
        <h3>{{date}}</h3>
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
    margin: 2rem;
    padding:2rem;
    width: 50rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 0.0625rem solid lightgray;
    border-radius: 1rem;
    box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.555);
}

</style>