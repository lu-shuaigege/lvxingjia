<template>
    <div class="setmenu">
        <div class="calendar">
            <!--&lt;!&ndash;用法一&ndash;&gt;-->
            <!--<Calendar :date="'yyyy-mm-dd'" @callback="getDate"/> 如果默认今天可简写：<Calendar  @callback="getDate" />-->
            <!--&lt;!&ndash;用法二（默认:mode="1",酒店入住模式）&ndash;&gt;-->
            <!--<Calendar :startDate="'yyyy-mm-dd'" :endDate="'yyyy-mm-dd'"  @callback="getDate" />-->
            <!--&lt;!&ndash;用法三（:mode="2"）,往返模式&ndash;&gt;-->
            <!--<Calendar  :startDate="'yyyy-mm-dd'" :endDate="'yyyy-mm-dd'" :mode="2"  @callback="getDate" />-->
            <!--用法四,价格日历模式-->
            <Calendar
                :themeColor="'#2dba55'"
                :priceList="priceList"
                @callback="getDate"
                :switchMonth="true"
            />
            <!--&lt;!&ndash;用法五,不可操作的日期&ndash;&gt;-->
            <!--<Calendar  :disabledList="disabledList"  @callback="getDate" />-->
            <!--&lt;!&ndash;设置主题色&ndash;&gt;-->
            <!--<Calendar :date="'yyyy-mm-dd'" :themeColor="'#FF6600'"  @callback="getDate" />-->
            <!--&lt;!&ndash;如果需要solt&ndash;&gt;-->
            <!--<Calendar :date="'yyyy-mm-dd'"  @callback="getDate">-->
            <!--<div>-->
            <!--...此处也支持slot注入（不需要可以忽略此div）-->
            <!--</div>-->
            <!--</Calendar>-->
        </div>
    </div>
</template>

<script>
import Calendar from "mobile-calendar-simple";
import dayjs from "dayjs";
export default {
    data() {
        return {
            linedetailid: "", //线路详情id
            type: "",
            mode: "",
            priceList: [
                //价格日历列表
                // {date:'2019-11-21',price:'¥199'},
                // {date:'2019-11-22',price:'¥500'},
                // {date:'2019-11-23',price:'¥199'},
                // {date:'2019-11-24',price:'¥500'},
                // { date: "2019-11-29", price: "¥500" }
            ],
            minDate: new Date()
        };
    },
    components: { Calendar },
    created() {
        this.linedetailid = localStorage.getItem("linedetailid");
        this.linedetailid = this.$route.query.id;
        this.type = this.$route.query.type;
        this.mode = this.$route.query.mode;
        this.itinerariesdetail(this.linedetailid);
        this.$wechat.timeline(false);
    },
    methods: {
        //获取选择的日期回调数据
        getDate(date) {
            if (date.price == undefined) {
                this.$toast("暂无套餐");
                return;
            }
            let calendars = {
                dateStr: date.dateStr,
                price: date.price
            };
            let calendar = JSON.stringify(calendars);
            localStorage.setItem("calendar", calendar);
            this.$router.push({
                path: "/home/line/show",
                query: {
                    dateStr: date.dateStr,
                    price: date.price,
                    id: this.linedetailid,
                    mode: this.mode,
                    type: this.type
                }
            });
        },
        //请求线路详情
        itinerariesdetail: function(id) {
            let _this = this;
            this.$api.itineraries.show(id, "", "").then(res => {
                let hots = res;
                let prices = hots.prices; //时间套餐价格列表
                for (let i = 0; i < prices.length; i++) {
                    if (prices[i].is_default != 1) {
                        this.priceList.push({
                            date: prices[i].some_day,
                            price: "￥" + prices[i].price / 100,
                            is_default: prices[i].is_default
                        });
                    }
                }
            });
        }
    }
};
</script>
<style>
.calendar .calendar-header {
    /*position: absolute !important;*/
    /*top:0 !important;*/
    /*right:0 !important;*/
    box-shadow: none;
    position: fixed;
    width: 9.293rem;
    left: 50%;
    transform: translate(-50%);
    z-index: 9;
    right: 0.267rem;
    border-radius: 0.267rem 0.267rem 0 0;
}
.calendar .calendar-title {
    margin: 0 !important;
}
.calendar .each-month {
    margin-left: 0 !important;
    border-bottom: 0 !important;
}
.calendar .each-day {
    height: 50px !important;
}
.calendar .ti {
    /*overflow: hidden !important;*/
    /* height: auto !important; */
    min-height: 100vh;
}
</style>
<style lang="scss" scoped>
// @import "setmenu.scss";
</style>
