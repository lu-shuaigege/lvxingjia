<template>
    <div class="myinformation">
        <div class="myinformation-content">
            <div class="myinfo">
                <div class="apply">我的信息</div>

                <div class="headportrait">
                    <van-uploader :after-read="uploadFmImg" class="upload-fm"></van-uploader>
                    <div class="headportrait-left">头像</div>
                    <div class="headportrait-right">
                        <img :src="myData.headimgurl" class="headportrait-right-img" />
                        <img src="@/assets/img/my/right.png" class="headportrait-right-imgright" />
                    </div>
                </div>

                <div class="myinformation-list">
                    <div class="headportrait-left">联系方式</div>
                    <div class="headportrait-right">
                        <input
                            class="word"
                            maxlength="11"
                            v-model="myData.mobile"
                            type="text"
                            placeholder="请填写联系方式"
                        />
                    </div>
                </div>
                <div class="myinformation-list" @click="nikenamefn()">
                    <div class="headportrait-left">昵称</div>
                    <div class="headportrait-right">
                        <div class="word">{{ myData.nickname }}</div>
                    </div>
                </div>
                <div class="myinformation-list">
                    <yd-button class="gender-btn" @click.native="showb = true"></yd-button>

                    <div class="headportrait-left">性别</div>
                    <div class="headportrait-right">
                        <div class="word">{{ myData.sex | sexType }}</div>
                        <img src="@/assets/img/my/right.png" class="headportrait-right-imgright" />
                    </div>
                </div>
                <div class="myinformation-list">
                    <div class="headportrait-left">出生年月</div>
                    <div class="headportrait-right">
                        <yd-datetime
                            placeholder="请选择出生年月"
                            start-year="1960"
                            class="word"
                            type="date"
                            v-model="myData.birthday"
                        ></yd-datetime>
                        <img src="@/assets/img/my/right.png" class="headportrait-right-imgright" />
                    </div>
                </div>
                <div class="myinformation-list">
                    <div class="headportrait-left">详细地址</div>
                    <div class="headportrait-right">
                        <input
                            class="word"
                            v-model="myData.address"
                            type="text"
                            placeholder="请填写详细地址"
                        />
                    </div>
                </div>
            </div>

            <div class="myinfo" v-if="role!=1">
                <div class="apply">公司信息</div>

                <div class="headportrait" v-if="role!=1">
                    <van-uploader :after-read="uploadFmImglogo" class="upload-fm2" v-if="role!=1"></van-uploader>
                    <div class="headportrait-left">公司logo</div>
                    <div class="headportrait-right">
                        <img v-if="logo" :src="imgAfterUrl+logo" class="headportrait-right-img" />
                        <img
                            v-if="!logo"
                            src="@/assets/img/Linelist/defaulthead.png"
                            class="headportrait-right-img"
                        />
                        <img src="@/assets/img/my/right.png" class="headportrait-right-imgright" />
                    </div>
                </div>
                <div class="myinformation-list" v-if="role!=1">
                    <div class="headportrait-left">公司名称</div>
                    <div class="headportrait-right">
                        <input class="word" v-model="name" type="text" placeholder="请填写公司名称" />
                    </div>
                </div>
                <div class="myinformation-list" v-if="role!=1">
                    <div class="headportrait-left">开户名</div>
                    <div class="headportrait-right">
                        <input
                            class="word"
                            v-model="bank_account_name"
                            type="text"
                            placeholder="请填写开户名"
                        />
                    </div>
                </div>
                <div class="myinformation-list" v-if="role!=1">
                    <div class="headportrait-left">开户行</div>
                    <div class="headportrait-right">
                        <input class="word" v-model="bank" type="text" placeholder="请填写开户行" />
                    </div>
                </div>
                <div class="myinformation-list" v-if="role!=1">
                    <div class="headportrait-left">银行卡号</div>
                    <div class="headportrait-right">
                        <input
                            class="word"
                            v-model="bank_account"
                            type="text"
                            placeholder="请填写银行卡号"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="okmyinformation" @click="okmyfn()">保存</div>
        <yd-actionsheet :items="myItemsa" v-model="showa" cancel="取消"></yd-actionsheet>
        <yd-actionsheet :items="myItemsb" v-model="showb" cancel="取消"></yd-actionsheet>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // isok: false,
            imgAfterUrl: process.env.VUE_APP_IMGURL, //地址前缀
            role: 0, //角色
            logo: "", //logo
            name: "", //姓名
            bank: "", //开户行
            bank_account_name: "", //开户名
            bank_account: "", //开户账号
            myData: {
                headimgurls: process.env.VUE_APP_IMGURL, //图片前缀
                headimgurl: "",
                mobile: "",
                nickname: "请输入昵称",
                sex: 1,
                birthday: "",
                address: " ",
                settledIn: {
                    name: "",
                    logo: "",
                    back: "",
                    bank: "",
                    bank_account_name: "",
                    bank_account: ""
                }
            },
            showa: false,
            showb: false,
            myItemsa: [
                {
                    label: "从相册中获取",
                    callback: () => {
                        $(".imgfile").click();
                    }
                }
            ],
            myItemsb: [
                {
                    label: "男",
                    callback: () => {
                        this.myData.sex = 1;
                    }
                },
                {
                    label: "女",
                    callback: () => {
                        this.myData.sex = 2;
                    }
                }
            ]
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.getMyInfo();
        if (this.$route.query.nickname) {
            this.myData.nickname = this.$route.query.nickname;
        }
        // console.log(this.$store.state.user);
        // if (
        //     (this.$store.state.user != null ||
        //         this.$store.state.user != undefined) &&
        //     this.isok
        // ) {
        //     this.myData = this.$store.state.user;
        // }
    },
    methods: {
        // 获取用户信息
        getMyInfo: function() {
            this.$api.user.me().then(res => {
                this.myData = res;
                if (localStorage.getItem("nickname")) {
                    this.myData.nickname = localStorage.getItem("nickname");
                }
                this.role = res.role;
                this.logo = res.settledIn.logo;
                this.name = res.settledIn.name;
                this.bank = res.settledIn.bank;
                this.bank_account_name = res.settledIn.bank_account_name;
                this.bank_account = res.settledIn.bank_account;

                // this.isok = true;
            });
        },
        //上传图片
        // 上传封面图
        uploadFmImg(file) {
            var formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                this.myData.headimgurl =
                    process.env.VUE_APP_IMGURL + res.data.image_url;
            });
        },
        // 上传logo
        uploadFmImglogo(file) {
            var formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                this.logo = res.data.image_url;
            });
        },
        //保存
        okmyfn: function() {
            let _this = this;
            if (_this.myData.headimgurl == "") {
                this.$toast("请上传头像");
                return;
            }
            if (_this.myData.nickname == "") {
                this.$toast("请填写昵称");
                return;
            }
            if (_this.myData.sex == "") {
                this.$toast("请选择性别");
                return;
            }
            if (_this.logo == "" && _this.role != 1) {
                this.$toast("请上传logo");
                return;
            }
            if (_this.name == "" && _this.role != 1) {
                this.$toast("请填写公司名称");
                return;
            }
            if (_this.bank_account_name == "" && _this.role != 1) {
                this.$toast("请填写开户名");
                return;
            }
            if (_this.bank == "" && _this.role != 1) {
                this.$toast("请填写开户行");
                return;
            }

            if (_this.bank_account == "" && _this.role != 1) {
                this.$toast("请填写银行卡号");
                return;
            }
            let data = {
                nickname: _this.myData.nickname,
                headimgurl: _this.myData.headimgurl,
                sex: _this.myData.sex,
                birthday: _this.myData.birthday,
                address: _this.myData.address,
                mobile: _this.myData.mobile,
                logo: _this.logo,
                name: _this.name,
                bank_account_name: _this.bank_account_name,
                bank: _this.bank,
                bank_account: _this.bank_account
            };
            this.$api.user.updateMe(data).then(res => {
                this.$toast("修改成功");
                this.$router.push({
                    path: "/me/index"
                });
                this.headimgurl = data.headimgurl;
            });
        },
        // 跳转改变昵称
        nikenamefn: function() {
            let user = {
                headimgurl: this.myData.headimgurl,
                mobile: this.myData.mobile,
                nickname: this.myData.nickname,
                sex: this.myData.sex,
                birthday: this.myData.birthday,
                address: this.myData.address,
                logo: this.logo,
                name: this.name,
                bank_account_name: this.bank_account_name,
                bank: this.bank,
                bank_account: this.bank_account
            };
            console.log(user);
            this.$store.commit("setUser", user);
            this.$router.push({
                path: "/me/modifynikename",
                query: { nickname: this.myData.nickname }
            });
        }
    },
    destroyed() {
        localStorage.removeItem("nickname");
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
