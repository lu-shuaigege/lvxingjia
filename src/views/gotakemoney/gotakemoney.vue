<template>
    <div class="gotakemoney">
        <div class="top">
            <div class="toplista">
                <div class="toplista-left">提现金额</div>
                <input type="text" v-model="val" placeholder="提现金额不少于￥100.00元" />
            </div>
            <div class="toplistb">
                <div class="okcashwithdrawal">当前可提现余额￥{{ money }}</div>
                <div class="allokcashwithdrawal" @click="allokcashwithdrawal()">全部提现</div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottomlist">
                <div class="bottomlist-left">提现方式</div>
                <div class="bottomlist-right">银行卡</div>
            </div>
            <div class="bottomlist">
                <div class="bottomlist-left">开户行</div>
                <div class="bottomlist-right">{{ list.bank }}</div>
            </div>
            <div class="bottomlist">
                <div class="bottomlist-left">开户名</div>
                <div class="bottomlist-right">{{ list.bank_account_name }}</div>
            </div>
            <div class="bottomlist">
                <div class="bottomlist-left">银行卡号</div>
                <div class="bottomlist-right">{{ list.bank_account }}</div>
            </div>
        </div>
        <div class="tips">
            服务佣金与结算收取说明：
            <br />按照提现金额的3%（百分之3）实时收取手续费，手续费最低2元起（即不足2元的以2元计算）
            <br />(1) 1%俱乐部按100:100反馈给客户的积分费用
            <br />(2) 1%俱乐部提现微信银行收取的手续费
            <br />(3) 1%平台维护费
            <br />提交申请次日的24点前处理，3个工作日内处理，实际到账时间以银行到账时间为准
        </div>
        <div class="down-btn" @click="gotakemoneyfn()">申请提现</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: {}, //获取用户提现信息
            val: "", //提现金额
            money: 0 //可提现金额
        };
    },
    created() {
        this.$wechat.timeline(false);
        this.money = this.$route.query.money;
        this.gotakemoney();
    },
    components: {},
    methods: {
        // 获取用户提现信息
        // gotakemoney: function() {
        //     this.$api.wallets.cash_out().then(res => {
        //         this.list = res;
        //     });
        // },

        // 获取用户信息
        gotakemoney: function() {
            this.$api.user.me().then(res => {
                this.list = res.settledIn;
                // this.name = res.settledIn.name;
                // this.bank = res.settledIn.bank;
                // this.bank_account_name = res.settledIn.bank_account_name;
                // this.bank_account = res.settledIn.bank_account;
            });
        },

        // 申请提现
        gotakemoneyfn: function() {
            if (this.val < 100) {
                this.$toast("提现金额不少于￥100.00元");
                return;
            }

            if (Number(this.val) > this.money) {
                this.$toast("提现金额不可大于可提现余额");
                return;
            }
            this.$api.wallets
                .withdraw({
                    amount: Number(this.val),
                    bank: this.list.bank,
                    bank_account_name: this.list.bank_account_name,
                    bank_account: this.list.bank_account
                })
                .then(res => {
                    // this.$toast("提现申请成功");
                    this.$router.push({
                        path: "takemoneyok",
                        query: {
                            money: this.val
                        }
                    });
                });
        },
        //全部提现
        allokcashwithdrawal: function() {
            this.val = this.money;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "gotakemoney.scss";
</style>
