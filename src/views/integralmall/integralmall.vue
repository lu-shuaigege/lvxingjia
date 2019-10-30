<template>
  <div class="doorticket">
    <div class="bannertop">
      <div class="topcon">
        <img class="topcon-left" src="../../assets/img/Integralmall/signin.png" alt />
        <div class="topcon-center">
          <div class="topcon-center-top">累计签到积分</div>
          <div class="topcon-center-bottom">{{integral}}</div>
        </div>
        <div class="topcon-right" @click="integralcheckinfn()">签到</div>
      </div>
    </div>

    <div class="hotlist">
      <div
        class="hotlist-item"
        v-for="(item,indexf) in hotlist"
        :key="indexf"
        @click="doorticketdetailsfn(item.id)"
      >
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
    <!-- <div class="and">
      <div class="andtitle">加载更多</div>
      <img src="../../assets/img/Linelist/jiazaixiao.png" alt />
    </div>-->
  </div>
</template>

<script>
export default {
  name: "doorticket",

  data() {
    return {
      doorticketid: 0,
      integral: 13211, //积分
      // 热门推荐
      hotlist: [
        {
          id: 0,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 1,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 2,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "【三日游】东海明珠衢山岛两日游 : 漫步沙滩...",
          money: 800
        },
        {
          id: 3,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 4,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 5,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "【三日游】东海明珠衢山岛两日游 : 漫步沙滩...",
          money: 800
        }
      ]
    };
  },
  components: {},
  methods: {
    //跳转积分商品详情
    doorticketdetailsfn: function(x) {
      this.doorticketid = x;
      //把页面要传的参数存到sessionStorage里面
      sessionStorage.setItem("doorticketid", this.doorticketid);
      //路由跳转携带参数
      this.$router.push({
        name: "integralshopdetail",
        params: {
          doorticketid: this.doorticketid
        }
      });
    },
    integralcheckinfn: function() {
      //路由跳转携带参数
      this.$router.push({
        name: "integralcheckin",
        params: {
          //   doorticketid: this.doorticketid
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
@import "integralmall.scss";
</style>
