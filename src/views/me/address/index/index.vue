<template>
    <div class="harvestaddress">
        <div class="listcontent" v-if="addressList.length">
            <div class="list" v-for="(item, index) in addressList" :key="index">
                <div class="listleft">
                    <div class="lefta">
                        <img
                            @click="activefn(index,item.id,item.name,item.mobile,item.address)"
                            v-if="active !== item.id"
                            src="@/assets/img/my/noactive.png"
                        />
                        <img
                            @click="activefn(index,item.id,item.name,item.mobile,item.address)"
                            v-if="active === item.id"
                            src="@/assets/img/my/isactive.png"
                        />
                    </div>
                    <div class="leftb">
                        <div class="leftb-top">
                            <div class="name">{{ item.name }}</div>
                            <div class="gender">
                                <img v-if="item.sex === 1" src="@/assets/img/my/man.png" />
                                <img v-if="item.sex === 2" src="@/assets/img/my/woman.png" />
                            </div>
                            <div class="tel">{{ item.mobile }}</div>
                        </div>
                        <div class="leftb-bottom">{{ item.address }}</div>
                    </div>
                </div>

                <div class="right">
                    <div class="righta" @click="edit(item.id)">
                        <img src="@/assets/img/my/edit.png" />
                    </div>
                    <div class="rightb" @click="del(item.id)">
                        <img src="@/assets/img/my/del.png" />
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="down-btn" v-if="addressList.length>0&&integralorder==0" @click="addfn()">
            <img src="@/assets/img/my/plusicon.png" />新建地址
        </div> -->
        <div class="down-addbtn" @click="addfn()">
            <span>+</span>
            新建地址
        </div>
        <div class="down-btn" v-if="integralorder==1" @click="okaddress()">确认</div>
        <div class="popup" v-show="isshow == 1">
            <div class="content">
                <div class="con-word">是否确认删除?</div>
                <div class="con-bottom">
                    <div class="nook" @click="popup(0)">取消</div>
                    <div class="isok" @click="popup(1)">确认</div>
                </div>
            </div>
        </div>
        <div class="nohave" v-if="!addressList.length">
            <div class="top">
                <img src="@/assets/img/my/addressimg.png" />
            </div>
            <div class="nohavetitle">您还没有收货地址哦</div>
            <div class="newaddress-btn" @click="addfn()">新建地址</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: "",
            active: 0,
            isshow: 0,
            addressList: [],
            integralorder: 0 //是否从积分商城过来
        };
    },
    created() {
        if (this.$route.query.integralorder) {
            this.integralorder = this.$route.query.integralorder;
        }

        this.getAddress();
        this.$wechat.timeline(false);
    },
    components: {},
    methods: {
        // 获取地址
        getAddress: function() {
            this.$api.addresses.my().then(res => {
                this.addressList = res;
                res.map((value, index) => {
                    if (value.is_default == 1) {
                        this.active = value.id;
                        let shop_address = {
                            id: value.id,
                            name: value.name,
                            mobile: value.mobile,
                            address: value.address
                        };
                        localStorage.setItem(
                            "shop_address",
                            JSON.stringify(shop_address)
                        );
                    }
                });
            });
        },
        activefn: function(index, id, name, mobile, address) {
            this.active = id;
            let shop_address = {
                id: id,
                name: name,
                mobile: mobile,
                address: address
            };
            localStorage.setItem("shop_address", JSON.stringify(shop_address));
        },
        // 确认选择
        okaddress() {
            // this.$router.push({
            //     path: "/home/integral/integralorder"
            // });
            this.$router.go(-1);
        },
        // 跳转新增地址
        addfn: function() {
            this.$router.push({
                path: "/me/address/create"
            });
        },
        // 编辑地址
        edit(id) {
            this.$router.push({
                path: "/me/address/create",
                query: {
                    id: id
                }
            });
        },
        //删除
        del(id) {
            let _this = this;
            _this.isshow = 1;
            _this.id = id;
        },
        //弹框
        popup(x) {
            if (x == 1) {
                this.isshow = 0;
                this.$api.addresses.delete(this.id).then(res => {
                    this.$toast("收货地址删除成功");
                    this.getAddress();
                });
            } else if (x == 0) {
                this.isshow = 0;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
