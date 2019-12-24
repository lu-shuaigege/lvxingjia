<template>
    <div class="applySettledin">
        <img class="lista" src="@/assets/img/my/inapply.png" alt />
        <div
            class="list"
            @click="toApply(item.id, item.can_apply)"
            v-for="(item, index) in list"
            :key="index"
        >
            <div class="list-left">
                <img :src="item.img" alt />
            </div>
            <div class="list-right">
                <div class="list-right-top">{{ item.title }}</div>
                <div class="list-right-bottom">
                    {{ item.content }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ContactCard } from "vant";
export default {
    status: "", //审核类型
    can_apply: "", //申请状态
    data() {
        return {
            list: [
                {
                    id: 2,
                    can_apply: 0,
                    img: require("@/assets/img/my/cooperation.png"),
                    title: "合作伙伴申请认证",
                    content: "线上接单,订单量大,无需风里雨里"
                },
                {
                    id: 3,
                    can_apply: 0,
                    img: require("@/assets/img/my/branchoffice.png"),
                    title: "分公司申请认证",
                    content: "线上接单,订单量大,无需风里雨里"
                },
                {
                    id: 4,
                    can_apply: 0,
                    img: require("@/assets/img/my/exit.png"),
                    title: "出境社申请认证",
                    content: "线上接单,订单量大,无需风里雨里"
                }
            ],
            can_apply_list: [] //申请状态列表
        };
    },
    created() {
        this.$wechat.timeline(false);
        this.apply();
    },
    components: {},
    methods: {
        // 获取是否可申请状态
        apply() {
            let _this = this;
            _this.$api.settled_in.show().then(res => {
                _this.can_apply_list = res;
                for (let i = 0; i < _this.list.length; i++) {
                    for (let y = 0; y < _this.can_apply_list.length; y++) {
                        if (_this.list[i].id == _this.can_apply_list[y].type) {
                            _this.list[i].can_apply =
                                _this.can_apply_list[y].can_apply;
                        }
                    }
                }
            });
        },
        // 点击申请
        toApply(id, can_apply) {
            if (can_apply == 0) {
                this.$router.push({
                    path: "applyclub",
                    query: {
                        type: id
                    }
                });
                return;
            }
            if (can_apply == 1) {
                this.$toast("有审核中的申请，当前不可申请");
            }
            if (can_apply == 2) {
                this.$toast(
                    "有比当前申请类型更高的类型并且已审核通过，当前不可申请"
                );
            }
            if (can_apply == 3) {
                this.$router.push({
                    path: "submitauditok",
                    query: {
                        type: id
                    }
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "applySettledin.scss";
</style>
