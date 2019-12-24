<template>
    <div class="submitauditok">
        <div class="wait">
            <img class="waitimg" src="@/assets/img/my/ok.png" alt />
        </div>
        <div class="title">审核成功!</div>
        <div class="word">恭喜您成为平台的合作伙伴!</div>
        <div class="btn" @click="myfn()">进入我的首页</div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
    },
    methods: {
        //axios请求
        pagination: function() {
            this.$api.get(
                "cases",
                {
                    page: this.page,
                    per_page: 12
                },
                response => {
                    if (response.status >= 200 && response.status < 300) {
                        let data = response.data.data.data;
                        for (var index in data) {
                            this.imglist.push(data[index]);
                        }

                        this.total = response.data.data.total;
                        this.display = response.data.per_page;
                        this.current_page = response.data.current_page;
                        this.last_page = response.data.last_page;
                        if (this.current_page == this.last_page) {
                            this.updown = "- 我也是有底线的 -";
                        }
                    }
                }
            );
        },
        //跳转我的首页
        myfn: function() {
            this.$router.push({
                path: "my"
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "submitauditok.scss";
</style>
