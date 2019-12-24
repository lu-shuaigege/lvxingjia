<template>
    <div class="addAdministration">
        <div class="top">
            <div class="list">
                <div class="left">姓名</div>
                <div class="right">
                    <input type="text" v-model="info.name" class="right-con" placeholder="请填写" />
                </div>
            </div>
            <div class="list">
                <div class="left">手机号</div>
                <div class="right">
                    <input
                        type="number"
                        maxlength="11"
                        oninput="if(value.length>11)value=value.slice(0,11)"
                        v-model="info.mobile"
                        class="right-con"
                        placeholder="请填写"
                    />
                </div>
            </div>
            <div class="myinformation-list">
                <div class="headportrait-left">性别</div>
                <div class="headportrait-right" @click="showSex">
                    <div class="word">{{ sexName }}</div>
                    <img src="@/assets/img/my/right.png" class="headportrait-right-imgright" alt />
                </div>
            </div>
            <van-popup v-model="sexShow" position="bottom">
                <van-picker
                    show-toolbar
                    :visible-item-count="3"
                    :columns="sexList"
                    @cancel="sexCancel"
                    @confirm="sexConfirm"
                />
            </van-popup>
            <div class="myinformation-list">
                <div class="headportrait-left">证件类型</div>
                <div class="headportrait-right" @click="showType">
                    <div class="word">{{ idcardType }}</div>
                    <img src="@/assets/img/my/right.png" class="headportrait-right-imgright" alt />
                </div>
            </div>
            <van-popup v-model="typeShow" position="bottom">
                <van-picker
                    show-toolbar
                    :visible-item-count="3"
                    :columns="typeList"
                    @cancel="typeCancel"
                    @confirm="typeConfirm"
                />
            </van-popup>
            <div class="list">
                <div class="left">证件号码</div>
                <div class="right">
                    <input
                        :maxlength="maxlength"
                        type="text"
                        v-model="info.id_card_no"
                        class="right-con"
                        placeholder="请填写"
                    />
                </div>
            </div>
        </div>
        <div class="down-btn" @click="save()">保存旅客信息</div>
    </div>
</template>

<script>
export default {
    name: "addAdministration",
    data() {
        return {
            id: "",
            sexShow: false,
            typeShow: false,
            sexName: "请选择",
            idcardType: "请选择",
            sexList: ["男", "女"],
            typeList: ["身份证", "护照"],
            info: {
                name: "",
                mobile: "",
                sex: "",
                id_card_type: "",
                id_card_no: ""
            },
            maxlength: 0 //最大长度
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.id = this.$route.query.id;
        this.getDetail();
    },
    methods: {
        //获取详情
        getDetail() {
            if (this.id === "" || this.id === undefined) {
                return false;
            }
            this.$api.travellers.show(this.id).then(res => {
                this.info = res;
                if (this.info.sex === 1) {
                    this.sexName = "男";
                } else {
                    this.sexName = "女";
                }
                if (this.info.id_card_type === 1) {
                    this.idcardType = "身份证";
                } else {
                    this.idcardType = "护照";
                }
            });
        },
        // 保存
        save: function() {
            let _this = this;
            if (_this.info.name === "" || _this.info.name === undefined) {
                this.$toast("请输入姓名");
                return;
            }
            if (_this.info.mobile === "" || _this.info.mobile === undefined) {
                this.$toast("请输入手机号");
                return;
            }
            if (!/^1[3456789]\d{9}$/.test(_this.info.mobile)) {
                this.$toast("请输入正确的手机号");
                return;
            }
            if (
                _this.info.sex === "" ||
                _this.info.sex === undefined ||
                _this.info.sex === "请选择"
            ) {
                this.$toast("请选择性别");
                return;
            }
            if (
                _this.info.id_card_type === "" ||
                _this.info.id_card_type === undefined ||
                _this.info.id_card_type === "请选择"
            ) {
                this.$toast("请选择证件类型");
                return;
            }
            if (
                _this.info.id_card_no === "" ||
                _this.info.id_card_no === undefined
            ) {
                this.$toast("请输入正确的证件号码");
                return;
            }
            if (
                _this.info.id_card_type == 2 &&
                !/(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/.test(
                    _this.info.id_card_no
                )
            ) {
                this.$toast("请输入正确的证件号码");
                return;
            }
            if (
                _this.info.id_card_type == 1 &&
                !/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(
                    _this.info.id_card_no
                )
            ) {
                this.$toast("请输入正确的证件号码");
                return;
            }
            let data = {
                name: _this.info.name,
                mobile: _this.info.mobile,
                sex: _this.info.sex,
                id_card_type: _this.info.id_card_type,
                id_card_no: _this.info.id_card_no
            };
            if (_this.id === undefined || _this.id === "") {
                _this.$api.travellers.store(data).then(res => {
                    _this.$toast("常用旅客新增成功");
                    _this.$router.go(-1);
                });
            } else {
                _this.$api.travellers.update(_this.id, data).then(res => {
                    _this.$toast("常用旅客更新成功");
                    _this.$router.go(-1);
                });
            }
        },
        showSex() {
            this.sexShow = true;
        },
        showType() {
            this.typeShow = true;
        },
        // 性别选择点击确定
        sexConfirm: function(value) {
            this.sexName = value;
            if (value === "男") {
                this.info.sex = 1;
            } else {
                this.info.sex = 2;
            }
            this.sexShow = false;
        },
        //性别选择点击取消
        sexCancel: function() {
            this.sexShow = false;
        },
        typeConfirm: function(value) {
            this.idcardType = value;
            if (value === "身份证") {
                this.info.id_card_type = 1;
                this.maxlength = 18;
            } else {
                this.info.id_card_type = 2;
                this.maxlength = 9;
            }
            this.typeShow = false;
        },
        typeCancel: function() {
            this.typeShow = false;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
