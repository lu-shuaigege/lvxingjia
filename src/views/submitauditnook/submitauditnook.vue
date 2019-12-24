<template>
    <div class="submitauditnook">
        <div class="wait">
            <img class="waitimg" src="@/assets/img/my/nook.png" alt />
        </div>
        <div class="title">审核失败</div>
        <div class="word">备注 : {{ fail_cause }}</div>
        <div class="btn" @click="myfn()">重新申请入驻</div>
        <div class="wordb">
            请您核实资料后重新上传，
            <br />有任何问题，可联系平台客服： <br />400 1234 1234
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: "", //申请入入驻类型
            fail_cause: "" //驳回备注
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.type = this.$route.query.type;
        this.fail_cause = this.$route.query.fail_cause;
    },
    methods: {
        //跳转申请入驻页面
        myfn() {
            this.$router.push({
                name: "applyclub",
                query: {
                    type: this.type,
                    again: 1
                }
            });
        }

        // myfn: function() {
        //   if (this.type == 2) {
        //      this.$router.push({
        //             name: "applypartners",
        //           });
        //   }else if (this.type == 3) {
        //      this.$router.push({
        //             name: "applybranch",
        //           });
        //   }else if (this.type == 4) {
        //       this.$router.push({
        //             name: "applyclub",
        //           });
        //   }

        // }
    }
};
</script>
<style lang="scss" scoped>
@import "submitauditnook.scss";
</style>
