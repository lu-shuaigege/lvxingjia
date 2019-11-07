<template>
  <div class="harvestaddress">
    <div class="listcontent">
      <div class="list" v-for="(item,index) in addresslist" :key="index">
        <div class="listleft">
          <div class="lefta">
            <img
              @click="activefn(index)"
              v-if="active!=index"
              src="../../assets/img/my/noactive.png"
              alt
            />
            <img
              @click="activefn(item.id)"
              v-if="active==index"
              src="../../assets/img/my/isactive.png"
              alt
            />
          </div>
          <div class="leftb">
            <div class="leftb-top">
              <div class="name">{{item.name}}</div>
              <div class="gender">
                <img v-if="item.gender==0" src="../../assets/img/my/man.png" alt />
                <img v-if="item.gender==1" src="../../assets/img/my/woman.png" alt />
              </div>
              <div class="tel">{{item.tel}}</div>
            </div>
            <div class="leftb-bottom">{{item.address}}</div>
          </div>
        </div>

        <div class="right">
          <div class="righta">
            <img src="../../assets/img/my/edit.png" alt />
          </div>
          <div class="rightb">
            <img src="../../assets/img/my/del.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="down-btn">+新建地址</div>
  </div>
</template>

<script>
export default {
  name: "harvestaddress",
  data() {
    return {
      active: 0,
      addresslist: [
        {
          id: 0,
          name: "张小三",
          gender: 0,
          tel: "17954887458",
          address: "江苏省苏州市相城区繁华中心创新"
        },

        {
          id: 1,
          name: "张小三",
          gender: 1,
          tel: "17954887458",
          address: "江苏省苏州市相城区繁华中心创新"
        },
        {
          id: 2,
          name: "张小三",
          gender: 0,
          tel: "17954887458",
          address: "江苏省苏州市相城区繁华中心创新"
        },
        {
          id: 3,
          name: "张小三",
          gender: 0,
          tel: "17954887458",
          address: "江苏省苏州市相城区繁华中心创新"
        },
        {
          id: 4,
          name: "张小三",
          gender: 1,
          tel: "17954887458",
          address: "江苏省苏州市相城区繁华中心创新"
        }
      ]
    };
  },
  components: {},
  methods: {
    activefn: function(activeid) {
      this.active = activeid;
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
@import "harvestaddress.scss";
</style>
