<template>
    <div class="takemoneyok">
        <div class="wait">
            <img class="waitimg" src="@/assets/img/my/ok.png" alt />
        </div>
        <div class="title">提现申请成功！</div>
        <div class="word">我们会在3个工作日内审核完成并支付提现金额</div>
        <div class="list">
            <div class="left">提现金额</div>
            <div class="right">￥{{ money }}</div>
        </div>
        <div class="list">
            <div class="left">当前余额</div>
            <div class="right">￥{{ (list.balance / 100).toFixed(2) }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            money: 0, //提现金额
            list: {} //接口总数居
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.money = this.$route.query.money;
        this.getList();
    },
    methods: {
        getList: function() {
            this.$api.wallets.me().then(res => {
                this.list = res;
            });
        },
        //跳转我的首页
        myfn: function() {
            this.$router.push({
                path: "my"
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "takemoneyok.scss";
</style>
