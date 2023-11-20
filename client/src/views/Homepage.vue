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
        <p>Hey folks! Something's gone wrong big time with the server, so the posts won't be able to load. I'm gonna have it fixed by tommorow-until then, I am afraid that the feed will be unusable until then. Sorry sophie, I know how this is the only way you can chat with people. I'll try to fix the issue ASAP.</p>
        <Post v-for="item in feed" :author="item.author" :content="item.content" :timestamp="item.timestamp" :image="item.image" />
    </div>
</template>

<style scoped>
.content {
    width: 100%;
}
</style>