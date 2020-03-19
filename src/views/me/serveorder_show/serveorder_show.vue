<template>
    <div class="orderdetails">
        <div class="top">
            <div class="top-title">{{ data.status | orderStatus }}</div>
        </div>
        <div class="content-top">
            <div class="item-top">
                <div class="item-top-left">订单号 : {{ data.no }}</div>
            </div>
            <div class="item-center">
                <div class="item-center-left">
                    <img :src="imgAfterUrl + data.obj.cover_img" alt />
                </div>
                <div class="item-center-right">
                    <div class="title">{{ data.obj.name }}</div>
                    <div class="date">日期 : {{ data.start_date }}</div>
                    <div class="num" v-if="data.obj.prices.price_num">
                        {{ data.obj.prices.price_num }}成人.{{
                            data.obj.prices.price_children_num
                        }}儿童
                    </div>
                    <div class="money" style="margin-top: 0.2rem">
                        ￥{{ data.total_fee / 100 }}
                    </div>
                </div>
            </div>
            <div class="item-bottom">
                <div class="item-bottom-left">
                    <div class="lefta">总计 :</div>
                    <div class="leftb">￥{{ data.total_fee / 100 }}</div>
                </div>
            </div>
        </div>
        <!-- 订单编号 -->
        <div class="content-center">
            <div class="list">
                <div class="list-left">预定人姓名 :</div>
                <div class="list-right">{{ data.name }}</div>
            </div>
            <div class="list">
                <div class="list-left">联系方式 :</div>
                <div class="list-right">{{ data.mobile }}</div>
            </div>
        </div>
        <!-- 订单编号 -->
        <div class="content-bottom">
            <div class="list">
                <div class="list-left">订单编号 :</div>
                <div class="list-right">{{ data.no }}</div>
            </div>
            <div class="list">
                <div class="list-left">创建时间 :</div>
                <div class="list-right">{{ data.created_at }}</div>
            </div>
            <div class="list" v-if="data.paid_at != null">
                <div class="list-left">
                    付款时间 :
                </div>
                <div class="list-right">{{ data.paid_at }}</div>
            </div>
            <div class="list">
                <div class="list-left">出行时间 :</div>
                <div class="list-right">{{ data.start_date }}</div>
            </div>
        </div>
        <div class="lookall" @click="lookall(1)">
            查看旅客信息&nbsp;&nbsp;>
        </div>
        <div class="lookall_list" ref="lookall_list">
            <div class="lookall_list_content">
                <div class="close" @click="lookall(0)">
                    <img src="@/assets/img/Linelist/close.png" alt="" />
                </div>
                <div
                    class="lookall_list_item"
                    v-for="(item, index) in data.travellers"
                    :key="index"
                >
                    <div class="list_item_top">
                        <div class="list_item_top_name">{{ item.name }}</div>
                        <img
                            v-show="item.sex == 1"
                            src="@/assets/img/my/man.png"
                        />
                        <img
                            v-show="item.sex == 2"
                            src="@/assets/img/my/woman.png"
                        />
                        <div class="list_item_top_tel">
                            {{ item.mobile }}
                        </div>
                    </div>
                    <div class="list_item_bottom">
                        身份证：{{ item.id_card_no }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import orders from "@/api/orders";
import { Dialog } from "vant";
export default {
    data() {
        return {
            isshow: 0,
            imgAfterUrl: process.env.VUE_APP_IMGURL,
            orderlist: [],
            id: 0,
            data: {} //获取的数据
        };
    },
    created() {
        this.$wechat.timeline(false);
        this.id = this.$route.query.id;
        this.$api.service_orders.detail(this.id).then(res => {
            this.data = res;
        });
    },
    methods: {
        // 弹框
        lookall(x) {
            if (x == 1) {
                this.$refs.lookall_list.style.top = "0px";
            } else if (x == 0) {
                this.$refs.lookall_list.style.top = "100vh";
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "serveorder_show";
</style>
