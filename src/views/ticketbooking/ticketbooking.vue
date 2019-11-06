<template>
  <div class="ticketbooking" ref="ticketbooking">
    <div class="top">
      <div class="top-top">苏州乐园森林水世界</div>
      <div class="top-bottom">
        <div class="top-bottom-left">出行日期</div>
        <!-- <div class="top-bottom-center">请选择出行日期</div> -->
        <yd-datetime
          ref="datetime"
          v-model="datetime8"
          slot="right"
          type="date"
          class="top-bottom-center"
          @click.native="open"
        >请选择出行日期</yd-datetime>
        <img class="top-bottom-right" src="../../assets/img/Linelist/right.png" alt />
      </div>
    </div>
    <div class="information">
      <div class="information-item1">预定人信息</div>
      <div class="information-item2">
        <div class="information-item2-left">姓名</div>
        <input type="text" class="information-item2-right" placeholder="请填写预定人姓名" />
      </div>
      <div class="information-item3">
        <div class="information-item2-left">手机号</div>
        <input type="text" class="information-item2-right" placeholder="请填写预定人姓名" />
      </div>
    </div>
    <div class="bookinformation" v-show="ticketbookingid==1.1||ticketbookingid==0.1">
      <div class="bookinformation-title">出行人信息</div>
      <div class="bookinformation-item">
        <div class="bookinformation-list">
          <div class="name">{{name}}</div>
          <div class="namephone">{{namephone}}</div>
        </div>
        <div class="bookinformation-list">
          <div class="name">身份证</div>
          <div class="namephone">{{namephone}}</div>
        </div>
      </div>
      <div class="bookinformation-item">
        <div class="bookinformation-btn">+&nbsp;&nbsp;添加常用旅客</div>
      </div>
    </div>
    <div class="bookbottom">
      <div class="bookbottom-title">备注</div>
      <div class="bookbottom-bottom">
        <!-- <textarea name="" id="" cols="30" rows="10"></textarea> -->
        <textarea class="proposal" placeholder="请填写备注"></textarea>
      </div>
    </div>
    <div class="tourleader" v-show="ticketbookingid==0.2">
      <div class="tourleader-title">领队必读</div>
      <div class="tourleader-bottom">
        1、身份证、导游证、大巴证、任务单必带方可领票，缺一
        不可；
        <br />2、请在当日14:00前完成领票操作。
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left-btn">
        <div class="left-btn-left">合计：</div>
        <div class="left-btn-right">
          ￥
          <b>{{money}}</b>
        </div>
      </div>
      <div class="bottom-right-btn" @click="payfn()">立即支付</div>
    </div>

    <!-- 支付 -->
    <div class="pay" ref="pay">
      <div class="paycon">
        <div class="paycon-title">确认付款</div>
        <img
          src="../../assets/img/Linelist/close.png"
          class="payclose"
          ref="payclose"
          @click="payclose()"
          alt
        />
        <div class="paymoney">￥{{money}}</div>
        <div class="paymentmethod">
          <img src="../../assets/img/Linelist/weixin.png" class="weixin" alt />
          <div class="paymentmethod-center">微信支付</div>
          <img class="ok" src="../../assets/img/Linelist/dui.png" alt />
        </div>
        <!-- <div class="integral">
          <div class="integral-top">
            <div class="integral-left">积分抵扣</div>
            <div class="integral-center">{{integral}}积分</div>
            <yd-switch v-model="switch1"></yd-switch>
          </div>

          <div class="explain">说明：100积分可抵扣1元人民币，积分抵扣基数为1000。</div>
        </div> -->
      </div>
      <router-link to="/payok">
        <div class="pay-btn">立即支付</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "book",

  data() {
    return {
      ticketbookingid:0,//酒店页面跳转还是门票跳转
      datetime8: "", // 选择日期
      look: false, //已阅读入驻协议
      money: 10000, //总价
      switch1: false, //选择积分
      information:
        "喀纳斯景区+禾木风景区三日游【包车自由行,注重游客满意度,拒绝跟团游】",
      time: "2019-09-11",
      adderss: "苏州",

      adult: 310.0,
      adultnew: 0,
      children: 110.0,
      childrennew: 0,
      name: "张丽丽 (女)",
      namephone: "15536278963",
      IDnumber: "321223190011224547",
      adultnum: 3,
      childrennum: 3,
      integral: 10000
    };
  },
  components: {},
  created() {
    this.ticketbookingid=sessionStorage.getItem("ticketbookingid");
    this.all();
  },
  watch: {},

  methods: {
    //选择日期弹框
    open() {
      this.$refs.datetime.open();
    },
    // 购票数量加减
    downfn: function(x) {
      if (x == 1) {
        if (this.adultnum > 1) {
          this.adultnum--;
          this.all();
        }
      } else if (x == 2) {
        if (this.childrennum > 1) {
          this.childrennum--;
          this.all();
        }
      }
    },
    // 购票数量加减
    upfn: function(y) {
      if (y == 1) {
        if (this.adultnum < 100) {
          this.adultnum++;
          this.all();
        }
      } else if (y == 2) {
        if (this.childrennum < 100) {
          this.childrennum++;
          this.all();
        }
      }
    },
    // 计算总价
    all: function() {
      this.adultnew = this.adultnum * this.adult;
      this.childrennew = this.childrennum * this.children;
      this.money = this.adultnew + this.childrennew;
    },
    // 支付
    payfn: function() {
      this.$refs.ticketbooking.style.height = "100vh";
      this.$refs.ticketbooking.style.overflow = "hidden";
      this.$refs.pay.style.top = "0px";
    },
    //关闭支付弹框
    payclose: function() {
      this.$refs.ticketbooking.style.height = "";
      this.$refs.ticketbooking.style.overflow = "scroll";
      this.$refs.pay.style.top = "100vh";
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
@import "../../components/index/index.scss";
@import "ticketbooking.scss";
</style>
