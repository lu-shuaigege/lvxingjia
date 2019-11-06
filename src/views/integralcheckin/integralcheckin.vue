<template>
  <div class="integralcheckin">
    <div class="bannertop">
      <div class="topcon">
        <img class="topcon-left" src="../../assets/img/Integralmall/signin.png" alt />
        <div class="topcon-center">
          <div class="topcon-center-top">累计签到积分</div>
          <div class="topcon-center-bottom">{{integral}}</div>
        </div>
        <div class="topcon-right" @click="checkindetailsfn()">明细</div>
      </div>
    </div>
    <div class="integralcheckin-bottom">
      <div class="bottom-title">签到规则</div>
      <div class="bottom-word">
        1、连续签到第一天1积分，第二天5积分，第三天10积分，
        第四天15积分，第五天20积分，第六天25积分，第七天30
        积分；
        2、连续签到达7天后，每天都可得30积分；
        3、签到断签之后，重新从第一天开始累积计算签到积分值。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "integralcheckin",

  data() {
    return {
      doorticketid: 0,
      integral: 13211 //积分
    };
  },
  components: {},
  methods: {
    //跳转积分商品详情
    checkindetailsfn: function(x) {
      //   this.doorticketid = x;
      //把页面要传的参数存到sessionStorage里面
      //   sessionStorage.setItem("doorticketid", this.doorticketid);
      //路由跳转携带参数
      this.$router.push({
        name: "checkindetails",
        params: {
          //   doorticketid: this.doorticketid
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
@import "integralcheckin.scss";
</style>
