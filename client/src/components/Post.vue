<script setup>
const props = defineProps({
    author: String,
    content: String,
    timestamp: String
})

// formate timestamp into easily readable format
const date = new Date(props.timestamp)
const options = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric', 
  hour: '2-digit', 
  minute: '2-digit',
  hour12: true
};
const formattedTime = date.toLocaleString('en-US', options);
</script>

<template>
    <div class="post-wrapper">
        <div class="post">
            <p class="author">{{ author }}</p>
            <p class="timestamp">{{ formattedTime }}</p>
            <p class="content">{{ content }}</p>
        </div>
    </div>
</template>

<style scoped>
.post-wrapper {
    width: 100%;
}

.post {
    background: rgb(228, 228, 228);
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0px;
}

.author {
    font-weight: 600;
    margin: 0px;
}

.timestamp {
    color: grey;
    margin: 0px;
    margin-top: 5px;
}
</style>