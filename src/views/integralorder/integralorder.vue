<template>
  <div class="integralorder">
    <div class="integralorder-top">
      <div class="top-con">
        <div class="top-con-left">您的收货地址为空，点此添加收货地址</div>
        <img src="../../assets/img/Linelist/right.png" class="top-con-right" alt />
      </div>
    </div>
    <div class="integralorder-topnew">
      <img src="../../assets/img/Integralmall/addressicon.png" class="top-con-left" alt />
      <div class="top-con-center">
        <div class="top-con-center-top">
          <div class="top-con-center-top-name">{{address.name}}</div>
          <div class="top-con-center-top-tel">{{address.tel}}</div>
        </div>
        <div class="top-con-center-bottom">{{address.content}}</div>
      </div>
      <img src="../../assets/img/Linelist/right.png" class="topnew-con-right" alt />
    </div>
    <div class="integralorder-center">
      <div class="center-left">
        <img :src="order.url" class="center-left-img" alt />
      </div>
      <div class="center-right">
        <div class="center-right-top">{{order.title}}</div>
        <div class="center-right-center">{{order.content}}</div>
        <div class="center-right-bottom">
          <div class="center-right-bottom-left">{{order.integral}}积分</div>
          <div class="center-right-bottom-right">x1</div>
        </div>
      </div>
    </div>
    <div class="integralorder-center2">
      <div class="center2-top">
        <div class="center2-top-left">配送方式</div>
        <div class="center2-top-right">顺丰到付</div>
      </div>
      <div class="center2-center">
        <div class="center2-center-left">备注(选填)</div>
        <input type="text" class="center2-center-right" placeholder="请填写备注内容" />
      </div>
      <div class="center2-bottom">
        <div class="center2-bottom-left">共1件商品</div>&nbsp;&nbsp;
        <div class="center2-bottom-right">
          小计 :
          <div>{{order.integral}}积分</div>
        </div>
      </div>
    </div>
    <div class="payorder">
      <div class="payorder-left">
        <div class="payorder-left-left">合计 :</div>&nbsp;&nbsp;
        <div class="payorder-left-right">¥ 2980.00</div>
      </div>
      <div class="payorder-right">提交订单</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "integralorder",

  data() {
    return {
      order: {
        url: require("../../assets/img/Linelist/4-1.png"),
        title: "登山杖碳素超轻超短伸",
        content: "相关简介文案相关简介文案相关简介文案相关简介文案相关简介文案",
        integral: "15500"
      },
      address: {
        name: "林凯丽",
        tel: "15962336196",
        content: "江苏省苏州市苏州工业园区苏州工业园区直属纳米科技E栋1602"
      }
    };
  },
  components: {},
  watch: {},
  methods: {
    // 跳转已报名人员列表
    enrolmentfn: function(x) {
      //   this.enrolmentstaffid = x;
      //把页面要传的参数存到sessionStorage里面
      //   sessionStorage.setItem("enrolmentstaffid", this.enrolmentstaffid);
      //路由跳转携带参数
      this.$router.push({
        name: "enrolmentstaff",
        params: {
          //   enrolmentstaffid: this.enrolmentstaffid
        }
      });
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
@import "integralorder.scss";
</style>
