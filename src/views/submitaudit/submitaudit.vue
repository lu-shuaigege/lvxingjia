<template>
  <div class="submitaudit">
    <div class="wait">
      <img class="waitimg" src="../../assets/img/my/wait.png" alt />
    </div>
    <div class="title">您已提交申请</div>
    <div class="word">
      管理人员正在审核您的申请，审核
      <br />通过后将以信息方式通知您
    </div>
  </div>
</template>

<script>
export default {
  name: "submitaudit",
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
    //跳转等待审核
    submitauditfn: function() {
      this.$router.push({
        name: "submitaudit"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "submitaudit.scss";
</style>
