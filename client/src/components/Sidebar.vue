<script setup></script>

<template>
    <aside class="sidebar">
        <div class="faq">
            <h2 class="faq-title">FAQ</h2>
            <p class="question">Q: Why does this site look so ugly?</p>
            <p class="answer">A: Web development takes a long time and I only had 4 hours, alright?</p>
            <p class="question">Q: Why do the posts take so long to load?</p>
            <p class="answer">A: Do you think it still would be slow if I knew the answer?</p>
            <p class="question">Q: Omigosh Yang you're so awesome for making this on such short notice.</p>
            <p class="answer">A: I know, right? If we ever meet you can buy me a coffee.</p>
        </div>
        <div class="announcement">
            <h2 class="announcement-title">Known bug</h2>
            <p>After you log in, the header still shows the login and register buttons. I'm working on fixing this. Meanwhile, if you want to sign out you can just reload the page and it'll render correctly.</p>
        </div>
        <p>Want to see the code for this website? Visit the Github repo <a href="https://github.com/Yang-Yi-Shen/ccsfeed" target="_blank">here</a>.</p>
    </aside>
</template>

<style scoped>
.sidebar {
    width: 300px;
    flex-shrink: 0;
}

.faq {
    background-color: rgb(239, 239, 239);
    border-radius: 7px;
    padding: 20px;
    margin-bottom: 20px;
}

.announcement {
    background-color: rgb(255, 237, 133);
    border-radius: 7px;
    padding: 20px;
}

.announcement-title, .faq-title {
    margin: 0px;
    margin-bottom: 20px;
}

.question {
    font-weight: 600;
}
</style>