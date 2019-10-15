<template>
  <div class="home">
    <div class="top">
      <div class="banner">
        <div class="bannertop">
          <div class="bannertop-left">
            <div>苏州</div>
            <img class="bottom-img" src="../../assets/img/home/bottom.png" alt />
          </div>
          <div class="bannertop-center">
            <img src="../../assets/img/home/search.png" alt />
            <div>大家都在搜索“日本樱花”</div>
          </div>
          <div class="bannertop-right">
            <img src="../../assets/img/home/news.png" alt />
          </div>
        </div>
        <yd-slider class="banners" autoplay="3000">
          <yd-slider-item v-for="(item,index) in banners" :key="index">
            <img :src="item.url" />
          </yd-slider-item>
        </yd-slider>
        <div class="banner-bottom">
          <div class="bobao">
            <img src="../../assets/img/home/laba.png" alt />
            <yd-slider class="bobaos" autoplay="4000">
              <yd-slider-item v-for="(item,indexs) in news" :key="indexs">
                <div class="news">{{item}}</div>
              </yd-slider-item>
            </yd-slider>
          </div>
        </div>
      </div>
    </div>
    <!-- 三图 -->
    <div class="center">
      <div class="threeimg">
        <div class="threeimgitem" v-for="(item,indexa) in threeimg" :key="indexa">
          <img :src="item.url" alt />
          <div class="threeimgitem-title">{{item.title}}</div>
        </div>
      </div>
      <div class="threeimg-down">
        <div class="threeimg-down-item" v-for="(item,indexb) in threeimgdown">
          <P class="item-p1">{{item.title}}</P>
          <P class="item-p2">{{item.title2}}</P>
        </div>
      </div>
    </div>
    <!-- 四大类 -->
    <div class="classitem">
      <div class="classitem-item" v-for="(item,indexc) in classitem">
        <img :src="item.url" alt />
        <p>{{item.title}}</p>
      </div>
    </div>
    <!-- 热门推荐 -->
    <div class="hot">
      <div class="hottitle">
        <b>热门推荐</b>
      </div>
      <div class="hotlist">
        <div class="hotlist-item" v-for="(item,indexf) in hotlist" :key="indexf">
          <div class="hotitem-top">
            <div class="top">
              <p>{{item.class}}</p>&nbsp;|&nbsp;
              <p>{{item.add}}</p>
            </div>
            <img :src="item.img" alt />
          </div>
          <div class="hotitem-bottom">
            <div class="hotitem-title">{{item.title}}</div>
            <div class="money">
              <span class="moneysp1">￥</span>
              <span class="moneysp2">{{item.money}}</span>
              <span class="moneysp3">起</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "@/components/tab/tab.vue";

export default {
  name: "home",

  data() {
    return {
      // 轮播图
      banners: [
        {
          url: require("../../assets/img/home/1-banner.png")
        },
        {
          url: require("../../assets/img/home/1-banner.png")
        },
        {
          url: require("../../assets/img/home/1-banner.png")
        }
      ],
      // 播报
      news: [
        "这就是个新闻1",
        "这就是个新闻2",
        "这就是个新闻3",
        "这就是个新闻4",
        "这就是个新闻5",
        "这就是个新闻6"
      ],
      // 三图
      threeimg: [
        {
          url: require("../../assets/img/home/periphery.png"),
          title: "周边游"
        },
        {
          url: require("../../assets/img/home/mapping.png"),
          title: "国内游"
        },
        { url: require("../../assets/img/home/aircraft.png"), title: "国际游" }
      ],
      threeimgdown: [
        { title: "户外游", title2: "攀登高峰" },
        { title: "自由行", title2: "想哪走哪" },
        { title: "摄影游", title2: "记录美景" },
        { title: "亲子游", title2: "寓教于乐" },
        { title: "跟团游", title2: "放心出行" }
      ],
      // 四大类
      classitem: [
        {
          url: require("../../assets/img/home/ticket.png"),
          title: "门票"
        },
        {
          url: require("../../assets/img/home/jiudian.png"),
          title: "酒店"
        },
        {
          url: require("../../assets/img/home/travels3.png"),
          title: "游记"
        },
        {
          url: require("../../assets/img/home/shopping.png"),
          title: "积分商城"
        }
      ],
      // 热门推荐
      hotlist: [
        {
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "【三日游】东海明珠衢山岛两日游 : 漫步沙滩...",
          money: 800
        },
        {
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          money: 800
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
@import "home.scss";
</style>
