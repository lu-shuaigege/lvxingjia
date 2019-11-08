<template>
  <div class="addAdministration">
    <div class="top">
      <div class="list">
        <div class="left">姓名</div>
        <div class="right">
          <input type="text" class="right-con" placeholder="请填写" />
        </div>
      </div>
      <div class="list">
        <div class="left">手机号</div>
        <div class="right">
          <input type="text" class="right-con" placeholder="请填写" />
        </div>
      </div>
      <div class="list">
        <div class="left">性别</div>
        <div class="right">
          <div class="right-address">请选择&nbsp;></div>
        </div>
      </div>
      <div class="list">
        <div class="left">证件类型</div>
        <div class="right">
          <div class="right-address">请选择&nbsp;></div>
        </div>
      </div>
      <div class="list">
        <div class="left">证件号码</div>
        <div class="right">
          <input type="text" class="right-con" placeholder="请输入详细地址" />
        </div>
      </div>
    </div>
    <div class="down-btn" @click="oftenpassengerfn()">保存旅客信息</div>
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
    // 跳转新增旅客
    oftenpassengerfn: function() {
      this.$router.push({
        name: "oftenpassenger"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "newaddpassenger.scss";
</style>
