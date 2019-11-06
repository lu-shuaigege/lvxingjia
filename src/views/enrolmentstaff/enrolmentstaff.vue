<template>
  <div class="enrolmentstaff">
    <div class="enrolmentstafflist">
      <div class="listitem" v-for="(item,index) in enrolmentstafflist" :key="index">
        <img :src="item.url" alt />
        <div class="right">
          <div class="right-left">
            <div class="name">{{item.name}}</div>
            <div class="time">{{item.time}}</div>
          </div>
          <div class="right-right">
            <div class="num">购买数量：</div>
            <span>{{item.num}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "enrolmentstaff",

  data() {
    return {
      enrolmentstafflist: [
        {
          id: 0,
          url: require("../../assets/img/home/1-banner.png"),
          name: "张大仙",
          time: "2019/9/8 12:11:22",
          num: 4
        },
        {
          id: 0,
          url: require("../../assets/img/home/1-banner.png"),
          name: "张大仙",
          time: "2019/9/8 12:11:22",
          num: 4
        },
        {
          id: 0,
          url: require("../../assets/img/home/1-banner.png"),
          name: "张大仙",
          time: "2019/9/8 12:11:22",
          num: 4
        }
      ]
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
@import "enrolmentstaff.scss";
</style>
