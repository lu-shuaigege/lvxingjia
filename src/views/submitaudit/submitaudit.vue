<template>
    <div class="submitaudit">
        <div class="wait">
            <img class="waitimg" src="@/assets/img/my/wait.png" alt />
        </div>
        <div class="title">您已提交申请</div>
        <div class="word">
            管理人员正在审核您的申请，审核
            <br />通过后将以信息方式通知您
        </div>
        <div class="gohome" @click="gohome()">回首页</div>
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
        //跳转等待审核
        gohome: function() {
            this.$router.push({
                path: "/home/index"
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "submitaudit.scss";
</style>
