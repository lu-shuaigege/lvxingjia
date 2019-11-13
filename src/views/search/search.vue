<template>
  <div class="search">
    <div class="top">
      <div class="topcontent">
        <img src="../../assets/img/search/chakan.png" alt />
        <input
          @click="searchfn()"
          v-model="searchword"
          class="topinput"
          type="text"
          placeholder="大家都在搜索“日本樱花”"
        />
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
          <div class="record-item" v-for="(item,indexa) in hot" :key="indexa">{{item.keywords}}</div>
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
      search: [],
      hot: [],
      searchword: ""
    };
  },
  components: {},
  watch: {
    search(newsearch, oldsearch) {
      if (newsearch.length == 0) {
        this.no = 0;
      }
    }
  },
  created() {
    this.search = JSON.parse(localStorage.getItem("searchword"));
    console.log(this.search);
    if (this.search.length == 0) {
      this.no = 0;
    }
    this.getkeywordsfn();
  },
  methods: {
    //删除筛选记录
    nosearch: function() {
      this.isshow = 1;
      //   this.search = [];
    },
    //手机键盘回车搜索
    searchfn: function() {
      let that = this;
      $(".topinput").on("keypress", function(e) {
        var keycode = e.keyCode;
        var searchName = $(this).val();
        if (keycode == "13") {
          that.search.unshift(that.searchword);
          localStorage.setItem("searchword", JSON.stringify(that.search));
          that.search = JSON.parse(localStorage.getItem("searchword"));
          let arr = that.search;
          if (arr.length > 5) {
            that.search = arr.slice(0, -1);
          }
          //请求搜索接口
        }
      });
    },
    //弹框
    popup(x) {
      if (x == 1) {
        this.search = [];
        this.isshow = 0;
      } else if (x == 0) {
        this.isshow = 0;
      }
    },
    // 请求热搜关键词
    getkeywordsfn: function() {
      this.$request.get(this.$api.keywords, {}, res => {
        this.hot = res.data.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "search.scss";
</style>
