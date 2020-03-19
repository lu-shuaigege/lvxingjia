<template>
    <div class="home">
        <keep-alive>
            <div class="top">
                <div class="banner">
                    <div class="bannertop">
                        <div @click="toUrl('/city')" class="bannertop-left">
                            <div>{{ cityname.slice(0, 2) }}</div>
                            <img class="bottom-img" src="@/assets/img/home/bottom.png" />
                        </div>
                        <router-link to="/home/line/search">
                            <div class="bannertop-center">
                                <img alt src="@/assets/img/home/search.png" />
                                <div>大家都在搜索“日本樱花”</div>
                            </div>
                        </router-link>

                        <router-link to="/home/notice">
                            <div class="bannertop-right">
                                <div class="have-message" v-show="have_message"></div>
                                <img alt src="@/assets/img/home/news.png" />
                            </div>
                        </router-link>
                    </div>
                    <!-- 轮播图 -->
                    <yd-slider autoplay="3000" class="banners">
                        <yd-slider-item :key="index" v-for="(item, index) in banners">
                            <img :src="imgAfterUrl+item.img" style="max-width:100%;max-height:100%" />
                        </yd-slider-item>
                    </yd-slider>
                    <!-- 播报 -->
                    <!-- <div class="banner-bottom">
                    <div class="bobao">
                        <img alt src="@/assets/img/home/laba.png" />
                        <yd-slider autoplay="5000" class="bobaos">
                            <yd-slider-item
                                :key="indexs"
                                v-for="(item, indexs) in news"
                            >

                            </yd-slider-item>
                        </yd-slider>
                    </div>
                    </div>-->
                    <div class="banner-bottom">
                        <div class="bobao">
                            <img alt src="@/assets/img/home/laba.png" />
                            <van-swipe :autoplay="4000" indicator-color="white" class="bobaos">
                                <van-swipe-item v-for="(item, index) in news" :key="index">
                                    <div class="news">{{ item.content }}</div>
                                </van-swipe-item>
                            </van-swipe>
                        </div>
                    </div>
                </div>
            </div>
        </keep-alive>

        <!-- 三图 -->
        <div class="center">
            <div class="threeimg">
                <div
                    :key="indexa"
                    @click="toUrl('/lineindex', { type: item.id })"
                    class="threeimgitem"
                    v-for="(item, indexa) in threeimg"
                >
                    <img :src="item.url" alt />
                    <div class="threeimgitem-title">{{ item.title }}</div>
                </div>
            </div>
            <div class="threeimg-down">
                <div
                    :key="indexb"
                    @click="toUrl('/lineindex', { mode: item.id })"
                    class="threeimg-down-item"
                    v-for="(item, indexb) in threeimgdown"
                >
                    <P class="item-p1">{{ item.title }}</P>
                    <P class="item-p2">{{ item.title2 }}</P>
                </div>
            </div>
        </div>
        <!-- 四大类 -->
        <div class="classitem">
            <div :key="indexc" class="classitem-item" v-for="(item, indexc) in classitem">
                <router-link :to="item.to">
                    <img :src="item.url" alt />
                    <p>{{ item.title }}</p>
                </router-link>
            </div>
        </div>
        <!-- 热门推荐 -->
        <div class="hot">
            <div class="hottitle">
                <b>热门推荐</b>
            </div>
            <div class="hotlist">
                <div
                    :key="indexf"
                    @click="toUrl('/home/line/show', { id: item.id })"
                    class="hotlist-item"
                    v-for="(item, indexf) in itineraries[1]"
                >
                    <div class="hotitem-top">
                        <div class="top">
                            <p>{{ item.mode | modeFilter }}</p>
                            <div class="shu"></div>
                            <p>{{ item.becitys.name.slice(0, 3) }}</p>
                        </div>
                        <img :src="imgAfterUrl + item.banners[0]" alt />
                    </div>
                    <div class="hotitem-bottom">
                        <div class="hotitem-title">{{ item.name }}</div>
                        <div class="money">
                            <span class="moneysp1">￥</span>
                            <span class="moneysp2">
                                {{
                                item.min_prices / 100
                                }}
                            </span>
                            <span class="moneysp3">起</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 国内游 -->
        <div class="domestic">
            <div class="domestic-top">
                <div
                    :class="itinerariesType === 2 ? 'top-left' : ''"
                    @click="setItinerariesType(2)"
                >国内游</div>
                <div class="top-center"></div>
                <div
                    :class="itinerariesType === 3 ? 'top-left' : ''"
                    @click="setItinerariesType(3)"
                >出境游</div>
            </div>
            <div class="domesticlist">
                <div
                    :key="indexg"
                    @click="toUrl('/home/line/show', { id: item.id })"
                    class="item"
                    v-for="(item, indexg) in itineraries[itinerariesType]"
                >
                    <div class="domestictop">
                        <div class="top">
                            <p>{{ item.mode | modeFilter }}</p>&nbsp;|&nbsp;
                            <p>{{ item.destinations.name.slice(0, 3) }}</p>
                        </div>
                        <img :src="imgAfterUrl + item.banners[0]" />
                    </div>
                    <div class="domestic-bottom">
                        <div class="domestic-title">
                            <div class="domestic-title-left">{{ item.name }}</div>
                            <div class="money">
                                <div class="moneysp1">￥</div>
                                <div class="moneysp2">{{ item.min_prices / 100 }}</div>
                                <div class="moneysp3">起</div>
                            </div>
                        </div>
                        <div class="domestic-word">{{ item.desc }}</div>
                    </div>
                </div>
            </div>
        </div>
        <Tab></Tab>
    </div>
