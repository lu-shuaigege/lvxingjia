<template>
  <div class="gotakemoney">
    <div class="top">
      <div class="toplista">
        <div class="toplista-left">提现金额</div>
        <input type="text" placeholder="提现金额不少于￥100.00元" />
      </div>
      <div class="toplistb">
        <div class="okcashwithdrawal">当前余额￥{{okcashwithdrawal}}</div>
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
        <input type="text" placeholder="中国银行" class="bottomlist-right" />
      </div>
      <div class="bottomlist">
        <div class="bottomlist-left">开户名</div>
        <input type="text" placeholder="张小三" class="bottomlist-right" />
      </div>
      <div class="bottomlist">
        <div class="bottomlist-left">银行卡号</div>
        <input type="text" placeholder="3214 5424 2112 2236" class="bottomlist-right" />
      </div>
    </div>
    <div class="down-btn">申请提现</div>
  </div>
</template>

<script>
export default {
  name: "gotakemoney",
  data() {
    return {
      frozen: "312.00", //已冻结账户金额
      balance: "5201.00", //余额
      allprofit: "1800.21", //总收益
      allsubcommission: "2654.00", //分佣
      overcashwithdrawal: "5624.32", //已提现总额
      okcashwithdrawal: "688.00" //可提现
    };
  },
  components: {},
  methods: {
    // 跳转提现
    gotakemoneyfn: function() {
      this.$router.push({
        name: "gotakemoney"
      });
    },
    // 提现
    allokcashwithdrawal: function() {}
  }
};
</script>
<style lang="scss" scoped>
@import "gotakemoney.scss";
</style>
