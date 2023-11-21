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
        <p>I'm really sorry guys, but after I fixed the initial problem something else popped up. If I can't get this working by this evening I'm gonna remove image upload, since that's causing all the problems. Either way, we'll be able to chat again by tommorow.</p>
        <Post v-for="item in feed" :author="item.author" :content="item.content" :timestamp="item.timestamp" :image="item.image" />
    </div>
</template>

<style scoped>
.content {
    width: 100%;
}
</style>