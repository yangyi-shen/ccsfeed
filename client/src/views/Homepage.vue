<script setup>
import NewPost from '../components/NewPost.vue'
import Post from '../components/Post.vue'

import axios from 'axios'
import { ref } from 'vue'

const feed = ref()

async function getFeed() {
    const response = await axios.get('https://ccsfeed-server.vercel.app/feed')
    feed.value = response.data.feed
}

getFeed()
</script>

<template>
    <div class="content">
        <NewPost :newpost="getFeed()" />
        <Post v-for="item in feed" :author="item.author" :content="item.content" :timestamp="item.timestamp" :image="item.image" />
    </div>
</template>

<style scoped>
.content {
    width: 100%;
}
</style>