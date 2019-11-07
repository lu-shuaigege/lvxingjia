<template>
  <div class="integraldetailed">
    <div class="top">
      <div :class="itemactive==0?'itemactive':'item'" @click="itemactivefn(0)">积分收入</div>
      <div class="shu"></div>
      <div :class="itemactive==1?'itemactive':'item'" @click="itemactivefn(1)">积分支出</div>
    </div>
    <div class="listcontentb">
      <div class="list" v-for="(item,index) in list" :key="index">
        <div class="left">
          <div class="leftcontent">
            <div class="leftcontent-top">{{item.title}}</div>
            <div class="leftcontent-center">{{item.date}}</div>
            <div class="leftcontent-bottom">流水号 : {{item.ordernum}}</div>
          </div>
        </div>
        <div class="right">{{item.money}}积分</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "integraldetailed",
  data() {
    return {
      itemactive: 0, //   点击切换
      list: [
        {
          type: 0,
          title: "西安橡树之都公寓",
          ordernum: "32212345790844",
          date: "2017-10-13  09:25",
          money: "-200",
          moneytype: 0
        },
        {
          type: 1,
          title: "西安橡树之都公寓",
          ordernum: "32212345790844",
          date: "2017-10-13  09:25",
          money: "-200",
          moneytype: 1
        },
        {
          type: 2,
          title: "西安橡树之都公寓",
          ordernum: "32212345790844",
          date: "2017-10-13  09:25",
          money: "-200",
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
@import "integraldetailed.scss";
</style>
