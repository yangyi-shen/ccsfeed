<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
    <Header />
    <main>
        <Sidebar />
        <RouterView />
    </main>
</template>

<style scoped>
main {
    display: flex;
    padding: 20px 50px 0px;
    gap: 20px;
}
</style>