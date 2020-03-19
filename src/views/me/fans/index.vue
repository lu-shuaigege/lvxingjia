<template>
    <div class="fans">
        <div class="fanstop">
            <div class="money-left">
                <div class="money-left-top">{{ data.total }}</div>
                <div class="money-left-bottom">我的粉丝总数</div>
            </div>
            <div class="shu"></div>
            <div class="money-left">
                <div class="money-left-top new">{{ data.today_count }}</div>
                <div class="money-left-bottom">今日新增</div>
            </div>
        </div>
        <div class="fanslist">
            <div class="noline" v-if="finished && !fansData.length">
                <div>
                    <img alt src="@/assets/img/Linelist/noline.png" />
                </div>
            </div>
            <van-list
                v-if="!finished || fansData.length"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div class="listitem" v-for="(item, index) in fansData" :key="index">
                    <div class="listitem-left" v-if="item.userinfo">
                        <img :src="item.userinfo.headimgurl" alt />
                        <div class="title">{{ item.userinfo.nickname }}</div>
                    </div>
                    <div class="date">{{ item.created_at }}</div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fansData: [],
            data: [],
            loading: false,
            finished: false,
            page: 1
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
    },
    methods: {
        onLoad() {
            this.$api.fans.index(this.page).then(res => {
                this.data = res;
                this.page++;
                this.loading = false;
                if (res.data.length == 0) {
                    this.finished = true;
                } else {
                    this.fansData = this.fansData.concat(res.data);
                }
            });
        },
        myinformationfn: function() {
            this.$router.push({
                name: "myinformation"
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
