<script setup>
defineProps({
    author: String,
    content: String,
    timestamp: String
})
</script>

<template>
    <div class="post">
        <p class="author">{{ author }}</p>
        <p class="timestamp">{{ timestamp }}</p>
        <p class="content">{{ content }}</p>
    </div>
</template>

<style scoped>
.post {
    background: rgb(228, 228, 228);
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0px;
}

.author {
    font-weight: 600;
    margin: 0px;
}

.timestamp {
    color: grey;
    margin: 0px;
    margin-top: 5px;
}
</style>