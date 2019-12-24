<template>
    <div id="app"><router-view></router-view></div
></template>
<script>
export default {
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {},
    updated() {
        window.scroll(0, 0);
    }
};
</script>
<style lang="less">
#app {
    margin: 0px;
    padding: 0px;
}

input::-webkit-input-placeholder {
    color: #999;
    font-size: 0.373rem;
}

input,
textarea {
    color: #333 !important;
    font-size: 0.32rem !important;
}

textarea::-webkit-input-placeholder {
    color: #999;
    font-size: 0.373rem;
}

.yd-slider.banners > div.yd-slider-pagination {
    bottom: 0.3rem !important;
}

.van-list {
    margin: 0px auto;
}

.van-list__finished-text {
    margin: 0px auto;
}
.wh_container {
    background-color: #fff;
}
.wh_content_all[data-v-2ebcbc83] {
    background-color: #fff;
}
#app > div > div.content-date > section > div {
    background-color: #fff;
}
#app > div > div.content-date > section > div > div > div > div {
    color: #000;
}
#app > div > div.content-date > section > div > div > div > .wh_other_dayhide {
    color: #999;
}
#app > div > div.content-date > section > div > div > div > .wh_isToday {
    background: #fff;
}
#app > div > div.content-date > section > div > div > div > .wh_chose_day {
    background: #fff;
    color: #000;
}
#app > div > div.content-date > section > div > div.wh_top_changge {
    display: none;
}
#app
    > div
    > div.content-date
    > section
    > div
    > div:nth-child(3)
    > div
    > .wh_isMark {
    background: #fff;
    color: #2dba55;
    border: 1px solid #2dba55;
}
#app > div > div.banners > div.replacecover > div > div > div {
    width: 100% !important;
}
#app > div > div.images > div.imgcontent > div > div > div {
    width: 1.87rem !important;
    height: 1.87rem !important;
}
#app > div > div.images > div.imgcontent > div > div > div > input {
    width: 1.87rem !important;
    height: 1.87rem !important;
}
</style>
