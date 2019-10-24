<template>
  <div class="okpay">
    <div class="payokimg">
      <img class="payokimg" src="../../assets/img/Linelist/payokimg.png" alt />
    </div>

    <div class="okpaytitle">订单支付成功</div>
    <div class="okpayitem">
      <div class="okpayitem-left">支付方式 :</div>

      <div class="paymethods">微信支付</div>
    </div>
    <div class="okpayitem">
      <div class="okpayitem-left">支付金额 :</div>

      <div class="paymoney">￥{{money}}</div>
    </div>
    <div class="okpayitem">
      <div class="okpayitem-left">支付金额 :</div>

      <div class="paymoney">￥{{money}}</div>
    </div>
    <div class="okpaybtn">
      <router-link to="/home">
        <div class="okpaybtn-left">返回首页</div>
      </router-link>

      <router-link to="/home">
        <div class="okpaybtn-right">查看订单</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "okpay",

  data() {
    return {
      money: 1000
    };
  },
  components: {},
  created() {},
  watch: {},

  methods: {
    //axios请求轮播图
    domesticlistfn: function(x) {
      this.domesticactive = x;
      this.$api.get(
        "banners/about-us",
        {
          page: 1,
          pageSize: 10
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data); //请求成功，response为成功信息参数
            // this.bannertop_img = response.data.data[0];
          } else {
            // console.log(response.message); //请求失败，response为失败信息
          }
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "payok.scss";
</style>
