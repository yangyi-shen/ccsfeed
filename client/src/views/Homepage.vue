<script setup>
import Header from '../components/Header.vue'
import NewPost from '../components/NewPost.vue'
import Post from '../components/Post.vue'

import axios from 'axios'
import { ref } from 'vue'

const feed = ref()

async function getFeed() {
    await axios.get('https://ccsfeed-server.vercel.app/feed')
        .then(response => {
            console.log(response.data)
            feed.value = response.data.feed.reverse()
            console.log(feed.value, response.data, response.data.feed)
        })
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