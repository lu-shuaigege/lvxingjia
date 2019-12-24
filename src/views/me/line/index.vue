<template>
    <div class="lines">
        <div class="release">
            <!-- Target -->
            <textarea id="bar" class="copy_textarea" v-model="copy"></textarea>
            <div class="release-item" @click="releasefn()">发布</div>
            <div class="release-center"></div>
            <!-- Trigger -->
            <button
                class="btn release-item"
                data-clipboard-action="cut"
                data-clipboard-target="#bar"
                @click="pc"
            >去pc发布</button>
        </div>
        <div class="list">
            <div class="noline" v-if="finished && !list.length">
                <div>
                    <img alt src="@/assets/img/Linelist/noline.png" />
                </div>
            </div>
            <van-list
                v-if="!finished || list.length"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div class="item" v-for="(item, index) in list" :key="index">
                    <div class="left">
                        <div class="left-top">
                            <p>{{ item.mode | modeFilter }}</p>&nbsp;|&nbsp;
                            <p v-if="item.type != 1">{{ item.becitys.name }}</p>
                            <p v-if="item.type == 1">{{ item.destinations.name }}</p>
                        </div>
                        <div v-if="item.status != 0" @click="del(item.id)" class="del">
                            <img src="@/assets/img/my/delicon.png" alt />
                        </div>
                        <img :src="imgAfterUrl + item.banners[0]" alt />
                    </div>
                    <div class="right" @click="toDetail(item.id, item.status)">
                        <div class="title">{{ item.type | typeFilter }} • {{ item.name }}</div>
                        <div class="word">{{ item.desc }}</div>
                        <div class="integral">返{{ item.integral }}积分</div>
                        <div class="money">
                            <div class="money-left">
                                <div class="moneysp1">￥</div>
                                <div class="moneysp2">{{ item.min_prices / 100 }}</div>
                                <div class="moneysp3">起</div>
                            </div>
                            <div class="money-right">
                                <div class="ok">{{ item.status | lineStatus }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
        <div class="popup" v-show="delShow == 1">
            <div class="content">
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
import Clipboard from "clipboard";
export default {
    data() {
        return {
            delShow: 0, //删除确认
            list: [],
            id: "", //线路列表详情id
            loading: false,
            finished: false,
            page: 1,
            user_id: 0, //用户id
            copy: "", //复制内容
            imgAfterUrl: process.env.VUE_APP_BASE_API
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.getMyInfo();
    },
    mounted() {},
    methods: {
        onLoad() {
            this.$api.itinerary.myTineraries(this.page).then(res => {
                this.page++;
                this.loading = false;
                if (res.data.length == 0) {
                    this.finished = true;
                } else {
                    this.list = this.list.concat(res.data);
                }
            });
        },
        //跳转线路详情页
        toDetail: function(id, status, mode, type) {
            localStorage.setItem("linedetailid", id);
            if (status === 0) {
                this.$router.push({
                    path: "/home/line/show",
                    query: {
                        id: id,
                        linePath: 1
                    }
                });
            }
            if (status === 1 || status === -1) {
                this.$router.push({
                    path: "/home/line/show",
                    query: {
                        linePath: 1,
                        status: status,
                        id: id,
                        mode: mode,
                        type: type
                    }
                });
            } else if (status === 2) {
                this.$router.push({
                    path: "/me/creatstep1",
                    query: {
                        id: id
                    }
                });
            }
        },
        //跳转发布线路
        releasefn: function() {
            this.$router.push({
                path: "/me/creatstep1"
            });
        },
        // 获取用户信息
        getMyInfo: function() {
            this.$api.user.me().then(res => {
                this.user_id = res.id;
                this.copy = `http://travel.admin.dev.zhangxinkeji.com/Itinerary/index/userId/${this.user_id}.html`;
            });
        },
        //生成链接到pc发布
        pc() {
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
        },
        //删除
        del(id) {
            let _this = this;
            _this.delShow = 1;
            _this.id = id;
        },
        //删除确认弹框
        popup(x) {
            if (x == 1) {
                this.delShow = 0;
                this.$api.itinerary.delete(this.id).then(res => {
                    this.$toast("线路删除成功");
                    this.list = [];
                    this.page = 1;
                    this.onLoad();
                });
            } else if (x == 0) {
                this.delShow = 0;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
