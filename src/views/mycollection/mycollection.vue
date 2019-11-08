<template>
  <div class="mycollection">
    <div class="topitem">
      <div
        :class="itemactive==index?'itemactive':'item'"
        v-for="(item,index) in topitem"
        :key="index"
        @click="itemactivefn(index)"
      >{{item}}</div>
    </div>
    <!-- 游记 -->
    <div class="domesticlist" v-if="itemactive==0">
      <div class="item" v-for="(item,indexg) in myexchangelist" :key="indexg">
        <div class="domestictop">
          <div class="top">
            <img class="del" src="../../assets/img/my/delicon.png" alt />
            <div class="shu"></div>
            <div class="edit">编辑</div>
          </div>
          <img :src="item.img" alt />
        </div>
        <div class="domestic-bottom">
          <div class="bottom-top">
            <div class="bottom-top-left">
              <div class="title">{{item.title}}</div>
              <img src="../../assets/img/my/addressicon.png" alt />
              &nbsp;&nbsp;
              <div>{{item.address}}</div>
            </div>
            <div class="bottom-top-right">
              <img :src="item.img" alt />
              <div>{{item.name}}</div>
            </div>
          </div>
          <div class="bottom-bototm">
            <div class="date">发表于&nbsp;&nbsp;{{item.date}}</div>
            <div class="like">
              <img src="../../assets/img/my/like.png" alt />
              &nbsp;{{item.like}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 线路 -->
    <div class="list" v-if="itemactive==1">
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
    </div>
    <!-- 门票 -->
    <div class="hotlist" v-if="itemactive==2">
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
    <!-- 酒店 -->
    <div class="hotlist" v-if="itemactive==3">
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
  </div>
</template>

<script>
export default {
  name: "mycollection",
  data() {
    return {
      topitem: ["游记", "线路", "门票", "酒店"],
      itemactive: 0,
      //   游记
      myexchangelist: [
        {
          title: "海口半日游",
          img: require("../../assets/img/home/1-2.png"),
          integral: 150000,
          money: "129.00",
          address: "海口",
          name: "最挑食美食家",
          date: "2019-09-18",
          like: "113"
        },
        {
          title: "海口半日游",
          img: require("../../assets/img/home/1-2.png"),
          integral: 150000,
          money: "129.00",
          address: "海口",
          name: "最挑食美食家",
          date: "2019-09-18",
          like: "113"
        },
        {
          title: "海口半日游",
          img: require("../../assets/img/home/1-2.png"),
          integral: 150000,
          money: "129.00",
          address: "海口",
          name: "最挑食美食家",
          date: "2019-09-18",
          like: "113"
        },
        {
          title: "海口半日游",
          img: require("../../assets/img/home/1-2.png"),
          integral: 150000,
          money: "129.00",
          address: "海口",
          name: "最挑食美食家",
          date: "2019-09-18",
          like: "113"
        },
        {
          title: "海口半日游",
          img: require("../../assets/img/home/1-2.png"),
          integral: 150000,
          money: "129.00",
          address: "海口",
          name: "最挑食美食家",
          date: "2019-09-18",
          like: "113"
        }
      ],
      //   线路
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
      ],
      //   门票
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
    itemactivefn: function(itemactive) {
      this.itemactive = itemactive;
    },
    myinformationfn: function() {
      this.$router.push({
        name: "myinformation"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "mycollection.scss";
</style>
