<template>
  <div class="agreementword">
    <div class="list" v-for="(item,index) in word" :key="index">
      <div class="top">
        <div class="shu"></div>
        <div class="title">{{item.title}}</div>
      </div>
      <div class="content" v-html="item.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "agreementword",
  data() {
    return {
      word: [
        {
          title: "一、总则",
          content: `1.1 XXX的所有权和运营权归公司名称公司所有。<br>1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与XXX之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。 `
        },
        {
          title: "二、服务内容",
          content: `2.1 XXX的具体内容由本站根据实际情况提供。<br>2.2 本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。`
        },
        {
          title: "三、用户帐号",
          content: `3.1 经本站注册系统完成注册程序并通过身份认证的用户即成为正式用户，可以获得本站规定用户所应享有的一切权限；未经认证仅享有本站规定的部分会员权限。XXX有权对会员的权限设计进行变更。<br>3.2 用户只能按照注册要求使用真实姓名，及身份证号注册。用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。`
        }
      ]
    };
  },
  components: {},
  methods: {
    //axios请求
    pagination: function() {
      this.$api.get(
        "cases",
        {
          page: this.page,
          per_page: 12
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            let data = response.data.data.data;
            for (var index in data) {
              this.imglist.push(data[index]);
            }

            this.total = response.data.data.total;
            this.display = response.data.per_page;
            this.current_page = response.data.current_page;
            this.last_page = response.data.last_page;
            if (this.current_page == this.last_page) {
              this.updown = "- 我也是有底线的 -";
            }
          } else {
          }
        }
      );
    },
    //跳转我的首页
    myfn: function() {
      this.$router.push({
        name: "my"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "agreementword.scss";
</style>
