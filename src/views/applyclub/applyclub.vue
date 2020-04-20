<template>
    <div class="applyclub">
        <div class="tips">信息仅用于审核,绝不外泄</div>
        <div class="top">
            <van-uploader :after-read="uploadFmImg" class="upload-fm"></van-uploader>
            <div class="headportrait">
                <div class="headportrait-left title">上传俱乐部Logo或个人头像</div>
                <div class="headportrait-right">
                    <img v-if="logo" :src="headimgurl+logo" class="headportrait-right-img" />
                    <img
                        v-if="!logo"
                        src="@/assets/img/Linelist/defaulthead.png"
                        class="headportrait-right-img"
                    />
                    <img src="@/assets/img/my/right.png" class="headportrait-right-imgright" />
                </div>
            </div>
            <div class="toplist">
                <div class="title">公司名称</div>
                <input type="text" class="toplist-right" placeholder="请填写俱乐部或旅行社名称" v-model="name" />
            </div>
            <div class="toplist">
                <div class="title">手机号</div>
                <input
                    type="number"
                    class="toplist-right"
                    placeholder="请填写手机号"
                    v-model="mobile"
                    oninput="if(value.length>11)value=value.slice(0,11)"
                />
            </div>
            <div class="toplist">
                <div class="title">身份证</div>
                <input
                    type="text"
                    class="toplist-right"
                    placeholder="请填写身份证"
                    v-model="id_card"
                    oninput="if(value.length>18)value=value.slice(0,18)"
                />
            </div>
        </div>
        <div class="center">
            <div class="center-item">
                <van-uploader :after-read="idpositive" :max-count="1">
                    <img class="img" v-show="positive == ''" src="@/assets/img/my/sfzzm.png" />
                    <img class="img" v-show="positive != ''" :src="headimgurl + this.positive" />
                    <div class="center-tittle">身份证正面</div>
                    <van-button type="primary" class="uploadbutton">拍照/上传照片</van-button>
                </van-uploader>
            </div>
            <div class="center-item">
                <van-uploader :after-read="idback" :max-count="1">
                    <img class="img" v-show="back == ''" src="@/assets/img/my/sfzfm.png" />
                    <img class="img" v-show="back != ''" :src="headimgurl + this.back" />
                    <div class="center-tittle">身份证反面</div>
                    <van-button class="center-button uploadbutton" type="primary">拍照/上传照片</van-button>
                </van-uploader>
            </div>
        </div>
        <div class="centerb" v-if="type != 2">
            <van-uploader :after-read="id_business_license" :max-count="1">
                <img
                    class="centerb-img"
                    v-show="this.business_license == ''"
                    src="@/assets/img/my/add.png"
                />
                <img
                    class="centerb-img"
                    v-show="this.business_license != ''"
                    :src="headimgurl + this.business_license"
                />
            </van-uploader>
        </div>
        <div class="bottom">
            <div class="toplist">
                <div class="title">开户人</div>
                <input type="text" class="toplist-right" placeholder="请填写开户人姓名" v-model="bank" />
            </div>
            <div class="toplist">
                <div class="title">开户银行</div>
                <input
                    type="text"
                    class="toplist-right"
                    placeholder="请填写开户银行支行全称"
                    v-model="bank_account_name"
                />
            </div>
            <div class="toplist">
                <div class="title">银行卡账号</div>
                <input
                    type="number"
                    class="toplist-right"
                    placeholder="请填写银行卡账号"
                    v-model="bank_account"
                    oninput="if(value.length>19)value=value.slice(0,19)"
                />
            </div>
        </div>
        <div class="agreement">
            <yd-checkbox-group v-model="checkboxa" class="circle">
                <yd-checkbox shape="circle">
                    <span></span>
                </yd-checkbox>
            </yd-checkbox-group>
            <div :class="checkboxa == false ? 'read' : 'readactive'" @click="agreementwordfn()">
                <span v-show="checkboxa != false">已</span>阅读入驻协议
            </div>
        </div>
        <div class="down-btn" @click="apply()">提交</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            headimgurl: process.env.VUE_APP_IMGURL, //图片地址前缀
            align: false, //上一次申请状态
            checkboxa: ["0"], //是否已阅读入住协议
            positive: "", //身份证正面
            back: "", //身份证反面
            business_license: "", //营业执照
            type: "", //申请类型
            name: "", //姓名
            logo: "", //logo
            mobile: "", //手机号
            id_card: "", //身份证号
            bank: "", //开户行
            bank_account_name: "", //开户名
            bank_account: "", //开户账号
            status: "", //审核状态
            can_apply: "", //是否可申请状态
            again: "" //是否是重新申请
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.type = this.$route.query.type;
        this.again = this.$route.query.again;
        this.echo();
        if (Object.keys(this.$store.state.settledin).length !== 0) {
            this.positive = this.$store.state.settledin.positive;
            this.back = this.$store.state.settledin.back;
            this.business_license = this.$store.state.settledin.business_license;
            this.type = this.$store.state.settledin.type;
            this.logo = this.$store.state.settledin.logo;
            this.name = this.$store.state.settledin.name;
            this.mobile = this.$store.state.settledin.mobile;
            this.id_card = this.$store.state.settledin.id_card;
            this.bank = this.$store.state.settledin.bank;
            this.bank_account_name = this.$store.state.settledin.bank_account_name;
            this.bank_account = this.$store.state.settledin.bank_account;
        }
    },
    methods: {
        // 上传logo
        uploadFmImg(file) {
            var formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                this.logo = res.data.image_url;
            });
        },
        //上传身份证正面
        idpositive(file) {
            var formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                this.positive = res.data.image_url;
            });
        },
        //上传身份证反面
        idback(file) {
            var formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                this.back = res.data.image_url;
            });
        },
        //上传营业执照
        id_business_license(file) {
            var formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                this.business_license = res.data.image_url;
            });
        },
        //跳转协议内容
        agreementwordfn: function() {
            let data = {
                positive: this.positive,
                back: this.back,
                business_license: this.business_license,
                type: this.type,
                logo: this.logo,
                name: this.name,
                mobile: this.mobile,
                id_card: this.id_card,
                bank: this.bank,
                bank_account_name: this.bank_account_name,
                bank_account: this.bank_account
            };
            this.$store.commit("settledin", data);
            this.$router.push({
                path: "agreementword"
            });
        },
        //提交申请
        apply() {
            if (this.logo == "" || this.logo == undefined) {
                this.$toast("请上传logo");
                return;
            }
            if (this.name == "" || this.name == undefined) {
                this.$toast("请填写姓名");
                return;
            }
            if (this.mobile == "") {
                this.$toast("请填写手机号");
                return;
            }
            if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
                this.$toast("请输入正确的手机号");
                return;
            }
            if (this.id_card == "") {
                this.$toast("请填写身份证号");
                return;
            }
            if (
                !/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(
                    this.id_card
                )
            ) {
                this.$toast("请输入正确的证件号码");
                return;
            }
            if (this.positive == "") {
                this.$toast("请上传身份证正面");
                return;
            }
            if (this.back == "") {
                this.$toast("请上传身份证反面");
                return;
            }
            if (this.business_license == "" && this.type != 2) {
                this.$toast("请上传营业执照");
                return;
            }
            if (this.bank == "" || this.bank == undefined) {
                this.$toast("请填写开户行");
                return;
            }
            if (
                this.bank_account_name == "" ||
                this.bank_account_name == undefined
            ) {
                this.$toast("请填写开户名");
                return;
            }
            if (this.bank_account == "" || this.bank_account == undefined) {
                this.$toast("请填写开户账号");
                return;
            }
            if (this.checkboxa[1] != false) {
                this.$toast("请勾选阅读入驻协议");
                return;
            }
            this.$api.settled_in
                .store(
                    this.type,
                    this.name,
                    this.mobile,
                    this.id_card,
                    this.positive,
                    this.back,
                    this.business_license,
                    this.bank,
                    this.bank_account_name,
                    this.bank_account,
                    "",
                    this.logo
                )
                .then(res => {
                    this.$router.push({
                        path: "submitaudit"
                    });
                });
        },
        // 获取上一次申请状态和数据
        applyold() {
            this.$api.settled_in.show().then(res => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].can_apply == 3) {
                        this.positive = res[i].positive;
                        this.back = res[i].back;
                        if (res[i].business_license) {
                            this.business_license = res[i].business_license;
                        }
                        // this.type = res[i].type;
                        if (res[i].logo) {
                            this.logo = res[i].logo;
                        }
                        this.name = res[i].name;
                        this.mobile = res[i].mobile;
                        this.id_card = res[i].id_card;
                        this.bank = res[i].bank;
                        this.bank_account_name = res[i].bank_account_name;
                        this.bank_account = res[i].bank_account;
                    }
                }
            });
        },
        //获取上次全部的申请数据
        echo() {
            this.$api.settled_in.show(this.type).then(res => {
                this.applyold();
                if (res.status == 0) {
                    this.$router.push({
                        path: "submitaudit"
                    });
                    return;
                }
                if (res.status == 1 || res.can_apply == 3) {
                    this.$router.push({
                        path: "submitauditok"
                    });
                    return;
                }
                if ((res.status == 2 || res.status == 3) && this.again != 1) {
                    this.$router.push({
                        path: "submitauditnook",
                        query: {
                            type: this.type,
                            fail_cause: res.fail_cause
                        }
                    });
                    return;
                }
                if (res.type) {
                    this.type = res.type;
                }
                if (res.positive) {
                    this.positive = res.positive;
                }
                if (res.back) {
                    this.back = res.back;
                }
                if (res.business_license) {
                    this.business_license = res.business_license;
                }
                this.logo = res.logo;
                this.name = res.name;
                this.mobile = res.mobile;
                this.id_card = res.id_card;
                this.bank = res.bank;
                this.bank_account_name = res.bank_account_name;
                this.bank_account = res.bank_account;
                this.status = res.status;
                this.can_apply = res.can_apply;

                if (Object.keys(this.$store.state.settledin).length !== 0) {
                    this.positive = this.$store.state.settledin.positive;
                    this.back = this.$store.state.settledin.back;
                    this.business_license = this.$store.state.settledin.business_license;
                    this.type = this.$store.state.settledin.type;
                    this.logo = this.$store.state.settledin.logo;
                    this.name = this.$store.state.settledin.name;
                    this.mobile = this.$store.state.settledin.mobile;
                    this.id_card = this.$store.state.settledin.id_card;
                    this.bank = this.$store.state.settledin.bank;
                    this.bank_account_name = this.$store.state.settledin.bank_account_name;
                    this.bank_account = this.$store.state.settledin.bank_account;
                }
                console.log();
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "applyclub.scss";
</style>
