<template>
  <div class="checkindetails">
    <div v-for="(item,index) in detaillist" :key="index" class="item">
      <div class="item-left">{{item.date}}</div>
      <div class="item-right">+{{item.integral}}积分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkindetails",

  data() {
    return {
      doorticketid: 0,
      integral: 13211, //积分
      detaillist: [
        {
          date: "2017-10-13  09:25",
          integral: 1
        },
        {
          date: "2017-10-13  09:25",
          integral: 1
        },
        {
          date: "2017-10-13  09:25",
          integral: 1
        },
        {
          date: "2017-10-13  09:25",
          integral: 1
        }
      ]
    };
  },
  components: {},
  methods: {
    //跳转积分商品详情
    doorticketdetailsfn: function(x) {
      this.doorticketid = x;
      //把页面要传的参数存到sessionStorage里面
      sessionStorage.setItem("doorticketid", this.doorticketid);
      //路由跳转携带参数
      this.$router.push({
        name: "integralshopdetail",
        params: {
          doorticketid: this.doorticketid
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
@import "checkindetails.scss";
</style>
