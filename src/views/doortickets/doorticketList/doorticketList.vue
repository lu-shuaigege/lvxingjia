<template>
    <div class="doorticket">
        <div class="bannertop">
            <div class="bannertop-left" @click="gocityfn()">
                <div>{{ cityname.slice(0, 2) }}</div>
                <img
                    class="bottom-img"
                    src="@/assets/img/home/bottom.png"
                    alt
                />
            </div>
            <router-link to="/doorticketsearch">
                <div class="bannertop-center" ref="bannertop_center">
                    <img src="@/assets/img/search/chakan.png" alt />
                    <input
                        v-model="searchword"
                        class="topinput"
                        type="text"
                        placeholder="大家都在搜索“日本樱花”"
                    />
                </div>
            </router-link>
            <div v-if="searchList == 1" class="over" @click="noSearch">
                取消
            </div>
        </div>

        <div class="hotlist">
            <!-- 没有列表数据 -->
            <div class="noline" v-show="nolist">
                <div>
                    <img src="@/assets/img/Linelist/noline.png" alt />
                </div>
            </div>
            <!-- 列表数据加载更多 -->
            <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                ref="linelist"
            >
                <div
                    class="hotlist-item"
                    v-for="(item, index) in hotlist"
                    :key="index"
                    @click="doorticketdetailsfn(item.id)"
                >
                    <div class="hotitem-top">
                        <img :src="imgAfterUrl + item.cover_img" alt />
                    </div>
                    <div class="hotitem-bottom">
                        <div class="hotitem-title">{{ item.name }}</div>
                        <div class="money">
                            <span class="moneysp1">￥</span>
                            <span class="moneysp2">{{
                                item.min_price / 100
                            }}</span>
                            <span class="moneysp3">起</span>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgAfterUrl: process.env.VUE_APP_IMGURL,
            hotlist: [], // 热门推荐
            cityname: "", //城市
            city_id: "", //城市
            keywords: "", //搜索内容
            searchword: "", //搜索内容
            searchList: "", //搜索结果页面
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
        // 有正式数据以后放开注释
        let cityNameId = JSON.parse(localStorage.getItem("cityNameId"));
        this.cityname = cityNameId.cityname;
        this.city_id = cityNameId.cityid;
        this.keywords = this.$route.query.keywords;
        this.searchList = this.$route.query.searchList;
        this.$wechat.timeline(false);
    },
    updated() {
        // jquery方法修改
        $(".word-all")
            .find("div")
            .find("div")
            .find("img")
            .css("width", "100%");
    },
    mounted() {
        if (this.searchList == 1) {
            this.$refs.bannertop_center.style.width = "6.88rem";
        }
    },
    methods: {
        //取消搜索
        noSearch() {
            this.$router.push({
                path: "/home/index"
            });
        },
        //跳转城市列表
        gocityfn: function() {
            //路由跳转携带参数
            this.$router.push({
                name: "city"
            });
        },
        //跳转门票详情
        doorticketdetailsfn: function(id) {
            //路由跳转携带参数
            this.$router.push({
                path: "/doorticketshow",
                query: {
                    id: id
                }
            });
        },
        // 请求景点门票列表
        // 下拉加载更多请求接口
        onLoad() {
            // 异步更新数据
            let _this = this;
            this.$api.scenic_spot
                .index(_this.current_page, _this.keywords, _this.city_id)
                .then(res => {
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
                        _this.hotlist.push(hots[i]);
                    }
                    if (_this.hotlist.length === 0) {
                        _this.finished = true;
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "doorticketList.scss";
</style>
