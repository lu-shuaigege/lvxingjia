<template>
    <div class="gotakemoney">
        <div class="top">
            <div class="toplista">
                <div class="toplista-left">提现金额</div>
                <input
                    type="text"
                    v-model="val"
                    placeholder="提现金额不少于￥100.00元"
                />
            </div>
            <div class="toplistb">
                <div class="okcashwithdrawal">当前可提现余额￥{{ money }}</div>
                <div class="allokcashwithdrawal" @click="allokcashwithdrawal()">
                    全部提现
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottomlist">
                <div class="bottomlist-left">提现方式</div>
                <div class="bottomlist-right">银行卡</div>
            </div>
            <div class="bottomlist">
                <div class="bottomlist-left">开户行</div>
                <div class="bottomlist-right">
                    {{ list.bank }}
                </div>
            </div>
            <div class="bottomlist">
                <div class="bottomlist-left">开户名</div>
                <div class="bottomlist-right">
                    {{ list.bank_account_name }}
                </div>
            </div>
            <div class="bottomlist">
                <div class="bottomlist-left">银行卡号</div>
                <div class="bottomlist-right">
                    {{ list.bank_account }}
                </div>
            </div>
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
        gotakemoney: function() {
            this.$api.wallets.cash_out().then(res => {
                this.list = res;
            });
        },
        // 申请提现
        gotakemoneyfn: function() {
            if (this.val < 100) {
                this.$toast("提现金额不少于￥100.00元");
                return;
            }
            if (this.val > this.money) {
                this.$toast("提现金额不可大于可提现余额");
                return;
            }
            this.$api.wallets
                .withdraw({ amount: Number(this.val) })
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
