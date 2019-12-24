<template>
  <div class="integraldetailed">
    <div class="top">
      <div :class="type==1?'itemactive':'item'" @click="itemactivefn(1)">积分收入</div>
      <div class="shu"></div>
      <div :class="type==2?'itemactive':'item'" @click="itemactivefn(2)">积分支出</div>
    </div>
    <div class="noline" v-if="finished && !list.length"><div><img alt src="@/assets/img/Linelist/noline.png"/></div></div>
    <div class="listcontentb">
      <van-list v-if="!finished || list.length" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list" v-for="(item,index) in list" :key="index">
          <div class="left">
            <div class="leftcontent">
              <div class="leftcontent-top">{{item.source | exinType}}</div>
              <div v-if="item.source !==1" class="leftcontent-center">{{item.explain}}</div>
              <div class="leftcontent-bottom">{{item.created_at}}</div>
            </div>
          </div>
          <div v-if="type == 1" class="right">+{{item.num}}积分</div>
          <div v-if="type == 2" class="right">-{{item.num}}积分</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1, //   点击切换
      list: [],
      loading: false,
      finished: false,
      page: 1,
    };
  },
  components: {},
  created(){
      this.$wechat.timeline(false);
  },
  methods: {
    onLoad() {
      this.$api.rewards_point.me(this.page,this.type).then(res => {
        this.page++
        this.loading = false
        if (res.data.length == 0) {
          this.finished = true
        } else {
          this.list = this.list.concat(res.data)
        }
      });
    },
    //   点击切换
    itemactivefn: function(active) {
      this.type = active;
      this.page = 1;
      this.list = []
      this.onLoad()
    },
    // 跳转商家入驻
    applySettledinfn: function() {
      this.$router.push({
        name: "applySettledin"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
