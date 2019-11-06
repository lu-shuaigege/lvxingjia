<template>
  <div class="noticedetails">
    <div class="title">{{list.name}}</div>
    <div class="time">{{list.time}}</div>
    <div class="word">{{list.word}}</div>
  </div>
</template>

<script>
export default {
  name: "noticedetails",

  data() {
    return {
      list: {
        class: 1,
        name: "系统通知标题",
        time: "2019-5-9  10:10",
        word:
          "欢迎您加入驴行家，愿您旅行愉快！,那只说明你还不够了解他如果你无法简洁的表达你的想法,那只说明你还不够了解他."
      }
    };
  },
  components: {},
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
            // this.bannertop_img = response.data.data[0];
          } else {
          }
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "noticedetails.scss";
</style>
