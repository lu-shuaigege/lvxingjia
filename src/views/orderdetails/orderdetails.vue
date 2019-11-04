<template>
  <div class="orderdetails">
      <div class="top">

      </div>
  </div>
</template>

<script>

export default {
  name: "orderdetails",
  data() {
    return {
      topbtnactive: 0,
      orderlist: [
        {
          ordernumber: 123123456,
          zhuangtai: 0,
          title: "登山杖碳素超轻超短伸",
          date: "9月29日",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        },
        {
          ordernumber: 123123456,
          zhuangtai: 1,
          title:
            ".登山杖碳素超轻超短伸登山杖碳素超轻登山杖碳素超轻超短伸登山杖碳素超轻",
          date: "9月29日",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        },
        {
          ordernumber: 123123456,
          zhuangtai: 2,
          title: "登山杖碳素超轻超短伸",
          date: "9月29日",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        },
        {
          ordernumber: 123123456,
          zhuangtai: 3,
          title: "登山杖碳素超轻超短伸登山杖碳素超轻...",
          date: "9月29日",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        },
        {
          ordernumber: 123123456,
          zhuangtai: 4,
          title: "登山杖碳素超轻超短伸",
          date: "9月29日",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        },
        {
          ordernumber: 123123456,
          zhuangtai: 0,
          title: "登山杖碳素超轻超短伸登山杖碳素超轻...",
          date: "9月29日",
          chengren: 2,
          ertong: 1,
          money: 298.0,
          img: require("../../assets/img/home/1-2.png")
        }
      ]
    };
  },
  methods: {
    topbtnactivefn: function(x) {
      this.topbtnactive = x;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "orderdetails.scss";
</style>
