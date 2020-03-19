<template>
    <div class="doorticket">
        <div class="bannertop">
            <div class="topcon">
                <img class="topcon-left" src="@/assets/img/Integralmall/signin.png" alt />
                <div class="topcon-center">
                    <div class="topcon-center-top">累计签到积分</div>
                    <div class="topcon-center-bottom">{{ total }}</div>
                </div>
                <div class="topcon-right" @click="integralcheckinfn()">签到</div>
            </div>
        </div>
        <div class="integralList">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                ref="linelist"
            >
                <div class="hotlist">
                    <div
                        class="hotlist-item"
                        v-for="(item, indexf) in hotlist"
                        :key="indexf"
                        @click="doorticketdetailsfn(item.id)"
                    >
                        <div class="hotitem-top">
                            <img :src="imgAfterUrl + item.cover_img" alt />
                        </div>
                        <div class="hotitem-bottom">
                            <div class="hotitem-title">{{ item.name }}</div>
                            <div class="money">
                                <div class="moneyRMB">￥{{item.price}}</div>
                                <div class="moneyLeft">
                                    <div class="moneysp2">{{ item.expend }}</div>
                                    <div class="moneysp3">积分</div>
                                </div>
                            </div>
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
            imgAfterUrl: process.env.VUE_APP_IMGURL, //地址前缀
            doorticketid: 0,
            total: 0, //积分
            hotlist: [], // 热门推荐
            current_page: 1, //当前页
            last_page: 1, //最后一页的页数
            load: false, //是否显示加载
            nolist: false, //没有数据
            loading: false,
            finished: false
        };
    },
    components: {},
    created() {
        this.sign_in_sum();
        this.$wechat.timeline(false);
    },
    methods: {
        // 下拉加载更多请求接口
        onLoad() {
            // 异步更新数据
            let _this = this;
            this.$api.goods.index(_this.current_page).then(res => {
                let hots = res.data;
                _this.last_page = res.last_page;
                if (_this.current_page === _this.last_page) {
                    // 数据全部加载完成
                    _this.finished = true;
                }
                _this.current_page = _this.current_page + 1;
                // 加载状态结束
                _this.loading = false;
                if (hots.length === 0) {
                    _this.nolist = true;
                } else {
                    _this.nolist = false;
                }
                for (let i = 0; i < hots.length; i++) {
                    _this.hotlist.push(hots[i]);
                }
                if (_this.hotlist.length === 0) {
                    _this.finished = true;
                }
            });
        },
        //我的积分
        sign_in_sum() {
            this.$api.rewards_point.sign_in_sum().then(res => {
                this.total = res;
            });
        },

        //跳转积分商品详情
        doorticketdetailsfn: function(id) {
            //路由跳转携带参数
            this.$router.push({
                path: "/home/integral/show",
                query: {
                    id: id
                }
            });
        },
        integralcheckinfn: function() {
            //路由跳转携带参数
            this.$router.push({
                path: "/home/integral/integralcheckin",
                params: {
                    //   doorticketid: this.doorticketid
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
