<template>
    <div class="okpay">
        <div class="payokimg">
            <img class="payokimg" src="@/assets/img/Linelist/payokimg.png" />
        </div>

        <div class="okpaytitle">订单支付成功</div>
        <div class="okpayitem">
            <div class="okpayitem-left">支付方式 :</div>

            <div class="paymethods">微信支付</div>
        </div>
        <div class="okpayitem">
            <div class="okpayitem-left">支付金额 :</div>

            <div class="paymoney">￥{{ total }}</div>
        </div>
        <div class="okpayitem" v-show="order_type != 3">
            <div class="okpayitem-left">抵扣积分 :</div>

            <div class="paymoney">￥{{ useIntegral }}</div>
        </div>
        <div class="okpaybtn">
            <router-link to="/home">
                <div class="okpaybtn-left">返回首页</div>
            </router-link>

            <router-link to="/orders/index">
                <div class="okpaybtn-right">查看订单</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            total: 0, //支付总价
            useIntegral: 0, //抵扣积分
            order_type: 0 //订单类型
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.total = this.$route.query.total;
        this.order_type = this.$route.query.order_type;
        if (this.order_type != 3) {
            this.useIntegral = this.$route.query.useIntegral;
        }
    },
    watch: {},

    methods: {}
};
</script>
<style lang="scss" scoped>
@import "payok.scss";
</style>
