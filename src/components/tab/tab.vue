<template>
  <div class="footer">
    <div class="foot">
      <router-link
        v-for="(item,i) in footnavs"
        :key="i"
        :to="item.to"
        :class="{'selected':($route.meta.nav_index==item.nav_index)}"
      >
        <img :src="$route.meta.nav_index==item.nav_index?item.selected:item.no_selected" alt />
        <span v-show="!($route.meta.nav_index==item.nav_index)">{{item.name}}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      footnavs: [
        {
          to: "/",
          name: "首页",
          no_selected: require("../../assets/img/home/home1.png"),
          selected: require("../../assets/img/home/home2.png"),
          nav_index: 1
        },
        {
          to: "/travels",
          name: "游记",
          no_selected: require("../../assets/img/home/travels1.png"),
          selected: require("../../assets/img/home/travels2.png"),
          nav_index: 2
        },
        {
          to: "/order",
          name: "订单",
          no_selected: require("../../assets/img/home/order1.png"),
          selected: require("../../assets/img/home/order2.png"),
          nav_index: 3
        },
        {
          to: "/my",
          name: "我的",
          no_selected: require("../../assets/img/home/my1.png"),
          selected: require("../../assets/img/home/my2.png"),
          nav_index: 3
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.footer {
  width: 100%;
  height: 98px;
  margin-top: 12px;
  .foot {
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 16px 0px rgba(192, 192, 192, 0.4);

    a {
      width: 33%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      img {
        width: 47px;
        height: 47px;
      }
      span {
        font-size: 28px;
        color: rgba(102, 102, 102, 1);
      }
      &.selected {
        img {
          width: 85px;
          height: 85px;
        }
      }
    }
  }
}
</style>


