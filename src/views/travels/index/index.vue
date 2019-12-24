<template>
    <div class="travels">
        <div @click="routerLink('/travels/create')" class="release">
            <img alt src="@/assets/img/Linelist/release.png" />
        </div>

        <div class="noline" v-if="finished && !list.length">
            <div><img alt src="@/assets/img/Linelist/noline.png" /></div>
        </div>
        <van-list
            v-if="!finished || list.length"
            :finished="finished"
            @load="onLoad"
            finished-text="没有更多了"
            ref="linelist"
            v-model="loading"
        >
            <div class="list">
                <div
                    :key="index"
                    @click="routerLink('/travels/show', { id: item.id })"
                    class="travels-item"
                    v-for="(item, index) in list"
                    v-show="item.publisher != null"
                >
                    <div v-if="item.publisher != null">
                        <div class="hotitem-top">
                            <img :src="imgAfterUrl + item.cover_img" alt />
                        </div>
                        <div class="hotitem-bottom">
                            <div class="hotitem-title">{{ item.name }}</div>
                            <div class="like">
                                <div class="like-left">
                                    <img
                                        :src="item.publisher.headimgurl"
                                        alt
                                        class="likesp1"
                                    />
                                    <span class="likesp2">{{
                                        item.publisher.nickname
                                    }}</span>
                                </div>
                                <div class="like-right">
                                    <img
                                        alt
                                        class="likeimg"
                                        src="@/assets/img/Linelist/like2.png"
                                    />
                                    <span class="likesp3">{{
                                        item.collection_count
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
        <Tab></Tab>
    </div>
</template>
<script>
import Tab from "@/components/tab/tab.vue";
import travelNotes from "@/api/travelnotes.js";
export default {
    data() {
        return {
            page: 1,
            list: [],
            loading: false,
            finished: false,
            imgAfterUrl: process.env.VUE_APP_BASE_API //图片前缀
        };
    },
    components: { Tab },
    created() {
        this.$wechat.timeline(false);
    },
    mounted() {},
    methods: {
        onLoad() {
            this.$api.travelnotes.index(this.page).then(res => {
                this.page++;
                this.loading = false;
                if (res.data.length == 0) {
                    this.finished = true;
                } else {
                    this.list = this.list.concat(res.data);
                }
            });
        },
        toUrl(path, query = {}) {
            this.$router.push({ path: path, query: query });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
