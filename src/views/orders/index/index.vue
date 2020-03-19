<template>
    <div class="order">
        <div class="ordertop">
            <div
                :class="topbtnactive === item.id ? 'topbtnactive' : 'topbtn'"
                :key="index"
                @click="topbtnactivefn(item.id)"
                v-for="(item, index) in topbtn"
            >{{ item.title }}</div>
        </div>
        <!-- 页面主体 -->
        <div class="order-content">
            <van-list
                v-if="!finished || orderlist.length"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div
                    :key="indexa"
                    class="content-item"
                    v-for="(item, indexa) in orderlist"
                    @click="routerLink('/orders/show', { id: item.id })"
                >
                    <div class="item-top">
                        <div class="item-top-left">订单号 : {{ item.no }}</div>
                        <div
                            :class="item.status == 0 ? 'item-top-right1' : ''"
                            v-if="item.status == 0"
                        >待付款</div>
                        <div
                            :class="item.status == 1 ? 'item-top-right1' : ''"
                            v-if="item.status == 1"
                        >待出行</div>

                        <div
                            :class="item.status == 2 ? 'item-top-right1' : ''"
                            v-if="item.status == 2"
                        >已完成</div>
                        <div
                            :class="item.status == 3 ? 'item-top-right1' : ''"
                            v-if="item.status == 3"
                        >待退款</div>
                        <div
                            :class="item.status == 4 ? 'item-top-right1' : ''"
                            v-if="item.status == 4"
                        >已取消</div>
                    </div>
                    <div class="item-center">
                        <div class="item-center-left">
                            <img :src="imgAfterUrl + item.obj.cover_img" alt />
                        </div>
                        <div class="item-center-right">
                            <div class="title">{{ item.obj.name }}</div>
                            <div class="date">日期 : {{ item.start_date }}</div>
                            <div class="num" v-show="item.obj.prices.price_num != null">
                                {{ item.obj.prices.price_num }}成人.{{
                                item.obj.prices.price_children_num
                                }}儿童
                            </div>
                            <div class="money">￥{{ item.total_fee / 100 }}</div>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <div class="item-bottom-left">
                            <div class="lefta">总计 :</div>
                            <div class="leftb">￥{{ item.total_fee / 100 }}</div>
                        </div>
                        <div class="item-bottom-right">
                            <div
                                @click="payfn(item.status)"
                                class="close"
                                v-if="item.status == 0 || item.status == 1"
                            >取消订单</div>
                            <div
                                @click="payfn(item.status)"
                                class="payorder"
                                v-if="item.status == 0"
                            >立即支付</div>
                            <div
                                @click="payfn(item.status)"
                                class="del"
                                v-if="
                                    item.status == 2 ||
                                        item.status == 5 ||
                                        item.status == 3 ||
                                        item.status == 4
                                "
                            >删除</div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
        <Tab></Tab>
    </div>
</template>

<script>
import Tab from "@/components/tab/tab.vue";

export default {
    data() {
        return {
            imgAfterUrl: process.env.VUE_APP_IMGURL,
            loading: false,
            finished: false,
            page: 1,
            topbtnactive: "", //订单类型切换状态
            orderlist: [],
            topbtn: [
                {
                    id: "",
                    title: "全部"
                },
                {
                    id: 1,
                    title: "待出行"
                },
                {
                    id: "0",
                    title: "待付款"
                },
                {
                    id: 2,
                    title: "已完成"
                }
            ]
        };
    },
    created() {
        this.$wechat.timeline(false);
        //获取全部的订单
        this.$api.orders.my().then(res => {
            // this.orderlist = res.data;
        });
        if (this.$route.query.active) {
            if (this.$route.query.active == 0) {
                this.topbtnactive = String(this.$route.query.active);
            }
            if (this.$route.query.active == 1) {
                this.topbtnactive = Number(this.$route.query.active);
                return;
            } else {
                this.topbtnactive = Number(this.$route.query.active);
            }
            this.$api.orders
                .my(Number(this.topbtnactive), this.page)
                .then(res => {
                    this.orderlist = res.data;
                });
        }
    },
    components: {
        Tab
    },
    methods: {
        onLoad() {
            this.$api.orders.my(this.topbtnactive, this.page).then(res => {
                this.page++;
                this.loading = false;
                if (res.data.length == 0) {
                    this.finished = true;
                } else {
                    this.orderlist = this.orderlist.concat(res.data);
                }
            });
        },
        topbtnactivefn: function(x) {
            this.topbtnactive = x;
            this.orderlist = [];
            this.page = 1;
            this.onLoad();
            // this.$api.orders
            //     .my({ status: Number(this.topbtnactive) })
            //     .then(res => {
            //         this.orderlist = res.data;
            //         this.page = 1;
            //         this.onLoad();
            //     });
        },
        payfn: function(x) {
            //路由跳转携带参数
            this.$router.push({
                name: "orderdetails",
                params: {
                    // peripheryid: this.peripheryid
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
