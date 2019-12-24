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
        <div class="bottom">
            <div class="bottom-lista">套餐设置</div>
            <div class="bottom-list">
                <div class="list-left">数量限制</div>
                <div class="list-right">
                    <input
                        type="text"
                        class="list-right-input"
                        placeholder="请填写数量"
                        v-model="numbers"
                    />
                    <div>人</div>
                </div>
            </div>
            <div class="bottom-list">
                <div class="list-left">成人价格</div>
                <div class="list-right">
                    <input
                        type="text"
                        class="list-right-input"
                        placeholder="请填写价格"
                        v-model="adultPrices"
                    />
                    <div>元</div>
                </div>
            </div>
            <div class="bottom-list">
                <div class="list-left">儿童价格</div>
                <div class="list-right">
                    <input
                        type="text"
                        class="list-right-input"
                        placeholder="请填写价格"
                        v-model="childrenPrices"
                    />
                    <div>元</div>
                </div>
            </div>
            <div class="bottom-list">
                <button class="confirm" @click="confirm">确认设置</button>
            </div>
        </div>
        <div class="bottom-btn">
            <div class="downbtn-left">取消</div>
            <div class="downbtn-right" @click="back()">确认</div>
        </div>
    </div>
</template>

<script>
// import Vue from 'vue'
// import Calendar from 'vue-mobile-calendar'
// Vue.use(Calendar);
import Calendar from "mobile-calendar-simple";
import dayjs from "dayjs";
export default {
    data() {
        return {
            adultPrices: null,
            childrenPrices: null,
            numbers: null,
            selectTime: "",
            priceList: [
                //价格日历列表
                // {date:'2019-11-21',price:'¥199'},
                // {date:'2019-11-22',price:'¥500'},
                // {date:'2019-11-23',price:'¥199'},
                // {date:'2019-11-24',price:'¥500'},
                // {date:'2019-11-25',price:'¥500'}
            ],
            minDate: new Date()
        };
    },
    components: { Calendar },
    created() {
        this.$wechat.timeline(false);
    },
    methods: {
        //获取选择的日期回调数据
        getDate(date) {
            this.selectTime = date.dateStr;
        },
        // 跳转线路首页
        confirm: function() {
            let _this = this;
            if (
                _this.adultPrices !== null &&
                _this.childrenPrices !== null &&
                _this.numbers !== null
            ) {
                let pricesdata = {};
                if (_this.selectTime != "") {
                    for (let i = 0; i < _this.priceList.length; i++) {
                        if (
                            dayjs(_this.priceList[i].date).format(
                                "YYYY-MM-DD"
                            ) == dayjs(_this.selectTime).format("YYYY-MM-DD")
                        ) {
                            _this.priceList.splice(i, 1);
                        }
                    }

                    pricesdata = {
                        date: _this.selectTime,
                        price: "¥" + _this.adultPrices,
                        price_children: _this.childrenPrices,
                        limit_num: _this.numbers
                    };
                } else {
                    pricesdata = {
                        date: dayjs(new Date()).format("YYYY-MM-DD"),
                        price: "¥" + _this.adultPrices,
                        price_children: _this.childrenPrices,
                        limit_num: _this.numbers
                    };
                }
                _this.priceList.push(pricesdata);
                this.adultPrices = null;
                this.childrenPrices = null;
                this.numbers = null;
            } else {
                this.$toast("请填写相应内容");
                return;
            }
        },
        back() {
            localStorage.setItem("price_List", JSON.stringify(this.priceList));
            this.$router.go(-1);
        }
    }
    // beforeRouteLeave(to, from, next) {
    //   to.meta.keepAlive = true;
    //   next();
    // }
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
    height: auto !important;
}
</style>
<style lang="scss" scoped>
@import "setmenu";
</style>
