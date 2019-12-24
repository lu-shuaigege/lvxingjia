<template>
    <div class="myinformation">
        <yd-button
            class="headportrait-btn"
            @click.native="showa = true"
        ></yd-button>
        <!-- <input type="file" accept="image/*" capture="camera" class="camera" /> -->
        <input
            type="file"
            @change="getfile($event)"
            accept="image/*"
            class="imgfile"
        />
        <div class="headportrait">
            <div class="headportrait-left">头像</div>
            <div class="headportrait-right">
                <img
                    :src="myData.headimgurl"
                    class="headportrait-right-img"
                    alt
                />
                <img
                    src="@/assets/img/my/right.png"
                    class="headportrait-right-imgright"
                    alt
                />
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
        <yd-button class="gender-btn" @click.native="showb = true"></yd-button>
        <div class="myinformation-list">
            <div class="headportrait-left">性别</div>
            <div class="headportrait-right">
                <div class="word">{{ myData.sex | sexType }}</div>
                <img
                    src="@/assets/img/my/right.png"
                    class="headportrait-right-imgright"
                    alt
                />
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
                    v-model="myData.birthday"
                ></yd-datetime>
                <img
                    src="@/assets/img/my/right.png"
                    class="headportrait-right-imgright"
                    alt
                />
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
        <div class="okmyinformation" @click="okmyfn()">保存</div>
        <yd-actionsheet
            :items="myItemsa"
            v-model="showa"
            cancel="取消"
        ></yd-actionsheet>
        <yd-actionsheet
            :items="myItemsb"
            v-model="showb"
            cancel="取消"
        ></yd-actionsheet>
    </div>
</template>

<script>
export default {
    name: "myinformation",
    data() {
        return {
            myData: {
                headimgurls: process.env.VUE_APP_BASE_API, //图片前缀
                headimgurl: "",
                mobile: "",
                nickname: "请输入昵称",
                sex: "",
                birthday: "",
                address: " "
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
    },
    methods: {
        // 获取用户信息
        getMyInfo: function() {
            this.$api.user.me().then(res => {
                this.myData = res;
                if (localStorage.getItem("nickname")) {
                    this.myData.nickname = localStorage.getItem("nickname");
                }
            });
        },
        //上传图片
        getfile: function(e) {
            this.file = e.target.files[0];
            let formData = new FormData();
            formData.append("imgfile", this.file);
            this.$api.upload.store(formData).then(res => {
                this.myData.headimgurl = this.headimgurls + res.data.image_url;
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
            let data = {
                nickname: _this.myData.nickname,
                headimgurl: _this.myData.headimgurl,
                sex: _this.myData.sex,
                birthday: _this.myData.birthday,
                address: _this.myData.address,
                mobile: _this.myData.mobile
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
