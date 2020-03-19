<template>
    <div class="integralorder" ref="integralorder">
        <div class="integralorder-top" v-show="shop_address == null" @click="gotoaddress()">
            <div class="top-con">
                <div class="top-con-left">您的收货地址为空，点此添加收货地址</div>
                <img src="@/assets/img/Linelist/right.png" class="top-con-right" />
            </div>
        </div>
        <div class="integralorder-topnew" v-show="shop_address != null" @click="gotoaddress()">
            <img src="@/assets/img/Integralmall/addressicon.png" class="top-con-left" />
            <div class="top-con-center">
                <div class="top-con-center-top">
                    <div class="top-con-center-top-name">{{ address.name }}</div>
                    <div class="top-con-center-top-tel">{{ address.mobile }}</div>
                </div>
                <div class="top-con-center-bottom">{{ address.address }}</div>
            </div>
            <img src="@/assets/img/Linelist/right.png" class="topnew-con-right" />
        </div>
        <div class="integralorder-center">
            <div class="center-left">
                <img :src="imgAfterUrl + order.cover_img" class="center-left-img" />
            </div>
            <div class="center-right">
                <div class="center-right-top">{{ order.name }}</div>
                <div class="center-right-center">{{ order.desc }}</div>
                <div class="center-right-bottom">
                    <div class="center-right-bottom-left">{{ order.expend }}积分</div>
                    <div class="center-right-bottom-right">x1</div>
                </div>
            </div>
        </div>
        <div class="integralorder-center2">
            <div class="center2-top">
                <div class="center2-top-left">配送方式</div>
                <div class="center2-top-right">包邮</div>
            </div>
            <div class="center2-center">
                <div class="center2-center-left">备注(选填)</div>
                <input
                    type="text"
                    class="center2-center-right"
                    placeholder="请填写备注内容"
                    v-model="notes"
                />
            </div>
            <div class="center2-bottom">
                <div class="center2-bottom-left">共1件商品</div>&nbsp;&nbsp;
                <div class="center2-bottom-right">
                    小计 :
                    <div>{{ order.expend }}积分</div>
                </div>
            </div>
        </div>
        <!-- 支付 -->
        <div class="pay" ref="pay">
            <div class="paycon">
                <div class="paycon-title">确认付款</div>
                <img
                    @click="payclose()"
                    class="payclose"
                    ref="payclose"
                    src="@/assets/img/Linelist/close.png"
                />
                <div class="paymoney">￥{{ total }}</div>
                <div class="paymentmethod">
                    <img class="weixin" src="@/assets/img/Linelist/weixin.png" />
                    <div class="paymentmethod-center">微信支付</div>
                    <img alt class="ok" src="@/assets/img/Linelist/dui.png" />
                </div>
                <div class="integral" style="height:''">
                    <div class="integral-top">
                        <div class="integralleft">
                            <div class="integral-left">积分抵扣</div>
                            <div class="integral-center">{{ expend }}积分</div>
                        </div>

                        <van-switch
                            :disabled="disabled"
                            @input="onInput"
                            active-color="#07c160"
                            class="switcha"
                            inactive-color="#fff"
                            size="24px"
                            v-model="checked"
                        />
                    </div>

                    <div
                        class="explain"
                        style="height:'';line-height:0.4rem"
                    >说明：100积分可抵扣1元人民币，积分抵扣基数为1000。积分商城商品下单后，不可取消退单，若需退单，请联系平台管理员。</div>
                </div>
            </div>
            <div @click="payfn()" class="pay-btn">立即支付</div>
        </div>
        <div class="payorder">
            <div class="payorder-left">
                <div class="payorder-left-left">合计 :</div>&nbsp;&nbsp;
                <div class="payorder-left-right">{{ order.expend }}</div>
                <div class="payorder-left-left">积分</div>
            </div>
            <div class="payorder-right" @click="buy">提交订单</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgAfterUrl: process.env.VUE_APP_IMGURL,
            id: "", //商品id
            notes: "", //备注
            order: {}, //订单详情
            address: {}, //地址
            shop_address: {}, //获取的地址
            total: 0, //价钱
            checked: false, //积分抵扣开关
            disabled: false, //不可使用积分
            max_expend: 0, //最多抵扣积分
            expend: 0, //抵扣积分
            rewardsPoint: 0, //可用积分
            rewardsPointamount: 0, //可抵扣金额
            useIntegral: 0, //使用抵扣积分
            istotle: 0 //新的总价
        };
    },
    components: {},
    watch: {},
    created() {
        this.id = this.$route.query.id;
        this.order = this.$route.query;
        this.total = this.order.total;
        this.istotle = this.order.total;
        this.shop_address = JSON.parse(localStorage.getItem("shop_address"));
        if (this.shop_address != null) {
            this.address = {
                id: this.shop_address.id,
                name: this.shop_address.name,
                mobile: this.shop_address.mobile,
                address: this.shop_address.address
            };
        }
        this.$wechat.timeline(false);
        this.order_base();
    },
    methods: {
        // 跳转添加地址页面
        gotoaddress() {
            this.$router.push({
                path: "/me/address",
                query: { integralorder: 1 }
            });
        },
        //获取下单基础数据
        order_base() {
            this.$api.orders.order_base().then(res => {
                this.rewardsPoint = res.rewardsPoint.rewardsPoint;
                this.rewardsPointamount = res.rewardsPoint.rewardsPointamount;
                if (this.rewardsPoint < 1000) {
                    this.disabled = true;
                }
                if (this.rewardsPoint > this.order.expend) {
                    this.expend = this.order.expend;
                    this.max_expend = this.order.expend;
                }
                if (
                    this.rewardsPoint < this.order.expend &&
                    this.rewardsPoint > 1000
                ) {
                    this.expend = this.rewardsPoint;
                    this.max_expend = this.rewardsPoint;
                }
            });
        },
        //唤起支付
        onBridgeReady(res) {
            var _this = this;
            window.WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                    appId: res.appId, // 公众号名称，由商户传入
                    timeStamp: res.timeStamp, // 时间戳，自1970年以来的秒数
                    nonceStr: res.nonceStr, // 随机串
                    package: res.package,
                    signType: res.signType, // 微信签名方式：
                    paySign: res.paySign // 微信签名
                },
                function(res) {
                    if (res.err_msg === "get_brand_wcpay_request:ok") {
                        setTimeout(res => {
                            _this.$router.push({
                                path: "/me/exchange"
                            });
                        }, 2000);

                        // 使用以上方式判断前端返回,微信团队郑重提示：
                        // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    }
                    if (
                        res.err_msg === "get_brand_wcpay_request:cancel" ||
                        res.err_msg === "get_brand_wcpay_request:fail"
                    ) {
                        // _this.$router.push({
                        //     path: "/orders/index",
                        //     query: {
                        //         active: "0"
                        //     }
                        // });
                    }
                }
            );
        },
        // 抵扣积分开关
        onInput(checked) {
            this.checked = checked;
            var money = this.rewardsPoint / 1000;
            //积分必须够1000起才能开始抵扣
            if (money >= 1) {
                //总价必须超过10块钱才能开始抵扣
                if (this.istotle > 10) {
                    let ismoney = parseInt(this.total); //当前最多抵扣总积分价钱
                    //如果积分比总价高就抵扣所有价格
                    if (money * 10 > ismoney) {
                        if (checked) {
                            this.useIntegral = ismoney * 100; //抵扣的积分
                            this.total = this.total - ismoney; //剩余的价钱
                            this.expend = 0;
                        } else {
                            this.useIntegral = 0;
                            this.total = this.istotle;
                            this.expend = this.max_expend;
                        }
                    }
                    //如果积分比总价低
                    if (money * 10 < ismoney) {
                        if (checked) {
                            this.useIntegral = this.rewardsPoint; //抵扣的积分
                            this.total = this.total - this.rewardsPoint / 100; //剩余的价钱
                        } else {
                            this.useIntegral = 0;
                            this.total = this.istotle;
                        }
                    }
                }
            } else {
                this.disabled = true;
            }
        },
        //购买
        buy() {
            if (!this.address.id) {
                this.$toast("请选择收获地址");
                return;
            }
            this.payShow();
            // if (this.notes === "") {
            //     this.$toast("请填写备注");
            //     return;
            // }
            // console.log(this.address.id, this.id, this.useIntegral);
            // this.$api.goods
            //     .buy(this.address.id, this.id, this.useIntegral, this.notes)
            //     .then(res => {
            //         console.log(res);
            //         this.$toast("订单提交成功");
            //         // setTimeout(() => {
            //         //     this.$router.push({
            //         //         path: "/home/integral/index"
            //         //     });
            //         // }, 2000);
            //     });
        },
        // 确认支付
        payfn() {
            this.$api.goods
                .buy(
                    this.address.id,
                    Number(this.id),
                    this.useIntegral,
                    this.notes
                )
                .then(res => {
                    if (this.total != 0) {
                        this.onBridgeReady(res);
                    }
                    // this.$toast("订单提交成功");
                    if (this.total == 0) {
                        setTimeout(() => {
                            this.$router.push({
                                path: "/me/exchange"
                            });
                        }, 2000);
                    }
                });
        },
        //关闭支付弹框
        payclose: function() {
            this.$refs.integralorder.style.height = "";
            this.$refs.integralorder.style.overflow = "scroll";
            this.$refs.pay.style.top = "100vh";
        },
        //打开支付弹框
        payShow() {
            this.$refs.integralorder.style.height = "100vh";
            this.$refs.integralorder.style.overflow = "hidden";
            this.$refs.pay.style.top = "0px";
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../../../components/index/index.scss";
@import "index";
</style>
