<template>
  <div class="notice">
    <div class="item" v-for="(item,index) in list" :key="index" @click="details(item.id)">
      <img v-show="item.class==1" src="../../assets/img/news/xiaoxi.png" alt />
      <img v-show="item.class==2" src="../../assets/img/news/single.png" alt />
      <div class="right">
        <div class="top">
          <div class="name">{{item.name}}</div>
          <div class="time">{{item.time}}</div>
        </div>
        <div class="word">{{item.word}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notice",

  data() {
    return {
      newsdetailid: 0,
      list: [
        {
          id: 1,
          class: 1,
          name: "张大仙",
          time: "昨天",
          word:
            "如果你无法简洁的表达你的想法,那只说明你还不够了解他如果你无法简洁的表达你的想法,那只说明你还不够了解他."
        },
        {
          id: 2,
          class: 2,
          name: "张大仙",
          time: "09:10",
          word:
            "如果你无法简洁的表达你的想法,那只说明你还不够了解他如果你无法简洁的表达你的想法,那只说明你还不够了解他."
        }
      ]
    };
  },
  components: {},
  methods: {
    //跳转详情页
    details: function(x) {
      this.newsdetailid = x;
      //把页面要传的参数存到sessionStorage里面
      sessionStorage.setItem("newsdetailid", this.newsdetailid);
      //路由跳转携带参数
      this.$router.push({
        name: "noticedetails",
        params: {
          newsdetailid: this.newsdetailid
        }
      });
    },
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
@import "notice.scss";
</style>
