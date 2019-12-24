<template>
  <div class="footer">
    <div class="foot">
      <router-link
        v-for="(item,i) in footnavs"
        :key="i"
        :to="item.to"
        :class="{'selected':($route.meta.nav_index==item.nav_index)}"
      >
        <div class="imgdiv">
          <img
            class="btnimg"
            :src="$route.meta.nav_index==item.nav_index?item.selected:item.no_selected"
            alt
          />
        </div>
        <span :class="[$route.meta.nav_index==item.nav_index?'okspan':'nospan']">{{item.name}}</span>
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
          no_selected: require("@/assets/img/home/home1.png"),
          selected: require("@/assets/img/home/home2.png"),
          nav_index: 1
        },
        {
          to: "/travels",
          name: "游记",
          no_selected: require("@/assets/img/home/travels1.png"),
          selected: require("@/assets/img/home/travels2.png"),
          nav_index: 2
        },
        {
          to: "/orders",
          name: "订单",
          no_selected: require("@/assets/img/home/order1.png"),
          selected: require("@/assets/img/home/order2.png"),
          nav_index: 3
        },
        {
          to: "/me",
          name: "我的",
          no_selected: require("@/assets/img/home/my1.png"),
          selected: require("@/assets/img/home/my2.png"),
          nav_index: 4
        }
      ]
    };
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 1.32rem;
  margin-top: 12px;
  .foot {
    width: 100%;
    height: 1.32rem;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    // padding: 10px 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 16px 0px rgba(192, 192, 192, 0.4);
    .router-link-active {
      color: #08c75e;
    }
    a {
      width: 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0px;
      .imgdiv {
        // width: 0.52rem;
        // height: 0.533rem;
        width: 0.55rem;
        height: 0.533rem;
        margin: 0 0 0.173rem 0;
        .btnimg {
          width: 100%;
          height: 100%;
        }
      }

      span {
        font-size: 0.29rem;
        line-height: 0.29rem;
        font-family: 微软雅黑;
        color: rgba(102, 102, 102, 1);
      }
      .okspan {
        font-size: 0.29rem;
        line-height: 0.29rem;
        color: #08c75e;
      }
      .nospan {
        font-size: 0.29rem;
        line-height: 0.29rem;
        color: #666666;
      }
      &.selected {
        img {
          width: 0.507rem;
          height: 0.48rem;
        }
      }
    }
  }
}
</style>


