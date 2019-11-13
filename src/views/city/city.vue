<template>
  <div class="city">
    <div class="defaultcity">
      <div class="defaultcity-title">默认城市</div>
      <div class="defaultcity-item">苏州市</div>
    </div>
    <div class="content">
      <div class="citylist" v-for="(item,index) in citylist" :key="index">
        <i :id="item[0].chart"></i>
        <div class="title" re>{{item[0].chart}}</div>

        <div
          class="list-item"
          @click="cityid(itema.id)"
          v-for="(itema,indexa) in item"
          :key="indexa"
        >{{itema.name}}</div>
      </div>
    </div>

    <div class="rightlist">
      <div class="alist" v-for="(itemx,indexx) in a" :key="indexx">
        <div href="#" @click="anchor(itemx)">{{itemx}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "city",

  data() {
    return {
      citylist: {},
      a: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  components: {},
  created() {
    this.getcitiesfn();
  },
  mounted() {},
  methods: {
    //锚点定位
    anchor: function(anchorname) {
      document.querySelector("#" + anchorname + "").scrollIntoView(true);
    },
    //点击选择地址
    cityid: function(cityid) {
      console.log(cityid);
    },

    //跳转首页
    peripheryfn: function(x) {
      //把页面要传的参数存到sessionStorage里面
      sessionStorage.setItem("peripheryid", this.peripheryid);
      //路由跳转携带参数
      this.$router.push({
        name: "periphery",
        params: {
          peripheryid: this.peripheryid
        }
      });
    },
    // 获取城市列表
    getcitiesfn: function() {
      let url = this.$api.cities;
      let params = {
        name: 1223
      };
      this.$request.get(url, params, res => {
        this.citylist = res.data.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "city.scss";
</style>
