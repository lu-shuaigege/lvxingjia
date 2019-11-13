<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isWechat: true // 是否为微信环境（true：是；false：否）
    };
  },

  created() {
    // 检测是浏览器端还是微信端
    let ua = navigator.userAgent.toLowerCase();
    if (String(ua.match(/MicroMessenger/i)) === "micromessenger") {
      this.isWechat = true;

      let t = "http://travel.dev.zhangxinkeji.com",
        n = "https://open.weixin.qq.com/connect/oauth2/authorize?",
        e = "wx731422faa3dd833f"; //开发者账号
      let url = `${n}appid=${e}&redirect_uri=${t}&response_type=code&scope=snsapi_base&state=0#wechat_redirec`;
      // window.location.href =
      //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx731422faa3dd833f&redirect_uri=http://travel.dev.zhangxinkeji.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
      // window.location.href =
      //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx731422faa3dd833f&redirect_uri=http://travel.dev.zhangxinkeji.com&response_type=code&scope=snsapi_base&state=1#wechat_redirec";

      // window.location.href = url;
    } else {
      this.isWechat = false;
    }
  },
  methods: {}
};
</script>
<style lang="less">
#app {
  margin: 0px;
  padding: 0px;
}
.yd-slider.banners > div.yd-slider-pagination {
  bottom: 0.3rem !important;
}
</style>
