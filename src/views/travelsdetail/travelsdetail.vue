<template>
  <div class="travelsdetail">
    <!-- banner图 -->
    <div class="banners">
      <img
        @click="sharepopupdownfn(1)"
        class="share"
        src="../../assets/img/releasetravels/share.png"
        alt
      />
      <img class="collection" src="../../assets/img/releasetravels/collection.png" alt />
      <img class="banners-img" :src="top.url" alt />
    </div>
    <!-- 内容区 -->
    <div class="content">
      <div class="content-top">
        <div class="content-top-top">
          <div class="nikename-top">
            <img :src="top.url" class="headportrait" alt />
            <div class="nikename">{{top.nikename}}</div>
          </div>
          <div class="title">{{top.title}}</div>
        </div>
        <div class="content-top-bottom">{{top.word}}</div>
      </div>
      <div class="content-bottom">
        <div class="bottom-title">热门评论</div>
        <div class="me">
          <img class="meheadportrait" :src="top.url" alt />
          <input type="text" class="meinput" placeholder="输入内容" />
        </div>
        <div class="commentlist" v-for="(item,index) in commentlist" :key="index">
          <div class="item-top">
            <div class="item-top-left">
              <img :src="item.headportrait" class="item-headportrait" alt />
              <div class="item-title">{{item.nikename}}</div>
            </div>
            <div class="date">{{item.date}}</div>
          </div>
          <div class="itemword">{{item.word}}</div>
        </div>
        <div class="end" @click="endfn()">
          <div class="endword">查看全部评论({{commentnum}})</div>
          <img class="right" src="../../assets/img/releasetravels/right.png" alt />
        </div>
      </div>
    </div>
    <div class="sharepopup" ref="sharepopup">
      <div class="sharepopup-con">
        <div class="sharepopup-con-top">
          <div class="sharepopup-con-left">
            <img src="../../assets/img/releasetravels/weixin.png" alt />
            <div class="sharepopup-con-left-title">微信好友</div>
          </div>
          <div class="sharepopup-con-right">
            <img src="../../assets/img/releasetravels/pengyouquan.png" alt />
            <div class="sharepopup-con-left-title">微信朋友圈</div>
          </div>
        </div>
        <div class="sharepopup-con-bottom" @click="sharepopupdownfn(0)">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "travelsdetail",

  data() {
    return {
      commentnum: 123,
      top: {
        url: require("../../assets/img/Linelist/4-3.png"),
        nikename: "去浪吧",
        title: "海南不止海，一个人的海南五日行",
        word:
          "三亚——多年前我曾在这里度蜜月，第一次坐飞机出远门，第一次看到碧蓝的大海、美丽的落日都是在三亚，这是一个让我从此燃起对旅游强烈愿望的地方。"
      },
      commentlist: [
        {
          headportrait: require("../../assets/img/Linelist/4-3.png"),
          nikename: "老男人",
          date: "2019-01-02",
          word:
            "三亚——多年前我曾在这里度蜜月，第一次坐飞机出远门，第一次看到碧蓝的大海、美丽的落日都是在三亚"
        },
        {
          headportrait: require("../../assets/img/Linelist/4-3.png"),
          nikename: "老男人",
          date: "2019-01-02",
          word:
            "三亚——多年前我曾在这里度蜜月，第一次坐飞机出远门，第一次看到碧蓝的大海、美丽的落日都是在三亚"
        },
        {
          headportrait: require("../../assets/img/Linelist/4-3.png"),
          nikename: "爱旅游的爷们",
          date: "2019-01-02",
          word: "三亚——多年前我曾在这里度蜜月"
        },
        {
          headportrait: require("../../assets/img/Linelist/4-3.png"),
          nikename: "老男人",
          date: "2019-01-02",
          word:
            "三亚——多年前我曾在这里度蜜月，第一次坐飞机出远门，第一次看到碧蓝的大海、美丽的落日都是在三亚"
        }
      ]
    };
  },
  components: {},
  watch: {},
  methods: {
    // 跳转评论列表
    endfn: function(x) {
      //   this.enrolmentstaffid = x;
      //把页面要传的参数存到sessionStorage里面
      //   sessionStorage.setItem("enrolmentstaffid", this.enrolmentstaffid);
      //路由跳转携带参数
      this.$router.push({
        name: "commentlist",
        params: {
          //   enrolmentstaffid: this.enrolmentstaffid
        }
      });
    },
    // 分享弹框
    sharepopupdownfn: function(x) {
      if (x == 0) {
        this.$refs.sharepopup.style.top = "100vh";
      } else if (x == 1) {
        this.$refs.sharepopup.style.top = "0px";
      }
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
@import "travelsdetail.scss";
</style>
