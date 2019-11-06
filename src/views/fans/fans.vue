<template>
  <div class="fans">
    <div class="fanstop">
      <div class="money-left">
        <div class="money-left-top">{{allfansnum}}</div>
        <div class="money-left-bottom">我的粉丝总数</div>
      </div>
      <div class="shu"></div>
      <div class="money-left">
        <div class="money-left-top new">{{newfansnum}}</div>
        <div class="money-left-bottom">今日新增</div>
      </div>
    </div>
    <div class="fanslist">
      <div class="listitem" v-for="(item,index) in fanslist" :key="index">
        <div class="listitem-left">
          <img :src="item.img" alt />
          <div class="title">{{item.title}}</div>
        </div>

        <div class="date">{{item.date}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fans",
  data() {
    return {
      allfansnum: 0,
      newfansnum: 32,
      fanslist: [
        {
          title: "我的粉丝",
          img: require("../../assets/img/my/fensi.png"),
          date: "2019/9/8  12:11:22"
        },
        {
          title: "发布路线",
          img: require("../../assets/img/my/releaseroute.png"),
          date: "2019/9/8  12:11:22"
        },
        {
          title: "收货地址",
          img: require("../../assets/img/my/address.png"),
          date: "2019/9/8  12:11:22"
        },
        {
          title: "常用旅客",
          img: require("../../assets/img/my/frequenttravellers.png"),
          date: "2019/9/8  12:11:22"
        },
        {
          title: "我的收藏",
          img: require("../../assets/img/my/collection.png"),
          date: "2019/9/8  12:11:22"
        }
      ]
    };
  },
  components: {},
  methods: {
    myinformationfn: function() {
      this.$router.push({
        name: "myinformation"
      });
    },
    // 列表点击
    mylistfn: function(listid) {
      if (listid == 0) {
        this.$router.push({
          name: "fans"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "fans.scss";
</style>
