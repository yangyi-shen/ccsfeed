<script setup>
import axios from "axios"

import { ref } from "vue"

const signedIn = localStorage.getItem('signedin')
const author = ref(localStorage.getItem('username') || '')
const content = ref('')

async function createPost() {
  const response = await axios.post("https://ccsfeed-server.vercel.app/newpost", {
    author: author.value,
    content: content.value,
    timestamp: new Date(),
  })

  content.value = ''
}
</script>

<template>
  <div class="newpost-wrapper">
    <form @submit.prevent="createPost(), $emit('newpost')" class="newpost-form">
      <label v-if="!signedIn" class="input-label">Name</label>
      <input v-if="!signedIn" class="author" v-model="author" />
      <label class="input-label">Content</label>
      <input class="content" v-model="content" />
      <button class="submit-btn" type="submit">Create post</button>
    </form>
  </div>
</template>

<style scoped>
.newpost-wrapper {
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--compass-blue);
  border-radius: 5px;
  margin-bottom: 30px;
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
