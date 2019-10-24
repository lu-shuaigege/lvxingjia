<template>
  <div class="book" ref="book">
    <div class="top">
      <div class="information">{{information}}</div>
      <div class="topcon">
        <div class="time">出游日 : {{time}}</div>
        <div class="adderss">出发地 : {{adderss}}</div>
      </div>
      <div class="top-bottom">
        <div class="adult">
          <div class="adult-left">成人</div>
          <div class="adult-center">￥{{adultnew}}</div>
          <div class="adult-right">
            <div class="down" @click="downfn(1)">-</div>
            <div class="adult-right-center">{{adultnum}}</div>
            <div class="up" @click="upfn(1)">+</div>
          </div>
        </div>
        <div class="adult">
          <div class="adult-left">儿童</div>
          <div class="adult-center">￥{{childrennew}}</div>
          <div class="adult-right">
            <div class="down" @click="downfn(2)">-</div>
            <div class="adult-right-center">{{childrennum}}</div>
            <div class="up" @click="upfn(2)">+</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bookcenter">
      <div class="center-title">预定人信息</div>
      <div class="center-item">
        <div class="item-left">姓名</div>
        <input class="item-right" type="text" placeholder="请填写预定人姓名" />
      </div>
      <div class="center-item">
        <div class="item-left">手机号</div>
        <input class="item-right" type="text" placeholder="请填写预定人手机号" />
      </div>
    </div>
    <div class="bookinformation">
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
    <div class="clause">
      <yd-checkbox val="1" shape="circle" v-model="look">已阅读入驻协议</yd-checkbox>
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
        <div class="integral">
          <div class="integral-top">
            <div class="integral-left">积分抵扣</div>
            <div class="integral-center">{{integral}}积分</div>
            <yd-switch v-model="switch1"></yd-switch>
          </div>

          <div class="explain">说明：100积分可抵扣1元人民币，积分抵扣基数为1000。</div>
        </div>
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
    this.all();
  },
  watch: {},

  methods: {
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
      if (this.look) {
        this.$refs.book.style.height = "100vh";
        this.$refs.book.style.overflow = "hidden";
        this.$refs.pay.style.top = "0px";
      }
    },
    //关闭支付弹框
    payclose: function() {
      this.$refs.book.style.height = "";
      this.$refs.book.style.overflow = "scroll";
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
@import "book.scss";
</style>
