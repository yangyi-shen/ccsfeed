<script setup>
import axios from "axios"

import { ref } from "vue"

const author = ref()
const content = ref()
const image = ref()

const imageurl = ref()

async function createPost() {
  const response = await axios.post("https://ccsfeed-server.vercel.app/newpost", {
    author: author.value,
    content: content.value,
    image: image.value,
    timestamp: new Date(),
  })
  console.log(image.value)

  content.value, image.value = null
}

function selectImage() {
  const input = document.querySelector('.image-input')
  input.click()
}

function loadPreview() {
  const input = document.querySelector('.image-input')
  
  if (input.files.length > 0) {
    const [file] = input.files
    image.value = file
    imageurl.value = URL.createObjectURL(file)
  }
}
</script>

<template>
  <div class="newpost-wrapper">
    <form @submit.prevent="createPost(), $emit('newpost')" class="newpost-form">
      <label class="input-label">Name</label>
      <input class="author" v-model="author" />
      <label class="input-label">Content</label>
      <input class="content" v-model="content" />
      <div class="image">
        <input class="image-input" type="file" accept="image/*" @change="loadPreview">
        <button class="image-btn" type="button" @click="selectImage">Attach a picture 🖼</button>
        <img v-if="imageurl" class="image-preview" :src="imageurl">
      </div>
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

.image {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.image-input {
  display: none;
}

.image-btn {
  height: 30px;
  width: 140px;
  border: 1px solid darkgrey;
  border-radius: 3px;
}

.image-preview {
  height: 100px;
  object-fit: scale-down;
}

.submit-btn {
  padding: 10px 0px;
  border: none;
  border-radius: 3px;
  margin: 0px 0px 10px;
}
</style>
