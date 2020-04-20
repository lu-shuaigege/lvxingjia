<template>
    <div class="budgetdetailed">
        <div class="top">
            <div
                :class="type == item.id ? 'itemactive' : 'item'"
                v-for="(item,index) in toptab"
                :key="index"
                @click="itemactivefn(item.id)"
            >{{item.name}}</div>
            <!-- <div class="shu"></div> -->
            <!-- <div :class="type == 2 ? 'itemactive' : 'item'" @click="itemactivefn(2)">分佣收益</div>
            <div class="shu"></div>
            <div :class="type == 3 ? 'itemactive' : 'item'" @click="itemactivefn(3)">提现记录</div>-->
        </div>
        <div class="noline" v-if="finished && list.length==0">
            <div>
                <img alt src="@/assets/img/Linelist/noline.png" />
            </div>
        </div>
        <div v-if="itemactive != 2" class="listcontenta">
            <van-list
                v-if="!finished || list.length"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div class="list" v-for="(item, index) in list" :key="index">
                    <div class="left">
                        <div class="leftcontent">
                            <div class="leftcontent-top">{{ item.name }}</div>
                            <div class="leftcontent-center">订单号 : {{ item.order_id }}</div>
                            <div class="leftcontent-bottom">{{ item.created_at }}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="rightmoney">{{ item.cost / 100 }}</div>
                        <div v-if="item.status == 3">提现成功</div>
                        <div v-if="item.status == 2">提现中</div>
                        <div v-if="item.status == 4">提现驳回</div>
                    </div>
                </div>
            </van-list>
        </div>
        <!-- <div class="listcontentb" v-if="itemactive == 2">
            <van-list
                v-if="!finished || list.length"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div class="list" v-for="(item, index) in list" :key="index">
                    <div class="left">
                        <div class="leftcontent">
                            <div class="leftcontent-top">{{ item.name }}</div>
                            <div class="leftcontent-center">{{ item.created_at }}</div>
                            <div class="leftcontent-bottom">流水号 : {{ item.order_id }}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="rightmoney">{{ item.money }}</div>
                        <div v-if="item.status == 3">体现成功</div>
                        <div v-if="item.status == 2">体现中</div>
                        <div v-if="item.status == 4">体现驳回</div>
                    </div>
                </div>
            </van-list>
        </div>-->
    </div>
</template>

<script>
export default {
    data() {
        return {
            toptab: [
                { id: 1, name: "订单收益" },
                {},
                { id: 2, name: "分佣收益" },
                {},
                { id: 3, name: "提现记录" }
            ],
            type: 1, //   点击切换
            page: 1,
            list: [],
            loading: false,
            finished: false,
            itemactive: "",
            active: 1
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
    },
    methods: {
        onLoad() {
            // this.$toast("进入加载");
            this.$api.wallets.detailed(this.page, this.type).then(res => {
                this.page++;
                this.loading = false;
                if (res.data.length == 0) {
                    this.finished = true;
                } else {
                    this.list = this.list.concat(res.data);
                }
            });
        },
        //   点击切换
        itemactivefn: function(active) {
            document.documentElement.scrollTop = 0;

            this.type = active;
            this.page = 1;
            this.loading = false;
            this.finished = false;
            this.list = [];
            // this.onLoad();
            document.documentElement.scrollTop = 1;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "budgetdetailed.scss";
</style>
