<template>
    <div class="ticketbooking" ref="ticketbooking">
        <div class="top">
            <div class="top-top">{{ goodsDetails.name }}</div>
            <div class="topcon" v-if="order_type == 3">
                <div class="time">出游日 : {{ goodsDetails.some_day }}</div>
                <div class="adderss">出发地 : {{ goodsDetails.resort }}</div>
            </div>
            <!-- 购票数量成人儿童 -->
            <div class="adultnum" v-if="order_type == 3">
                <div class="adult">
                    <div class="adultleft">
                        <div class="adult-left">成人</div>
                        <div class="adult-center">￥{{ price_total }}</div>
                    </div>
                    <div class="adult-right">
                        <div @click="downfn(1)" class="down">-</div>
                        <div class="adult-right-center">{{ adultnum }}</div>
                        <div @click="upfn(1)" class="up">+</div>
                    </div>
                </div>
                <div class="adult">
                    <div class="adultleft">
                        <div class="adult-left">儿童</div>
                        <div class="adult-center">￥{{ price_children_total }}</div>
                    </div>
                    <div class="adult-right">
                        <div @click="downfn(2)" class="down">-</div>
                        <div class="adult-right-center">{{ childrennum }}</div>
                        <div @click="upfn(2)" class="up">+</div>
                    </div>
                </div>
            </div>
            <div class="top-bottom" v-if="order_type == 1">
                <div class="top-bottom-left">出行日期</div>
                <yd-datetime
                    @click.native="openc"
                    class="top-bottom-center"
                    ref="datetimec"
                    slot="right"
                    type="date"
                    :start-date="datetimec"
                    v-model="datetimec"
                >请选择出行日期</yd-datetime>
                <img class="top-bottom-right" src="@/assets/img/Linelist/right.png" />
            </div>
            <!-- 酒店入住日期 -->
            <div class="top-bottom" v-if="order_type == 2">
                <div class="top-bottom-left">入住日期</div>
                <yd-datetime
                    @click.native="opena"
                    class="top-bottom-center"
                    ref="datetimea"
                    slot="right"
                    type="date"
                    :start-date="datetimea"
                    v-model="datetimea"
                >请选择出行日期</yd-datetime>
                <img class="top-bottom-right" src="@/assets/img/Linelist/right.png" />
            </div>
            <!-- 酒店离店日期 -->
            <div class="top-bottom" v-if="order_type == 2">
                <div class="top-bottom-left">离店日期</div>
                <yd-datetime
                    @click.native="openb"
                    class="top-bottom-center"
                    ref="datetimeb"
                    slot="right"
                    type="date"
                    v-model="datetimeb"
                >请选择出行日期</yd-datetime>
                <img alt class="top-bottom-right" src="@/assets/img/Linelist/right.png" />
            </div>
        </div>
        <div class="information">
            <div class="information-item1">预定人信息</div>
            <div class="information-item2">
                <div class="information-item2-left">姓名</div>
                <input
                    class="information-item2-right"
                    placeholder="请填写预定人姓名"
                    type="text"
                    v-model="reserveName"
                />
            </div>
            <div class="information-item3">
                <div class="information-item2-left">手机号</div>
                <input
                    class="information-item2-right"
                    maxlength="11"
                    placeholder="请填写预定人手机号"
                    type="number"
                    oninput="if(value.length>11)value=value.slice(0,11)"
                    v-model="reserveTel"
                />
            </div>
            <div class="information-item3" v-show="type == 2 && order_type == 1">
                <div class="information-item2-left">领队身份证</div>
                <input
                    class="information-item2-right"
                    maxlength="18"
                    placeholder="请填写领队身份证号"
                    type="text"
                    v-model="idcard"
                />
            </div>
        </div>
        <div class="bookinformation" v-show="goodsDetails.type == 1">
            <div class="bookinformation-title">出行人信息</div>
            <div :key="index" class="bookinformation-item" v-for="(item, index) in tripArr">
                <div class="bookinformation-list">
                    <div class="name">{{ item.name }} {{ item.sex | sexType }}</div>
                    <div class="namephone">{{ item.mobile }}</div>
                </div>
                <div class="bookinformation-list">
                    <div class="name">身份证</div>
                    <div class="namephone">{{ item.id_card_no }}</div>
                </div>
            </div>
            <div class="bookinformation-item">
                <div @click="PassengerInfo" class="bookinformation-btn">+&nbsp;&nbsp;添加常用旅客</div>
            </div>
        </div>
        <div
            class="bookbottom"
            v-if="
                (type != 2 && order_type == 1) ||
                    order_type == 2 ||
                    order_type == 3
            "
        >
            <div class="bookbottom-title">备注</div>
            <div class="bookbottom-bottom">
                <!-- <textarea name="" id="" cols="30" rows="10"></textarea> -->
                <textarea class="proposal" placeholder="请填写备注" v-model="remarks"></textarea>
            </div>
        </div>
        <div class="tourleader" v-show="type == 2 && order_type == 1">
            <div class="tourleader-title">领队必读</div>
            <div class="tourleader-bottom">
                1、身份证、导游证、大巴证、任务单必带方可领票，缺一 不可；
                <br />2、请在当日14:00前完成领票操作。
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-left-btn">
                <div class="left-btn-left">合计：</div>
                <div class="left-btn-right">
                    ￥
                    <b>{{ total }}</b>
                </div>
            </div>
            <div v-show="goodsDetails.type == 1" @click="payfn(1)" class="bottom-right-btn">立即支付</div>
            <div v-show="goodsDetails.type == 2" @click="payfn(2)" class="bottom-right-btn">立即预约</div>
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
                <div class="integral" v-if="order_type == 3">
                    <div class="integral-top">
                        <div class="integralleft">
                            <div class="integral-left">积分抵扣</div>
                            <div class="integral-center">{{ rewardsPoint }}积分</div>
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

                    <div class="explain">说明：100积分可抵扣1元人民币，积分抵扣基数为1000。</div>
                </div>
            </div>
            <div @click="payfn(2)" class="pay-btn">立即支付</div>
        </div>
    </div>
