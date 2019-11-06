<template>
  <div class="myinformation">
    <yd-button class="headportrait-btn" @click.native="showa = true"></yd-button>
    <input type="file" accept="image/*" capture="camera" class="camera" />
    <input type="file" accept="image/*" class="imgfile" />
    <div class="headportrait">
      <div class="headportrait-left">头像</div>
      <div class="headportrait-right">
        <img :src="img" class="headportrait-right-img" alt />
        <img src="../../assets/img/my/right.png" class="headportrait-right-imgright" alt />
      </div>
    </div>

    <div class="myinformation-list">
      <div class="headportrait-left">联系方式</div>
      <div class="headportrait-right">
        <div class="word">{{tel}}</div>
      </div>
    </div>
    <div class="myinformation-list" @click="nikenamefn()">
      <div class="headportrait-left">昵称</div>
      <div class="headportrait-right">
        <div class="word">{{nikename}}</div>
      </div>
    </div>
    <yd-button class="gender-btn" @click.native="showb = true"></yd-button>
    <div class="myinformation-list">
      <div class="headportrait-left">性别</div>
      <div class="headportrait-right">
        <div class="word">{{gender}}</div>
        <img src="../../assets/img/my/right.png" class="headportrait-right-imgright" alt />
      </div>
    </div>
    <div class="myinformation-list">
      <div class="headportrait-left">出生年月</div>
      <div class="headportrait-right">
        <yd-datetime
          placeholder="请选择出生年月"
          start-year="1950"
          class="word"
          type="date"
          v-model="date"
        ></yd-datetime>
        <!-- <div class="word">{{date}}</div> -->
        <img src="../../assets/img/my/right.png" class="headportrait-right-imgright" alt />
      </div>
    </div>
    <div class="myinformation-list">
      <div class="headportrait-left">常住地址</div>
      <div class="headportrait-right">
        <div class="word">{{adderss}}</div>
        <img src="../../assets/img/my/right.png" class="headportrait-right-imgright" alt />
      </div>
    </div>
    <div class="myinformation-list">
      <div class="headportrait-left">详细地址</div>
      <div class="headportrait-right">
        <input class="word" v-model="adderssa" type="text" placeholder="请填写详细地址" />
      </div>
    </div>
    <div class="okmyinformation" @click="okmyfn()">保存</div>
    <yd-actionsheet :items="myItemsa" v-model="showa" cancel="取消"></yd-actionsheet>
    <yd-actionsheet :items="myItemsb" v-model="showb" cancel="取消"></yd-actionsheet>
  </div>
</template>

<script>
export default {
  name: "myinformation",
  data() {
    return {
      nikename: "请输入昵称",
      gender: "女",
      date: "1990-08-08",
      adderss: "请选择常住地址",
      adderssa:"",
      tel: "15511111111",
      money: "10000.00",
      jifen: 1111400,
      img: require("../../assets/img/my/fensi.png"),
      showa: false,
      showb: false,
      myItemsa: [
        {
          label: "拍照",
          callback: () => {
            $(".camera").click();
            // this.$dialog.toast({ mes: "咔擦，此人太帅！" });
            /* 注意： callback: function() {} 和 callback() {}  这样是无法正常使用当前this的 */
          }
        },
        {
          label: "从相册中偷取",
          callback: () => {
            $(".imgfile").click();
            // this.$dialog.toast({ mes: "看到了不该看到的东西！" });
          }
        }
      ],
      myItemsb: [
        {
          label: "男",
          callback: () => {
            this.gender = "男";
          }
        },
        {
          label: "女",
          callback: () => {
            this.gender = "女";
          }
        }
      ]
    };
  },
  components: {},
  methods: {
    //点击保存跳转我的页面
    okmyfn: function() {
      this.$router.push({
        name: "my"
      });
    },
    // 跳转改变昵称
    nikenamefn: function() {
      this.$router.push({
        name: "modifynikename"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "myinformation.scss";
</style>
