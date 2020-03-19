<template>
    <div class="travelsdetail">
        <!-- banner图 -->
        <div class="banners">
            <img class="banners-img" :src="imgAfterUrl + data.cover_img" />
        </div>
        <!-- 内容区 -->
        <div class="content">
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
            <div class="content-top">
                <div class="content-top-top">
                    <div class="nikename-top">
                        <img :src="data.publisher.headimgurl" class="headportrait" />
                        <div class="nikename">{{ data.publisher.nickname }}</div>
                    </div>
                    <div class="title">{{ data.name }}</div>
                </div>
                <!-- <div class="content-top-bottom">{{ top.word }}</div> -->
                <div class="word-content">
                    <div v-for="(item, index) in data.content" :key="index" class="con-item">
                        <pre
                            name="travels"
                            id="travels"
                            class="travels"
                            :value="item"
                            v-html="item"
                            v-if="item.indexOf('.jpg')==-1&&item.indexOf('.jpeg')==-1&&item.indexOf('.png')==-1&&item.indexOf('.gif')==-1&&item.indexOf('.bmp')==-1&&item.indexOf('.pic')==-1"
                        ></pre>
                        <div
                            class="con-img"
                            v-if="!(item.indexOf('.jpg')==-1&&item.indexOf('.jpeg')==-1&&item.indexOf('.png')==-1&&item.indexOf('.gif')==-1&&item.indexOf('.bmp')==-1&&item.indexOf('.pic')==-1)"
                        >
                            <img
                                v-if="item.indexOf('.jpg')!=-1||item.indexOf('.jpeg')!=-1||item.indexOf('.png')!=-1||item.indexOf('.gif')!=-1||item.indexOf('.bmp')!=-1||item.indexOf('.pic')==-1"
                                :src="imgAfterUrl + item"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-bottom">
                <div class="bottom-title">热门评论</div>
                <div class="me">
                    <input
                        type="text"
                        class="meinput"
                        v-model="content"
                        @click="newComment()"
                        placeholder="请输入内容"
                    />
                    <div class="submission" @click="gocomment()">提交</div>
                </div>
                <div class="commentlist" v-for="(item, index) in data.comments" :key="index">
                    <div class="item-top">
                        <div class="item-top-left">
                            <img :src="item.publisher.headimgurl" class="item-headportrait" />
                            <div class="item-title">{{ item.publisher.nickname }}</div>
                        </div>
                        <div class="date">{{ item.created_at }}</div>
                    </div>
                    <div class="itemword">{{ item.content }}</div>
                </div>
                <div class="end" @click="endfn()">
                    <div class="endword">查看全部评论({{ commentnum }})</div>
                    <img class="right" src="@/assets/img/releasetravels/right.png" />
                </div>
            </div>
        </div>
        <div class="sharepopup" ref="sharepopup">
            <div class="sharepopup-con">
                <div class="sharepopup-con-top">
                    <div class="sharepopup-con-left">
                        <img src="@/assets/img/releasetravels/weixin.png" alt />
                        <div class="sharepopup-con-left-title">微信好友</div>
                    </div>
                    <div class="sharepopup-con-right">
                        <img src="@/assets/img/releasetravels/pengyouquan.png" />
                        <div class="sharepopup-con-left-title">微信朋友圈</div>
                    </div>
                </div>
                <div class="sharepopup-con-bottom" @click="sharepopupdownfn(0)">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            commentnum: 0, //评论数量
            travelsdetail_id: "", //游记id
            islike: 0, //收藏
            type: 1, //收藏类型，1 游记 2 线路 3门票 4酒店
            content: "", //评论内容
            data: {
                publisher: {
                    headimgurl: ""
                }
            }, //获取数据
            imgAfterUrl: process.env.VUE_APP_IMGURL, //图片前缀
            commentlist: []
        };
    },
    components: {},
    watch: {},
    created() {
        this.travelsdetail_id = this.$route.query.id;
        this.show();
        this.comment();
        this.$wechat.timeline(true);
    },
    methods: {
        //点击收藏
        collection: function(collection) {
            this.$api.collection
                .index(this.type, this.travelsdetail_id)
                .then(res => {
                    if (res == null) {
                        this.islike = collection;
                    }
                });
        },
        //详情
        show() {
            this.$api.travelnotes.show(this.travelsdetail_id).then(res => {
                this.data = res;
                this.islike = res.is_collection;
            });
        },
        //评论列表
        comment() {
            this.$api.travelnotes.comment(this.travelsdetail_id).then(res => {
                this.commentnum = res.length;
            });
        },
        //评论
        newComment() {
            //手机键盘回车搜索
            let _this = this;
            $(".meinput").on("keypress", function(e) {
                var keycode = e.keyCode;
                if (keycode == "13") {
                    _this.gocomment();
                }
            });
        },
        // 评论
        gocomment() {
            let _this = this;
            if (_this.content != "") {
                _this.$api.travelnotes
                    .newComment(_this.content, _this.travelsdetail_id, "")
                    .then(res => {
                        if (res == null) {
                            _this.content = "";
                            _this.$toast("评论成功");
                            _this.comment();
                            _this.show();
                        }
                    });
            }
        },
        // 跳转评论列表
        endfn: function() {
            //路由跳转携带参数
            this.$router.push({
                path: "/commentlist",
                query: {
                    id: this.travelsdetail_id
                }
            });
        },
        // 分享弹框
        sharepopupdownfn: function(x) {
            if (x == 0) {
                this.$refs.sharepopup.style.top = "100vh";
            } else if (x == 1) {
                this.$refs.sharepopup.style.top = "0px";
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
