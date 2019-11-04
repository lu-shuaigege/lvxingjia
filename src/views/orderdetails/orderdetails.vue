<template>
  <div class="orderdetails">
    <div class="top">
      <div class="top-title">等待买家付款</div>
    </div>
    <div class="content-top">
      <div class="item-top">
        <div class="item-top-left">订单号 : {{item.ordernumber}}</div>
      </div>
      <div class="item-center">
        <div class="item-center-left">
          <img :src="item.img" alt />
        </div>
        <div class="item-center-right">
          <div class="title">{{item.title}}</div>
          <div class="date">日期 : {{item.date}}</div>
          <div class="num">{{item.chengren}}成人.{{item.ertong}}儿童</div>
          <div class="money">￥{{item.money}}</div>
        </div>
      </div>
      <div class="item-bottom">
        <div class="item-bottom-left">
          <div class="lefta">总计 :</div>
          <div class="leftb">￥{{item.money}}</div>
        </div>
      </div>
    </div>
    <div class="content-bottom">
      <div class="list">
        <div class="list-left">订单编号 :</div>
        <div class="list-right">{{item.ordernumber}}</div>
      </div>
      <div class="list">
        <div class="list-left">创建时间 :</div>
        <div class="list-right">{{item.chuangjian}}</div>
      </div>
      <div class="list">
        <div class="list-left">付款时间 :</div>
        <div class="list-right">{{item.fukuan}}</div>
      </div>
      <div class="list">
        <div class="list-left">出行时间 :</div>
        <div class="list-right">{{item.chuxing}}</div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="left-btn" @click="okfn(2)">取消订单</div>
      <div class="right-btn">立即支付</div>
    </div>
    <!-- 取消订单弹框 -->
    <div class="nopay" ref="nopay">
      <div class="nopaycontent">
        <div class="nopay-top">
          <div class="nopay-top-left" @click="okfn(0)">取消</div>
          <div class="nopay-top-center">选择取消原因</div>
          <div class="nopay-top-right" @click="okfn(1)">确定</div>
        </div>
        <div
          @click="nopaylistfn(index)"
          :class="listactive==index?'nopay-listactive':'nopay-list'"
          v-for="(item,index) in nopaylist"
          :key="index"
        >{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderdetails",
  data() {
    return {
      listactive: 0,
      nopaylist: ["信息填写错误,重新拍", "我不想买了", "卖家缺货", "其他原因"],
      item: {
        ordernumber: 123123456,
        zhuangtai: 0,
        title: "登山杖碳素超轻超短伸",
        date: "9月29日",
        chengren: 2,
        ertong: 1,
        money: 298.0,
        img: require("../../assets/img/home/1-2.png"),
        chuangjian: "2017-12-13  16:08:10",
        fukuan: "2017-12-13  16:08:10",
        chuxing: "2017-12-13  16:08:10"
      }
    };
  },
  methods: {
    nopaylistfn: function(x) {
      this.listactive = x;
    },
    okfn: function(x) {
      if (x == 0) {
        this.$refs.nopay.style.top = "100vh";
      } else if (x == 1) {
        this.$refs.nopay.style.top = "100vh";
      } else if (x == 2) {
        this.$refs.nopay.style.top = "0px";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "orderdetails.scss";
</style>
