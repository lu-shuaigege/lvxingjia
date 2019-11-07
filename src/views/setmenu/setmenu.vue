<template>
  <div class="setmenu">
    <div class="calendar"></div>
    <div class="bottom">
      <div class="bottom-lista">集合地设置</div>
      <div class="bottom-list">
        <div class="list-left">数量限制</div>
        <div class="list-right">
          <input type="text" class="list-right-input" placeholder="请填写数量" />
          <div>人</div>
        </div>
      </div>
      <div class="bottom-list">
        <div class="list-left">成人价格</div>
        <div class="list-right">
          <input type="text" class="list-right-input" placeholder="请填写价格" />
          <div>元</div>
        </div>
      </div>
      <div class="bottom-list">
        <div class="list-left">儿童价格</div>
        <div class="list-right">
          <input type="text" class="list-right-input" placeholder="请填写价格" />
          <div>元</div>
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="downbtn-left">取消</div>
      <div class="downbtn-right" @click="releaselinenextfn()">确认</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setmenu",
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
    // 跳转线路首页
    releaselinenextfn: function() {
      this.$router.push({
        name: "releaseline"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "setmenu.scss";
</style>
