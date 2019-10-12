<template>
  <div class="home">
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "@/components/tab/tab.vue";

export default {
  name: "home",
  components: {
    Tab
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 10rem;
  height: 100vh;
  background: rgb(243, 243, 243);
}
</style>
