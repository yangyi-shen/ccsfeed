<script setup>
import { RouterLink } from 'vue-router'

const signedIn = localStorage.getItem('signedin')

function signOut() {
    localStorage.clear()
}
</script>

<template>
    <header>
        <RouterLink to="/" class="logo-link"><h1 class="logo">🧭 css<span class="blue-text">feed</span></h1></RouterLink>
        <nav v-if="!signedIn" class="menu">
            <RouterLink to="/login" class="menu-link">Login</RouterLink>
            <RouterLink to="/register" class="menu-link">register</RouterLink>
        </nav>
        <nav v-if="signedIn" class="menu">
            <a href="/" class="menu-link" @click="signOut">Sign out</a>
        </nav>
    </header>
</template>

<style scoped>
header {
    box-shadow: 0px 5px 5px rgb(219, 218, 218);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 300px;
}

.logo-link {
    text-decoration: none;
    color: black;
}

.logo {
    margin: 0px;
}

.blue-text {
    color: #1e73be;
}

nav {
    display: flex;
    gap: 20px;
}

.menu-link {
    text-decoration: none;
    color: var(--compass-blue);
}
</style>