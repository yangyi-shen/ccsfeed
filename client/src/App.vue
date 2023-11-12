<script setup>
import { RouterView, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

const router = useRouter()

function refresh() {
    router.go()
}
</script>

<template>
    <Header />
    <main>
        <Sidebar />
        <RouterView @signin="refresh" />
    </main>
</template>

<style scoped>
main {
    display: flex;
    padding: 20px 300px 0px;
    gap: 20px;
}
</style>