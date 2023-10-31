<script setup>
import axios from 'axios'

import { ref } from 'vue'

const author = ref()
const content = ref()

function getTimestamp() {
  const now = new Date();

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  return now.toLocaleString('en-US', options);
}

async function createPost() {
    const timestamp = getTimestamp()

    const response = await axios.post('http://localhost:6900/newpost', {
        author: author.value,
        content: content.value,
        timestamp: timestamp
    })
    console.log(response)

    author.value, content.value = null
}
</script>

<template>
    <form @submit.prevent="createPost(), $emit('newpost')" class="newpost-form">
        <label class="input-label">Name</label>
        <input class="author" v-model="author">
        <label class="input-label">Content</label>
        <input class="content" v-model="content">
        <button class="submit-btn" type="submit">Create post</button>
    </form>
</template>

<style scoped>
form {
    width: 500px;
    display: flex;
    flex-direction: column;
    background-color: var(--compass-blue);
    border-radius: 5px;
    padding: 20px;
}

.input-label {
    margin-bottom: 5px;
    color: white;
}

input {
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
}

.submit-btn {
    padding: 10px 0px;
    border: none;
    border-radius: 3px;
    margin: 0px 0px 10px;
}
</style>