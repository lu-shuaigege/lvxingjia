<template>
  <div class="addAdministration">
    <div class="top">
      <div class="list">
        <div class="left">收货人</div>
        <div class="right">
          <input type="text" class="right-con" placeholder="请填写" />
        </div>
      </div>
      <div class="list">
        <div class="left">联系方式</div>
        <div class="right">
          <input type="text" class="right-con" placeholder="请填写" />
        </div>
      </div>
      <div class="list">
        <div class="left">所在地区</div>
        <div class="right">
          <div class="right-address">请选择&nbsp;></div>
        </div>
      </div>
      <div class="list">
        <div class="left">详细地址</div>
        <div class="right">
          <input type="text" class="right-con" placeholder="请输入详细地址" />
        </div>
      </div>
      <div class="list">
        <div class="left">默认地址</div>
        <div class="right">
          <yd-switch class="switcha" size="small" v-model="switcha"></yd-switch>
        </div>
      </div>
    </div>
    <div class="down-btn" @click="harvestaddressfn()">保存地址</div>
  </div>
</template>

<script>
export default {
  name: "addAdministration",
  data() {
    return {
      active: 0,
      switcha: false
    };
  },
  components: {},
  methods: {
    activefn: function(activeid) {
      this.active = activeid;
    },
    // 跳转收货地址列表
    harvestaddressfn: function() {
      this.$router.push({
        name: "harvestaddress"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "addAdministration.scss";
</style>
