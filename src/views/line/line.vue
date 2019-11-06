<template>
  <div class="lines">
    <div class="release">
      <div class="release-item" @click="releasefn()">发布</div>
      <div class="release-center"></div>
      <div class="release-item">去pc发布</div>
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
          <div class="integral">反{{item.integral}}积分</div>
          <div class="money">
            <div class="money-left">
              <div class="moneysp1">￥</div>
              <div class="moneysp2">{{item.money}}</div>
              <div class="moneysp3">起</div>
            </div>
            <div class="money-right">
              <div class="ok" v-if="item.ok==0">待审核</div>
              <div class="ok" v-if="item.ok==1">通过</div>
              <div class="ok" v-if="item.ok==2">驳回</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lines",
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
          integral: 10000,
          ok: 1
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
          integral: 10000,
          ok: 0
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
          integral: 10000,
          ok: 2
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
          integral: 10000,
          ok: 1
        }
      ]
    };
  },
  components: {},
  methods: {
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
            let data = response.data.data.data;
            for (var index in data) {
              this.imglist.push(data[index]);
            }

            this.total = response.data.data.total;
            this.display = response.data.per_page;
            this.current_page = response.data.current_page;
            this.last_page = response.data.last_page;
            if (this.current_page == this.last_page) {
              this.updown = "- 我也是有底线的 -";
            }
          } else {
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
    //跳转发布线路
    releasefn: function() {
      this.$router.push({
        name: "releaseline"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "line.scss";
</style>
