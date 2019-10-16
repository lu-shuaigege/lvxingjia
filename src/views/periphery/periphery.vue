<template>
  <div class="noticedetails">
    <div class="top">
      <div class="topcontent">
        <img src="../../assets/img/search/chakan.png" alt />
        <input class="topinput" type="text" placeholder="大家都在搜索“日本樱花”" />
      </div>
      <router-link to="/home">
        <div class="over">取消</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "noticedetails",

  data() {
    return {};
  },
  components: {},
  methods: {
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
@import "periphery.scss";
</style>
