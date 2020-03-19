<template>
    <div class="integralcheckin">
        <div class="bannertop">
            <div class="topcon">
                <img
                    class="topcon-left"
                    src="@/assets/img/Integralmall/signin.png"
                />
                <div class="topcon-center">
                    <div class="topcon-center-top">累计签到积分</div>
                    <div class="topcon-center-bottom">{{ total }}</div>
                </div>
                <div class="topcon-right" @click="checkindetailsfn()">明细</div>
            </div>
        </div>
        <div class="content-date">
            <div class="content-date-top">已连续签到{{ and }}天</div>
            <Calendar
                v-on:changeMonth="changeDate"
                :sundayStart="true"
                :textTop="textTop"
                :markDate="arr"
                style="background:#fff !important;"
            ></Calendar>
            <div
                v-if="signinBtn"
                class="signinBtn"
                @click="sign_in"
                ref="signinBtn"
            >
                马上签到
            </div>
            <div
                v-if="!signinBtn"
                class="signinBtn"
                @click="sign_in_out"
                ref="signinBtn"
            >
                今日已签到
            </div>
        </div>
        <div class="integralcheckin-bottom">
            <div class="bottom-title">签到规则</div>
            <div class="bottom-word">
                1、连续签到第一天5积分，第二天5积分，第三天10积分，
                第四天15积分，第五天20积分，第六天25积分，第七天30 积分；
                2、连续签到达7天后，每天都可得30积分；
                3、签到断签之后，重新从第一天开始累积计算签到积分值。
            </div>
        </div>
    </div>
</template>

<script>
//vue文件中引入日历组件
import Calendar from "vue-calendar-component";
import functions from "@/utils/functions.js";
export default {
    data() {
        return {
            current_page: 1, //当前页
            last_page: 1, //最后一页
            istime: "", //当前时间
            and: 0, //连续签到
            total: 0, //积分
            signinBtn: true, //签到按钮名字
            arr: [], // 页面多个签到多个标记示例
            textTop: ["日", "一", "二", "三", "四", "五", "六"] //头部星期格式
        };
    },
    components: {
        Calendar
    },
    created() {
        this.istime = functions.fmtDate(new Date(), "yyyy-MM-dd");
        this.sign_in_sum();
        this.sign_in_date(this.current_page, this.istime);
        this.$wechat.timeline(false);
    },
    methods: {
        //我的积分总积分
        sign_in_sum() {
            this.$api.rewards_point.sign_in_sum().then(res => {
                this.total = res;
            });
        },
        //签到日历
        sign_in_date(page, date) {
            this.$api.sign_in.index_list(1, date).then(res => {
                for (let i = 0; i < res.list.length; i++) {
                    this.arr.push(res.list[i].date);
                }
                this.and = res.continuation_days;
                if (this.istime == res.list[0].date) {
                    this.$refs.signinBtn.style.background = "#999";
                    this.signinBtn = false;
                }
            });
        },
        //签到
        sign_in() {
            this.$api.sign_in.index().then(res => {
                if (res == null) {
                    this.$toast("签到成功");
                    this.sign_in_date(1, this.istime);
                }
            });
        },
        //今日已签到
        sign_in_out() {
            this.$toast("今日已签到");
        },
        //跳转积分商品详情
        checkindetailsfn: function() {
            this.$router.push({
                path: "/home/integral/checkindetails"
            });
        },
        changeDate(data) {
            console.log(data); //左右点击切换月份
        },
        clickToday(data) {
            console.log(data); //跳到了本月
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
