<template>
    <div class="linedetails" ref="linedetails">
        <!-- 轮播图 -->
        <yd-slider class="banners" autoplay="3000">
            <yd-slider-item v-for="(item, index) in banners" :key="index">
                <img :src="imgAfterUrl + item" />
            </yd-slider-item>
        </yd-slider>
        <!-- 内容区 -->
        <div class="content">
            <!-- 最上面主要信息 -->
            <div class="top">
                <div class="titel">{{ datas.name }}</div>
                <div class="topword">{{ datas.desc }}</div>
                <div class="top-list">
                    <div class="jifen">返{{ datas.integral }}积分</div>
                    <div class="add">出发地：{{ becitys_name }}</div>
                    <div class="overadd">目的地：{{ destinations_name }}</div>
                </div>
                <div class="money">
                    <div class="moneyLeft">
                        <div class="money-left">
                            <div class="moneysp1">￥</div>
                            <div class="moneysp2">{{ datas.min_prices / 100 }}</div>
                            <div class="moneysp3">起</div>
                        </div>
                        <div
                            v-if="role==2||role==3||role==4"
                            class="commission"
                        >返佣:￥{{datas.sub_commission / 100}}</div>
                    </div>

                    <div class="money-right">
                        <div class="salesvolume"></div>
                    </div>
                    <img
                        class="islike"
                        @click="collection(1)"
                        v-show="islike == 0"
                        src="@/assets/img/Linelist/like2.png"
                    />
                    <img
                        class="islike"
                        @click="collection(0)"
                        v-show="islike == 1"
                        src="@/assets/img/Linelist/xihuan.png"
                    />
                </div>
            </div>
            <!-- 主办方 -->
            <div class="sponsor">
                <div class="sponsor-left">主办方 :</div>
                <img v-if="!have_headimgurl" :src="sponsor_headimgurl" alt />
                <img v-if="have_headimgurl" src="../../../assets/img/Linelist/defaulthead.png" />
                <div class="sponsorname" v-if="datas.sponsor==null">驴行家旅行社</div>
                <div class="sponsorname" v-if="datas.sponsor!=null">{{ datas.sponsor.realname }}</div>
            </div>
            <!-- 套餐价格 -->
            <div class="packageprice">
                <div class="packageprice-title">套餐价格</div>
                <div class="packageprice-list">
                    <div
                        :class="item.some_day == price_active? 'list-itemactive': 'list-item'"
                        @click="some_day(item.some_day,item.price,item.price_children)"
                        v-for="(item, index) in datemoney"
                        :key="index"
                    >
                        <div class="packageprice-item">
                            <div class="itemdate">{{ item.some_day }}</div>
                            <div class="itemmoney">￥{{ item.price }}</div>
                        </div>
                    </div>
                    <div class="list-item" @click="linecalendar">
                        <div class="more">查看更多</div>
                    </div>
                </div>
            </div>
            <!-- 集合地选择 -->
            <div class="address" v-show="type == 1">
                <div class="address-title">集合地选择</div>
                <div class="address-list">
                    <div class="no-address" v-show="no_address">暂无集合地</div>
                    <div
                        :class="address_activeid == item.id? 'address-item-active': 'address-item'"
                        v-for="(item, index) in address"
                        :key="index"
                        @click="address_activefn(item.id, item.address)"
                    >{{ item.address }}</div>
                </div>
            </div>
            <!-- 已报名人员 -->
            <div class="enrolment">
                <div class="enrolment-title" @click="enrolmentfn(linedetailid)">
                    <div class="enrolment-title-left">
                        <div>已报名人员</div>
                        <div class="enrolment-ok">(已报{{ sign_up_ok }}/限量{{ sign_up_max }})</div>
                    </div>
                    <img src="@/assets/img/Linelist/right.png" alt />
                </div>
                <div class="no-enrolmentlist" v-show="sign_up_ok === 0">用户正在报名中...</div>
                <div class="enrolmentlist" v-show="sign_up_ok > 0">
                    <div
                        class="enrolment-item"
                        v-for="(item, indexf) in itinerarieslist"
                        :key="indexf"
                    >
                        <img :src="item.user.headimgurl" alt />
                        <div class="name">{{ item.user.nickname }}</div>
                    </div>
                </div>
            </div>
            <!-- 景点介绍 -->
            <div class="word" ref="word">
                <div v-show="istop" class="iswordtop">
                    <div
                        :class="
                            activeid === 0 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(0)"
                    >景点介绍</div>
                    <div
                        :class="
                            activeid === 1 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(1)"
                    >行程安排</div>
                    <div
                        :class="
                            activeid === 2 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(2)"
                    >费用说明</div>
                    <div
                        :class="
                            activeid === 3 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(3)"
                    >注意事项</div>
                </div>
                <div class="wordtop" ref="wordtop">
                    <div
                        :class="
                            activeid === 0 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(0)"
                    >景点介绍</div>
                    <div
                        :class="
                            activeid === 1 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(1)"
                    >行程安排</div>
                    <div
                        :class="
                            activeid === 2 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(2)"
                    >费用说明</div>
                    <div
                        :class="
                            activeid === 3 ? 'word-item-active' : 'word-item'
                        "
                        @click="active(3)"
                    >注意事项</div>
                </div>
                <div class="word-all">
                    <div>
                        <div class="wordtitle wordtitle1">景点介绍</div>
                        <div v-show="get_detail.introduce != ''" v-html="get_detail.introduce"></div>
                        <div v-show="get_detail.introduce == ''" class="word-noword">等待添加行程介绍</div>
                    </div>
                    <div>
                        <div class="wordtitle wordtitle2">行程安排</div>
                        <div v-show="get_detail.plans != ''" v-html="get_detail.plans"></div>
                        <div v-show="get_detail.plans == ''" class="word-noword">等待添加行程介绍</div>
                    </div>
                    <div>
                        <div class="wordtitle wordtitle3">费用说明</div>
                        <div
                            v-show="get_detail.expense_explanation != ''"
                            v-html="get_detail.expense_explanation"
                        ></div>
                        <div
                            v-show="get_detail.expense_explanation == ''"
                            class="word-noword"
                        >等待添加行程介绍</div>
                    </div>
                    <div>
                        <div class="wordtitle wordtitle4">注意事项</div>
                        <div v-show="get_detail.remark != ''" v-html="get_detail.remark"></div>
                        <div v-show="get_detail.remark == ''" class="word-noword">等待添加行程介绍</div>
                    </div>
                </div>
            </div>
            <!-- 猜你喜欢 -->
            <div class="like" v-if="linePath != 1||share!=1">
                <div class="like-title">猜你喜欢</div>
                <div class="hotlist">
                    <div
                        class="hotlist-item"
                        @click="linedetails(item.id)"
                        v-for="(item, indexf) in hotlist"
                        :key="indexf"
                    >
                        <div class="hotitem-top">
                            <div class="top" v-if="!item">
                                <p>{{ item.mode | modeFilter }}</p>
                                <div class="shu"></div>
                                <p>{{ item.becitys.name }}</p>
                            </div>
                            <img :src="imgAfterUrl + item.banners[0]" alt />
                        </div>
                        <div class="hotitem-bottom">
                            <div class="hotitem-title">{{ item.name }}</div>
                            <div class="money">
                                <span class="moneysp1">￥</span>
                                <span class="moneysp2">{{item.min_prices / 100}}</span>
                                <span class="moneysp3">起</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="linePath != 1" class="buy" @click="buyfn(2)">立即预定</div>
            <div
                v-if="(linePath == 1&&status==-1)||(linePath == 1&&status==2)"
                class="tobereleased"
            >
                <div class="go_left">
                    <textarea id="bar" class="copy_textarea" v-model="copy"></textarea>
                    <button
                        class="btn release-item"
                        ref="release"
                        data-clipboard-action="cut"
                        data-clipboard-target="#bar"
                        @click="pc"
                        v-if="datas.pub_type==1"
                    ></button>
                    <div class="go_edit" @click="toEdit(linedetailid)">
                        <img src="@/assets/img/Linelist/edit.png" alt />
                        <div class="go_edit_text">编辑</div>
                    </div>
                    <div class="shu"></div>
                    <div class="go_edit go_del" @click="del(linedetailid)">
                        <img src="@/assets/img/Linelist/del.png" alt />
                        <div class="go_edit_text">删除</div>
                    </div>
                </div>
                <div class="go_tight" @click="publish(linedetailid)">立即发布</div>
            </div>
            <!-- <div v-if="linePath == 1" class="buy" @click="toEdit(linedetailid)">编辑</div> -->
            <div v-if="linePath == 1&&status==1" class="buy" @click="offline(linedetailid)">立即下架</div>
        </div>
        <div class="popup" v-show="delShow == 1">
            <div class="contents">
                <div class="con-word">是否确认删除?</div>
                <div class="con-bottom">
                    <div class="nook" @click="popup(0)">取消</div>
                    <div class="isok" @click="popup(1)">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import functions from "@/utils/functions.js";
