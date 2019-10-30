<template>
  <div class="travels">
    <div class="release">
      <img src="../../assets/img/Linelist/release.png" alt />
    </div>
    <div
      class="travels-item"
      v-for="(item,indexf) in travelslist"
      :key="indexf"
      @click="doorticketdetailsfn(item.id)"
    >
      <div class="hotitem-top">
        <!-- <div class="top">
          <p>{{item.class}}</p>&nbsp;|&nbsp;
          <p>{{item.add}}</p>
        </div>-->
        <img :src="item.img" alt />
      </div>
      <div class="hotitem-bottom">
        <div class="hotitem-title">{{item.title}}</div>
        <div class="like">
          <div class="like-left">
            <img class="likesp1" :src="item.headerimg" alt />
            <span class="likesp2">{{item.nikename}}</span>
          </div>
          <div class="like-right">
            <img class="likeimg" src="../../assets/img/Linelist/like2.png" alt />
            <span class="likesp3">{{item.like}}</span>
          </div>
        </div>
      </div>
    </div>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "@/components/tab/tab.vue";

export default {
  name: "travels",
  data() {
    return {
      // 热门推荐
      travelslist: [
        {
          id: 0,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 1,
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 1,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-8.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 2,
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 2,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 3,
          title: "【三日游】东海明珠衢山岛两日游 : 漫步沙滩...",
          money: 800
        },
        {
          id: 3,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-8.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 4,
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 4,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 5,
          title: "东海明珠衢山岛两日游",
          money: 800
        },
        {
          id: 5,
          class: "摄影游",
          add: "苏州",
          img: require("../../assets/img/home/1-2.png"),
          headerimg: require("../../assets/img/Linelist/4-10.png"),
          nikename: "爱旅行的小猪",
          like: 6,
          title: "【三日游】东海明珠衢山岛两日游 : 漫步沙滩...",
          money: 800
        }
      ]
    };
  },
  components: {
    Tab
  },
  created() {
    // //实现瀑布流
    // this.waterFall();
  },
  mounted() {
    //实现瀑布流
    // this.waterFall();
  },
  methods: {
    //clientWidth 处理兼容性
    getClient: function() {
      return {
        width:
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
        height:
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight
      };
    },

    //瀑布流效果
    //这里有一个坑（已经修复）：
    //因为是动态加载远程图片，在未加载完全无法获取图片宽高
    //未加载完全就无法设定每一个item(包裹图片)的top。

    //item的top值：第一行：top为0
    //            其他行：必须算出图片宽度在item宽度的缩小比例，与获取的图片高度相乘，从而获得item的高度
    //                   就可以设置每张图片在瀑布流中每块item的top值（每一行中最小的item高度，数组查找）
    //item的left值：第一行：按照每块item的宽度值*块数
    //             其他行：与自身上面一块的left值相等
    waterFall: function() {
      // 1- 确定图片的宽度 - 滚动条宽度
      var pageWidth = this.getClient().width - 8 - 10;
      console.log("页面宽度：" + this.getClient().width);
      var padd =
        $(".travels").css("padding-top") +
        " " +
        $(".travels").css("padding-right") +
        " " +
        $(".travels").css("padding-bottom") +
        " " +
        $(".travels").css("padding-left");
      console.log(padd);
      console.log("页面净宽度：" + pageWidth);
      var columns = 2; //2列
      var itemWidth = parseInt(pageWidth / columns); //得到item的宽度
      console.log("得到item的宽度：" + itemWidth);
      $(".travels-item").width(itemWidth); //设置到item的宽度
      // console.log("得到item的宽度：" + itemWidth);
      var arr = [];

      $(".travels-item").each(function(i) {
        console.log($(this));
        var height = $(this).height();

        var width = $(this).width();
        console.log(i + "元素的宽：" + width + "元素的高" + height);
        var bi = itemWidth / width; //获取缩小的比值
        var boxheight = parseInt(height * bi); //图片的高度*比值 = item的高度

        if (i < columns) {
          // 2- 确定第一行
          $(this).css({
            top: 0,
            left: itemWidth * i
          });
          arr.push(boxheight);
        } else {
          // 其他行
          // 3- 找到数组中最小高度  和 它的索引
          var minHeight = arr[0];
          var index = 0;
          for (var j = 0; j < arr.length; j++) {
            if (minHeight > arr[j]) {
              minHeight = arr[j];
              index = j;
            }
          }
          // 4- 设置下一行的第一个盒子位置
          // top值就是最小列的高度
          $(this).css({
            top: arr[index],
            left: $("travels-item")
              .eq(index)
              .css("left")
          });

          // 5- 修改最小列的高度
          // 最小列的高度 = 当前自己的高度 + 拼接过来的高度
          arr[index] = arr[index] + boxheight;
        }
      });
    },

    //跳转门票详情
    doorticketdetailsfn: function(x) {
      // this.hoteldetailsid = x;
      //把页面要传的参数存到sessionStorage里面
      // sessionStorage.setItem("hoteldetailsid", this.hoteldetailsid);
      //路由跳转携带参数
      this.$router.push({
        name: "hoteldetails",
        params: {
          // hoteldetailsid: this.hoteldetailsid
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "travels.scss";
</style>
