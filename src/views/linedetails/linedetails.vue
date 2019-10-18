<template>
  <div class="linedetails">
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
        <div class="top-list">
          <div class="jifen">返{{top.jifen}}积分</div>
          <div class="add">出发地：{{top.add}}</div>
          <div class="overadd">目的地：{{top.overadd}}</div>
        </div>

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
      <!-- 主办方 -->
      <div class="sponsor">
        <div class="sponsor-left">主办方 :</div>
        <img :src="top.url" alt />
        <div class="sponsorname">{{top.name}}</div>
      </div>
      <!-- 套餐价格 -->
      <div class="packageprice">
        <div class="packageprice-title">套餐价格</div>
        <div class="packageprice-list">
          <div class="list-item" v-for="(item,indexb) in datemoney" :key="indexb">
            <div class="packageprice-item">
              <div class="itemdate">{{item.date}}</div>
              <div class="itemmoney">￥{{item.money}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 集合地选择 -->
      <div class="address">
        <div class="address-title">套餐价格</div>
        <div class="address-list">
          <div class="address-item" v-for="(item,indesc) in address" :key="indesc">{{item}}</div>
        </div>
      </div>
      <!-- 已报名人员 -->
      <div class="enrolment">
        <div class="enrolment-title" @click="enrolmentfn()">
          <div class="enrolment-title-left">
            <div>已报名人员</div>
            <div class="enrolment-ok">(已报{{enrolment.ok}}/限量{{enrolment.max}})</div>
          </div>
          <img src="../../assets/img/Linelist/right.png" alt />
        </div>
        <div class="enrolmentlist">
          <div class="enrolment-item" v-for="(item,indexf) in enrolmentlist" :key="indexf">
            <img :src="item.url" alt />
            <div class="name">{{item.name}}</div>
          </div>
        </div>
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
      <!-- 猜你喜欢 -->
      <div class="like">
        <div class="like-title">猜你喜欢</div>
        <div class="hotlist">
          <div class="hotlist-item" v-for="(item,indexf) in hotlist" :key="indexf">
            <div class="hotitem-top">
              <div class="hottop">
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
      <div class="buy">立即预定</div>
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
      datemoney: [
        {
          date: "9-11 周四",
          money: 4750
        },
        {
          date: "9-11 周四",
          money: 4750
        },
        {
          date: "9-11 周四",
          money: 4750
        },
        {
          date: "9-11 周四",
          money: 4750
        },
        {
          date: "9-11 周四",
          money: 4750
        },
        {
          date: "9-11 周四",
          money: 4750
        },
        {
          date: "9-11 周四",
          money: 4750
        }
      ],
      address: [
        " 早上5:00浒关朱家庄华润万家门口（KFC门口）",
        " 早上5:50西环路地铁4号口",
        " 早上5:50西环路地铁4号口",
        " 早上5:00浒关朱家庄华润万家门口（KFC门口）"
      ],
      enrolment: {
        ok: 7,
        max: 33
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
@import "linedetails.scss";
.yd-slider.banners > div.yd-slider-pagination {
  bottom: 0.3rem !important;
}
</style>
