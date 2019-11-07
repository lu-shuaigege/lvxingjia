<template>
  <div class="myintegral">
    <div class="top">
      <div class="list" @click="integraldetailedfn()">明细</div>
      <div class="toptitle">{{integral}}</div>
      <div class="balance">累计积分余额</div>
    </div>
    <div class="content">
      <div class="contenttop">
        <div class="contenttop-item">
          <div class="contenttop-item-top">{{allintegral}}</div>
          <div class="contenttop-item-bottom">累积总积分</div>
        </div>
        <div class="contenttop-item">
          <div class="contenttop-item-top">{{overintegral}}</div>
          <div class="contenttop-item-bottom">已兑换积分</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myintegral",
  data() {
    return {
      integral: 5201311, //累计积分余额
      allintegral: 5201311, //累积总积分
      overintegral: 2556542 //已兑换积分
    };
  },
  components: {},
  methods: {
    // 跳转积分明细
    integraldetailedfn: function() {
      this.$router.push({
        name: "integraldetailed"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "myintegral.scss";
</style>
