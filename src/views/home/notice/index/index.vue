<template>
    <div class="notice">
        <!-- 列表数据加载更多 -->
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            ref="linelist"
        >
            <div
                class="item"
                v-for="(item, index) in list"
                :key="index"
                @click="details(item.id, item.type, item.is_read, item.href)"
            >
                <div class="messageimg">
                    <div v-show="item.is_read === 0" class="have-message"></div>
                    <img
                        v-show="
                            item.type == 1 ||
                                item.type == 2 ||
                                item.type == 3 ||
                                item.type == 4 ||
                                item.type == 5 ||
                                item.type == 6
                        "
                        src="@/assets/img/news/xiaoxi.png"
                    />
                    <img
                        v-show="
                            item.type == 7 || item.type == 8 || item.type == 9
                        "
                        src="@/assets/img/news/single.png"
                    />
                </div>

                <div class="right">
                    <div class="top">
                        <div class="name">{{ item.content.title }}</div>
                        <div class="time">{{ item.created_at }}</div>
                    </div>
                    <div class="word">{{ item.content.message }}</div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newsdetailid: 0,
            nolinelist: false, //没有数据
            have_message: false, //是否未读
            page: 1,
            list: [],
            loading: false,
            finished: false
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
    },
    methods: {
        //跳转详情页
        details: function(id, type, is_read, detailsId) {
            this.$api.message.signMessage(id).then(res => {
                this.$toast(res.message);
            });
            if (type === 1) {
                this.$router.push({
                    path: "/me/submitauditok",
                    query: {
                        id: detailsId
                    }
                });
            }
            if (type === 2) {
                this.$router.push({
                    path: "/me/submitauditnook",
                    query: {
                        id: detailsId
                    }
                });
            }
            if (type === 3) {
                this.$toast(
                    "您好，您的提现申请审核通过，款项将在1-2个工作日内转账完成，请您耐心等待…	"
                );
            }
            if (type === 4) {
                this.$toast(
                    "抱歉，您的提现申请已被驳回，如有问题，请及时联系平台管理员。"
                );
            }
            if (type === 5) {
                this.$router.push({
                    path: "/me/fans",
                    query: {
                        id: detailsId
                    }
                });
            }
            if (type === 6) {
                this.$router.push({
                    path: "/travels/show",
                    query: {
                        id: detailsId
                    }
                });
            }
            if (type === 7) {
                this.$router.push({
                    path: "/orders/show",
                    query: {
                        id: detailsId
                    }
                });
            }
            if (type === 8) {
                this.$router.push({
                    path: "/me/wallet",
                    query: {
                        id: detailsId
                    }
                });
            }
            if (type === 9) {
                this.$router.push({
                    path: "/me/wallet",
                    query: {
                        id: detailsId
                    }
                });
            }
        },

        onLoad() {
            this.$api.message.index("0", this.page).then(res => {
                this.page++;
                this.loading = false;
                if (res.data.length == 0) {
                    this.finished = true;
                } else {
                    this.list = this.list.concat(res.data);
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
