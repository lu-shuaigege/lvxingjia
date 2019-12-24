<template>
    <div class="checkindetails">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            ref="linelist"
        >
            <div v-for="(item, index) in detaillist" :key="index" class="item">
                <div class="item-left">{{ item.created_at }}</div>
                <div class="item-right">
                    <!-- <span v-show="item.type == 1">+</span
                    ><span v-show="item.type == 2">-</span> -->
                    +{{ item.num }}积分
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
            doorticketid: 0,
            detaillist: [], //签到明细
            current_page: 1, //当前页
            last_page: 1, //最后一页的页数
            load: false, //是否显示加载
            nolist: false, //没有数据
            loading: false,
            finished: false
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
    },
    methods: {
        // 下拉加载更多请求接口
        onLoad() {
            // 异步更新数据
            let _this = this;
            this.$api.sign_in.index_list(_this.current_page, "").then(res => {
                let hots = res.data;
                _this.last_page = res.last_page;
                if (_this.current_page === _this.last_page) {
                    // 数据全部加载完成
                    _this.finished = true;
                }
                _this.current_page = _this.current_page + 1;
                // 加载状态结束
                _this.loading = false;
                if (hots.length === 0) {
                    _this.nolist = true;
                } else {
                    _this.nolist = false;
                }
                for (let i = 0; i < hots.length; i++) {
                    _this.detaillist.push(hots[i]);
                }
                if (_this.finished.length === 0) {
                    _this.finished = true;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
