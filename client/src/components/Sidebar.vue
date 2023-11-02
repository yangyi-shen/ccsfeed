<script setup></script>

<template>
    <aside class="sidebar">
        <div class="announcement">
            <h2 class="announcement-title">FAQ</h2>
            <p class="question">Q: Why does this site look so ugly?</p>
            <p class="answer">A: Web development takes a long time and I only had 4 hours, alright?</p>
            <p class="question">Q: Why do I have to manually enter my name? This is worse than that wordpress thing!</p>
            <p class="answer">A: Account login/registration is coming. Also you'll notice the feed is sorted chronologically, so it's way more convenient than wordpress.</p>
            <p class="question">Q: Omigosh Yang you're so awesome for making this on such short notice.</p>
            <p class="answer">A: I know, right? If we ever meet you can buy me a coffee.</p>
        </div>
        <p>Want to see the code for this website? Visit the Github repo <a href="https://github.com/Yang-Yi-Shen/ccsfeed" target="_blank">here</a>.</p>
    </aside>
</template>

<style scoped>
.sidebar {
    width: 300px;
    flex-shrink: 0;
}

.announcement {
    background-color: rgb(239, 239, 239);
    border-radius: 10px;
    padding: 20px;
}

.announcement-title {
    margin: 0px;
    margin-bottom: 20px;
}

.question {
    font-weight: 600;
}
</style>