<template>
    <div class="myexchange">
        <div class="listcontent">
            <div class="noline" v-if="finished && !myexchangelist.length">
                <div><img alt src="@/assets/img/Linelist/noline.png" /></div>
            </div>
            <van-list
                v-if="!finished || myexchangelist.length"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div
                    class="list"
                    v-for="(item, index) in myexchangelist"
                    :key="index"
                    @click="
                        routerLink('/home/integral/show', { id: item.goods.id })
                    "
                >
                    <div class="list-left">
                        <img :src="imgAfterUrl+item.goods.cover_img" alt />
                    </div>
                    <div class="list-right">
                        <div class="title">{{ item.goods.name }}</div>
                        <div class="right-bottom">
                            <div class="integral">{{ item.integral }}</div>
                            <div class="integralb">积分</div>
                            <s class="money">￥{{ item.goods.expend }}</s>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgAfterUrl: process.env.VUE_APP_BASE_API,
            myexchangelist: [],
            loading: false,
            finished: false,
            page: 1
        };
    },
    created() {
        this.$wechat.timeline(false);
    },
    components: {},
    methods: {
        onLoad() {
            this.$api.myexchange.index(this.page).then(res => {
                this.page++;
                this.loading = false;
                if (res.data.length == 0) {
                    this.finished = true;
                } else {
                    this.myexchangelist = this.myexchangelist.concat(res.data);
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
