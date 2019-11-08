<template>
  <div class="harvestaddress">
    <div class="listcontent" v-if="ishaveaddress!=0">
      <div class="list" v-for="(item,index) in addresslist" :key="index">
        <div class="listleft">
          <div class="lefta">
            <img src="../../assets/img/my/edit.png" alt />
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
          <div class="rightb" @click="delfn()">
            <img src="../../assets/img/my/del.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="down-btn" v-if="ishaveaddress!=0" @click="addfn()">+新建地址</div>
    <div class="popup" v-show="isshow==1">
      <div class="content">
        <div class="con-word">确认删除该地址吗?</div>
        <div class="con-bottom">
          <div class="nook" @click="popup(0)">取消</div>
          <div class="isok" @click="popup(1)">确认</div>
        </div>
      </div>
    </div>
    <div class="nohave" v-if="ishaveaddress==0">
      <div class="top">
        <img src="../../assets/img/my/passengerimg.png" alt />
      </div>
      <div class="newaddress-btn" @click="newaddressfn()">
        <img src="../../assets/img/my/plusicon.png" alt />新建旅客
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "harvestaddress",
  data() {
    return {
      active: 0,
      isshow: 0, //清除历史记录弹框显示不显示
      ishaveaddress: 0,
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
  created() {
    if (this.addresslist.length == 0) {
      this.ishaveaddress = 0;
    } else if (this.addresslist.length != 0) {
      this.ishaveaddress = 1;
    }
  },
  components: {},
  methods: {
    activefn: function(activeid) {
      this.active = activeid;
    },
    // 跳转新增地址
    addfn: function() {
      this.$router.push({
        name: "addAdministration"
      });
    },
    // 跳转新增地址
    newaddressfn: function() {
      this.$router.push({
        name: "newaddpassenger"
      });
    },
    //删除
    delfn: function() {
      this.isshow = 1;
      //   this.search = [];
    },
    //弹框
    popup(x) {
      if (x == 1) {
        this.search = [];
        this.isshow = 0;
      } else if (x == 0) {
        this.isshow = 0;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "oftenpassenger.scss";
</style>
