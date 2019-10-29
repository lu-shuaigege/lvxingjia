<template>
  <div class="integralorder">
    <div class="integralorder-top">
      <div class="top-con">
        <div class="top-con-left">您的收货地址为空，点此添加收货地址</div>
        <img src="../../assets/img/Linelist/4-1.png" class="top-con-right" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "integralorder",

  data() {
    return {};
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
