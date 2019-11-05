<template>
  <div class="modifynikename">
    <div class="top">
      <div class="top-left">昵称</div>
      <div class="top-right">
        <input type="text" />
        <img src="../../assets/img/my/no.png" alt />
      </div>
    </div>
    <div class="ok" @click="okfn()">保存</div>
  </div>
</template>

<script>
export default {
  name: "modifynikename",
  data() {
    return {
      nikename: "请输入昵称"
    };
  },
  components: {},
  methods: {
    okfn: function() {
      this.$router.push({
        name: "myinformation"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "modifynikename.scss";
</style>
