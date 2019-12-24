<template>
    <div class="modifynikename">
        <div class="top">
            <div class="top-left">昵称</div>
            <div class="top-right">
                <input
                    type="text"
                    v-model="nickname"
                    placeholder="请输入昵称"
                />
                <img src="@/assets/img/my/no.png" alt />
            </div>
        </div>
        <div class="ok" @click="okfn()">保存</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nickname: ""
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.nickname = this.$route.query.nickname;
    },
    methods: {
        okfn: function() {
            localStorage.setItem("nickname", this.nickname);
            this.$router.push({
                path: "/me/edit",
                nickname: this.nickname
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
