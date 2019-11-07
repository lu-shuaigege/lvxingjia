<template>
  <div class="submitauditnook">
    <div class="wait">
      <img class="waitimg" src="../../assets/img/my/nook.png" alt />
    </div>
    <div class="title">审核失败</div>
    <div class="word">备注 : 资质不清晰,请重新上传!</div>
    <div class="btn" @click="myfn()">重新申请入驻</div>
    <div class="wordb">
      请您核实资料后重新上传，
      <br />有任何问题，可联系平台客服：
      <br />400 1234 1234
    </div>
  </div>
</template>

<script>
export default {
  name: "submitauditnook",
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
@import "submitauditnook.scss";
</style>
