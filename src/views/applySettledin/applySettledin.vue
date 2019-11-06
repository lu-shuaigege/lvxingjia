<template>
  <div class="applySettledin">
    <div class="list"></div>
    <div class="list" @click="applydetailsfn()">
      <div class="list-left">
        <img src="../../assets/img/my/cooperation.png" alt />
      </div>
      <div class="list-right">
        <div class="list-right-top">合作伙伴申请认证</div>
        <div class="list-right-bottom">线上接单,订单量大,无需风里雨里</div>
      </div>
    </div>
    <div class="list">
      <div class="list-left">
        <img src="../../assets/img/my/branchoffice.png" alt />
      </div>
      <div class="list-right">
        <div class="list-right-top">分公司申请认证</div>
        <div class="list-right-bottom">线上接单,订单量大,无需风里雨里</div>
      </div>
    </div>
    <div class="list">
      <div class="list-left">
        <img src="../../assets/img/my/exit.png" alt />
      </div>
      <div class="list-right">
        <div class="list-right-top">出境社申请认证</div>
        <div class="list-right-bottom">线上接单,订单量大,无需风里雨里</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "applySettledin",
  data() {
    return {};
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
    //跳转合作伙伴申请认证页面
    applydetailsfn: function() {
      this.$router.push({
        name: "applydetails"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "applySettledin.scss";
</style>
