<template>
    <div class="applypartners">
    <div class="tips">信息仅用于审核,绝不外泄</div>
    <div class="top">
      <div class="toplist">
        <div class="title">姓名</div>
        <input
          type="text"
          class="toplist-right"
          placeholder="请填写姓名"
          v-model="name"
          onkeyup = "value = value.replace(/[^\u4E00-\u9FA5]/g,'')"
        />
      </div>
      <div class="toplist">
        <div class="title">手机号</div>
        <input type="number" class="toplist-right" placeholder="请填写手机号" v-model="mobile" oninput = "if(value.length>11)value=value.slice(0,11)" />
      </div>
      <div class="toplist">
        <div class="title">身份证</div>
        <input type="text" class="toplist-right" placeholder="请填写身份证" v-model="id_card" oninput = "if(value.length>18)value=value.slice(0,18)"/>
      </div>
    </div>
    <div class="center">
      <div class="center-item">
        <!--<img class="img" src="@/assets/img/my/branchoffice.png" alt />-->
        <!--<div class="camara-btn">拍照/上传照片</div>-->
        <van-uploader v-model="positive" :after-read="upLoadcard" :max-count="1">
          <img class="img"  v-show="this.positive == ''"  src="@/assets/img/my/sfzzm.png" alt />
          <img class="img"  v-show="this.positive != ''"  :src="headimgurl + this.fileimg" alt>
          <div class="center-tittle">身份证正面</div>
          <van-button type="primary" class="uploadbutton">拍照/上传照片</van-button>
        </van-uploader>
      </div>
      <div class="center-item">
        <!--<img class="img" src="@/assets/img/my/branchoffice.png" alt />-->
        <van-uploader v-model="back" :after-read="upLoadcard1" :max-count="1">
          <img class="img" v-show="this.back == ''"  src="@/assets/img/my/sfzfm.png" alt />
          <img class="img" v-show="this.back != ''"  :src="headimgurl + this.fileimg1" alt>
          <div class="center-tittle">身份证反面</div>
          <van-button class="center-button uploadbutton" type="primary">拍照/上传照片</van-button>
        </van-uploader>
      </div>
    </div>
    <div class="bottom">
      <div class="toplist">
        <div class="title">开户行</div>
        <input type="text" class="toplist-right" placeholder="请填写开户行" v-model="bank" />
      </div>
      <div class="toplist">
        <div class="title">开户名</div>
        <input type="text" class="toplist-right" placeholder="请填写开户名" v-model="bank_account_name" />
      </div>
      <div class="toplist">
        <div class="title">银行卡账号</div>
        <input type="number" class="toplist-right" placeholder="请填写银行卡账号" v-model="bank_account" oninput = "if(value.length>16)value=value.slice(0,16)"/>
      </div>
    </div>
    <div class="agreement">
      <yd-checkbox-group v-model="checkboxa">
        <yd-checkbox shape="circle">
          <span></span>
        </yd-checkbox>
      </yd-checkbox-group>
      <div :class="checkboxa == false ? 'read' : 'readactive'" @click="agreementwordfn()">
        <span v-show="checkboxa != false">已</span>阅读入驻协议
      </div>
    </div>
    <div class="down-btn" @click="submitauditfn()">提交</div>
  </div>
</template>

<script>
export default {
    name: "applypartners",
     data() {
        return {
            headimgurl:process.env.VUE_APP_IMGURL,
            checkboxa: ["0"],
            positive: [],
            back: [],
            business_license: [],
            name:'',
            type:2,
            id_card:'',
            bank_account:'',
            bank_account_name:'',
            bank:'',
            status:0,
            mobile:'',
            fileimg:"",
            fileimg1:"",
            fileimg2:""
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.echo();
    },
    methods: {
        upLoadcard(file) {
            var formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                this.fileimg = res.data.image_url
            });
        },
         upLoadcard1(file) {
            var formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                this.fileimg1 = res.data.image_url
            });
        },
         upLoadcard2(file) {
            var formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                this.fileimg2 = res.data.image_url
            });
        },
          echo(){
          this.$api.settled_in.show(2).then(res => {
          this.type = res.type;
          this.name = res.name;
          this.mobile = res.mobile;
          this.id_card = res.id_card;
          this.positive = this.headimgurl + this.fileimg;
          this.back
          this.bank = res.bank;
          this.bank_account_name = res.bank_account_name;
          this.bank_account = res.bank_account;
          this.status = 0;
          this.can_apply = "";
      })
    },
        //跳转发布线路下一步
        releaselinenextfn: function() {
            this.$router.push({
                name: "releaselinenext"
            });
        },
        //跳转套餐设置
        setmenufn: function() {
            this.$router.push({
                name: "setmenu"
            });
        },

        //跳转等待审核
        submitauditfn: function() {
            this.positive = this.headimgurl + this.fileimg;
           this.back = this.headimgurl + this.fileimg1;
      if (this.checkboxa != 0 && this.name != "" && this.mobile != "" && this.id_card != "" && this.positive != "" && this.back != ""  && this.bank != "" && this.bank_account_name != "" && this.bank_account != "") {
        this.$api.settled_in
          .store(
            this.type,
            this.name,
            this.mobile,
            this.id_card,
            this.positive,
            this.back,
            this.bank,
            this.bank_account_name,
            this.bank_account,
            this.status
          )
          .then(res => {});
        this.$router.push({
          path: "submitaudit"
        });
      }else{
       this.$toast("请填写完整资料");
      }
        },

        //跳转协议内容
        agreementwordfn: function() {
            this.$router.push({
                path: "agreementword"
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "applypartners.scss";
</style>
