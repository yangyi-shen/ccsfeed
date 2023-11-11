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
    const response = await axios.get(`http://localhost:6900/login?username=${username.value}&password=${password.value}`)
    console.log(response)

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
        <label class="username-label">Username</label>
        <input class="username" v-model="username">
        <label class="password-label">Password</label>
        <input class="password" v-model="password">
        <button class="submit-btn" type="submit">Register</button>
        <p class="error" v-if="error">Credentials incorrect</p>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

.username {
    margin-bottom: 10px;
}

.submit-btn {
    margin-top: 10px;
}

.error {
    color: red;
}
</style>