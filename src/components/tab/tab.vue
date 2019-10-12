<template>
  <div class="tab">
    <div class="tabcontent">
      <div class="itembtn"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab",
  components: {}
};
</script>
<style lang="scss" scoped>
.tab {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
}
.tabcontent {
  width: 10rem;
  height: 1rem;
  background:#ffffff;
}
</style>
