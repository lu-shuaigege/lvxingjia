<template>
    <div class="addAdministration">
        <div class="top">
            <div class="list">
                <div class="left">收货人</div>
                <div class="right">
                    <input
                        type="text"
                        v-model="address.name"
                        class="right-con"
                        placeholder="请填写"
                    />
                </div>
            </div>
            <div class="list">
                <div class="left">联系方式</div>
                <div class="right">
                    <input
                        type="text"
                        v-model="address.mobile"
                        class="right-con"
                        maxlength="11"
                        placeholder="请填写"
                    />
                </div>
            </div>
            <div class="myinformation-list" @click="showPopup">
                <div class="headportrait-left">所在地区</div>
                <div class="headportrait-right">
                    <div class="word">{{ showaddress }}</div>
                    <img
                        src="@/assets/img/my/right.png"
                        class="headportrait-right-imgright"
                        alt
                    />
                </div>
            </div>
            <van-popup
                v-model="show"
                position="bottom"
                :style="{ height: '50%' }"
            >
                <van-area
                    :area-list="cityList"
                    :columns-num="3"
                    confirm-button-text="确认"
                    @confirm="addconfirm"
                    cancel-button-text="取消"
                    @cancel="delcancel"
                    @change="onChangearea"
                />
            </van-popup>
            <div class="list">
                <div class="left">详细地址</div>
                <div class="right">
                    <input
                        type="text"
                        v-model="address.address"
                        class="right-con"
                        placeholder="请输入详细地址"
                    />
                </div>
            </div>
            <div class="list">
                <div class="left">默认地址</div>
                <div class="right">
                    <van-switch
                        class="switcha"
                        v-model="checked"
                        @input="onInput"
                        active-color="#07c160"
                        inactive-color="#fff"
                        size="24px"
                    />
                </div>
            </div>
        </div>
        <div class="down-btn" @click="save()">保存地址</div>
    </div>
</template>

<script>
export default {
    name: "addAdministration",
    data() {
        return {
            show: false, //地址选择弹框
            showaddress: "请选择",
            id: "",
            active: 0,
            checked: false,
            cityList: [],
            address: {
                name: "",
                mobile: "",
                province_id: "",
                city_id: "",
                district_id: "",
                address: "",
                is_default: ""
            }
        };
    },
    components: {},
    created() {
        this.id = this.$route.query.id;
        this.getDetail();
        this.getCity();
        this.$wechat.timeline(false);
    },
    methods: {
        onInput(checked) {
            this.checked = checked;
            if (this.checked) {
                this.address.is_default = 1;
            } else {
                this.address.is_default = 0;
            }
        },
        //获取城市
        getCity() {
            this.$api.cities.index("", 1, "").then(res => {
                this.cityList = res;
            });
        },
        showPopup() {
            this.show = true;
        },
        onChangearea(picker, value) {
            let areaName = "";
            for (var i = 0; i < value.length; i++) {
                areaName = areaName + value[i].name + " ";
            }
            this.showaddress = areaName;
            this.address.province_id = value[0].code;
            this.address.city_id = value[1].code;
            this.address.district_id = value[2].code;
        },
        // 地址选择点击确定
        addconfirm: function() {
            this.show = false;
        },
        //地址选择点击取消
        delcancel: function() {
            this.show = false;
        },
        //获取详情
        getDetail() {
            let _this = this;
            if (_this.id === "" || _this.id === undefined) {
                return false;
            }
            this.$api.addresses.show(this.id).then(res => {
                this.address = res;
                this.showaddress =
                    res.province.name + res.city.name + res.district.name;
                if (this.address.is_default === 1) {
                    this.checked = true;
                } else {
                    this.checked = false;
                }
            });
        },
        // 保存
        save: function() {
            let _this = this;
            if (_this.address.name === "" || _this.address.name === undefined) {
                this.$toast("请输入收货人姓名");
                return;
            }
            if (
                _this.address.mobile === "" ||
                _this.address.mobile === undefined
            ) {
                this.$toast("请输入联系方式");
                return;
            }
            if (
                !/^((0\d{2,3}-\d{7,8})|(1[3567849]\d{9}))$/.test(
                    _this.address.mobile
                )
            ) {
                this.$toast("请输入正确的联系方式");
                return;
            }
            if (
                _this.address.province_id === "" ||
                _this.address.province_id === undefined
            ) {
                this.$toast("请选择地区");
                return;
            }
            if (
                _this.address.address === "" ||
                _this.address.address === undefined
            ) {
                this.$toast("请输入详细地址");
                return;
            }
            let data = {
                name: _this.address.name,
                mobile: _this.address.mobile,
                province_id: _this.address.province_id,
                city_id: _this.address.city_id,
                district_id: _this.address.district_id,
                address: _this.address.address,
                is_default: _this.address.is_default
            };
            if (_this.id === undefined || _this.id === "") {
                _this.$api.addresses.store(data).then(res => {
                    _this.$toast("收货地址新增成功");
                    _this.$router.go(-1);
                });
            } else {
                _this.$api.addresses.update(_this.id, data).then(res => {
                    _this.$toast("收货地址更新成功");
                    _this.$router.go(-1);
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
