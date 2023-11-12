<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref()
const password = ref()
const router = useRouter()
const message = ref(false)
const error = ref(false)

async function login() {
    const response = await axios.get(`https://ccsfeed-server.vercel.app/login?username=${username.value}&password=${password.value}`)
    console.log(response)

    const success = response.data.success
    if (success) {
        localStorage.setItem('signedin', true)
        localStorage.setItem('username', username.value)
        router.push('/')
    } else {
        error.value = !success
    }
}
</script>

<template>
    <form class="form" @submit.prevent="login">
        <h1 class="title">Sign in</h1>
        <label class="username-label">Username</label>
        <input class="username" v-model="username">
        <label class="password-label">Password</label>
        <input class="password" v-model="password">
        <button class="submit-btn" type="submit">Login</button>
        <p class="error" v-if="error" >Credentials incorrect</p>
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