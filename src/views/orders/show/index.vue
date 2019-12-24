<template>
    <div class="orderdetails">
        <div class="top">
            <div class="top-title">{{ data.status | orderStatus }}</div>
        </div>
        <div class="content-top">
            <div class="item-top">
                <div class="item-top-left">订单号 : {{ data.no }}</div>
            </div>
            <div class="item-center">
                <div class="item-center-left">
                    <img :src="imgAfterUrl + data.obj.cover_img" alt />
                </div>
                <div class="item-center-right">
                    <div class="title">{{ data.obj.name }}</div>
                    <div class="date">日期 : {{ data.start_date }}</div>
                    <div class="num" v-if="data.obj.prices.price_num">
                        {{ data.obj.prices.price_num }}成人.{{
                            data.obj.prices.price_children_num
                        }}儿童
                    </div>
                    <div class="money" style="margin-top: 0.2rem">
                        <!--￥{{ (data.obj.prices.price_num* data.obj.prices.price / 100)+-->
                        <!--(data.obj.prices.price_children_num* data.obj.prices.price_children / 100)}}-->
                        ￥{{ data.total_fee / 100 }}
                    </div>
                </div>
            </div>
            <div class="item-bottom">
                <div class="item-bottom-left">
                    <div class="lefta">总计 :</div>
                    <div class="leftb">
                        <!--￥{{ (data.obj.prices.price_num* data.obj.prices.price / 100)+-->
                        <!--(data.obj.prices.price_children_num* data.obj.prices.price_children / 100)}}-->
                        ￥{{ data.total_fee / 100 }}
                    </div>
                </div>
            </div>
        </div>
        <!-- 订单编号 -->
        <div class="content-bottom">
            <div class="list">
                <div class="list-left">订单编号 :</div>
                <div class="list-right">{{ data.no }}</div>
            </div>
            <div class="list">
                <div class="list-left">创建时间 :</div>
                <div class="list-right">{{ data.created_at }}</div>
            </div>
            <div class="list" v-if="data.paid_at != null">
                <div class="list-left">
                    付款时间 :
                </div>
                <div class="list-right">{{ data.paid_at }}</div>
            </div>
            <div class="list">
                <div class="list-left">出行时间 :</div>
                <div class="list-right">{{ data.start_date }}</div>
            </div>
        </div>
        <!-- 服务评价 -->
        <div class="content-evaluate" v-show="evaluateok == 1">
            <div class="content-evaluate-top">服务评价</div>
            <div class="evaluate-list1">
                <div class="evaluate-left">服务评价</div>
                <yd-rate
                    slot="left"
                    v-model="rate1"
                    color="#999999"
                    active-color="#2dba55"
                ></yd-rate>
            </div>
            <div class="evaluate-list1">
                <div class="evaluate-left">方案评分</div>
                <yd-rate
                    slot="left"
                    v-model="rate2"
                    color="#999999"
                    active-color="#2dba55"
                ></yd-rate>
            </div>
            <div class="evaluate-list3">评价 : {{ evaluateword }}</div>
        </div>
        <div class="bottom-btn" v-show="data.status == 0">
            <div class="left-btn" @click="cancel(1)">取消订单</div>
            <div class="right-btn" @click="payfn">立即支付</div>
        </div>
        <div class="bottom-btn" v-show="data.status == 1">
            <div class="cancelbtn" @click="cancel(2)">取消订单</div>
        </div>
        <div
            class="bottom-btn"
            v-show="data.status == 5 || data.status == 2 || data.status == 4"
        >
            <div class="cancelbtn" @click="_delete()">删除订单</div>
        </div>
        <!--<div class="bottom-btn" v-show="data.status == 2">-->
        <!--<div class="cancelbtn" @click="_delete()">删除订单</div>-->
        <!--<yd-button-->
        <!--class="right-btn"-->
        <!--style="margin:0px !important;"-->
        <!--@click.native="openConfrim"-->
        <!--size="large"-->
        <!--&gt;确认订单</yd-button-->
        <!--&gt;-->
        <!-- <div class="centerbtn" @click="okfn(3)">确认订单</div> -->
        <!--</div>-->
        <!-- 弹框 -->
        <!--<div class="nopay" ref="nopay">-->
        <!-- 取消订单弹框 -->
        <!--<div class="nopaycontent" v-if="data.status == 0">-->
        <!--<div class="nopay-top">-->
        <!--<div class="nopay-top-left" @click="okfn(0)">取消</div>-->
        <!--<div class="nopay-top-center">选择取消原因</div>-->
        <!--<div class="nopay-top-right" @click="okfn(1)">确定</div>-->
        <!--</div>-->
        <!--<div-->
        <!--@click="nopaylistfn(index)"-->
        <!--:class="-->
        <!--listactive == index ? 'nopay-listactive' : 'nopay-list'-->
        <!--"-->
        <!--v-for="(item, index) in nopaylist"-->
        <!--:key="index"-->
        <!--&gt;-->
        <!--{{ item }}-->
        <!--</div>-->
        <!--</div>-->
        <!-- 评论 -->
        <!-- <div class="evaluate">
                <div class="evaluate-top">服务评价</div>
                <div class="evaluate-cneter">
                    <div class="evaluate-list1">
                        <div class="evaluate-left">服务评价</div>
                        <yd-rate
                            slot="left"
                            v-model="rate1"
                            color="#999999"
                            active-color="#2dba55"
                        ></yd-rate>
                    </div>
                    <div class="evaluate-list1">
                        <div class="evaluate-left">方案评分</div>
                        <yd-rate
                            slot="left"
                            v-model="rate2"
                            color="#999999"
                            active-color="#2dba55"
                        ></yd-rate>
                    </div>
                    <div class="evaluate-list3">
                        <textarea type="text" v-model="evaluateword" />
                    </div>
                </div>
                <div class="evaluate-bottom">
                    <div class="evaluate-btn-left" @click="okfn(0)">取消</div>
                    <div class="evaluate-btn-right" @click="okfn(4)">保存</div>
                </div>
            </div> -->
        <!--</div>-->
        <div class="popup" v-show="isshow == 1">
            <div class="content">
                <div class="con-word">
                    您的订单即将出行，取消后平台会扣除部分费用，具体退款流程请联系400123123，是否确认取消?
                </div>
                <div class="con-bottom">
                    <div class="nook" @click="popup(0)">取消</div>
                    <div class="isok" @click="popup(1)">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import orders from "@/api/orders";
