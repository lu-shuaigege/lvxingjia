<template>
  <div class="my">
    <!-- 头部信息 -->
    <div class="mytop">
      <div class="mytop-top">
        <img src="../../assets/img/my/qiandao.png" alt />
        <div>去签到</div>
      </div>
      <div class="mytop-bottom">
        <img src="../../assets/img/my/jifen.png" class="mytop-bottom-left" alt />
        <div class="mytop-bottom-right">
          <div class="mytop-bottom-right-top">{{nikename}}</div>
          <div class="mytop-bottom-right-bottom">
            <div class="gender">性别 : {{gender}}</div>
            <div class="tel">联系 : {{tel}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="mycontent">
      <!-- 钱 -->
      <div class="money">
        <div class="money-left">
          <div class="money-left-top">{{money}}</div>
          <div class="money-left-bottom">余额</div>
        </div>
        <div class="shu"></div>
        <div class="money-left">
          <div class="money-left-top">{{jifen}}</div>
          <div class="money-left-bottom">积分余额</div>
        </div>
      </div>
      <div class="myitem">
        <div class="myitem-item" v-for="(item,index) in myitem" :key="index">
          <img :src="item.img" alt />
          <div class="myitem-item-title">{{item.title}}</div>
        </div>
      </div>
    </div>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "@/components/tab/tab.vue";

export default {
  name: "my",
  data() {
    return {
      nikename: "喜欢闯红灯的姑娘",
      gender: "女",
      tel: "15511111111",
      money: "10000.00",
      jifen: 1111400,
      myitem: [
        {
          title: "我的钱包",
          img: require("../../assets/img/my/qianbao.png")
        },
        {
          title: "我的积分",
          img: require("../../assets/img/my/jifen.png")
        },
        {
          title: "我的兑换",
          img: require("../../assets/img/my/duihuan.png")
        },
        {
          title: "我的游记",
          img: require("../../assets/img/my/youji.png")
        }
      ]
    };
  },
  components: {
    Tab
  }
};
</script>
<style lang="scss" scoped>
@import "my.scss";
</style>