</template>

<script>
import wechat from "@/utils/wechat";
import orders from "@/api/orders";
import functions from "@/utils/functions.js";

export default {
    data() {
        return {
            datetimea: "", // 选择开始日期
            datetimeb: "", // 选择结束日期
            datetimec: "", //出游日
            total: 0, //总价
            remarks: "", //备注
            type: "", //散客还是团队
            idcard: "", //领队人员身份证号
            order_type: "", //类型 1门票 2酒店 3线路
            price: 0, //成人价格
            price_total: 0, //成人总价
            price_children: 0, //儿童价格
            price_children_total: 0, //儿童总价
            adultnum: 0, //成人数量
            childrennum: 0, //儿童数量
            surplus_num: 0, //还有多少票
            surplus_num_new: 0, //当前还能买多少票
            checked: false, //积分抵扣开关
            disabled: false, //不可使用积分
            integral: 0, //积分
            rewardsPoint: 0, //可用积分
            rewardsPointamount: 0, //可抵扣金额
            useIntegral: 0, //使用抵扣积分
            istotle: 0, //新的总价
            share_code: "", //分享码

            /***新增start***/
            goodsDetails: {}, //酒店订单详情
            reserveName: "", //预定人姓名
            reserveTel: "", //预定人手机号
            tripArr: [] //出行人员
            /***新增end***/
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        let datesTime = new Date();
        datesTime.setDate(datesTime.getDate() + 1);
        let istime = functions.fmtDate(datesTime, "yyyy-MM-dd");
        this.datetimec = istime;
        this.datetimea = istime;
        this.datetimeb = istime;
        let orderInfor = this.$store.state.orderInfor;
        this.reserveName = orderInfor.reserveName;
        this.reserveTel = orderInfor.reserveTel;
        this.remarks = orderInfor.remarks;
        if (orderInfor.total != undefined) {
            this.total = orderInfor.total;
            this.istotle = orderInfor.istotle;
        }
        if (
            (orderInfor.datetimea != undefined &&
                orderInfor.datetimeb != undefined) ||
            orderInfor.datetimec != undefined
        ) {
            this.datetimea = orderInfor.datetimea;
            this.datetimeb = orderInfor.datetimeb;
            this.datetimec = orderInfor.datetimec;
        }
        if (
            orderInfor.adultnum != undefined &&
            orderInfor.childrennum != undefined
        ) {
            this.adultnum = orderInfor.adultnum;
            this.childrennum = orderInfor.childrennum;
        }
        // this.$wxApi.wxRegister();
        this.goodsDetails = JSON.parse(this.$route.query.goodsDetailsInfo); //获取订单详情
        this.share_code = this.goodsDetails.share_code; //分享码
        this.price = this.goodsDetails.price; //成人价格
        this.price_total = this.goodsDetails.price; //初始化成人价格
        this.price_children = this.goodsDetails.price_children; //儿童价格
        this.price_children_total = this.goodsDetails.price_children; //初始化儿童价格
        this.type = this.goodsDetails.type; //类型 1散客 2团体
        this.order_type = this.goodsDetails.order_type; //类型 1门票 2酒店 3线路
        if (this.order_type == 3) {
            this.datetimec = this.goodsDetails.some_day;
        }
        if (this.goodsDetails.total != undefined) {
            this.total = this.goodsDetails.total / 100; //总价
            this.istotle = this.goodsDetails.total / 100; //总价
        }
        this.surplus_num = this.goodsDetails.surplus_num; //还剩多少票
        this.surplus_num_new = this.surplus_num;
        if (sessionStorage.getItem("lkArrInfo")) {
            //散客的时候获取旅客数据
            this.tripArr = JSON.parse(sessionStorage.getItem("lkArrInfo"));
        }
        this.rewards_point();
        this.order_base();
    },
    // 监听,当路由发生变化的时候执行
    watch: {},
    methods: {
        //选择日期弹框
        opena() {
            this.$refs.datetimea.open();
        },
        //选择日期弹框
        openb() {
            this.$refs.datetimeb.open();
        },
        //选择日期弹框
        openc() {
            this.$refs.datetimec.open();
        },
        // 跳转添加常用旅客
        PassengerInfo() {
            let orderInfor = {
                adultnum: this.adultnum,
                childrennum: this.childrennum,
                datetimea: this.datetimea,
                datetimeb: this.datetimeb,
                datetimec: this.datetimec,
                reserveName: this.reserveName,
                reserveTel: this.reserveTel,
                remarks: this.remarks,
                total: this.total,
                istotle: this.istotle
            };
            this.$store.commit("orderInfor", orderInfor);

            this.$router.push({
                path: "/me/oftenpassenger/index",
                query: { backPath: 1 }
            });
        },
        //我的积分
        rewards_point() {
            this.$api.rewards_point.statistic().then(res => {
                this.integral = res.surplus;
            });
        },
        //获取下单基础数据
        order_base() {
            this.$api.orders.order_base().then(res => {
                this.rewardsPoint = res.rewardsPoint.rewardsPoint;
                this.rewardsPointamount = res.rewardsPoint.rewardsPointamount;
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
                                path: "/payok",
                                query: {
                                    order_type: _this.order_type,
                                    total: _this.total,
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
        //下单
        payfn: function(val) {
            if (
                !/^1[3456789]\d{9}$/.test(this.reserveTel) ||
                this.reserveTel == ""
            ) {
                this.$toast("请输入正确的手机号");
                return;
            }
            if (this.type == 2 && this.order_type == 1 && this.idcard == "") {
                this.$toast("请输入正确的身份证号");
                return;
            }
            if (this.tripArr.length === 0 && this.goodsDetails.type == 1) {
                this.$toast("请选择出行人");
                return;
            }
            if (this.reserveName == "") {
                this.$toast("请填写预定人姓名");
                return;
            }
            let tripId = []; // 取出行人员id
            for (let i = 0; i < this.tripArr.length; i++) {
                tripId.push(this.tripArr[i].id);
            }
            if (tripId.length < this.adultnum + this.childrennum) {
                this.$toast("出行人员信息与数量不匹配");
                return;
            }
            if (
                this.adultnum == 0 &&
                this.childrennum == 0 &&
                this.order_type == 3
            ) {
                this.$toast("请选择购票数量");
                return;
            }
            if (this.integral < 1000) {
                this.disabled = true;
            } else {
                this.disabled = false;
            }
            if (val == 1) {
                this.$refs.ticketbooking.style.height = "100vh";
                this.$refs.ticketbooking.style.overflow = "hidden";
                this.$refs.pay.style.top = "0px";
            } else {
                if (this.order_type == 1 || this.order_type == 3) {
                    this.datetimea = "";
                    this.datetimeb = "";
                }
                orders
                    .store(
                        this.goodsDetails.obj_id,
                        this.goodsDetails.order_type,
                        this.goodsDetails.type,
                        this.total,
                        this.goodsDetails.count,
                        this.reserveName,
                        this.reserveTel,
                        this.idcard,
                        tripId,
                        this.datetimec,
                        this.datetimea,
                        this.datetimeb,
                        this.adultnum,
                        this.childrennum,
                        this.useIntegral,
                        this.share_code
                    )
                    .then(res => {
                        if (this.goodsDetails.type == 2) {
                            this.$router.push({
                                path: "/orders/index",
                                query: {
                                    active: 1
                                }
                            });
                            return;
                        }
                        this.onBridgeReady(res);
                        this.$store.commit("orderInfor", {});
                        sessionStorage.setItem("lkArrInfo", "");
                        this.payclose();
                    });
            }
        },
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
                        } else {
                            this.useIntegral = 0;
                            this.total = this.istotle;
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
        //关闭支付弹框
        payclose: function() {
            this.$refs.ticketbooking.style.height = "";
            this.$refs.ticketbooking.style.overflow = "scroll";
            this.$refs.pay.style.top = "100vh";
        },
        // 购票数量加减
        downfn: function(x) {
            if (x == 1) {
                if (this.adultnum >= 1 && this.adultnum <= this.surplus_num) {
                    this.adultnum--;
                    this.all();
                }
            } else if (x == 2) {
                if (
                    this.childrennum >= 1 &&
                    this.childrennum <= this.surplus_num
                ) {
                    this.childrennum--;
                    this.all();
                }
            }
        },
        // 购票数量加减
        upfn: function(y) {
            if (y == 1) {
                if (
                    this.adultnum < this.surplus_num &&
                    this.adultnum + this.childrennum < this.surplus_num
                ) {
                    this.adultnum++;
                    this.all();
                }
            } else if (y == 2) {
                if (
                    this.childrennum < this.surplus_num &&
                    this.adultnum + this.childrennum < this.surplus_num
                ) {
                    this.childrennum++;
                    this.all();
                }
            }
        },
        // 计算总价
        all: function() {
            this.price_total = this.adultnum * this.price;
            this.price_children_total = this.childrennum * this.price_children;
            this.total = this.price_total + this.price_children_total;
            this.istotle = this.price_total + this.price_children_total;
        }
    },
    beforeRouteLeave(to, from, next) {
        if (
            to.path == "/home/line/show" ||
            to.path == "/doorticketshow" ||
            to.path == "/hotelShow"
        ) {
            sessionStorage.setItem("lkArrInfo", "");
            this.$store.commit("orderInfor", {});
        }

        next();
    }
};
</script>
<style lang="scss" scoped>
@import "../../components/index/index.scss";
@import "ticketbooking.scss";
</style>
