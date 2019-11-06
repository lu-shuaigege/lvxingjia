<template>
  <div class="releaselinenext">
    <div class="images">
      <div class="title">上传图集</div>
      <div class="imgcontent">
        <div class="addimg">
          <div class="deladdimg">x</div>
          <img src="../../assets/img/my/reduce.png" alt />
        </div>
        <div class="addimg">
          <img src="../../assets/img/my/and.png" alt />
        </div>
      </div>
      <div class="is">（最多上传5张图，默认第一张为封面图，建议1M以下）</div>
    </div>
    <div class="destination">
      <div class="title">目的地介绍</div>
      <yd-textarea class="word" slot="right" placeholder="请输入景点介绍" maxlength="500"></yd-textarea>
    </div>
    <div class="destination">
      <div class="title">行程安排</div>
      <yd-textarea class="word" slot="right" placeholder="请输入行程安排" maxlength="500"></yd-textarea>
    </div>
    <div class="destination">
      <div class="title">费用说明</div>
      <yd-textarea class="word" slot="right" placeholder="请输入费用说明" maxlength="500"></yd-textarea>
    </div>
    <div class="destination">
      <div class="title">注意事项</div>
      <yd-textarea class="word" slot="right" placeholder="请输入注意事项 " maxlength="500"></yd-textarea>
    </div>
    <div class="downbtn">
      <div class="downbtn-left" @click="releaselinetopfn()">上一步</div>
      <div class="downbtn-right">发布</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "releaselinenext",
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
    //跳转发布线路上一步
    releaselinetopfn: function() {
      this.$router.push({
        name: "releaseline"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "releaselinenext.scss";
</style>
