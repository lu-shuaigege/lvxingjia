<template>
    <div class="integralorder">
        <div
            class="integralorder-top"
            v-show="shop_address == null"
            @click="routerLink('/me/address')"
        >
            <div class="top-con">
                <div class="top-con-left">
                    您的收货地址为空，点此添加收货地址
                </div>
                <img
                    src="@/assets/img/Linelist/right.png"
                    class="top-con-right"
                    alt
                />
            </div>
        </div>
        <div
            class="integralorder-topnew"
            v-show="shop_address != null"
            @click="routerLink('/me/address')"
        >
            <img
                src="@/assets/img/Integralmall/addressicon.png"
                class="top-con-left"
                alt
            />
            <div class="top-con-center">
                <div class="top-con-center-top">
                    <div class="top-con-center-top-name">
                        {{ address.name }}
                    </div>
                    <div class="top-con-center-top-tel">
                        {{ address.mobile }}
                    </div>
                </div>
                <div class="top-con-center-bottom">{{ address.address }}</div>
            </div>
            <img
                src="@/assets/img/Linelist/right.png"
                class="topnew-con-right"
                alt
            />
        </div>
        <div class="integralorder-center">
            <div class="center-left">
                <img
                    :src="imgAfterUrl + order.cover_img"
                    class="center-left-img"
                    alt
                />
            </div>
            <div class="center-right">
                <div class="center-right-top">{{ order.name }}</div>
                <div class="center-right-center">{{ order.desc }}</div>
                <div class="center-right-bottom">
                    <div class="center-right-bottom-left">
                        {{ order.expend }}积分
                    </div>
                    <div class="center-right-bottom-right">x1</div>
                </div>
            </div>
        </div>
        <div class="integralorder-center2">
            <div class="center2-top">
                <div class="center2-top-left">配送方式</div>
                <div class="center2-top-right">顺丰到付</div>
            </div>
            <div class="center2-center">
                <div class="center2-center-left">备注(选填)</div>
                <input
                    type="text"
                    class="center2-center-right"
                    placeholder="请填写备注内容"
                    v-model="notes"
                />
            </div>
            <div class="center2-bottom">
                <div class="center2-bottom-left">共1件商品</div>
                &nbsp;&nbsp;
                <div class="center2-bottom-right">
                    小计 :
                    <div>{{ order.expend }}积分</div>
                </div>
            </div>
        </div>
        <div class="payorder">
            <div class="payorder-left">
                <div class="payorder-left-left">合计 :</div>
                &nbsp;&nbsp;
                <div class="payorder-left-right">{{ order.expend }}</div>
                <div class="payorder-left-left">积分</div>
            </div>
            <div class="payorder-right" @click="buy">提交订单</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgAfterUrl: process.env.VUE_APP_BASE_API,
            id: "", //商品id
            notes: "", //备注
            order: {}, //订单详情
            address: {}, //地址
            shop_address: {} //获取的地址
        };
    },
    components: {},
    watch: {},
    created() {
        this.id = this.$route.query.id;
        this.order = this.$route.query;
        this.shop_address = JSON.parse(localStorage.getItem("shop_address"));
        if (this.shop_address != null) {
            this.address = {
                id: this.shop_address.id,
                name: this.shop_address.name,
                mobile: this.shop_address.mobile,
                address: this.shop_address.address
            };
        }
        this.$wechat.timeline(false);
    },
    methods: {
        //购买
        buy() {
            if (
                this.address.id === "" ||
                this.address.id === "undefind" ||
                this.address.id === "null"
            ) {
                this.$toast("请选择收获地址");
                return;
            }
            // if (this.notes === "") {
            //     this.$toast("请填写备注");
            //     return;
            // }
            this.$api.goods
                .buy(this.address.id, this.order, this.notes)
                .then(res => {
                    this.$toast("订单提交成功");
                    setTimeout(() => {
                        this.$router.push({
                            path: "/home/integral/index"
                        });
                    }, 2000);
                });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