// 微信
import apiWechat from "@/api/wechat";
import weixinSdk from "weixin-js-sdk";
import Clipboard from "clipboard";
export default {
    data() {
        return {
            imgAfterUrl: process.env.VUE_APP_IMGURL, //地址前缀
            role: "",
            islike: 0, //是否收藏
            type: "", //收藏类型，1 游记 2 线路 3门票 4酒店
            mode: "", //出游方式 1户外游 2自由行 3摄影游 4亲子游 5跟团游
            rotation_time: 0, //轮播时间
            linedetailid: "", //线路id
            banners: [], // 轮播图
            datas: { sponsor: {} }, //获取数据
            becitys_name: "", //出发地
            destinations_name: "", //目的地
            sponsor_headimgurl: "", //主办方头像
            sponsor_nickname: "", //主办方昵称
            datemoney: [], //套餐价格列表
            price_active: "", //价格套餐选中状态
            address: [], //集合地
            no_address: false, //暂无集合地
            // address_active: 0, //集合地选中状态
            address_activeid: "", //集合地选中状态
            dates: "", //选择出行的日期
            itinerarieslist: [], //已报名人员列表
            sign_up_ok: 0, //已经报名人数
            sign_up_max: 0, //最多几人
            activeid: 0, //点击介绍
            get_detail: {}, //全部简介
            hotlist: [], // 热门推荐
            istop: false, //是否吸顶显示
            linePath: 0, //判断是否从我的线路进来
            share: "", //是不是分享的页面
            status: "", //当前线路的状态
            delShow: 0, //删除确认弹框
            prices: [], //页面设置价钱的数组
            btn_height: 0, //线路介绍按钮高度
            pub_type: 0, //发布端1pc   2手机
            copy: "", //复制内容
            uk: "", //用户id
            ukok: false,
            ak: "", //线路id
            akok: false,

            some_days: "", //选择日期
            price: "", //选择日期的成人价格
            price_children: "", //选择日期的儿童价格
            resort: "", //集合地
            have_headimgurl: false, //是否是后台主办方
            share_code: "", //分享码
            is_share_code: false //是否打开的分享链接
        };
    },
    components: {},
    watch: {},
    created() {
        this.linedetailid = localStorage.getItem("linedetailid");
        this.linedetailid = this.$route.query.id;
        this.type = this.$route.query.type;
        if (this.$route.query.mode) {
            this.mode = this.$route.query.mode;
        }
        this.linePath = this.$route.query.linePath;
        // this.share = this.$route.query.share;
        this.share_code = this.$route.query.share_code;
        this.status = this.$route.query.status;
        this.dates = this.$route.query.dateStr;
        this.price_active = this.dates;
        if (this.dates == undefined) {
            this.dates = "";
        }
        var hrefindex = location.href.indexOf("share_code=");
        if (hrefindex != -1) {
            this.is_share_code = true;
            this.share_code = location.href.slice(
                hrefindex + 11,
                hrefindex + 19
            );
        }
        this.itinerariesdetail(this.linedetailid);
        this.itinerarieslistfn();
        this.getlinelist();
        this.$wechat.timeline(true);
        this.$wechat.init(
            true,
            this.linedetailid,
            this.mode,
            this.type,
            this.share_code,
            this.datas.name,
            this.datas.desc,
            this.banners[0]
        );
        this.getMyInfo();
    },
    mounted() {
        // 监听事件
        window.addEventListener("scroll", this.handleScroll);
        if (this.linePath == 1) {
            this.$refs.word.style.margin = "0.253rem 0 1.5rem";
        }
        this.btn_height = $(".iswordtop").height();
        if (this.linePath == 1 && this.pub_type == 2) {
            this.$refs.release.style.display = "none";
        }
    },
    updated() {
        // jquery方法修改
        // $(".word-all")
        //     .find("div")
        //     .find("div")
        //     .find("img")
        //     .css("width", "100%");
        // jquery方法修改
        $(".word-all")
            .find("div")
            .find("div")
            .find("p")
            .css({ "white-space": "pre-wrap", "word-break": "break-all" });
    },
    methods: {
        //获取日期
        getDate(datesList) {
            var dateList = [];
            // for (let i = 0; i < 7; i++) {
            //     let datesTime = new Date();
            //     datesTime.setDate(datesTime.getDate() + i);
            //     let istime = functions.fmtDate(datesTime, "yyyy-MM-dd");
            //     for (let z = 0; z < datesList.length; z++) {
            //         // if (datesList[z].is_default == 1) {
            //         //     dateList.push({
            //         //         some_day: istime,
            //         //         price: datesList[z].price / 100,
            //         //         price_children: datesList[z].price_children / 100
            //         //     });
            //         // }
            //         if (datesList[z].is_default == 1) {
            //             dateList.push({
            //                 some_day: istime,
            //                 price: "暂无套餐"
            //             });
            //         }
            //     }
            //     for (let y = 0; y < datesList.length; y++) {
            //         if (datesList[y].some_day == dateList[i].some_day) {
            //             dateList[i].price = datesList[y].price / 100;
            //             dateList[i].price_children =
            //                 datesList[y].price_children / 100;
            //         }
            //     }
            // }
            for (let y = 0; y < 6; y++) {
                if (datesList[y]) {
                    dateList.push({
                        some_day: datesList[y].some_day,
                        price: datesList[y].price / 100,
                        price_children: datesList[y].price_children / 100
                    });
                }
            }
            this.datemoney = dateList;
        },

        //监听滚动条吸顶效果
        handleScroll: function() {
            let wordtop = $(".word").offset().top - $(window).scrollTop();
            if (wordtop <= 0) {
                this.istop = true;
            } else {
                this.istop = false;
            }
            let wordtitle1 =
                $(".wordtitle1").offset().top -
                $(window).scrollTop() -
                this.btn_height;
            let wordtitle2 =
                $(".wordtitle2").offset().top -
                $(window).scrollTop() -
                this.btn_height;
            let wordtitle3 =
                $(".wordtitle3").offset().top -
                $(window).scrollTop() -
                this.btn_height;
            let wordtitle4 =
                $(".wordtitle4").offset().top -
                $(window).scrollTop() -
                this.btn_height;
            //此处加2是为了解决点击按钮定位完成以后按钮状态不对的问题
            let viewScroll = $(window).scrollTop() + this.btn_height + 2;
            if (viewScroll > $(".wordtitle1").offset().top) {
                this.activeid = 0;
            }
            if (viewScroll > $(".wordtitle2").offset().top) {
                this.activeid = 1;
            }
            if (viewScroll > $(".wordtitle3").offset().top) {
                this.activeid = 2;
            }
            if (viewScroll > $(".wordtitle4").offset().top) {
                this.activeid = 3;
            }
        },
        //请求线路详情
        itinerariesdetail: function(id) {
            let _this = this;
            this.$api.itineraries.show(id, "", _this.share_code).then(res => {
                let hots = res;
                _this.banners = hots.banners; //轮播图
                _this.datas = hots; //页面所有数据
                // if (_this.is_share_code) {
                _this.share_code = _this.datas.share_code; //分享码
                // }
                _this.type = _this.datas.type; //收藏类型，1 游记 2 线路 3门票 4酒店
                _this.becitys_name = _this.datas.becitys.name; //出发地
                _this.destinations_name = _this.datas.destinations.name; //目的地
                _this.pub_type = _this.datas.pub_type; //是否手机发布
                _this.prices = hots.prices; //时间套餐价格列表
                let prices = hots.prices; //时间套餐价格列表
                _this.address = hots.venue; //集合地列表
                _this.get_detail = res.detail; //页面详细简介
                if (_this.datas.sponsor != null) {
                    _this.have_headimgurl = false;
                    _this.sponsor_headimgurl = _this.datas.sponsor.headimgurl; //头像
                    _this.sponsor_nickname = _this.datas.sponsor.nickname; //昵称
                } else {
                    _this.have_headimgurl = true; //头像
                    _this.sponsor_nickname = "我爱户外国际旅行社"; //昵称
                }
                //判断报名人数
                if (hots.prices.length == 0) {
                    _this.sign_up_max = 0;
                } else {
                    _this.sign_up_max = hots.prices[0].limit_num;
                }
                //判断是否收藏
                if (_this.datas.is_collection === 1) {
                    _this.islike = 1;
                }
                //判断是否有集合地
                if (_this.address.length == 0) {
                    _this.no_address = true;
                } else {
                    _this.no_address = false;
                }
                //获取时间比对价格
                _this.getDate(prices);
                _this.$wechat.init(
                    true,
                    _this.linedetailid,
                    _this.mode,
                    _this.type,
                    _this.share_code,
                    _this.datas.name,
                    _this.datas.desc,
                    _this.banners[0]
                );
            });
        },
        //跳转日历
        linecalendar() {
            this.$router.push({
                path: "/linecalendar",
                query: {
                    id: this.linedetailid,
                    mode: this.mode,
                    type: this.type
                }
            });
        },
        //价格套餐选中状态
        some_day(some_day, price, price_children) {
            let datesTime = new Date();
            let istime = functions.fmtDate(datesTime, "yyyy-MM-dd");
            if (price == "暂无套餐") {
                this.$toast("暂无套餐");
                return;
            }
            if (some_day == istime) {
                this.$toast("当天不可购");
                return;
            }
            this.price_active = some_day;
            this.some_days = some_day;
            this.dates = some_day;
            this.price = price;
            this.price_children = price_children;
            for (let i = 0; i < this.prices.length; i++) {
                if (some_day == this.prices[i].some_day) {
                    this.sign_up_max = this.prices[i].limit_num;
                }
            }
            this.itinerarieslistfn();
        },
        //点击收藏
        collection: function(collection) {
            this.$api.collection.index(2, this.linedetailid).then(res => {
                if (res === null) {
                    this.islike = collection;
                }
            });
        },
        //选择出发地
        address_activefn: function(id, resort) {
            this.address_activeid = id;
            this.resort = resort;
        },
        //已报名人员列表
        itinerarieslistfn: function() {
            let _this = this;
            this.$api.itineraries
                .enroll(_this.linedetailid, 1, _this.dates)
                .then(res => {
                    _this.sign_up_ok = res.enroll_num;
                    _this.itinerarieslist = res.data;
                    if (_this.sign_up_ok === null) {
                        _this.sign_up_ok = 0;
                    }
                });
        },
        // 跳转已报名人员列表
        enrolmentfn: function(id) {
            this.$router.push({
                path: "/home/line/enrolmentstaff",
                query: {
                    id: id,
                    dates: this.dates
                }
            });
        },
        // 点击介绍
        active: function(activeid) {
            this.activeid = activeid;
            // 页面滚动到指定位置
            if (activeid == 0) {
                $("html,body").animate(
                    {
                        scrollTop:
                            $(".wordtitle1").offset().top - this.btn_height
                    },
                    0
                );
            }
            if (activeid == 1) {
                $("html,body").animate(
                    {
                        scrollTop:
                            $(".wordtitle2").offset().top - this.btn_height
                    },
                    0
                );
            }
            if (activeid == 2) {
                $("html,body").animate(
                    {
                        scrollTop:
                            $(".wordtitle3").offset().top - this.btn_height
                    },
                    0
                );
            }
            if (activeid == 3) {
                $("html,body").animate(
                    {
                        scrollTop:
                            $(".wordtitle4").offset().top - this.btn_height
                    },
                    0
                );
            }
            setTimeout(() => {
                this.activeid = activeid;
            }, 50);
        },
        // 跳转购买输入信息页面
        buyfn(id) {
            if (this.some_days == "") {
                this.$toast("请选择出行日期");
                return;
            }
            if (this.resort == "" && this.type == 1) {
                this.$toast("请选择集合地");
                return;
            }
            let surplus_num = this.sign_up_max - this.sign_up_ok;
            //判断散客-团队
            let goodsDeatilsInfo = {
                some_day: this.some_days, //出行日期
                price: this.price, //成人价格
                price_children: this.price_children, //儿童价格
                address_activeid: this.address_activeid,//集合地id
                resort: this.resort, //集合地
                obj_id: this.linedetailid, //线路id
                type: 1, //类型 1散客 2团体
                order_type: 3, //类型 1门票 2酒店 3线路
                name: this.datas.name, //详情名字
                count: this.adultnum, //数量
                surplus_num: surplus_num, //还有多少票
                share_code: this.share_code //分享码
            };

            this.$router.push({
                path: "/ticketbooking",
                query: { goodsDetailsInfo: JSON.stringify(goodsDeatilsInfo) }
            });
        },

        //请求线路列表猜你喜欢
        getlinelist: function() {
            let _this = this;
            if (
                _this.type === undefined ||
                _this.type === "" ||
                _this.type === null
            ) {
                _this.type = "";
            }
            if (_this.linetype === undefined) {
                _this.linetype = "";
            }
            if (!_this.mode) {
                _this.mode = "";
            }
            _this.$api.itineraries
                .index(_this.type, "", 1, "", "", _this.mode, "")
                .then(res => {
                    _this.hotlist = [];
                    let hots = res.data;
                    // for (let i = 0; i < 4; i++) {
                    //     _this.hotlist.push(hots[i]);
                    // }
                    _this.hotlist = hots.slice(0, 4);
                });
        },
        //猜你喜欢跳转线路详情
        linedetails: function(id) {
            this.linedetailid = id;
            localStorage.setItem("linedetailid", id);
            this.itinerariesdetail(id);
            this.itinerarieslistfn();
            this.$refs.linedetails.scrollIntoView();
        },
        //编辑
        toEdit(id) {
            this.$router.push({
                path: "/me/creatstep1",
                query: {
                    id: id
                }
            });
        },
        // 获取用户信息
        getMyInfo: function() {
            this.$api.user.me().then(res => {
                this.role = res.role;
                localStorage.setItem("role", res.role);
                this.user_id = res.id;
                this.$api.user
                    .encryption({ eptnum: this.user_id })
                    .then(res => {
                        this.uk = res.data.eptstr;
                        this.ukok = true;
                        this.copy = `${this.imgAfterUrl}/Itinerary/index/uk/${this.uk}/ak/${this.ak}.html`;
                    });
                this.$api.user
                    .encryption({ eptnum: this.linedetailid })
                    .then(res => {
                        this.akok = true;
                        this.ak = res.data.eptstr;
                        this.copy = `${this.imgAfterUrl}/Itinerary/index/uk/${this.uk}/ak/${this.ak}.html`;
                    });
            });
        },
        //生成链接到pc发布
        pc() {
            if (this.ukok && this.akok) {
                var clipboard = new Clipboard(".btn");
                clipboard.on("success", e => {
                    // success("复制成功"); //这里你如果引入了elementui的提示就可以用，没有就注释即可
                    this.$toast("已复制到剪切板，请粘贴网址发布");
                    // 释放内存
                    clipboard.destroy();
                });
                clipboard.on("error", e => {
                    // 不支持复制
                    console.log("该浏览器不支持自动复制");
                    // 释放内存
                    clipboard.destroy();
                });
                console.log(this.copy);
                // this.$toast("已复制到剪切板，请粘贴网址发布");
            } else {
                this.$toast("接口加载中，请稍加等待后再试");
            }
        },
        //删除
        del() {
            this.delShow = 1;
        },
        //删除确认弹框
        popup(x) {
            if (x == 1) {
                this.delShow = 0;
                this.$api.itinerary.delete(this.linedetailid).then(res => {
                    this.$toast("线路删除成功");
                });
            } else if (x == 0) {
                this.delShow = 0;
            }
        },
        //线路下架
        offline(id) {
            this.$api.itinerary.offline(id).then(res => {
                this.$toast("线路下架成功");
                setTimeout(() => {
                    this.$router.push({
                        path: "/me/line"
                    });
                }, 500);
            });
        },
        publish(id) {
            this.$api.itinerary.publish(id).then(res => {
                this.$toast("线路上架成功");
                setTimeout(() => {
                    this.$router.push({
                        path: "/me/line"
                    });
                }, 500);
            });
        }
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>
<style lang="scss" scoped>
@import "index";
// .yd-slider.banners > div.yd-slider-pagination {
//     bottom: 0.3rem !important;
// }
</style>
