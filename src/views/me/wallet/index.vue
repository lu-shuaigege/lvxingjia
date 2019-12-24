<template>
    <div class="mywallet">
        <div class="top">
            <div class="list" @click="routerLink('/me/budgetdetailed')">
                明细
            </div>
            <div class="toptitle">账户余额</div>
            <div class="balance">{{ (list.balance / 100).toFixed(2) }}</div>
            <div class="frozen">
                (已冻结账户金额为 : {{ (list.frozen / 100).toFixed(2) }})
            </div>
        </div>
        <div class="content">
            <div class="contenttop">
                <div class="contenttop-item">
                    <div class="contenttop-item-top">
                        {{ (list.sales / 100).toFixed(2) }}
                    </div>
                    <div class="contenttop-item-bottom">累积总收益</div>
                </div>
                <div class="contenttop-item">
                    <div class="contenttop-item-top">
                        {{ (list.sub_commission / 100).toFixed(2) }}
                    </div>
                    <div class="contenttop-item-bottom">分佣总收益</div>
                </div>
                <div class="contenttop-item">
                    <div class="contenttop-item-top">
                        {{ (list.already_cash_out / 100).toFixed(2) }}
                    </div>
                    <div class="contenttop-item-bottom">已提现总额</div>
                </div>
            </div>
            <div
                class="content-bottom"
                @click="
                    routerLink('/me/gotakemoney', {
                        money: (list.can_cash_out / 100).toFixed(2)
                    })
                "
            >
                <div class="content-bottom-left">
                    <img src="@/assets/img/my/cashwithdrawal.png" alt />
                    <div class="cashwithdrawal-name">提现</div>
                </div>
                <div class="content-bottom-right">
                    <div class="okcashwithdrawal">
                        {{ (list.can_cash_out / 100).toFixed(2) }}
                    </div>
                    <div class="okcashwithdrawal-name">&nbsp;可提现&nbsp;></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: []
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.getList();
    },
    methods: {
        getList: function() {
            this.$api.wallets.me().then(res => {
                this.list = res;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
