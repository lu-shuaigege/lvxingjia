<template>
    <div class="mytravels">
        <div class="domesticlist">
            <div class="noline" v-if="finished && !myexchangelist.length">
                <div><img alt src="@/assets/img/Linelist/noline.png" /></div>
            </div>
            <van-list
                v-if="!finished || myexchangelist.length"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div
                    class="item"
                    v-for="(item, indexg) in myexchangelist"
                    :key="indexg"
                >
                    <div class="domestictop">
                        <div class="top">
                            <img
                                class="del"
                                src="@/assets/img/my/delicon.png"
                                alt
                            />
                            <div class="shu"></div>
                            <div
                                @click="
                                    routerLink('/travels/create', {
                                        id: item.id
                                    })
                                "
                                class="edit"
                            >
                                编辑
                            </div>
                        </div>
                        <img :src="imgAfterUrl + item.cover_img" alt />
                    </div>
                    <div class="domestic-bottom">
                        <div class="bottom-top">
                            <div class="bottom-top-left">
                                <div class="title">{{ item.name }}</div>
                                &nbsp;&nbsp;
                                <div>{{ item.address }}</div>
                            </div>
                        </div>
                        <div class="bottom-bototm">
                            <div class="date">
                                发表于&nbsp;&nbsp;{{ item.created_at }}
                            </div>
                            <div class="like">
                                <img src="@/assets/img/my/like.png" alt />
                                &nbsp;{{ item.is_collection }}
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
        <div @click="routerLink('/travels/create')" class="addbtn">
            新建一篇游记
        </div>
    </div>
</template>

<script>
export default {
    name: "mytravels",
    data() {
        return {
            myexchangelist: [],
            imgAfterUrl: process.env.VUE_APP_BASE_API,
            editEcho: [],
            loading: false,
            finished: false,
            page: 1
        };
    },
    created() {
        this.$wechat.timeline(false);
        // this.$api.mytravelnotes.index().then(res => {
        //   this.myexchangelist = res.data
        //   });
    },
    components: {},
    methods: {
        onLoad() {
            this.$api.mytravelnotes.index(this.page).then(res => {
                this.page++;
                this.loading = false;
                if (res.data.length == 0) {
                    this.finished = true;
                } else {
                    this.myexchangelist = this.myexchangelist.concat(res.data);
                }
            });
        },
        myinformationfn: function() {
            this.$router.push({
                name: "myinformation"
            });
        },
        compile: function() {
            this.$api.mytravelnotes.index().then(res => {
                this.myexchangelist = res.data;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
