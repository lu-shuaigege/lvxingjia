<template>
    <div class="noticedetails">
        <div class="title">{{ data.name }}</div>
        <div class="time">{{ data.time }}</div>
        <div class="word">{{ data.word }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {}
        };
    },
    components: {},
    created() {
        this.$api.message.show(this.$route.query.id).then(res => {
            this.data = res;
        });
        this.$wechat.timeline(false);
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
