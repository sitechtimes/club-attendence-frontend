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
    width: 20rem;
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 0.0625rem solid lightgray;
    border-radius: 1rem;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.555);
}

</style>