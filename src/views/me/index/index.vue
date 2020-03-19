<template>
    <div class="my">
        <!-- 头部信息 -->
        <div class="mytop">
            <div class="mytop-top">
                <img src="@/assets/img/my/qiandao.png" />
                <div @click="routerLink('/home/integral/integralcheckin')">去签到</div>
            </div>
            <div class="mytop-bottom" @click="routerLink('/me/edit')">
                <img :src="myData.headimgurl" class="mytop-bottom-left" />
                <div class="mytop-bottom-right" v-if="role !== 1">
                    <div class="mytop-bottom-right-top">{{ myData.nickname }}</div>
                    <div class="mytop-bottom-right-bottom">
                        <div class="gender">性别 : {{ myData.sex | sexType }}</div>
                        <div class="tel">联系 : {{ myData.mobile }}</div>
                    </div>
                </div>
                <div class="mytop-bottom-r" v-if="role === 1">
                    <div class="mytop-bottom-r-top">{{ myData.nickname }}</div>
                    <div class="mytop-bottom-r-bottom">
                        <div class="gender">性别 : {{ myData.sex | sexType }}</div>
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
            <div class="money" v-if="role !== 1">
                <div class="money-left">
                    <div class="money-left-top">{{ myData.wallet_surplus / 100 }}</div>
                    <div class="money-left-bottom">余额</div>
                </div>
                <div class="shu"></div>
                <div class="money-left">
                    <div class="money-left-top">{{ myData.integral_surplus }}</div>
                    <div class="money-left-bottom">积分余额</div>
                </div>
            </div>
            <!-- 四图 -->
            <div class="myitem">
                <div class="myitem-item" @click="routerLink('/me/wallet')" v-if="role !== 1">
                    <img src="@/assets/img/my/qianbao.png" />
                    <div class="myitem-item-title">我的钱包</div>
                </div>
                <div class="myitem-item" @click="routerLink('/me/integral')">
                    <img src="@/assets/img/my/jifen.png" class="integralimg" />
                    <div class="myitem-item-title">我的积分</div>
                </div>
                <div class="myitem-item" @click="routerLink('/me/exchange')">
                    <img src="@/assets/img/my/duihuan.png" class="integralimg" />
                    <div class="myitem-item-title">我的兑换</div>
                </div>
                <div class="myitem-item" @click="routerLink('/me/travels')">
                    <img src="@/assets/img/my/youji.png" />
                    <div class="myitem-item-title">我的游记</div>
                </div>
            </div>
            <!-- 列表 -->
            <div class="mylist">
                <div class="mylist-list" @click="routerLink('/me/fans')" v-if="role !== 1">
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img class="mylist-list-img-img" src="@/assets/img/my/fensi.png" />
                        </div>
                        <div class="mylist-list-title">我的粉丝</div>
                    </div>
                    <img class="mylist-list-right" src="@/assets/img/my/right.png" />
                </div>
                <div
                    class="mylist-list"
                    @click="routerLink('/me/line')"
                    v-if="role === 3 || role === 4"
                >
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img class="mylist-list-img-img" src="@/assets/img/my/releaseroute.png" />
                        </div>
                        <div class="mylist-list-title">发布路线</div>
                    </div>
                    <img class="mylist-list-right" src="@/assets/img/my/right.png" />
                </div>
                <div
                    class="mylist-list"
                    @click="routerLink('/me/serveorder')"
                    v-if="role === 3 || role === 4"
                >
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img class="mylist-list-img-img" src="@/assets/img/my/myserve.png" />
                        </div>
                        <div class="mylist-list-title">我的服务单</div>
                    </div>
                    <img class="mylist-list-right" src="@/assets/img/my/right.png" />
                </div>
                <div class="mylist-list mylist-list-down" v-if="role === 3 || role === 4">
                    <textarea id="bar" class="copy_textarea" v-model="copy"></textarea>
                    <button
                        class="btn release-item"
                        ref="release"
                        data-clipboard-action="cut"
                        data-clipboard-target="#bar"
                        @click="pc"
                    ></button>
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img class="mylist-list-img-img" src="@/assets/img/my/myserve.png" />
                        </div>
                        <div class="mylist-list-title">下载报名列表</div>
                    </div>
                    <img class="mylist-list-right" src="@/assets/img/my/right.png" />
                </div>
                <div class="mylist-list" @click="routerLink('/me/address')">
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img class="mylist-list-img-img" src="@/assets/img/my/address.png" />
                        </div>
                        <div class="mylist-list-title">收货地址</div>
                    </div>
                    <img class="mylist-list-right" src="@/assets/img/my/right.png" />
                </div>
                <div class="mylist-list" @click="routerLink('/me/oftenpassenger')">
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img
                                class="mylist-list-img-img"
                                src="@/assets/img/my/frequenttravellers.png"
                            />
                        </div>
                        <div class="mylist-list-title">常用旅客</div>
                    </div>
                    <img class="mylist-list-right" src="@/assets/img/my/right.png" />
                </div>
                <div class="mylist-list" @click="routerLink('/me/collection')">
                    <div class="mylist-list-left">
                        <div class="mylist-list-img">
                            <img class="mylist-list-img-img" src="@/assets/img/my/collection.png" />
                        </div>
                        <div class="mylist-list-title">我的收藏</div>
                    </div>
                    <img class="mylist-list-right" src="@/assets/img/my/right.png" />
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
import Clipboard from "clipboard";
export default {
    data() {
        return {
            myData: [],
            role: 0, //角色
            copy: "", //复制内容
            user_id: "", //用户id
            imgUrl: process.env.VUE_APP_IMGURL
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
        this.role = Number(localStorage.getItem("role"));
        this.getMyInfo();
    },
    methods: {
        // 获取用户信息
        getMyInfo: function() {
            this.$api.user.me().then(res => {
                this.myData = res;
                this.user_id = res.id;
                localStorage.setItem("role", res.role);
                // this.role=res.role
                this.$api.user
                    .encryption({ eptnum: this.user_id })
                    .then(res => {
                        this.copy = `${this.imgUrl}/Itinerary/persons/uk/${res.data.eptstr}.html`;
                    });
            });
        },

        // 跳转商家入驻
        applySettledinfn: function() {
            this.$router.push({
                path: "applySettledin"
            });
        },
        //生成链接到pc发布
        pc() {
            var clipboard = new Clipboard(".btn");
            clipboard.on("success", e => {
                // success("复制成功"); //这里你如果引入了elementui的提示就可以用，没有就注释即可
                this.$toast("已复制到剪切板，请粘贴网址下载");
                // 释放内存
                clipboard.destroy();
            });
            clipboard.on("error", e => {
                // 不支持复制
                console.log("该浏览器不支持自动复制");
                // 释放内存
                clipboard.destroy();
            });
            // this.$toast("已复制到剪切板，请粘贴网址发布");
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
