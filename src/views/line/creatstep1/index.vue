<template>
    <div class="releaseline">
        <div class="allcontent">
            <div class="top">
                <div class="toplist" @click="showTourism">
                    <div class="list-left">所属旅游大类</div>
                    <div class="list-right">
                        <div class="choice">{{ listData.type | typeFilter }}</div>
                        <img src="@/assets/img/my/right.png" class="rightimg" alt />
                    </div>
                </div>
                <van-popup v-model="tourismShow" position="bottom">
                    <van-picker
                        :default-index="1"
                        show-toolbar
                        :visible-item-count="3"
                        value-key="name"
                        :columns="tourismType"
                        @cancel="tourismCancel"
                        @confirm="tourismConfirm"
                    />
                </van-popup>
                <div class="toplist" @click="showMode">
                    <div class="list-left">选择路线类型</div>
                    <div class="list-right">
                        <div class="choice">{{ listData.mode | modeFilter }}</div>
                        <img src="@/assets/img/my/right.png" class="rightimg" alt />
                    </div>
                </div>
                <van-popup v-model="modeShow" position="bottom">
                    <van-picker
                        :default-index="2"
                        show-toolbar
                        value-key="name"
                        :columns="modeType"
                        @cancel="modeCancel"
                        @confirm="modeConfirm"
                    />
                </van-popup>
                <div class="toplist">
                    <div class="list-left">线路名称</div>
                    <div class="list-right">
                        <input
                            type="text"
                            v-model="listData.name"
                            class="right-input"
                            placeholder="请输入线路名称"
                        />
                    </div>
                </div>
                <div class="toplist-last">
                    <div class="title">线路描述</div>
                    <textarea
                        name="index"
                        v-model="listData.desc"
                        class="textarea"
                        cols="30"
                        rows="10"
                        placeholder="请输入线路描述"
                    ></textarea>
                </div>
            </div>
            <div class="center" ref="center">
                <div class="toplist" @click="showDays">
                    <div class="list-left">行程天数</div>
                    <div class="list-right">
                        <div v-if="listData.effect_days" class="choice">{{ listData.effect_days }}</div>
                        <img src="@/assets/img/my/right.png" class="rightimg" alt />
                    </div>
                </div>
                <van-popup v-model="daysShow" position="bottom">
                    <van-picker
                        :default-index="2"
                        show-toolbar
                        :columns="daysList"
                        @cancel="daysCancel"
                        @confirm="daysConfirm"
                    />
                </van-popup>
                <!-- <div class="toplist">
                <div class="list-left">限制人数</div>
                <div class="list-right">
                    <div class="list-right">
                        <input
                            type="number"
                            v-model="listData.limit_num"
                            class="right-input"
                            placeholder="请输入限制人数"
                        />
                        人
                    </div>
                </div>
            </div>
            <div class="toplist">
                <div class="list-left">成人价</div>
                <div class="list-right">
                    <div class="list-right">
                        <input
                            type="number"
                            v-model="listData.price"
                            class="right-input"
                            placeholder="请输入成人价"
                        />
                        元
                    </div>
                </div>
            </div>
            <div class="toplist">
                <div class="list-left">儿童价</div>
                <div class="list-right">
                    <div class="list-right">
                        <input
                            type="number"
                            v-model="listData.price_children"
                            class="right-input"
                            placeholder="请输入儿童价"
                        />
                        元
                    </div>
                </div>
                </div>-->
                <div class="toplist">
                    <div class="list-left">分佣比例</div>
                    <div class="list-right">
                        <div class="list-right">
                            <input
                                type="number"
                                v-model="listData.commission_scale"
                                class="right-input"
                                placeholder="请输入分佣比例"
                            />
                            %
                        </div>
                    </div>
                </div>
                <div class="toplist" @click="showBecity">
                    <div class="list-left">出发城市</div>
                    <div class="list-right">
                        <div class="choice">{{ becityName }}</div>
                        <img src="@/assets/img/my/right.png" class="rightimg" alt />
                    </div>
                </div>
                <van-popup v-model="becityShow" position="bottom" :style="{ height: '50%' }">
                    <van-area
                        :area-list="cityList"
                        :columns-num="2"
                        confirm-button-text="确认"
                        @confirm="becityConfirm"
                        cancel-button-text="取消"
                        @cancel="becityCancel"
                    />
                </van-popup>
                <van-popup v-model="becity_Show" position="bottom">
                    <van-picker
                        :default-index="2"
                        show-toolbar
                        value-key="name"
                        :columns="internationalList"
                        @cancel="becity_Cancel"
                        @confirm="becity_Confirm"
                    />
                </van-popup>
                <div class="toplist" @click="showDestination">
                    <div class="list-left">目的地</div>
                    <div class="list-right">
                        <div class="choice">{{ destinationName }}</div>
                        <img src="@/assets/img/my/right.png" class="rightimg" alt />
                    </div>
                </div>
                <van-popup v-model="destinationShow" position="bottom" :style="{ height: '50%' }">
                    <van-area
                        :area-list="cityList"
                        :columns-num="2"
                        confirm-button-text="确认"
                        @confirm="destinationConfirm"
                        cancel-button-text="取消"
                        @cancel="destinationCancel"
                    />
                </van-popup>
                <van-popup v-model="destination_Show" position="bottom">
                    <van-picker
                        :default-index="2"
                        show-toolbar
                        value-key="name"
                        :columns="internationalList"
                        @cancel="destination_Cancel"
                        @confirm="destination_Confirm"
                    />
                </van-popup>
                <div class="toplist" @click="setmenufn()">
                    <div class="list-left">套餐设置</div>
                    <div class="list-right">
                        <img class="rightimg" src="@/assets/img/my/right.png" alt />
                    </div>
                </div>
            </div>
            <div class="bottom" v-if="venueShow == 1" ref="bottom">
                <div class="toplist">
                    <div class="list-left-b">集合地设置</div>
                    <div class="list-right" @click="addVenue">
                        <img class="plus" src="@/assets/img/my/plus.png" alt />
                    </div>
                </div>
                <div class="toplist" v-for="(item, index) in listData.venue" :key="index">
                    <input
                        :value="item"
                        type="text"
                        class="list-left"
                        maxlength="25"
                        placeholder="请输入集合地名称"
                        @change="venueInput(index, $event)"
                    />
                    <div class="list-right" @click="delVenue(index)">
                        <img class="plus" src="@/assets/img/my/reduce.png" alt />
                    </div>
                </div>
            </div>
        </div>
        <div class="downbtn">
            <div class="downbtn-left" @click="back">取消</div>
            <div class="downbtn-right" @click="releaselinenextfn()">下一步</div>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";
