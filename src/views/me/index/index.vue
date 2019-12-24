<template>
    <div class="my">
        <!-- 头部信息 -->
        <div class="mytop">
            <div class="mytop-top">
                <img src="@/assets/img/my/qiandao.png" />
                <div @click="routerLink('/home/integral/integralcheckin')">
                    去签到
                </div>
            </div>
            <div class="mytop-bottom" @click="routerLink('/me/edit')">
                <img :src="myData.headimgurl" class="mytop-bottom-left" />
                <div class="mytop-bottom-right" v-if="myData.role !== 1">
                    <div class="mytop-bottom-right-top">
                        {{ myData.nickname }}
                    </div>
                    <div class="mytop-bottom-right-bottom">
                        <div class="gender">
                            性别 : {{ myData.sex | sexType }}
                        </div>
                        <div class="tel">联系 : {{ myData.mobile }}</div>
                    </div>
                </div>
                <div class="mytop-bottom-r" v-if="myData.role === 1">
                    <div class="mytop-bottom-r-top">{{ myData.nickname }}</div>
                    <div class="mytop-bottom-r-bottom">
                        <div class="gender">
                            性别 : {{ myData.sex | sexType }}
                        </div>
                        <div class="tel">联系 : {{ myData.mobile }}</div>
                    </div>
                    <div class="balance">
                        积分余额 :
                        <span>{{ myData.integral_surplus }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 内容区 -->
        <div class="mycontent">
            <!-- 钱 -->
            <div class="money" v-if="myData.role !== 1">
                <div class="money-left">
                    <div class="money-left-top">
                        {{ myData.wallet_surplus / 100 }}
                    </div>
                    <div class="money-left-bottom">余额</div>
                </div>
                <div class="shu"></div>
                <div class="money-left">
                    <div class="money-left-top">
                        {{ myData.integral_surplus }}
                    </div>
                    <div class="money-left-bottom">积分余额</div>
                </div>
            </div>
            <!-- 四图 -->
            <div class="myitem">
                <div
                    class="myitem-item"
                    @click="routerLink('/me/wallet')"
                    v-if="myData.role !== 1"
                >
                    <img src="@/assets/img/my/qianbao.png" />
                    <div class="myitem-item-title">我的钱包</div>
                </div>
                <div class="myitem-item" @click="routerLink('/me/integral')">
                    <img src="@/assets/img/my/jifen.png" />
                    <div class="myitem-item-title">我的积分</div>
                </div>
                <div class="myitem-item" @click="routerLink('/me/exchange')">
                    <img src="@/assets/img/my/duihuan.png" />
                    <div class="myitem-item-title">我的兑换</div>
                </div>
                <div class="myitem-item" @click="routerLink('/me/travels')">
                    <img src="@/assets/img/my/youji.png" />
                    <div class="myitem-item-title">我的游记</div>
                </div>
            </div>
            <!-- 列表 -->
            <div class="mylist">
                <div
                    class="mylist-list"
                    @click="routerLink('/me/fans')"
                    v-if="myData.role !== 1"
                >
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img
                                class="mylist-list-img-img"
                                src="@/assets/img/my/fensi.png"
                            />
                        </div>
                        <div class="mylist-list-title">我的粉丝</div>
                    </div>
                    <img
                        class="mylist-list-right"
                        src="@/assets/img/my/right.png"
                    />
                </div>
                <div
                    class="mylist-list"
                    @click="routerLink('/me/line')"
                    v-if="myData.role === 3 || myData.role === 4"
                >
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img
                                class="mylist-list-img-img"
                                src="@/assets/img/my/releaseroute.png"
                            />
                        </div>
                        <div class="mylist-list-title">发布路线</div>
                    </div>
                    <img
                        class="mylist-list-right"
                        src="@/assets/img/my/right.png"
                    />
                </div>
                <div
                    class="mylist-list"
                    @click="routerLink('/me/serveorder')"
                    v-if="myData.role === 3 || myData.role === 4"
                >
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img
                                class="mylist-list-img-img"
                                src="@/assets/img/my/myserve.png"
                            />
                        </div>
                        <div class="mylist-list-title">我的服务单</div>
                    </div>
                    <img
                        class="mylist-list-right"
                        src="@/assets/img/my/right.png"
                    />
                </div>
                <div class="mylist-list" @click="routerLink('/me/address')">
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img
                                class="mylist-list-img-img"
                                src="@/assets/img/my/address.png"
                            />
                        </div>
                        <div class="mylist-list-title">收货地址</div>
                    </div>
                    <img
                        class="mylist-list-right"
                        src="@/assets/img/my/right.png"
                    />
                </div>
                <div
                    class="mylist-list"
                    @click="routerLink('/me/oftenpassenger')"
                >
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img
                                class="mylist-list-img-img"
                                src="@/assets/img/my/frequenttravellers.png"
                            />
                        </div>
                        <div class="mylist-list-title">常用旅客</div>
                    </div>
                    <img
                        class="mylist-list-right"
                        src="@/assets/img/my/right.png"
                    />
                </div>
                <div class="mylist-list" @click="routerLink('/me/collection')">
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img
                                class="mylist-list-img-img"
                                src="@/assets/img/my/collection.png"
                            />
                        </div>
                        <div class="mylist-list-title">我的收藏</div>
                    </div>
                    <img
                        class="mylist-list-right"
                        src="@/assets/img/my/right.png"
                    />
                </div>
            </div>
            <div class="settledin" @click="applySettledinfn()">
                <img src="@/assets/img/my/goapply.png" />
            </div>
        </div>
        <Tab></Tab>
    </div>
</template>

<script>
import Tab from "@/components/tab/tab.vue";
export default {
    data() {
        return {
            myData: []
            // myitem: [
            //   {
            //     title: "我的钱包",
            //     img: require("@/assets/img/my/qianbao.png"),
            //     path: '/me/wallet'
            //   },
            //   {
            //     title: "我的积分",
            //     img: require("@/assets/img/my/jifen.png"),
            //     path: '/me/integral'
            //   },
            //   {
            //     title: "我的兑换",
            //     img: require("@/assets/img/my/duihuan.png"),
            //     path: '/me/exchange'
            //   },
            //   {
            //     title: "我的游记",
            //     img: require("@/assets/img/my/youji.png"),
            //     path: '/me/travels'
            //   }
            // ],
        };
    },
    components: { Tab },
    created() {
        this.$wechat.timeline(false);
        this.getMyInfo();
    },
    methods: {
        // 获取用户信息
        getMyInfo: function() {
            this.$api.user.me().then(res => {
                this.myData = res;
            });
        },

        // 跳转商家入驻
        applySettledinfn: function() {
            this.$router.push({
                path: "applySettledin"
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
