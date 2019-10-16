<template>
  <div class="search">
    <div class="top">
      <div class="topcontent">
        <img src="../../assets/img/search/chakan.png" alt />
        <input class="topinput" type="text" placeholder="大家都在搜索“日本樱花”" />
      </div>
      <router-link to="/home">
        <div class="over">取消</div>
      </router-link>
    </div>
    <div class="bottom">
      <div class="bottom-top">
        <div class="bottom-top-top">
          <div>历史记录</div>
          <img @click="nosearch()" src="../../assets/img/search/shanchu.png" alt />
        </div>
        <div v-show="no==0" class="no">暂无历史记录</div>
        <div class="record">
          <div class="record-item" v-for="(item,index) in search" :key="index">{{item}}</div>
        </div>
      </div>
      <div class="bottom-down">
        <div class="down-top">
          <img src="../../assets/img/search/remai.png" alt />
          <div>热搜推荐</div>
        </div>
        <div class="record">
          <div class="record-item" v-for="(item,indexa) in hot" :key="indexa">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="popup" v-show="isshow==1">
      <div class="content">
        <div class="con-word">是否确认清空历史记录?</div>
        <div class="con-bottom">
          <div class="nook" @click="popup(0)">取消</div>
          <div class="isok" @click="popup(1)">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",

  data() {
    return {
      no: 1, //暂无历史记录显示不显示
      isshow: 0, //清除历史记录弹框显示不显示
      search: [
        "旅游攻略",
        "北京",
        "最值得去的城市",
        "呼和浩特",
        "丝绸之路",
        "敦煌莫高窟"
      ],
      hot: [
        "旅游攻略",
        "北京",
        "最值得去的城市",
        "樱花季",
        "呼和浩特",
        "丝绸之路",
        "敦煌莫高窟",
        "西北沿线",
        "呼和浩特",
        "丝绸之路",
        "敦煌莫高窟",
        "西北沿线"
      ]
    };
  },
  components: {},
  watch: {
    search(newsearch, oldsearch) {
      console.log(newsearch);
      console.log(oldsearch);
      if (newsearch.length == 0) {
        this.no = 0;
      }
    }
  },
  methods: {
    //删除筛选记录
    nosearch: function() {
      this.isshow = 1;
      //   this.search = [];
    },
    //弹框
    popup(x) {
      console.log(x);
      if (x == 1) {
        this.search = [];
        this.isshow = 0;
      } else if (x == 0) {
        this.isshow = 0;
      }
    },
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
@import "search.scss";
</style>
