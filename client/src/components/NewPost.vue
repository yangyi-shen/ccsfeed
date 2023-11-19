<script setup>
import axios from "axios";

import { ref } from "vue";

const signedIn = localStorage.getItem("signedin");
const author = ref(localStorage.getItem("username") || "");
const content = ref("");
const image = ref();

async function createPost() {
  const formData = new FormData();
  formData.append("author", author.value)
  formData.append("content", content.value)
  formData.append("timestamp", new Date())
  formData.append("image", image.value)

  const response = await axios.post("https://ccsfeed-server.vercel.app/newpost", formData);

  content.value, image.value = "";
}

// update value of image ref
function uploadImage(event) {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
  }
}
</script>

<template>
  <div class="newpost-wrapper">
    <form @submit.prevent="createPost(), $emit('newpost')" class="newpost-form">
      <label v-if="!signedIn" class="input-label">Name</label>
      <input v-if="!signedIn" class="author" v-model="author" />
      <label class="input-label">Content</label>
      <input class="content" v-model="content" />
      <input type="file" accept="image/*" @change="uploadImage" />
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
