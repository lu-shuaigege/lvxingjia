<template>
    <div class="noticedetails">
        <div class="top">
            <router-link to="/searchroute">
                <div class="topcontent" ref="topcontent">
                    <img src="@/assets/img/search/chakan.png" />
                    <input class="topinput" type="text" placeholder="大家都在搜索“日本樱花”" />
                </div>
            </router-link>
            <div v-if="searchList == 1" class="over" @click="noSearch">取消</div>
        </div>
        <div class="list">
            <!-- 没有列表数据 -->
            <div class="noline" v-show="nolinelist">
                <div>
                    <img src="@/assets/img/Linelist/noline.png" />
                </div>
            </div>
            <!-- 列表数据加载更多 -->
            <van-list v-model="loading" :finished="finished" @load="onLoad" ref="linelist">
                <div
                    class="item"
                    v-for="(item, index) in linelist"
                    :key="index"
                    @click="linedetailsfn(item.id, item.type)"
                >
                    <div class="left">
                        <div class="lefttop">
                            <p>{{ item.mode | modeFilter }}</p>
                            <div class="shu"></div>
                            <p
                                v-show="item.type==2||item.type==3"
                            >{{ item.destinations.name.slice(0, 3) }}</p>
                            <p v-show="item.type==1">{{ item.becitys.name.slice(0, 3) }}</p>
                        </div>
                        <img :src="imgUrl +item.banners[0]" />
                    </div>
                    <div class="right">
                        <div class="title">{{ item.name }}</div>
                        <div class="word">{{ item.desc }}</div>
                        <div class="integral">返{{ item.integral }}积分</div>
                        <div class="money">
                            <div class="money-left">
                                <div class="moneysp1">￥</div>
                                <div class="moneysp2">{{ item.min_prices / 100 }}</div>
                                <div class="moneysp3">起</div>
                            </div>
                            <div class="money-right">
                                <div
                                    class="commission"
                                    v-if="role==2||role==3||role==4"
                                >返佣:￥{{ item.sub_commission/100 }}</div>
                            </div>
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
            imgUrl: process.env.VUE_APP_IMGURL,
            role: "",
            linetype: "", //线路类型：1周边游 2国内游 3国际游
            mode: "", //线路出游方式
            city_id: "", //城市id
            keywords: "", //关键词
            searchList: "", //搜索结果页面
            current_page: 1, //当前页面
            last_page: 0, //最后一页
            linelist: [], //数据列表
            nolinelist: false, //没有数据
            loading: false,
            finished: false
        };
    },
    components: {},
    created() {
        this.linetype = this.$route.query.type;
        this.mode = this.$route.query.mode;
        this.keywords = this.$route.query.keywords;
        this.searchList = this.$route.query.searchList;
        this.$wechat.timeline(false);
        if (this.linetype == 1 || this.mode) {
            if (localStorage.getItem("cityNameId")) {
                let cityNameId = JSON.parse(localStorage.getItem("cityNameId"));
                this.cityname = cityNameId.cityname;
                this.city_id = cityNameId.cityid;
            }
        }
        this.getMyInfo();
    },
    mounted() {
        if (this.searchList == 1) {
            this.$refs.topcontent.style.width = "8.227rem";
        }
    },
    methods: {
        // 获取用户信息
        getMyInfo: function() {
            this.$api.user.me().then(res => {
                this.role = res.role;
                localStorage.setItem("role", res.role);
            });
        },
        //取消搜索
        noSearch() {
            this.$router.push({
                path: "/home/index"
            });
        },
        //跳转线路详情页
        linedetailsfn: function(id, type) {
            localStorage.setItem("linedetailid", id);
            this.$router.push({
                path: "/home/line/show",
                query: {
                    id: id,
                    mode: this.mode,
                    type: type
                }
            });
        },
        // 下拉加载更多请求接口
        onLoad() {
            // 异步更新数据
            let _this = this;
            if (_this.linetype === undefined) {
                _this.linetype = "";
            }
            this.$api.itineraries
                .index(
                    _this.linetype,
                    _this.city_id,
                    _this.current_page,
                    _this.keywords,
                    "",
                    _this.mode,
                    ""
                )
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
                        _this.nolinelist = true;
                    } else {
                        _this.nolinelist = false;
                    }
                    for (let i = 0; i < hots.length; i++) {
                        _this.linelist.push(hots[i]);
                    }
                    if (_this.linelist.length === 0) {
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
