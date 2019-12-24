<template>
    <div class="enrolmentstaff">
        <div class="enrolmentstafflist">
            <div class="nolist" v-if="nolist">
                暂无数据
            </div>
            <div
                class="listitem"
                v-for="(item, index) in enrolmentstafflist"
                :key="index"
            >
                <img :src="item.user.headimgurl" alt />
                <div class="right">
                    <div class="right-left">
                        <div class="name">{{ item.user.nickname }}</div>
                        <div class="time">{{ item.created_at }}</div>
                    </div>
                    <div class="right-right">
                        <div class="num">购买数量：</div>
                        <span>{{ item.num }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            enrolmentstafflist: [], //报名人员列表
            nolist: false, //暂无数据展示
            linedetailid: "", //线路列表id
            date: "2019-11-16" //报名日期
        };
    },
    created() {
        this.linedetailid = this.$route.query.id;
        this.date = this.$route.query.dates;
        this.domesticlistfn();
        this.$wechat.timeline(false);
    },
    components: {},
    watch: {},
    methods: {
        //已报名人员列表
        domesticlistfn: function() {
            let _this = this;
            this.$api.itineraries
                .enroll(_this.linedetailid, 1, _this.dates)
                .then(res => {
                    _this.enrolmentstafflist = res.data;
                    if (_this.enrolmentstafflist.length == 0) {
                        _this.nolist = true;
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
