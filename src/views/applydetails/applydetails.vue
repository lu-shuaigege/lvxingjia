<template>
  <div class="applydetails">
    <div class="tips">信息仅用于审核,绝不外泄</div>
    <div class="top">
      <div class="toplist">
        <div class="title">姓名</div>
        <input type="text" class="toplist-right" placeholder="请填写姓名" />
      </div>
      <div class="toplist">
        <div class="title">手机号</div>
        <input type="text" class="toplist-right" placeholder="请填写手机号" />
      </div>
      <div class="toplist">
        <div class="title">身份证</div>
        <input type="text" class="toplist-right" placeholder="请填写身份证" />
      </div>
    </div>
    <div class="center">
      <div class="center-item">
        <img class="img" src="../../assets/img/my/branchoffice.png" alt />
        <div class="center-tittle">身份证正面</div>
        <div class="camara-btn">拍照/上传照片</div>
      </div>
      <div class="center-item">
        <img class="img" src="../../assets/img/my/branchoffice.png" alt />
        <div class="center-tittle">身份证正面</div>
        <div class="camara-btn">拍照/上传照片</div>
      </div>
    </div>
    <div class="bottom">
      <div class="toplist">
        <div class="title">开户行</div>
        <input type="text" class="toplist-right" placeholder="请填写姓名" />
      </div>
      <div class="toplist">
        <div class="title">开户名</div>
        <input type="text" class="toplist-right" placeholder="请填写手机号" />
      </div>
      <div class="toplist">
        <div class="title">银行卡账号</div>
        <input type="text" class="toplist-right" placeholder="请填写身份证" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "applydetails",
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
    //跳转发布线路下一步
    releaselinenextfn: function() {
      this.$router.push({
        name: "releaselinenext"
      });
    },
    //跳转套餐设置
    setmenufn: function() {
      this.$router.push({
        name: "setmenu"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "applydetails.scss";
</style>
