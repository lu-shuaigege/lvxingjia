<template>
  <div class="order">
    <div class="ordertop">
      <div
        :class="topbtnactive==index?'topbtnactive':'topbtn'"
        v-for="(item,index) in topbtn"
        :key="index"
        @click="topbtnactivefn(index)"
      >{{item.title}}</div>
    </div>
    <!-- 页面主体 -->
    <div class="order-content">
      <div class="content-item" v-for="(item,indexa) in orderlist" :key="indexa">
        <div class="item-top">
          <div class="item-top-left">订单号 : {{item.ordernumber}}</div>
          <div :class="item.zhuangtai==0?'item-top-right1':''" v-if="item.zhuangtai==0">待付款</div>
          <div :class="item.zhuangtai==1?'item-top-right1':''" v-if="item.zhuangtai==1">待出行</div>
          <div :class="item.zhuangtai==2?'item-top-right1':''" v-if="item.zhuangtai==2">待点评</div>
          <div :class="item.zhuangtai==3?'item-top-right1':''" v-if="item.zhuangtai==3">已取消</div>
          <div :class="item.zhuangtai==4?'item-top-right1':''" v-if="item.zhuangtai==4">已完成</div>
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
          <div class="item-bottom-right">
            <div
              v-if="item.zhuangtai==0||item.zhuangtai==1"
              class="close"
              @click="payfn(item.zhuangtai)"
            >取消订单</div>
            <div v-if="item.zhuangtai==0" class="payorder" @click="payfn(item.zhuangtai)">立即支付</div>
            <div v-if="item.zhuangtai==2" class="goevaluate" @click="payfn(item.zhuangtai)">去评价</div>
            <div v-if="item.zhuangtai==3" class="del" @click="payfn(item.zhuangtai)">删除</div>
          </div>
        </div>
      </div>
    </div>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "@/components/tab/tab.vue";

export default {
  name: "order",
  data() {
    return {
      topbtnactive: 0, //订单类型切换状态
      orderstateid: 0, //订单状态id
      topbtn: [
        {
          id: 0,
          title: "全部"
        },
        {
          id: 1,
          title: "待付款"
        },
        {
          id: 2,
          title: "待出行"
        },
        {
          id: 3,
          title: "待点评"
        }
      ],
      orderlist: [
        {
          ordernumber: 123123456,
          zhuangtai: 0, //代付款
          title: "登山杖碳素超轻超短伸",
          date: "9月29日",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        },
        {
          ordernumber: 123123456,
          zhuangtai: 1,
          title:
            ".登山杖碳素超轻超短伸登山杖碳素超轻登山杖碳素超轻超短伸登山杖碳素超轻",
          date: "9月29日//代出行",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        },
        {
          ordernumber: 123123456,
          zhuangtai: 2,//代点评
          title: "登山杖碳素超轻超短伸",
          date: "9月29日",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        },
        {
          ordernumber: 123123456,
          zhuangtai: 3,
          title: "登山杖碳素超轻超短伸登山杖碳素超轻...",
          date: "9月29日",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        },
        {
          ordernumber: 123123456,
          zhuangtai: 4,
          title: "登山杖碳素超轻超短伸",
          date: "9月29日",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        },
        {
          ordernumber: 123123456,
          zhuangtai: 0,
          title: "登山杖碳素超轻超短伸登山杖碳素超轻...",
          date: "9月29日",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        }
      ]
    };
  },
  components: {
    Tab
  },
  methods: {
    topbtnactivefn: function(x) {
      this.topbtnactive = x;
    },
    payfn: function(x) {
      this.orderstateid = x;
      //把页面要传的参数存到sessionStorage里面
      sessionStorage.setItem("orderstateid", this.orderstateid);
      //路由跳转携带参数
      this.$router.push({
        name: "orderdetails",
        params: {
          // peripheryid: this.peripheryid
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "order.scss";
</style>
