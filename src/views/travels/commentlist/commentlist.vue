<template>
    <div class="commentlists">
        <div class="content-bottom">
            <!-- 评论列表 -->
            <div
                class="commentlist"
                v-for="(item, index) in commentlist"
                :key="index"
            >
                <div class="item-top">
                    <div class="item-top-left">
                        <img
                            :src="item.publisher.headimgurl"
                            class="item-headportrait"
                        />
                        <div class="item-title">
                            {{ item.publisher.nickname }}
                        </div>
                    </div>
                    <div class="date">{{ item.created_at }}</div>
                </div>
                <div
                    class="itemword"
                    @click="clickFocus(item.id, item.publisher.nickname)"
                >
                    {{ item.content }}
                </div>
                <!-- 回复评论 -->
                <div
                    class="commentreply"
                    v-for="(items, indexa) in item.reply"
                    :key="indexa"
                >
                    <div class="item-top">
                        <div class="item-top-left">
                            <img
                                :src="items.publisher.headimgurl"
                                class="item-headportrait"
                            />
                            <div class="item-title">
                                {{ items.publisher.nickname }}
                            </div>
                            <img
                                v-show="items.id == 1"
                                class="isme"
                                src="@/assets/img/releasetravels/landlord.png"
                            />
                        </div>

                        <div class="date">{{ items.created_at }}</div>
                    </div>
                    <div
                        class="itemword commentreplyword"
                        @click="clickFocus(item.id, item.publisher.nickname)"
                    >
                        {{ items.content }}
                    </div>
                </div>
            </div>
        </div>
        <div class="commentinput">
            <div class="commentinput-con">
                <img
                    class="commentimg"
                    src="@/assets/img/releasetravels/commentimg.png"
                />
                <input
                    type="text"
                    ref="input"
                    @click="newComment()"
                    v-model="content"
                    class="commentinput-input"
                    :placeholder="placeholder"
                />
            </div>
            <div class="submission" @click="gocomment()">
                提交
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            travelsdetail_id: 0, //游记id
            commentlist: [], //获取评论列表
            comment_id: "", //被回复评论id
            content: "", //内容
            placeholder: "我要评论"
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.travelsdetail_id = this.$route.query.id;
        this.comment();
    },
    watch: {},
    methods: {
        //评论列表
        comment() {
            this.$api.travelnotes.comment(this.travelsdetail_id).then(res => {
                this.commentlist = res;
            });
        },
        //评论
        newComment() {
            //手机键盘回车搜索
            let _this = this;
            $(".commentinput-input").on("keypress", function(e) {
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
                    .newComment(
                        _this.content,
                        _this.travelsdetail_id,
                        _this.comment_id
                    )
                    .then(res => {
                        if (res == null) {
                            _this.content = "";
                            _this.$toast("评论成功");
                            _this.comment();
                        }
                    });
            }
        },
        //点击评论聚焦输入框
        clickFocus(id, nickname) {
            this.$refs.input.focus();
            this.comment_id = id;
            this.placeholder = `回复${nickname}`;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "commentlist.scss";
</style>
