<template>
  <div class="takemoneyok">
    <div class="wait">
      <img class="waitimg" src="../../assets/img/my/ok.png" alt />
    </div>
    <div class="title">提现申请成功！</div>
    <div class="word">我们会在3个工作日内审核完成并支付提现金额</div>
    <div class="list">
      <div class="left">提现金额</div>
      <div class="right">￥{{okcashwithdrawal}}</div>
    </div>
    <div class="list">
      <div class="left">当前余额</div>
      <div class="right">￥{{balance}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "takemoneyok",
  data() {
    return {
      okcashwithdrawal: "688.00", //可提现
      balance: "5201.00" //余额
    };
  },
  components: {},
  methods: {
    //axios请求
    pagination: function() {
      this.$api.get(
        "cases",
        {
          page: this.page,
          per_page: 12
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            let data = response.data.data.data;
            for (var index in data) {
              this.imglist.push(data[index]);
            }

            this.total = response.data.data.total;
            this.display = response.data.per_page;
            this.current_page = response.data.current_page;
            this.last_page = response.data.last_page;
            if (this.current_page == this.last_page) {
              this.updown = "- 我也是有底线的 -";
            }
          } else {
          }
        }
      );
    },
    //跳转我的首页
    myfn: function() {
      this.$router.push({
        name: "my"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "takemoneyok.scss";
</style>