</template>

<script>
import Tab from "@/components/tab/tab.vue";
import jsonp from "vue-jsonp";
import { Swipe, SwipeItem } from "vant";
import functions from "@/utils/functions.js";
export default {
    data() {
        return {
            imgAfterUrl: process.env.VUE_APP_IMGURL,
            defaultCityName: "", //默认城市名字
            baiducityid: "", //自动定位百度id
            cityname: "", //城市名字
            cityid: "", //城市id
            have_message: false, //未读消息
            peripheryid: 0, //周边游大类
            code: "",
            banners: [], // 轮播图
            news: [], // 播报
            threeimg: [
                // 三图
                {
                    id: 1,
                    url: require("@/assets/img/home/index.png"),
                    title: "周边游"
                },
                {
                    id: 2,
                    url: require("@/assets/img/home/mapping.png"),
                    title: "国内游"
                },
                {
                    id: 3,
                    url: require("@/assets/img/home/aircraft.png"),
                    title: "国际游"
                }
            ],
            threeimgdown: [
                { id: 1, title: "户外游", title2: "攀登高峰" },
                { id: 2, title: "自由行", title2: "想哪走哪" },
                { id: 3, title: "摄影游", title2: "记录美景" },
                { id: 4, title: "亲子游", title2: "寓教于乐" },
                { id: 5, title: "跟团游", title2: "放心出行" }
            ],
            classitem: [
                // 四大类
                {
                    url: require("@/assets/img/home/ticket.png"),
                    title: "门票",
                    to: "/doorticketList"
                },
                {
                    url: require("@/assets/img/home/jiudian.png"),
                    title: "酒店",
                    to: "/hotelList"
                },
                {
                    url: require("@/assets/img/home/travels3.png"),
                    title: "游记",
                    to: "/travels"
                },
                {
                    url: require("@/assets/img/home/shopping.png"),
                    title: "积分商城",
                    to: "/home/integral/index"
                }
            ],
            itinerariesType: 2,
            itineraries: { "1": [], "2": [], "3": [] }
        };
    },
    components: { Tab },
    created() {
        this.$api.banner.index().then(res => {
            this.banners = res;
        });
        this.$api.notice.index().then(res => {
            this.news = res;
        });
        this.$api.message.index("0", "").then(res => {
            this.have_message = res.data.length ? true : false;
        });
        this.getItineraries();
        this.$wechat.timeline(false);
    },
    mounted() {
        if (localStorage.getItem("cityNameId") === null) {
            this.location();
        } else {
            let cityNameId = JSON.parse(localStorage.getItem("cityNameId"));
            this.cityname = cityNameId.cityname;
            this.cityid = cityNameId.cityid;
            this.getItineraries();
        }
    },
    methods: {
        setItinerariesType(type) {
            this.itinerariesType = type;
        },
        //自动获取地址
        location: function() {
            let _this = this;
            _this
                .$jsonp(
                    "http://api.map.baidu.com/location/ip?ak=0RSZy0klhTaLgO4dddbXQCos87IBBSMO"
                )
                .then(res => {
                    _this.baiducityid = res.content.address_detail.city_code;
                    _this.$api.cities.index(_this.baiducityid).then(res => {
                        _this.cityname = res.name;
                        let cityNameId = { cityid: res.id, cityname: res.name };
                        localStorage.setItem(
                            "cityNameId",
                            JSON.stringify(cityNameId)
                        );
                        this.getItineraries();
                    });
                });
        },
        getItineraries: function() {
            this.$api.itineraries.index(1, this.cityid, 1, "", 1).then(res => {
                this.itineraries[1] = res;
            });

            this.$api.itineraries.index(2, "", 1, "", "").then(res => {
                this.itineraries[2] = res.data;
            });

            this.$api.itineraries.index(3, "", 1, "", "").then(res => {
                this.itineraries[3] = res.data;
            });
        },
        toUrl(path, query = {}) {
            this.$router.push({ path: path, query: query });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
