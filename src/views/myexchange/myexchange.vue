<template>
  <div class="myexchange">
    <div class="listcontent">
      <div class="list" v-for="(item,index) in myexchangelist" :key="index">
        <div class="list-left">
          <img :src="item.img" alt />
        </div>
        <div class="list-right">
          <div class="title">{{item.title}}</div>
          <div class="right-bottom">
            <div class="integral">{{item.integral}}</div>
            <div class="integralb">积分</div>
            <s class="money">￥{{item.money}}</s>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myexchange",
  data() {
    return {
      myexchangelist: [
        {
          title: "户外潮牌旅行衣服男百搭潮流时尚（外出必备）",
          img: require("../../assets/img/my/fensi.png"),
          integral: 150000,
          money: "129.00"
        },
        {
          title: "户外潮牌旅行衣服男百搭潮流时尚（外出必备）",
          img: require("../../assets/img/my/releaseroute.png"),
          integral: 150000,
          money: "129.00"
        },
        {
          title: "户外潮牌旅行衣服男百搭潮流时尚（外出必备）",
          img: require("../../assets/img/my/address.png"),
          integral: 150000,
          money: "129.00"
        },
        {
          title: "户外潮牌旅行衣服男百搭潮流时尚（外出必备）",
          img: require("../../assets/img/my/frequenttravellers.png"),
          integral: 150000,
          money: "129.00"
        },
        {
          title: "户外潮牌旅行衣服男百搭潮流时尚（外出必备）",
          img: require("../../assets/img/my/collection.png"),
          integral: 150000,
          money: "129.00"
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
@import "myexchange.scss";
</style>
