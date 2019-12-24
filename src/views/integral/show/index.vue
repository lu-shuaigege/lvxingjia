<template>
    <div class="linedetails">
        <!-- 轮播图 -->
        <yd-slider class="banners" autoplay="3000">
            <yd-slider-item v-for="(item, index) in banners" :key="index">
                <img :src="imgAfterUrl + item" />
            </yd-slider-item>
        </yd-slider>
        <!-- 内容区 -->
        <div class="content">
            <!-- 最上面主要信息 -->
            <div class="top">
                <div class="titel">{{ data.name }}</div>
                <div class="topword">{{ data.desc }}</div>
                <div class="money">
                    <div class="money-left">
                        <div class="moneysp2">{{ data.expend }}</div>
                        <div class="moneysp3">积分</div>
                    </div>
                    <div class="money-right">
                        <div class="salesvolume">
                            <del>
                                <span class="salesvolume-span">￥{{ data.price }}</span>
                            </del>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 景点介绍 -->
            <div class="word">
                <div class="word-all">
                    <div v-html="data.content"></div>
                </div>
            </div>
            <div
                class="buy"
                @click="buyfn(data.id,data.cover_img,data.name,
                        data.desc,
                        data.expend
                    )
                "
            >立即兑换</div>
        </div>
        <div class="popup" v-show="delShow == 1">
            <div class="contents">
                <div class="con-word">是否确认兑换?</div>
                <div class="con-bottom">
                    <div class="nook" @click="popup(0)">取消</div>
                    <div class="isok" @click="popup(1)">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgAfterUrl: process.env.VUE_APP_BASE_API,
            id: "", //详情id
            delShow: 0, //兑换确认
            // 轮播图
            banners: [],
            data: {},
            integral: "" //积分余额
        };
    },
    components: {},
    created() {
        this.id = this.$route.query.id;
        this.show();
        this.getMyInfo();
        this.$wechat.timeline(false);
    },
    updated() {
        // jquery方法修改
        $(".word-all")
            .find("p")
            .find("img")
            .css("width", "100%");
        // jquery方法修改
        $(".word-all")
            .find("div")
            .find("div")
            .find("p")
            .css({ "white-space": "pre-wrap", "word-break": "break-all" });
    },
    watch: {},
    methods: {
        //获取详情
        show() {
            this.$api.goods.show(this.id).then(res => {
                this.banners.push(res.cover_img);
                this.data = res;
            });
        },
        // 获取用户信息
        getMyInfo: function() {
            this.$api.user.me().then(res => {
                this.integral = res.integral_surplus;
            });
        },
        // 跳转购买输入信息页面  //兑换
        buyfn(id, cover_img, name, desc, expend) {
            if (this.data.expend > this.integral) {
                this.$toast("积分不足，快去赚积分吧！");
                return;
            }
            this.delShow = 1;
        },
        //兑换确认弹框
        popup(x) {
            if (x == 1) {
                this.delShow = 0;
                //路由跳转携带参数
                this.$router.push({
                    path: "/home/integral/integralorder",
                    query: {
                        id: this.data.id,
                        cover_img: this.data.cover_img,
                        name: this.data.name,
                        desc: this.data.desc,
                        expend: this.data.expend
                    }
                });
            } else if (x == 0) {
                this.delShow = 0;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
.yd-slider.banners > div.yd-slider-pagination {
    bottom: 0.3rem !important;
}
</style>
