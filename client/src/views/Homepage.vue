<script setup>
import Header from '../components/Header.vue'
import NewPost from '../components/NewPost.vue'
import Post from '../components/Post.vue'

import axios from 'axios'
import { ref } from 'vue'

const feed = ref()

async function getFeed() {
    const response = await axios.get('https:/ccsfeed-server.vercel.app/feed')

    feed.value = response.data.feed.reverse()
}

getFeed()
</script>

<template>
    <Header />
    <main>
        <NewPost :newpost="getFeed()" />
        <Post v-for="item in feed" :author="item.author" :content="item.content" :timestamp="item.timestamp" />
    </main>
</template>

<style scoped>
main {
    padding: 50px;
}
</style>