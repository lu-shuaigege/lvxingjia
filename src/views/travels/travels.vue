<template>
  <div class="travels">
    <div class="release" @click="releasefn()">
      <img src="../../assets/img/Linelist/release.png" alt />
    </div>
    <div
      class="travels-item"
      v-for="(item,indexf) in travelslist"
      :key="indexf"
      @click="doorticketdetailsfn(item.id)"
    >
      <div class="hotitem-top">
        <!-- <div class="top">
          <p>{{item.class}}</p>&nbsp;|&nbsp;
          <p>{{item.add}}</p>
        </div>-->
        <img :src="item.img" alt />
      </div>
      <div class="hotitem-bottom">
        <div class="hotitem-title">{{item.title}}</div>
        <div class="like">
          <div class="like-left">
            <img class="likesp1" :src="item.headerimg" alt />
            <span class="likesp2">{{item.nikename}}</span>
          </div>
          <div class="like-right">
            <img class="likeimg" src="../../assets/img/Linelist/like2.png" alt />
            <span class="likesp3">{{item.like}}</span>
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
  name: "travels",
  data() {
    return {
      // 热门推荐
      travelslist: [
        {
          id: 0,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 1,
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 1,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-8.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 2,
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 2,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 3,
          title: "【三日游】东海明珠衢山岛两日游 : 漫步沙滩...",
          money: 800
        },
        {
          id: 3,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-8.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 4,
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 4,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 5,
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 5,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 6,
          title: "【三日游】东海明珠衢山岛两日游 : 漫步沙滩...",
          money: 800
        }
      ]
    };
  },
  components: {
    Tab
  },
  created() {},
  mounted() {},
  methods: {
    //跳转门票详情
    doorticketdetailsfn: function(x) {
      // this.hoteldetailsid = x;
      //把页面要传的参数存到sessionStorage里面
      // sessionStorage.setItem("hoteldetailsid", this.hoteldetailsid);
      //路由跳转携带参数
      this.$router.push({
        name: "hoteldetails",
        params: {
          // hoteldetailsid: this.hoteldetailsid
        }
      });
    },
    //跳转发布游记
    releasefn: function() {
      //路由跳转携带参数
      this.$router.push({
        name: "releasetravels",
        params: {
          // hoteldetailsid: this.hoteldetailsid
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "travels.scss";
</style>