export default {
    data() {
        return {
            id: "",
            role: 1, //角色 1普通用户 2合作伙伴 3加盟商 4出境社
            // 路线类型
            modeShow: false,
            modeType: [
                { mode: 1, name: "户外游" },
                { mode: 2, name: "自由行" },
                { mode: 3, name: "摄影游" },
                { mode: 4, name: "亲子游" },
                { mode: 5, name: "跟团游" }
            ],
            // 旅游大类
            tourismShow: false,
            tourismType: [
                { type: 1, name: "周边游" },
                { type: 2, name: "国内游" },
                { type: 3, name: "国际游" }
            ],
            tourismCheck: 0,
            // 行程天数
            daysShow: false,
            daysList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            // 出发城市
            becityName: "",
            becityShow: false,
            becity_Show: false,
            // 目的地
            destinationName: "",
            destinationShow: false,
            destination_Show: false,
            //集合地
            venueShow: 0,
            cityList: [],
            internationalList: [],
            listData: {
                mode: "",
                type: "",
                name: "",
                desc: "",
                effect_days: "",
                limit_num: "",
                price: "",
                price_children: "",
                commission_scale: "",
                becity: [],
                destination: [],
                some_day_price: [],
                venue: []
            }
        };
    },
    components: {},
    created() {
        if (this.$route.query.id != null) {
            this.id = this.$route.query.id;
            this.getDetail();
        }
        this.getMyInfo();
        this.getDetail();
        this.getCity();
        this.getInternationalCity();
        if (this.$store.state.step1.mode) {
            this.listData = this.$store.state.step1;
            this.becityName = this.listData.becity[1].name;
            this.destinationName = this.listData.destination[1].name;
            if (this.listData.type == 1) {
                this.venueShow = 1;
            }
        }
        this.$wechat.timeline(false);
    },
    methods: {
        // 获取用户信息
        getMyInfo: function() {
            this.$api.user.me().then(res => {
                this.role = res.role;
                if (this.role === 4) {
                    this.tourismType = [
                        { type: 1, name: "周边游" },
                        { type: 2, name: "国内游" },
                        { type: 3, name: "国际游" }
                    ];
                }
                if (this.role === 3) {
                    this.tourismType = [
                        { type: 1, name: "周边游" },
                        { type: 2, name: "国内游" }
                    ];
                }
            });
        },
        //获取详情
        getDetail() {
            let _this = this;
            if (parseInt(_this.id) >= 0) {
                _this.$api.itinerary.show(_this.id).then(res => {
                    _this.listData = res;
                    // _this.listData.becity = res.prices;
                    _this.listData.becity = _this.listData.becity_tree;
                    _this.listData.destination =
                        _this.listData.destination_tree;
                    _this.becityName = _this.listData.becitys.name;
                    _this.destinationName = _this.listData.destinations.name;
                    _this.listData.venue = res.venue_address;
                    _this.listData.some_day_price = res.prices;
                    if (_this.listData.type == 1) {
                        _this.venueShow = 1;
                    }
                    for (let i = 0; i < _this.listData.prices.length; i++) {
                        if (_this.listData.prices[i].is_default === 1) {
                            _this.listData.price =
                                _this.listData.prices[i].price / 100;
                            _this.listData.price_children =
                                _this.listData.prices[i].price_children / 100;
                            _this.listData.limit_num =
                                _this.listData.prices[i].limit_num;
                        }
                    }
                    if (this.$store.state.step1.mode) {
                        _this.listData = this.$store.state.step1;
                        this.becityName = this.listData.becity[1].name;
                        this.destinationName = this.listData.destination[1].name;
                        if (_this.listData.type == 1) {
                            _this.venueShow = 1;
                        }
                    }
                });
            }
        },
        // 集合地设置
        addVenue() {
            this.listData.venue.push("");
        },
        delVenue(index) {
            this.listData.venue.splice(index, 1);
        },
        venueInput(index, e) {
            this.listData.venue[index] = e.target.value;
        },
        //获取城市
        getCity() {
            this.$api.cities.index("", 1, "").then(res => {
                this.cityList = res;
            });
        },
        //获取国际城市
        getInternationalCity() {
            this.$api.cities.index("", "", 1).then(res => {
                this.internationalList = res;
            });
        },
        // 出发城市
        showBecity() {
            if (this.tourismCheck === 0) {
                this.becityShow = true;
            }
            if (this.tourismCheck === 1) {
                this.becity_Show = true;
            }
        },
        //确认选择城市
        becityConfirm(value) {
            this.becityShow = false;
            this.listData.becity = value;
            this.becityName = value[1].name;
        },
        // 取消选择城市
        becityCancel() {
            this.becityShow = false;
        },
        becity_Confirm(value) {
            this.becity_Show = false;
            this.listData.becity = value.id;
            this.becityName = value.name;
        },
        becity_Cancel() {
            this.becity_Show = false;
        },

        // 目的地
        showDestination() {
            if (this.tourismCheck === 0) {
                this.destinationShow = true;
            }
            if (this.tourismCheck === 1) {
                this.destination_Show = true;
            }
        },
        destinationConfirm(value) {
            this.destinationShow = false;
            this.listData.destination = value;
            this.destinationName = value[1].name;
        },
        destinationCancel() {
            this.destinationShow = false;
        },
        destination_Confirm(value) {
            this.destination_Show = false;
            this.listData.destination = value.id;
            this.destinationName = value.name;
        },
        destination_Cancel() {
            this.destination_Show = false;
        },

        // 路线类型
        showMode() {
            this.modeShow = true;
        },
        modeConfirm(value) {
            this.listData.mode = value.mode;
            this.modeShow = false;
        },
        modeCancel() {
            this.modeShow = false;
        },

        // 旅游大类
        showTourism() {
            this.tourismShow = true;
        },
        //确定选择旅游大类
        tourismConfirm(value) {
            this.listData.type = value.type;
            if (this.listData.type == 1) {
                this.modeType = [
                    { mode: 1, name: "户外游" },
                    { mode: 2, name: "自由行" },
                    { mode: 3, name: "摄影游" },
                    { mode: 4, name: "亲子游" },
                    { mode: 5, name: "跟团游" },
                    { mode: 6, name: "周边游" }
                ];
            }
            if (this.listData.type == 2) {
                this.modeType = [
                    { mode: 1, name: "户外游" },
                    { mode: 2, name: "自由行" },
                    { mode: 3, name: "摄影游" },
                    { mode: 4, name: "亲子游" },
                    { mode: 5, name: "跟团游" },
                    { mode: 7, name: "国内游" }
                ];
            }
            if (this.listData.type == 3) {
                this.modeType = [
                    { mode: 1, name: "户外游" },
                    { mode: 2, name: "自由行" },
                    { mode: 3, name: "摄影游" },
                    { mode: 4, name: "亲子游" },
                    { mode: 5, name: "跟团游" },
                    { mode: 8, name: "国际游" }
                ];
            }
            this.tourismShow = false;
            this.listData.destination = [];
            this.destinationName = "";
            this.listData.becity = [];
            this.becityName = "";
            if (value.name === "国际游") {
                this.tourismCheck = 1;
            } else {
                this.tourismCheck = 0;
            }
            if (value.name === "周边游") {
                this.venueShow = 1;
                // $(".bottom").css("margin", "1.5rem");
            } else {
                this.venueShow = 0;
            }
            if (value.type == 2 || value.type == 3) {
                this.$refs.center.style.margin = "0.267rem 0rem 1.5rem";
            } else {
                this.$refs.center.style.margin = "0.267rem 0rem 0.267rem";
            }
        },
        //取消选择旅游大类
        tourismCancel() {
            this.tourismShow = false;
        },

        // 行程天数
        showDays() {
            this.daysShow = true;
        },
        daysConfirm(value) {
            this.listData.effect_days = value;
            this.daysShow = false;
        },
        daysCancel() {
            this.daysShow = false;
        },
        //跳转发布线路下一步
        releaselinenextfn() {
            let _this = this;
            if (!_this.listData.mode) {
                this.$toast("请输入线路类型");
                return;
            }
            if (!_this.listData.type) {
                this.$toast("请输入旅游大类");
                return;
            }
            if (!_this.listData.name) {
                this.$toast("请输入线路名称");
                return;
            }
            if (!_this.listData.desc) {
                this.$toast("请输入线路描述");
                return;
            }
            if (!_this.listData.effect_days) {
                this.$toast("请输入行程天数");
                return;
            }
            // if (!_this.listData.limit_num) {
            //     this.$toast("请输入限制人数");
            //     return;
            // }
            // if (!_this.listData.price) {
            //     this.$toast("请输入成人价");
            //     return;
            // }
            // if (!_this.listData.price_children) {
            //     this.$toast("请输入儿童价");
            //     return;
            // }
            if (!_this.listData.commission_scale) {
                this.$toast("请输入分佣比例");
                return;
            }
            if (_this.tourismCheck === 1) {
                if (!_this.listData.becity) {
                    this.$toast("请输入出发城市");
                    return;
                }
                if (
                    _this.listData.becity &&
                    typeof _this.listData.becity == "object"
                ) {
                    this.$toast("请输入出发城市");
                    return;
                }
                if (!_this.listData.destination) {
                    this.$toast("请输入目的地");
                    return;
                }
                if (
                    _this.listData.destination &&
                    typeof _this.listData.destination == "object"
                ) {
                    this.$toast("请输入目的地");
                    return;
                }
            } else if (_this.tourismCheck === 0) {
                if (!_this.listData.becity) {
                    this.$toast("请输入出发城市");
                    return;
                }
                // if (_this.listData.becity && !_this.listData.becity.length) {
                //     this.$toast("请输入出发城市");
                //     return;
                // }
                if (!_this.listData.destination) {
                    this.$toast("请输入目的地");
                    return;
                }
                // if (
                //     _this.listData.destination &&
                //     !_this.listData.destination.length
                // ) {
                //     this.$toast("请输入目的地");
                //     return;
                // }
            }
            if (
                _this.listData.venue.indexOf("") !== -1 &&
                _this.listData.type == 1
            ) {
                this.$toast("请输入集合地");
                return;
            }
            _this.listData.some_day_price = [];
            //套餐设置
            if (localStorage.getItem("price_List")) {
                var pricelist = JSON.parse(localStorage.getItem("price_List"));
                for (let i = 0; i < pricelist.length; i++) {
                    let priceone = pricelist[i];
                    priceone.some_day = dayjs(new Date(priceone.date)).format(
                        "YYYY-MM-DD"
                    );
                    priceone.price = priceone.price.slice(1);
                    _this.listData.some_day_price.push(priceone);
                }
            } else {
                // return;
            }
            if (!_this.listData.some_day_price) {
                this.$toast("请输入套餐配置");
                return;
            }
            let data = {
                type: _this.listData.type,
                mode: _this.listData.mode,
                name: _this.listData.name,
                desc: _this.listData.desc,
                effect_days: _this.listData.effect_days,
                limit_num: _this.listData.limit_num,
                price: _this.listData.price,
                price_children: _this.listData.price_children,
                commission_scale: _this.listData.commission_scale,
                becity: _this.listData.becity,
                destination: _this.listData.destination,
                some_day_price: _this.listData.some_day_price,
                venue: _this.listData.venue
            };
            if (parseInt(_this.id) >= 0) {
                _this.$api.itinerary.updatestep1(_this.id, data).then(res => {
                    // _this.$toast("线路更新成功");
                    _this.$router.push({
                        path: "/me/creatstep2",
                        query: {
                            id: _this.id
                        }
                    });
                });
            } else {
                _this.$api.itinerary.storestep1(data).then(res => {
                    // _this.$toast("线路发布成功");
                    _this.$router.push({
                        path: "/me/creatstep2",
                        query: {
                            id: res.id
                        }
                    });
                });
            }
        },
        //跳转套餐设置
        setmenufn() {
            let _this = this;
            let step1data = {
                type: _this.listData.type,
                mode: _this.listData.mode,
                name: _this.listData.name,
                desc: _this.listData.desc,
                limit_num: _this.listData.limit_num,
                effect_days: _this.listData.effect_days,
                price: _this.listData.price,
                price_children: _this.listData.price_children,
                commission_scale: _this.listData.commission_scale,
                becity: _this.listData.becity,
                destination: _this.listData.destination,
                venue: _this.listData.venue
            };
            this.$store.commit("step1", step1data);
            this.$router.push({
                path: "/me/setmenu"
            });
        },
        back() {
            this.$store.commit("step1", {});
            this.$router.push({
                path: "/me/line"
            });
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.path !== "/me/setmenu") {
            this.$store.state.step1 = {};
        }
        next();
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
