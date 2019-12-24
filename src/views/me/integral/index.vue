<template>
  <div class="myintegral">
    <div class="top">
      <div class="list" @click="routerLink('/me/show')">明细</div>
      <div class="toptitle">{{list.surplus}}</div>
      <div class="balance">累计积分余额</div>
    </div>
    <div class="content">
      <div class="contenttop">
        <div class="contenttop-item">
          <div class="contenttop-item-top">{{list.total}}</div>
          <div class="contenttop-item-bottom">累积总积分</div>
        </div>
        <div class="contenttop-item">
          <div class="contenttop-item-top">{{list.used}}</div>
          <div class="contenttop-item-bottom">已兑换积分</div>
        </div>
        <div class="contenttop-item">
          <div class="contenttop-item-top">{{list.froze}}</div>
          <div class="contenttop-item-bottom">已冻结积分</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[]
    };
  },
  components: {},
  created() {
      this.$wechat.timeline(false);
    this.getList()
  },
  methods: {
    getList: function() {
      this.$api.rewards_point.statistic().then(res => {
        this.list = res
      });
    },
  }
};
</script>
<style lang="scss" scoped>@import "index";</style>
