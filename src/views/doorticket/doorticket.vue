<template>
  <div class="doorticket">
    <div class="bannertop">
      <div class="bannertop-left">
        <div>苏州</div>
        <img class="bottom-img" src="../../assets/img/admissionticket/down.png" alt />
      </div>
      <router-link to="/search">
        <div class="bannertop-center">
          <img src="../../assets/img/search/chakan.png" alt />
          <div>大家都在搜索“日本樱花”</div>
        </div>
      </router-link>
    </div>

    <div class="hotlist">
      <div
        class="hotlist-item"
        v-for="(item,indexf) in hotlist"
        :key="indexf"
        @click="doorticketdetailsfn(item.id)"
      >
        <div class="hotitem-top">
          <img :src="item.cover_img" alt />
        </div>
        <div class="hotitem-bottom">
          <div class="hotitem-title">{{item.name}}</div>
          <div class="money">
            <span class="moneysp1">￥</span>
            <span class="moneysp2">{{item.min_price}}</span>
            <span class="moneysp3">起</span>
          </div>
        </div>
      </div>
    </div>
    <div class="and">
      <div class="andtitle">加载更多</div>
      <img src="../../assets/img/Linelist/jiazaixiao.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "doorticket",

  data() {
    return {
      doorticketid: 0,
      // 热门推荐
      hotlist: []
    };
  },
  components: {},
  created() {
    this.getscenic_spotfn();
  },
  methods: {
    //跳转门票详情
    doorticketdetailsfn: function(id) {
      //路由跳转携带参数
      this.$router.push({
        path: `/doorticketdetails/${id}`
      });
    },
    // 请求景点门票列表
    getscenic_spotfn: function() {
      this.$request.get(this.$api.scenic_spot, {}, res => {
        this.hotlist = res.data.data.data;
        console.log(res.data.data.data);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "doorticket.scss";
</style>
