<template>
  <div class="home">
    <div class="top">
      <div class="banner">
        <yd-slider autoplay="3000">
          <yd-slider-item v-for="(item,index) in banners">
            <img :src="item.url" />
          </yd-slider-item>
        </yd-slider>
        <div class="bannertop">
          <div class="bannertop-left">
            <div>苏州</div>
            <img class="bottom-img" src="../../assets/img/home/bottom.png" alt />
          </div>
          <div class="bannertop-center">
            <img src="../../assets/img/home/search.png" alt />
            <div>大家都在搜索“日本樱花”</div>
          </div>
          <div class="bannertop-right">
            <img src="../../assets/img/home/news.png" alt />
          </div>
        </div>
        <div class="banner-bottom">
          
        </div>
      </div>
    </div>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "@/components/tab/tab.vue";

export default {
  name: "home",
  components: {
    Tab
  },
  data() {
    return {
      banners: [
        {
          url: require("../../assets/img/home/1-banner.png")
        },
        {
          url: require("../../assets/img/home/1-banner.png")
        },
        {
          url: require("../../assets/img/home/1-banner.png")
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "home.scss";
</style>
