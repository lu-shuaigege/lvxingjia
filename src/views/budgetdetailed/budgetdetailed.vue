<template>
  <div class="budgetdetailed">
    <div class="top">
      <div :class="itemactive==0?'itemactive':'item'" @click="itemactivefn(0)">订单支出</div>
      <div class="shu"></div>
      <div :class="itemactive==1?'itemactive':'item'" @click="itemactivefn(1)">分佣收益</div>
      <div class="shu"></div>
      <div :class="itemactive==2?'itemactive':'item'" @click="itemactivefn(2)">提现记录</div>
    </div>
    <div v-show="itemactive!=2" class="listcontenta">
      <div class="list" v-for="(item,index) in list" :key="index">
        <div class="left">
          <div class="leftimg">
            <img v-show="item.type==0" src="../../assets/img/my/city.png" alt />
            <img v-show="item.type==1" src="../../assets/img/my/box.png" alt />
          </div>
          <div class="leftcontent">
            <div class="leftcontent-top">{{item.title}}</div>
            <div class="leftcontent-center">订单号 : {{item.ordernum}}</div>
            <div class="leftcontent-bottom">{{item.date}}</div>
          </div>
        </div>
        <div class="right">{{item.money}}</div>
      </div>
    </div>
    <div class="listcontentb" v-show="itemactive==2">
      <div class="list" v-for="(item,index) in list" :key="index">
        <div class="left">
          <div class="leftcontent">
            <div class="leftcontent-top">{{item.title}}</div>
            <div class="leftcontent-center">{{item.date}}</div>
            <div class="leftcontent-bottom">流水号 : {{item.ordernum}}</div>
          </div>
        </div>
        <div class="right">
          <div class="rightmoney">{{item.money}}</div>
          <div v-if="item.moneytype==0">体现成功</div>
          <div v-if="item.moneytype==1">体现中</div>
          <div v-if="item.moneytype==2">体现驳回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "budgetdetailed",
  data() {
    return {
      itemactive: 0, //   点击切换
      list: [
        {
          type: 0,
          title: "西安橡树之都公寓",
          ordernum: "32212345790844",
          date: "2017-10-13  09:25",
          money: "-200.00",
          moneytype: 0
        },
        {
          type: 1,
          title: "西安橡树之都公寓",
          ordernum: "32212345790844",
          date: "2017-10-13  09:25",
          money: "-200.00",
          moneytype: 1
        },
        {
          type: 2,
          title: "西安橡树之都公寓",
          ordernum: "32212345790844",
          date: "2017-10-13  09:25",
          money: "-200.00",
          moneytype: 2
        }
      ]
    };
  },
  components: {},
  methods: {
    //   点击切换
    itemactivefn: function(active) {
      this.itemactive = active;
    },
    // 跳转商家入驻
    applySettledinfn: function() {
      this.$router.push({
        name: "applySettledin"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "budgetdetailed.scss";
</style>
