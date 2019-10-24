<template>
  <div class="linedetails" ref="linedetails">
    <!-- 轮播图 -->
    <yd-slider class="banners" autoplay="3000">
      <yd-slider-item v-for="(item,index) in banners" :key="index">
        <img :src="item.url" />
      </yd-slider-item>
    </yd-slider>
    <!-- 内容区 -->
    <div class="content">
      <!-- 最上面主要信息 -->
      <div class="top">
        <div class="titel">{{top.title}}</div>
        <div class="word">{{top.word}}</div>

        <div class="money">
          <div class="money-left">
            <div class="moneysp1">￥</div>
            <div class="moneysp2">{{top.money}}</div>
            <div class="moneysp3">起</div>
          </div>
          <div class="money-right">
            <div class="salesvolume">
              销量：
              <span class="salesvolume-span">{{top.salesvolume}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 选择套餐类型 -->
      <div class="choice" @click="choicefn()">
        <div class="choiceleft">选择</div>
        <div class="choicecenter">请选择套餐类型</div>
        <img src="../../assets/img/Linelist/right.png" alt />
      </div>
      <!-- 景点介绍 -->
      <div class="word">
        <div class="wordtop">
          <div class="word-item">景点介绍</div>
          <div class="word-item">行程安排</div>
          <div class="word-item">费用说明</div>
          <div class="word-item">注意事项</div>
        </div>
        <div class="word-all">
          <img src="../../assets/img/Linelist/4-9.png" alt />
        </div>
      </div>
      <div class="buy" @click="buyfn()">立即预定</div>
    </div>
    <!-- 选择套餐弹窗 -->
    <div class="choicepopup" ref="choicepopup">
      <div class="choicepopupcon">
        <div class="popupcon">
          <div class="popupcon-top">
            <img class="top-left" src="../../assets/img/Linelist/4-1.png" alt />
            <div class="top-right">
              <div class="top-right-top">¥300.00</div>
              <div class="top-right-bottom">选择 套餐类型</div>
            </div>
          </div>
          <div class="popupcon-item">
            <div class="popupcon-item-title">类型</div>
          </div>
        </div>
        <router-link to="/payok">
          <div class="pay-btn">立即支付</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "linedetails",

  data() {
    return {
      // 轮播图
      banners: [
        {
          url: require("../../assets/img/Linelist/4-1.png")
        },
        {
          url: require("../../assets/img/Linelist/4-2.png")
        },
        {
          url: require("../../assets/img/Linelist/4-3.png")
        }
      ],
      top: {
        title: "昆明+大理+丽江双飞6日游",
        word:
          "(敞篷吉普洱海环游+玉龙雪山大索道+两大千年古城+VIP私人游艇+网红花海旅拍+丽水金沙)",
        jifen: 10000,
        add: "苏州",
        overadd: "云南",
        money: 1840,
        salesvolume: 500,
        url: require("../../assets/img/Linelist/4-3.png"),
        name: "去浪吧"
      },

      enrolmentlist: [
        {
          url: require("../../assets/img/Linelist/4-1.png"),
          name: "长颈鹿"
        },
        {
          url: require("../../assets/img/Linelist/4-1.png"),
          name: "长颈鹿"
        },
        {
          url: require("../../assets/img/Linelist/4-1.png"),
          name: "长颈鹿长颈鹿"
        },
        {
          url: require("../../assets/img/Linelist/4-1.png"),
          name: "长颈鹿"
        },
        {
          url: require("../../assets/img/Linelist/4-1.png"),
          name: "长颈鹿"
        },
        {
          url: require("../../assets/img/Linelist/4-1.png"),
          name: "长颈鹿"
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
        }
      ]
    };
  },
  components: {},
  watch: {},
  methods: {
    //套餐选择弹窗
    choicefn: function() {
      this.$refs.linedetails.style.height = "100vh";
      this.$refs.linedetails.style.overflow = "hidden";
      this.$refs.choicepopup.style.top = "0px";
    },
    //关闭支付弹框
    payclose: function() {
      this.$refs.linedetails.style.height = "";
      this.$refs.linedetails.style.overflow = "scroll";
      this.$refs.choicepopup.style.top = "100vh";
    },
    // 跳转已报名人员列表
    enrolmentfn: function(x) {
      //   this.enrolmentstaffid = x;
      //把页面要传的参数存到sessionStorage里面
      //   sessionStorage.setItem("enrolmentstaffid", this.enrolmentstaffid);
      //路由跳转携带参数
      this.$router.push({
        name: "enrolmentstaff",
        params: {
          //   enrolmentstaffid: this.enrolmentstaffid
        }
      });
    },
    // 跳转购买输入信息页面
    buyfn() {
      //   this.enrolmentstaffid = x;
      //把页面要传的参数存到sessionStorage里面
      //   sessionStorage.setItem("enrolmentstaffid", this.enrolmentstaffid);
      //路由跳转携带参数
      this.$router.push({
        name: "book",
        params: {
          //   enrolmentstaffid: this.enrolmentstaffid
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
@import "doorticketdetails.scss";
.yd-slider.banners > div.yd-slider-pagination {
  bottom: 0.3rem !important;
}
</style>