import { Dialog } from "vant";
export default {
    data() {
        return {
            isshow: 0,
            imgAfterUrl: process.env.VUE_APP_BASE_API,
            listactive: 0, //取消购买弹框点击效果状态
            rate1: 0, //评论1
            rate2: 0, //评论2
            evaluateword: "评价 : 服务态度很好,制作方案很喜欢", //评论内容
            evaluateok: 0, //评论显示不显示
            nopaylist: [
                "信息填写错误,重新拍",
                "我不想买了",
                "卖家缺货",
                "其他原因"
            ],
            orderlist: [],
            id: 0,
            data: {} //获取的数据
        };
    },
    created() {
        this.$wechat.timeline(false);
        this.id = this.$route.query.id;
        this.$api.orders.show(this.id).then(res => {
            this.data = res;
        });
    },
    methods: {
        // 确认订单
        openConfrim() {
            this.$dialog.confirm({
                title: "确认订单",
                mes: "是否确认该订单",
                opts: () => {
                    this.$dialog.toast({ mes: "你点了确定", timeout: 1000 });
                }
            });
        },
        nopaylistfn: function(x) {
            this.listactive = x;
        },
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
                                path: "/payok",
                                query: {
                                    order_type: _this.order_type,
                                    total: _this.data.obj.prices.price / 100,
                                    useIntegral: _this.useIntegral
                                }
                            });
                        }, 2000);
                        // 使用以上方式判断前端返回,微信团队郑重提示：
                        // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    }
                    if (
                        res.err_msg === "get_brand_wcpay_request:cancel" ||
                        res.err_msg === "get_brand_wcpay_request:fail"
                    ) {
                        _this.$router.push({
                            path: "/orders/index",
                            query: {
                                active: "0"
                            }
                        });
                    }
                }
            );
        },
        payfn: function() {
            this.$api.orders.order_pay(this.id).then(res => {
                this.onBridgeReady(res);
            });
        },

        cancel: function(x) {
            if (x == 1) {
                this.$api.orders.orderRefunded(this.id).then(res => {
                    this.$toast("订单取消成功");
                    this.$api.orders.show(this.id).then(res => {
                        this.data = res;
                    });
                });
            }
            if (x == 2) {
                this.isshow = 1;
            }
        },

        _delete() {
            Dialog.confirm({
                // title: "标题",
                message: "是否确认取消订单"
            })
                .then(() => {
                    this.$api.orders.delete(this.id).then(res => {
                        this.$toast("订单删除成功");
                        this.routerLink("/orders/index");
                    });
                })
                .catch(() => {
                    // on cancel
                });
        },
        //弹框
        popup(x) {
            if (x == 1) {
                this.isshow = 0;
                this.$api.orders.orderRefunded(this.id).then(res => {
                    this.$toast("订单取消成功");
                    this.$api.orders.show(this.id).then(res => {
                        this.data = res;
                    });
                });
            } else if (x == 0) {
                this.isshow = 0;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
