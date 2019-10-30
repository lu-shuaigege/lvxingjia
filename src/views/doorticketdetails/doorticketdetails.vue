<template>
  <div class="linedetails" ref="linedetails">
    <img class="islike" v-show="islike==0" src="../../assets/img/Linelist/like.png" alt />
    <img class="islike" v-show="islike==1" src="../../assets/img/Linelist/xihuan.png" alt />
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
      <div class="buy" @click="choicefn()">立即预定</div>
    </div>
    <!-- 选择套餐弹窗 -->
    <div class="choicepopup" ref="choicepopup">
      <div class="choicepopupcon">
        <img
          src="../../assets/img/Linelist/close.png"
          class="choicepopupclose"
          ref="choicepopupclose"
          @click="payclose()"
          alt
        />
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
            <div class="twoclass">
              <div
                :class="twoclass==1?'twoclass-item-active':'twoclass-item'"
                @click="twoclassfn(1)"
              >
                <div>散客</div>
              </div>
              <div
                :class="twoclass==2?'twoclass-item-active':'twoclass-item'"
                @click="twoclassfn(2)"
              >
                <div>团队</div>
              </div>
            </div>
          </div>
          <div class="popupcon-item">
            <div class="popupcon-item-title">套餐</div>
            <div class="twoclass">
              <div
                :class="twoclassitem==1?'twoclass-item-active':'twoclass-item'"
                @click="twoclassitemfn(1)"
              >
                <div>套餐一</div>
              </div>
              <div
                :class="twoclassitem==2?'twoclass-item-active':'twoclass-item'"
                @click="twoclassitemfn(2)"
              >
                <div>套餐二</div>
              </div>
              <div
                :class="twoclassitem==3?'twoclass-item-active':'twoclass-item'"
                @click="twoclassitemfn(3)"
              >
                <div>套餐三</div>
              </div>
              <div
                :class="twoclassitem==4?'twoclass-item-active':'twoclass-item'"
                @click="twoclassitemfn(4)"
              >
                <div>套餐四</div>
              </div>
              <div
                :class="twoclassitem==5?'twoclass-item-active':'twoclass-item'"
                @click="twoclassitemfn(5)"
              >
                <div>套餐五</div>
              </div>
            </div>
          </div>
          <div class="popupcon-item">
            <div class="popupcon-item-bynum">
              <div class="bynum-left">购买数量</div>
              <div class="bynum-right">
                <div class="down" @click="downfn(1)">-</div>
                <div class="bynum-right-center">{{adultnum}}</div>
                <div class="up" @click="upfn(1)">+</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <router-link to="/ticketbooking"> -->
        <div class="pay-btn" @click="ticketbookingfn(0)">立即支付</div>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "linedetails",

  data() {
    return {
      islike: 0,
      adultnum: 1,
      twoclass: 1, //套餐类型选择
      ticketbookingid: 0, //套餐类型选择跳转详情id
      twoclassitem: 1, //套餐选择
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
    //套餐类型选择
    twoclassfn: function(y) {
      this.twoclass = y;
    },
    //套餐选择
    twoclassitemfn: function(z) {
      this.twoclassitem = z;
    },
    // 跳转预订信息填写页面
    ticketbookingfn: function(x) {
      if (this.twoclass == 1) {
        console.log(x);
        this.ticketbookingid = x + 0.1;
        console.log(this.ticketbookingid);
      } else if (this.twoclass == 2) {
        console.log(x);
        this.ticketbookingid = x + 0.2;
        console.log(this.ticketbookingid);
      }

      //把页面要传的参数存到sessionStorage里面
      sessionStorage.setItem("ticketbookingid", this.ticketbookingid);
      //路由跳转携带参数
      this.$router.push({
        name: "ticketbooking",
        params: {
          ticketbookingid: this.ticketbookingid
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
    // 购票数量加减
    downfn: function(x) {
      if (x == 1) {
        if (this.adultnum > 1) {
          this.adultnum--;
          this.all();
        }
      }
    },
    // 购票数量加减
    upfn: function(y) {
      if (y == 1) {
        if (this.adultnum < 100) {
          this.adultnum++;
          this.all();
        }
      }
    },
    // 计算总价
    all: function() {
      this.adultnew = this.adultnum * this.adult;
      this.childrennew = this.childrennum * this.children;
      this.money = this.adultnew + this.childrennew;
    },
    // 支付
    payfn: function() {
      if (this.look) {
        this.$refs.book.style.height = "100vh";
        this.$refs.book.style.overflow = "hidden";
        this.$refs.pay.style.top = "0px";
      }
    },
    //关闭支付弹框
    payclose: function() {
      this.$refs.linedetails.style.height = "";
      this.$refs.linedetails.style.overflow = "scroll";
      this.$refs.choicepopup.style.top = "100vh";
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
