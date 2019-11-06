<template>
  <div class="doorticket">
    <div class="bannertop">
      <div class="bannertop-left">
        <div>苏州</div>
        <img class="bottom-img" src="../../assets/img/admissionticket/down.png" alt />
      </div>
      <router-link to="/search">
        <div class="bannertop-center">
          <img src="../../assets/img/search/chakan.png" alt />
          <div>大家都在搜索“日本樱花”</div>
        </div>
      </router-link>
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
    <div class="and">
      <div class="andtitle">加载更多</div>
      <img src="../../assets/img/Linelist/jiazaixiao.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "doorticket",

  data() {
    return {
      hoteldetailsid: 0,
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
    //跳转门票详情
    doorticketdetailsfn: function(x) {
      this.hoteldetailsid = x;
      //把页面要传的参数存到sessionStorage里面
      sessionStorage.setItem("hoteldetailsid", this.hoteldetailsid);
      //路由跳转携带参数
      this.$router.push({
        name: "hoteldetails",
        params: {
          hoteldetailsid: this.hoteldetailsid
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
@import "hotel.scss";
</style>
