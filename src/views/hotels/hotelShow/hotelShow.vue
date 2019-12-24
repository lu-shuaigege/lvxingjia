<template>
    <div class="linedetails" ref="linedetails">
        <img
            class="islike"
            @click="collection(1)"
            v-show="islike == 0"
            src="@/assets/img/Linelist/like.png"
        />
        <img
            class="islike"
            @click="collection(0)"
            v-show="islike == 1"
            src="@/assets/img/Linelist/xihuan.png"
        />
        <!-- 轮播图 -->
        <div class="banners">
            <img :src="imgAfterUrl + datas.cover_img" />
        </div>
        <!-- 内容区 -->
        <div class="content">
            <!-- 最上面主要信息 -->
            <div class="top">
                <div class="titel">{{ datas.name }}</div>
                <div class="word">{{ datas.profile }}</div>

                <div class="money">
                    <div class="money-left">
                        <div class="moneysp1">￥</div>
                        <div class="moneysp2">{{ datas.min_price / 100 }}</div>
                        <div class="moneysp3">起</div>
                    </div>
                    <div class="money-right">
                        <div class="salesvolume"></div>
                    </div>
                </div>
            </div>
            <!-- 选择套餐类型 -->
            <div class="choice" @click="choicefn()">
                <div class="choiceleft">选择</div>
                <div class="choicecenter">请选择套餐类型</div>
                <img src="@/assets/img/Linelist/right.png" alt />
            </div>
            <!-- 景点介绍 -->
            <div class="word">
                <div v-show="istop" class="iswordtop">
                    <div
                        :class="
                            activeid === 0 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(0)"
                    >
                        酒店介绍
                    </div>
                    <div
                        :class="
                            activeid === 1 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(1)"
                    >
                        注意事项
                    </div>
                </div>
                <div class="wordtop">
                    <div
                        :class="
                            activeid === 0 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(0)"
                    >
                        酒店介绍
                    </div>
                    <div
                        :class="
                            activeid === 1 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(1)"
                    >
                        注意事项
                    </div>
                </div>
                <div class="word-all">
                    <div>
                        <div class="wordtitle wordtitle1">
                            酒店介绍
                        </div>
                        <div v-html="datas.introduction"></div>
                    </div>
                    <div>
                        <div class="wordtitle wordtitle2">
                            注意事项
                        </div>
                        <div v-html="datas.note"></div>
                    </div>
                </div>
            </div>
            <div class="buy" @click="choicefn()">立即预定</div>
        </div>
        <!-- 选择套餐弹窗 -->
        <div class="choicepopup" ref="choicepopup">
            <div class="choicepopupcon">
                <img
                    src="@/assets/img/Linelist/close.png"
                    class="choicepopupclose"
                    ref="choicepopupclose"
                    @click="payclose()"
                    alt
                />
                <div class="popupcon">
                    <div class="popupcon-top">
                        <img
                            class="top-left"
                            :src="imgAfterUrl + datas.cover_img"
                        />
                        <div class="top-right">
                            <div class="top-right-top">
                                ¥{{ price_money / 100 }}
                            </div>
                            <div class="top-right-bottom">
                                {{ setmeal_name }}
                            </div>
                        </div>
                    </div>
                    <div class="popupcon-item">
                        <div class="popupcon-item-title">类型</div>
                        <div class="twoclasstype">
                            <div
                                :class="
                                    twoclass == 1
                                        ? 'twoclass-item-active'
                                        : 'twoclass-item'
                                "
                                @click="twoclassfn(1)"
                            >
                                <div>散客</div>
                            </div>
                            <div
                                v-show="role != 1"
                                :class="
                                    twoclass == 2
                                        ? 'twoclass-item-active'
                                        : 'twoclass-item'
                                "
                                @click="twoclassfn(2)"
                            >
                                <div>团队</div>
                            </div>
                        </div>
                    </div>
                    <div class="popupcon-item">
                        <div class="popupcon-item-title">套餐</div>
                        <div class="twoclass">
                            <div
                                v-show="twoclass == 1"
                                :class="
                                    twoclassitem == item.id
                                        ? 'twoclass-item-active'
                                        : 'twoclass-item'
                                "
                                @click="
                                    setmeal(
                                        item.id,
                                        item.price,
                                        item.name,
                                        item.store,
                                        item.buy_limit
                                    )
                                "
                                v-for="(item, indexa) in get_attr.single"
                                :key="indexa - 10"
                            >
                                <div>套餐{{ indexa + 1 }}</div>
                            </div>
                            <div
                                v-show="twoclass == 2"
                                :class="
                                    twoclass == 2
                                        ? 'twoclass-item-active'
                                        : 'twoclass-item'
                                "
                                @click="
                                    setmeal(
                                        itemteam.id,
                                        itemteam.price,
                                        itemteam.name,
                                        itemteam.store,
                                        itemteam.buy_limit
                                    )
                                "
                                v-for="(itemteam, indexteam) in get_attr.team"
                                :key="indexteam"
                            >
                                <div>标准间</div>
                            </div>
                        </div>
                        <div v-show="twoclass == 2" class="explain">
                            说明:若有其他房型需求,请在填写预定信息时进行备注说明。
                        </div>
                    </div>
                    <div class="popupcon-item">
                        <div class="popupcon-item-bynum">
                            <div class="bynum-left">购买数量</div>
                            <div class="bynum-right">
                                <div class="down" @click="downfn(1)">-</div>
                                <!--<div class="bynum-right-center">{{allPrices}}</div>-->
                                <div class="bynum-right-center">
                                    {{ adultnum }}
                                </div>
                                <div class="up" @click="downfn(2)">+</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <router-link to="/ticketbooking"> -->
                <div class="pay-btn" @click="ticketbookingfn">立即支付</div>
                <!-- </router-link> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            role: "", //角色
            imgAfterUrl: process.env.VUE_APP_BASE_API,
            activeid: 0, //点击介绍
            istop: false, //是否吸顶显示
            btn_height: 0, //线路介绍按钮高度
            detailid: 0, //详情id
            type: 4, //收藏类型，1 游记 2 线路 3门票 4酒店
            islike: 0, //收藏
            adultnum: 1, //购买数量
            twoclass: 1, //套餐类型选择
            twoclassitem: 1, //套餐选择
            datas: {}, //获取所有数据
            get_attr: {}, //全部套餐
            price_money: 0, //所选套餐价格
            setmeal_name: "", //所选套餐名称
            goodsUnitPrice: 0, //当前商品的单价
            buy_limit: 0, //当前商品最少购买数量
            store: 0 //当前商品的库存
        };
    },
    components: {},
    watch: {},
    created() {
        this.detailid = this.$route.query.id;
        this.hotelid(this.detailid);
        this.$wechat.timeline(false);
        // 获取用户信息
        this.$api.user.me().then(res => {
            this.role = res.role;
        });
    },
    updated() {
        // jquery方法修改
        $(".word-all")
            .find("div")
            .find("div")
            .find("img")
            .css("width", "100%");
        // jquery方法修改
        $(".word-all")
            .find("div")
            .find("div")
            .find("p")
            .css({ "white-space": "pre-wrap", "word-break": "break-all" });
    },
    mounted() {
        // 监听事件
        window.addEventListener("scroll", this.handleScroll);
        this.btn_height = $(".iswordtop").height();
    },
    methods: {
        //监听滚动条吸顶效果
        handleScroll: function() {
            let wordtop = $(".wordtop").offset().top - $(window).scrollTop();
            if (wordtop <= 0) {
                this.istop = true;
            } else {
                this.istop = false;
            }
            let wordtitle1 =
                $(".wordtitle1").offset().top -
                $(window).scrollTop() -
                this.btn_height;
            let wordtitle2 =
                $(".wordtitle2").offset().top -
                $(window).scrollTop() -
                this.btn_height;
            //此处加2是为了解决点击按钮定位完成以后按钮状态不对的问题
            let viewScroll = $(window).scrollTop() + this.btn_height + 2;
            if (viewScroll > $(".wordtitle1").offset().top) {
                this.activeid = 0;
            }
            if (viewScroll > $(".wordtitle2").offset().top) {
                this.activeid = 1;
            }
        },
        // 点击介绍
        active: function(activeid) {
            this.activeid = activeid;
            // 页面滚动到指定位置
            if (activeid == 0) {
                $("html,body").animate(
                    {
                        scrollTop:
                            $(".wordtitle1").offset().top - this.btn_height
                    },
                    0
                );
            }
            if (activeid == 1) {
                $("html,body").animate(
                    {
                        scrollTop:
                            $(".wordtitle2").offset().top - this.btn_height
                    },
                    0
                );
            }
            setTimeout(() => {
                this.activeid = activeid;
            }, 50);
        },
        //点击收藏
        collection: function(collection) {
            this.$api.collection.index(this.type, this.detailid).then(res => {
                if (res == null) {
                    this.islike = collection;
                }
            });
        },
        //套餐选择弹窗
        choicefn: function() {
            this.$refs.linedetails.style.height = "100vh";
            this.$refs.linedetails.style.overflow = "hidden";
            this.$refs.choicepopup.style.top = "0px";
        },
        //套餐类型选择
        twoclassfn: function(y) {
            this.twoclass = y;
            if (y == 2) {
                let num = this.get_attr.single.length + 1;
                $(`.twoclass div:nth-child(${num})`).click();
                this.price_money = this.adultnum * this.price_money;
                this.setmeal_name = "标准间";
            } else if (y == 1) {
                $("div.twoclass > div.twoclass-item:nth-child(1)").click();
            }
        },
        //套餐选择
        setmeal: function(
            setmeal,
            setmeal_money,
            setmeal_name,
            store,
            buy_limit
        ) {
            this.adultnum = buy_limit; //切换数量
            this.buy_limit = buy_limit;
            this.goodsUnitPrice = setmeal_money; //当前商品的单价
            this.twoclassitem = setmeal;
            this.price_money = setmeal_money;
            this.setmeal_name = setmeal_name;
        },
        // 跳转预订信息填写页面
        ticketbookingfn: function() {
            if (this.twoclass == 1) {
                //判断散客-团队
                let goodsDeatilsInfo = {
                    obj_id: this.datas.id, //酒店id
                    type: this.twoclass, //类型 1散客 2团体
                    order_type: 2, //类型 1门票 2酒店 3线路
                    name: this.datas.name, //详情名字
                    total: this.price_money, //总金额
                    count: this.adultnum //数量
                };
                this.$router.push({
                    path: "/ticketbooking",
                    query: {
                        goodsDetailsInfo: JSON.stringify(goodsDeatilsInfo)
                    }
                });
            } else if (this.twoclass == 2) {
                let goodsDeatilsInfo = {
                    obj_id: this.datas.id, //酒店id
                    type: this.twoclass, //类型 1散客 2团体
                    order_type: 2, //类型 1门票 2酒店 3线路
                    name: this.datas.name, //详情名字
                    total: this.price_money, //总金额
                    count: this.adultnum //数量
                };
                this.$router.push({
                    path: "/ticketbooking",
                    query: {
                        goodsDetailsInfo: JSON.stringify(goodsDeatilsInfo)
                    }
                });
            }
        },
        // 购票数量加减
        downfn(val) {
            if (val == 1) {
                if (this.adultnum > this.buy_limit) {
                    this.adultnum--;
                    this.allPrices();
                }
            } else {
                if (this.adultnum < this.store) {
                    this.adultnum++;
                    this.allPrices();
                }
            }
        },
        // 计算总价
        allPrices() {
            this.price_money = this.adultnum * this.goodsUnitPrice; //商品单价*数量
        },
        //关闭支付弹框
        payclose: function() {
            this.$refs.linedetails.style.height = "";
            this.$refs.linedetails.style.overflow = "scroll";
            this.$refs.choicepopup.style.top = "100vh";
        },
        // 请求景点门票详情
        hotelid: function() {
            let _this = this;
            this.$api.hotel.show(_this.detailid).then(res => {
                _this.datas = res;
                _this.get_attr = res.get_attr;
                _this.twoclassitem = res.get_attr.single[0].id; //取第一个id
                _this.price_money = res.get_attr.single[0].price; //取第一个价格
                _this.setmeal_name = res.get_attr.single[0].name; //取第一个名字
                _this.goodsUnitPrice = res.get_attr.single[0].price; //取第一个价格  当前商品的单价
                _this.buy_limit = res.get_attr.single[0].buy_limit; //取第一个最少购买数量  当前商品的单价
                _this.store = res.get_attr.single[0].store; //取第一个的库存  当前商品的库存
                _this.adultnum = _this.buy_limit;
                if (_this.datas.is_collection === 1) {
                    _this.islike = 1;
                }
                if (_this.datas.is_collection === 0) {
                    _this.islike = 0;
                }
            });
        }
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>
<style lang="scss" scoped>
@import "hotelShow.scss";
.yd-slider.banners > div.yd-slider-pagination {
    bottom: 0.3rem !important;
}
</style>
