<template>
  <div class="mywallet">
    <div class="top">
      <div class="list" @click="budgetdetailedfn()">明细</div>
      <div class="toptitle">账户余额</div>
      <div class="balance">{{balance}}</div>
      <div class="frozen">(已冻结账户金额为 : {{frozen}})</div>
    </div>
    <div class="content">
      <div class="contenttop">
        <div class="contenttop-item">
          <div class="contenttop-item-top">{{allprofit}}</div>
          <div class="contenttop-item-bottom">累积总收益</div>
        </div>
        <div class="contenttop-item">
          <div class="contenttop-item-top">{{allsubcommission}}</div>
          <div class="contenttop-item-bottom">分佣总收益</div>
        </div>
        <div class="contenttop-item">
          <div class="contenttop-item-top">{{overcashwithdrawal}}</div>
          <div class="contenttop-item-bottom">已提现总额</div>
        </div>
      </div>
      <div class="content-bottom" @click="gotakemoneyfn()">
        <div class="content-bottom-left">
          <img src="../../assets/img/my/cashwithdrawal.png" alt />
          <div class="cashwithdrawal-name">提现</div>
        </div>
        <div class="content-bottom-right">
          <div class="okcashwithdrawal">{{okcashwithdrawal}}</div>
          <div class="okcashwithdrawal-name">&nbsp;可提现&nbsp;></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mywallet",
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
    // 跳转收支明细
    budgetdetailedfn: function() {
      this.$router.push({
        name: "budgetdetailed"
      });
    },
    // 跳转提现
    gotakemoneyfn: function() {
      this.$router.push({
        name: "gotakemoney"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "mywallet.scss";
</style>
