<template>
  <div class="mytravels">
    <div class="domesticlist">
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
    <div class="addbtn">新建一篇游记</div>
  </div>
</template>

<script>
export default {
  name: "mytravels",
  data() {
    return {
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
      ]
    };
  },
  components: {},
  methods: {
    myinformationfn: function() {
      this.$router.push({
        name: "myinformation"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "mytravels.scss";
</style>
