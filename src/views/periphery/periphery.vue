<template>
  <div class="noticedetails">
    <div class="top">
      <router-link to="/searchroute">
        <div class="topcontent">
          <img src="../../assets/img/search/chakan.png" alt />
          <input class="topinput" type="text" placeholder="大家都在搜索“日本樱花”" />
        </div>
      </router-link>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in list" :key="index" @click="linedetailsfn(item.id)">
        <div class="left">
          <div class="left-top">
            <p>{{item.class}}</p>&nbsp;|&nbsp;
            <p>{{item.add}}</p>
          </div>
          <img :src="item.img" alt />
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="word">{{item.word}}</div>
          <div class="money">
            <div class="money-left">
              <div class="moneysp1">￥</div>
              <div class="moneysp2">{{item.money}}</div>
              <div class="moneysp3">起</div>
            </div>
            <div class="money-right">
              <div class="integral">反{{item.integral}}积分</div>
            </div>
          </div>
        </div>
      </div>
      <div class="all">
        <div class="and">加载更多</div>
        <img src="../../assets/img/admissionticket/jiazaixiao.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "noticedetails",

  data() {
    return {
      linedetailsid: 0, //线路列表详情id
      list: [
        {
          id: 0,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title:
            "【三日游】东海明珠衢山岛两日游 : 漫步沙滩【三日游】东海明珠衢山岛两日游...",
          word:
            "东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游",
          money: 800,
          integral: 10000
        },
        {
          id: 1,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          word:
            "东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游",
          money: 800,
          integral: 10000
        },
        {
          id: 0,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "【三日游】东海明珠衢山岛两日游 : 漫步沙滩...",
          word:
            "东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游",
          money: 800,
          integral: 10000
        },
        {
          id: 1,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          title: "东海明珠衢山岛两日游",
          word:
            "东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游东海明珠衢山岛两日游",
          money: 800,
          integral: 10000
        }
      ]
    };
  },
  components: {},
  methods: {
    //分页
    // pagechange: function() {
    //   let that = this;
    //   $(window).scroll(function() {
    //     var srollPos = $(window).scrollTop() + 0.5; //滚动条距顶部距离(页面超出窗口的高度)
    //     // console.log(srollPos);
    //     // console.log($(document).height());
    //     // console.log($(window).height());
    //     console.log(srollPos >= $(document).height() - $(window).height());
    //     if (
    //       srollPos >= $(document).height() - $(window).height() &&
    //       that.current_page <= that.last_page
    //     ) {
    //       that.current++;
    //       that.page = that.current;
    //       // ajax请求, 向后台发送 , 来获取对应的数据
    //       that.pagination();

    //       console.log(11111111111);
    //       console.log(that.page);
    //       if ((that.current_page = that.last_page)) {
    //         // that.updown = "我也是有底线的";
    //       }
    //     }
    //   });
    // },

    //点击一级分类向后台获取不同的数据
    nav: function(index, id) {
      this.category = id;
      //把页面要传的参数存到sessionStorage里面
      sessionStorage.setItem("category", this.category);
      this.pagination();
      this.active = index;
    },
    //axios请求
    pagination: function() {
      this.$api.get(
        "cases",
        {
          page: this.page,
          per_page: 12
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data); //请求成功，response为成功信息参数
            let data = response.data.data.data;
            console.log(data);
            for (var index in data) {
              // console.log(data[index]);
              this.imglist.push(data[index]);
            }

            this.total = response.data.data.total;
            this.display = response.data.per_page;
            this.current_page = response.data.current_page;
            this.last_page = response.data.last_page;
            console.log(this.imglist);
            if (this.current_page == this.last_page) {
              this.updown = "- 我也是有底线的 -";
            }
          } else {
            console.log(response.message); //请求失败，response为失败信息
          }
        }
      );
    },
    //跳转线路详情页
    linedetailsfn: function(x) {
      this.linedetailsid = x;
      //把页面要传的参数存到sessionStorage里面
      sessionStorage.setItem("linedetailsid", this.linedetailsid);
      //路由跳转携带参数
      this.$router.push({
        name: "linedetails",
        params: {
          linedetailsid: this.linedetailsid
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
@import "periphery.scss";
</style>
