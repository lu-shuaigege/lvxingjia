<template>
    <div class="mycollection">
        <div class="topitem">
            <div
                :class="itemactive == index + 1 ? 'itemactive' : 'item'"
                v-for="(item, index) in topitem"
                :key="index"
                @click="itemactivefn(index + 1)"
            >
                {{ item }}
            </div>
        </div>
        <!-- 游记 -->
        <div class="domesticlist" v-if="itemactive == 1">
            <div class="noline" v-if="finished && !travel.length">
                <div><img alt src="@/assets/img/Linelist/noline.png" /></div>
            </div>
            <div class="bg">
                <van-list
                    v-if="!finished || travel.length"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    style="padding-top: 0.3rem"
                >
                    <div
                        class="item"
                        v-for="(item, indexg) in travel"
                        :key="indexg"
                        @click="
                            routerLink('/travels/show', { id: item.travel.id })
                        "
                    >
                        <div class="domestictop">
                            <img
                                :src="imgAfterUrl + item.travel.cover_img"
                                alt
                            />
                        </div>
                        <div class="domestic-bottom">
                            <div class="bottom-top">
                                <div class="bottom-top-left">
                                    <div class="title">
                                        {{ item.travel.name }}
                                    </div>
                                </div>
                                <div class="bottom-top-right">
                                    <img
                                        :src="item.travel.user_info.headimgurl"
                                        alt
                                    />
                                    <div>
                                        {{ item.travel.user_info.nickname.slice(0,4) }}
                                    </div>
                                </div>
                            </div>
                            <div class="bottom-bototm">
                                <div class="date">
                                    发表于&nbsp;&nbsp;{{
                                        item.travel.created_at
                                    }}
                                </div>
                                <div class="like">
                                    <img src="@/assets/img/my/like.png" alt />
                                    &nbsp;{{ item.travel.collection_count }}
                                </div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
        <!-- 线路 -->
        <div class="list" v-if="itemactive == 2">
            <div class="noline" v-if="finished1 && !itinerary.length">
                <div><img alt src="@/assets/img/Linelist/noline.png" /></div>
            </div>
            <div class="bg">
                <van-list
                    v-if="!finished1 || itinerary.length"
                    v-model="loading1"
                    :finished="finished1"
                    finished-text="没有更多了"
                    @load="onLoad1"
                >
                    <div
                        class="item"
                        v-for="(item, index) in itinerary"
                        :key="index"
                        @click="
                            routerLink('/home/line/show', {
                                id: item.itinerary.id
                            })
                        "
                    >
                        <div class="left" v-if="item.itinerary">
                            <div class="left-top">
                                <p>{{ item.itinerary.mode | modeFilter }}</p>
                                &nbsp;|&nbsp;
                                <p>{{ item.itinerary.type | typeFilter }}</p>
                            </div>
                            <img
                                :src="imgAfterUrl + item.itinerary.banners[0]"
                                alt
                            />
                        </div>
                        <div class="right" v-if="item.itinerary">
                            <div class="title">{{ item.itinerary.name }}</div>
                            <div class="word">{{ item.itinerary.desc }}</div>
                            <div class="money">
                                <div class="money-left">
                                    <div class="moneysp1">￥</div>
                                    <div class="moneysp2">
                                        {{ item.itinerary.min_prices / 100 }}
                                    </div>
                                    <div class="moneysp3">起</div>
                                </div>
                                <div class="money-right">
                                    <div class="integral">
                                        反{{ item.itinerary.integral }}积分
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
        <!-- 门票 -->
        <div class="hotlist" v-if="itemactive == 3">
            <div class="noline" v-if="finished2 && !scenic_spot.length">
                <div><img alt src="@/assets/img/Linelist/noline.png" /></div>
            </div>
            <van-list
                v-if="!finished2 || scenic_spot.length"
                v-model="loading2"
                :finished="finished2"
                finished-text="没有更多了"
                @load="onLoad2"
                style="width: 100%"
            >
                <div class="bg">
                    <div
                        class="hotlist-item"
                        v-for="(item, indexf) in scenic_spot"
                        :key="indexf"
                        @click="doorticketdetailsfn(item.scenic_spot.id)"
                    >
                        <div class="hotitem-top">
                            <img
                                :src="imgAfterUrl + item.scenic_spot.cover_img"
                                alt
                            />
                        </div>
                        <div class="hotitem-bottom">
                            <div class="hotitem-title">
                                {{ item.scenic_spot.name }}
                            </div>
                            <div class="money">
                                <span class="moneysp1">￥</span>
                                <span class="moneysp2">{{
                                    item.scenic_spot.min_prices / 100
                                }}</span>
                                <span class="moneysp3">起</span>
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
        <!-- 酒店 -->
        <div class="hotlist" v-if="itemactive == 4">
            <div class="noline" v-if="finished3 && !hotel.length">
                <div><img alt src="@/assets/img/Linelist/noline.png" /></div>
            </div>
            <van-list
                v-if="!finished3 || hotel.length"
                v-model="loading3"
                :finished="finished3"
                finished-text="没有更多了"
                @load="onLoad3"
                style="width: 100%"
            >
                <div class="bg">
                    <div
                        class="hotlist-item"
                        v-for="(item, indexf) in hotel"
                        :key="indexf"
                        @click="hoteldetails(item.hotel.id)"
                    >
                        <div class="hotitem-top">
                            <img
                                :src="imgAfterUrl + item.hotel.cover_img"
                                alt
                            />
                        </div>
                        <div class="hotitem-bottom">
                            <div class="hotitem-title">
                                {{ item.hotel.name }}
                            </div>
                            <div class="money">
                                <span class="moneysp1">￥</span>
                                <span class="moneysp2">{{
                                    item.hotel.min_prices / 100
                                }}</span>
                                <span class="moneysp3">起</span>
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
    name: "mycollection",
    data() {
        return {
            topitem: ["游记", "线路", "门票", "酒店"],
            itemactive: 1, //我的收藏切换状态
            travel: [], //游记
            itinerary: [], //线路
            scenic_spot: [], //门票
            hotel: [], //酒店
            imgAfterUrl: process.env.VUE_APP_IMGURL, //图片前缀

            loading: false,
            finished: false,
            page: 1,
            loading1: false,
            finished1: false,
            page1: 1,
            loading2: false,
            finished2: false,
            page2: 1,
            loading3: false,
            finished3: false,
            page3: 1
        };
    },
    created() {
        this.$wechat.timeline(false);
    },
    components: {},
    methods: {
        onLoad() {
            this.$api.mycollection.index(1, this.page).then(res => {
                this.page++;
                this.loading = false;
                if (res.data.length == 0) {
                    this.finished = true;
                } else {
                    this.travel = this.travel.concat(res.data);
                }
            });
        },
        onLoad1() {
            this.$api.mycollection.index(2, this.page1).then(res => {
                this.page1++;
                this.loading1 = false;
                if (res.data.length == 0) {
                    this.finished1 = true;
                } else {
                    this.itinerary = this.itinerary.concat(res.data);
                }
            });
        },
        onLoad2() {
            this.$api.mycollection.index(3, this.page2).then(res => {
                this.page2++;
                this.loading2 = false;
                if (res.data.length == 0) {
                    this.finished2 = true;
                } else {
                    this.scenic_spot = this.scenic_spot.concat(res.data);
                }
            });
        },
        onLoad3() {
            this.$api.mycollection.index(4, this.page3).then(res => {
                this.page3++;
                this.loading3 = false;
                if (res.data.length == 0) {
                    this.finished3 = true;
                } else {
                    this.hotel = this.hotel.concat(res.data);
                }
            });
        },
        itemactivefn: function(itemactive) {
            this.itemactive = itemactive;
            if (this.itemactive == 1) {
                this.page = 1;
                this.loading = false;
                this.finished = false;
                this.travel = [];
            } else if (this.itemactive == 2) {
                this.page1 = 1;
                this.loading1 = false;
                this.finished1 = false;
                this.itinerary = [];
            } else if (this.itemactive == 3) {
                this.page2 = 1;
                this.loading2 = false;
                this.finished2 = false;
                this.scenic_spot = [];
            } else if (this.itemactive == 4) {
                this.page3 = 1;
                this.loading3 = false;
                this.finished3 = false;
                this.hotel = [];
            }
        },
        hoteldetails: function(id) {
            this.$router.push({
                path: "/hotelShow",
                query: {
                    id: id
                }
            });
        },
        doorticketdetailsfn: function(id) {
            this.$router.push({
                path: "/doorticketshow",
                query: {
                    id: id
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
