<template>
  <div class="commentlists">
    <div class="content-bottom">
      <div class="commentlist" v-for="(item,index) in commentlist" :key="index">
        <div class="item-top">
          <div class="item-top-left">
            <img :src="item.headportrait" class="item-headportrait" alt />
            <div class="item-title">{{item.nikename}}</div>
          </div>
          <div class="date">{{item.date}}</div>
        </div>
        <div class="itemword">{{item.word}}</div>
        <div class="commentreply" v-for="(items,indexa) in item.commentreplylist" :key="indexa">
          <div class="item-top">
            <div class="item-top-left">
              <img :src="items.headportrait" class="item-headportrait" alt />
              <div class="item-title">{{items.nikename}}</div>
              <img
                v-show="items.id==1"
                class="isme"
                src="../../assets/img/releasetravels/landlord.png"
                alt
              />
            </div>

            <div class="date">{{items.date}}</div>
          </div>
          <div class="itemword commentreplyword">{{items.word}}</div>
        </div>
      </div>
    </div>
    <div class="commentinput">
      <div class="commentinput-con">
        <img class="commentimg" src="../../assets/img/releasetravels/commentimg.png" alt />
        <input type="text" class="commentinput-input" placeholder="我要评论" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentlists",

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
            "三亚——多年前我曾在这里度蜜月，第一次坐飞机出远门，第一次看到碧蓝的大海、美丽的落日都是在三亚三亚——多年前我曾在这里度蜜月，第一次坐飞机出远门，第一次看到碧蓝的大海、美丽的落日都是在三亚"
        },
        {
          headportrait: require("../../assets/img/Linelist/4-3.png"),
          nikename: "爱旅游的爷们",
          date: "2019-01-02",
          word: "三亚——多年前我曾在这里度蜜月",
          commentreplylist: [
            {
              id: 1,
              headportrait: require("../../assets/img/Linelist/4-2.png"),
              nikename: "老男人",
              date: "2019-01-02",
              word:
                "三亚——多年前我曾在这里度蜜月，第一次坐飞机出远门，第一次看到碧蓝的大海、美丽的落日都是在三亚"
            },
            {
              headportrait: require("../../assets/img/Linelist/4-2.png"),
              nikename: "老男人",
              date: "2019-01-02",
              word:
                "三亚——多年前我曾在这里度蜜月，第一次坐飞机出远门，第一次看到碧蓝的大海、美丽的落日都是在三亚"
            }
          ]
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
@import "commentlist.scss";
</style>
