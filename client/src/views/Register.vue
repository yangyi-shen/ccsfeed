<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref()
const password = ref()
const router = useRouter()
const message = ref(false)
const error = ref(false)

async function register() {
    const response = await axios.post('http://localhost:6900/register', {
        username: username.value,
        password: password.value
    })

    const success = response.data.success
    if (success) {
        localStorage.setItem('signedin', true)
        router.push('/')
    } else {
        error.value = !success
    }
}
</script>

<template>
    <form class="form" @submit.prevent="register">
        <h1 class="title">Create an account</h1>
        <label class="username-label">Username</label>
        <input class="username" v-model="username">
        <label class="password-label">Password</label>
        <input class="password" v-model="password">
        <button class="submit-btn" type="submit">Register</button>
        <p class="error" v-if="error">Username already in use</p>
    </form>
</template>

<style scoped>
form {
    width: 250px;
    display: flex;
    flex-direction: column;
}

.title {
    margin: 0px;
    margin-bottom: 20px;
}

label {
    margin-bottom: 5px;
}

input {
    padding: 7px;
    margin-bottom: 20px;
    font-size: 16px;
    border: 1px solid black;
    border-radius: 5px;
}

.username {
    margin-bottom: 10px;
}

.submit-btn {
    padding: 10px 0px;
    border: none;
    border-radius: 3px;
    margin: 0px 0px 10px;
    background-color: var(--compass-blue);
    color: white;
}

.error {
    color: red;
}
</style>