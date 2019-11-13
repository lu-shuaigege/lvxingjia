<template>
  <div class="home">
    <div class="top">
      <div class="banner">
        <div class="bannertop">
          <div class="bannertop-left" @click="gocityfn()">
            <div>苏州</div>
            <img class="bottom-img" src="../../assets/img/home/bottom.png" alt />
          </div>
          <router-link to="/search">
            <div class="bannertop-center">
              <img src="../../assets/img/home/search.png" alt />
              <div>大家都在搜索“日本樱花”</div>
            </div>
          </router-link>

          <router-link to="/notice">
            <div class="bannertop-right">
              <img src="../../assets/img/home/news.png" alt />
            </div>
          </router-link>
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
        <div
          class="threeimgitem"
          v-for="(item,indexa) in threeimg"
          :key="indexa"
          @click="peripheryfn(item.id)"
        >
          <img :src="item.url" alt />
          <div class="threeimgitem-title">{{item.title}}</div>
        </div>
      </div>
      <div class="threeimg-down">
        <div class="threeimg-down-item" v-for="(item,indexb) in threeimgdown" :key="indexb">
          <P class="item-p1">{{item.title}}</P>
          <P class="item-p2">{{item.title2}}</P>
        </div>
      </div>
    </div>
    <!-- 四大类 -->
    <div class="classitem">
      <div class="classitem-item" v-for="(item,indexc) in classitem" :key="indexc">
        <router-link :to="item.to">
          <img :src="item.url" alt />
          <p>{{item.title}}</p>
        </router-link>
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
    <!-- 国内游 -->
    <div class="domestic">
      <div class="domestic-top">
        <div :class="domesticactive==0?'top-left':''" @click="domesticlistfn(0)">国内游</div>
        <div class="top-center"></div>
        <div :class="domesticactive==1?'top-left':''" @click="domesticlistfn(1)">出境游</div>
      </div>
      <div class="domesticlist">
        <div class="item" v-for="(item,indexg) in domesticlist" :key="indexg">
          <div class="domestictop">
            <div class="top">
              <p>{{item.class}}</p>&nbsp;|&nbsp;
              <p>{{item.add}}</p>
            </div>
            <img :src="item.img" alt />
          </div>
          <div class="domestic-bottom">
            <div class="domestic-title">{{item.title}}</div>
            <div class="domestic-word">{{item.word}}</div>
            <div class="money">
              <div class="moneysp1">￥</div>
              <div class="moneysp2">{{item.money}}</div>
              <div class="moneysp3">起</div>
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
      domesticactive: 0, //国内游状态切换
      peripheryid: 0, //周边游大类
      code: "",
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
        "1111111这就是个新闻1",
        "2222222这就是个新闻2",
        "3333333这就是个新闻3",
        "4444444这就是个新闻4",
        "5555555这就是个新闻5",
        "6666666这就是个新闻6"
      ],
      // 三图
      threeimg: [
        {
          id: 0,
          url: require("../../assets/img/home/periphery.png"),
          title: "周边游"
        },
        {
          id: 0,
          url: require("../../assets/img/home/mapping.png"),
          title: "国内游"
        },
        {
          id: 0,
          url: require("../../assets/img/home/aircraft.png"),
          title: "国际游"
        }
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
          title: "门票",
          to: "/doorticket"
        },
        {
          url: require("../../assets/img/home/jiudian.png"),
          title: "酒店",
          to: "/hotel"
        },
        {
          url: require("../../assets/img/home/travels3.png"),
          title: "游记",
          to: "/travels"
        },
        {
          url: require("../../assets/img/home/shopping.png"),
          title: "积分商城",
          to: "/integralmall"
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
          title: "【三日游】东海明珠衢山岛两日游 : 漫步沙滩...",
          money: 800
        }
      ],
      // 国内游
      domesticlist: [
        {
          id: 0,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "【三日游】东海明珠衢山岛两日游 : 漫步沙滩...",
          word:
            "东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 1,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          word:
            "东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游",
          money: 800
        }
      ]
    };
  },
  components: {
    Tab
  },
  created() {
    // this.getcitiesfn();
    // console.log(location.hash);
    // let codeid = location.hash.split("code=")[1];
    // this.code = codeid.split("&")[0];
    // this.getcodefn();
    // this.getcodefna();
  },
  methods: {
    //跳转城市列表
    gocityfn: function() {
      //路由跳转携带参数
      this.$router.push({
        name: "city",
        params: {
          peripheryid: this.peripheryid
        }
      });
    },
    //跳转周边游
    peripheryfn: function(x) {
      this.peripheryid = x;
      //把页面要传的参数存到sessionStorage里面
      sessionStorage.setItem("peripheryid", this.peripheryid);
      //路由跳转携带参数
      this.$router.push({
        name: "periphery",
        params: {
          peripheryid: this.peripheryid
        }
      });
    },
    // 获取城市列表
    getcitiesfn: function() {
      let url = this.$ajaxUrl.cities;
      let params = {};
      this.$http.get(url, params, res => {
        console.log(res);
      });
    }
    // //axios请求token
    // getcodefn: function() {
    //   this.$api.get(
    //     "/wechat/auth",
    //     {
    //       code: this.code
    //     },
    //     response => {
    //       if (response.status >= 200 && response.status < 300) {
    //         console.log(response.data); //请求成功，response为成功信息参数
    //       } else {
    //       }
    //     }
    //   );
    // },
  }
};
</script>
<style lang="scss" scoped>
@import "home.scss";
</style>
