<template>
  <div class="book">
    <div class="top">
      <div class="information">{{information}}</div>
      <div class="topcon">
        <div class="time">出游日 : {{time}}</div>
        <div class="adderss">出发地 : {{adderss}}</div>
      </div>
      <div class="top-bottom">
        <div class="adult">
          <div class="adult-left">成人</div>
          <div class="adult-center">￥{{adult}}</div>
          <div class="adult-right">
            <div>-</div>
            <input type="text" />
            <div>+</div>
          </div>
        </div>
        <div class="adult">
          <div class="adult-left">儿童</div>
          <div class="adult-center">￥{{children}}</div>
          <div class="adult-right">
            <div>-</div>
            <input type="text" />
            <div>+</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "book",

  data() {
    return {
      information:
        "喀纳斯景区+禾木风景区三日游【包车自由行,注重游客满意度,拒绝跟团游】",
      time: "2019-09-11",
      adderss: "苏州",
      adult: 310.0,
      children: 110.0,
      name: "张丽丽 (女)",
      namephone: "15536278963",
      IDnumber: "321223190011224547"
    };
  },
  components: {},
  watch: {},
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
@import "book.scss";
</style>
