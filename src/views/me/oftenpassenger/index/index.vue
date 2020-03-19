<template>
    <div class="harvestaddress">
        <div class="listcontent" v-if="list.length">
            <div class="list" v-for="(item,index) in list" :key="index">
                <div class="listleft">
                    <div class="lefta">
                        <div class="checkbox" @click="activefn(item,$event)"></div>
                    </div>
                    <div class="leftb">
                        <div class="leftb-top">
                            <div class="name">{{item.name}}</div>
                            <div class="gender">
                                <img v-if="item.sex===1" src="@/assets/img/my/man.png" alt />
                                <img v-if="item.sex===2" src="@/assets/img/my/woman.png" alt />
                            </div>
                            <div class="tel">{{item.mobile}}</div>
                        </div>
                        <div
                            class="leftb-bottom"
                        >{{item.id_card_type | cardType}}: {{item.id_card_no}}</div>
                    </div>
                </div>

                <div class="right">
                    <div class="righta" @click="edit(item.id)">
                        <img src="@/assets/img/my/edit.png" alt />
                    </div>
                    <div class="rightb" @click="del(item.id)">
                        <img src="@/assets/img/my/del.png" alt />
                    </div>
                </div>
            </div>
        </div>
        <!--<div v-if="backPath == 1" class="back" @click="back">返回</div>-->
        <div class="down-addbtn" @click="addfn()">
            <span>+</span>
            新建旅客
        </div>
        <div class="down-btn" @click="back" v-if="backPath == 1">确认</div>
        <div class="popup" v-show="isshow==1">
            <div class="content">
                <div class="con-word">是否确认删除?</div>
                <div class="con-bottom">
                    <div class="nook" @click="popup(0)">取消</div>
                    <div class="isok" @click="popup(1)">确认</div>
                </div>
            </div>
        </div>
        <div class="nohave" v-if="!list.length">
            <div class="top">
                <img src="@/assets/img/my/nopassenger.png" alt />
            </div>
            <div class="nohavetitle">还没有旅客，快去添加吧~</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: "",
            active: 0,
            isshow: 0,
            list: [],
            checkList: [],
            backPath: 0
        };
    },
    created() {
        this.$wechat.timeline(false);
        this.getList();
        if (this.$route.query.backPath !== undefined) {
            this.backPath = this.$route.query.backPath;
        }
    },
    components: {},
    methods: {
        // 获取
        getList: function() {
            this.$api.travellers.my().then(res => {
                this.list = res;
            });
        },
        activefn: function(item, e) {
            if (e.target.className.indexOf("checkbox_selected") == -1) {
                e.target.className = "checkbox checkbox_selected"; //切换按钮样式
                this.checkList.push(item);
            } else {
                e.target.className = "checkbox"; //切换按钮样式
                for (let i = 0; i < this.checkList.length; i++) {
                    if (this.checkList[i].id == item.id) {
                        this.checkList.splice(i, 1);
                    }
                }
            }
            sessionStorage.setItem("lkArrInfo", JSON.stringify(this.checkList));
        },
        // 跳转新增地址
        addfn: function() {
            this.$router.push({
                path: "/me/oftenpassenger/create"
            });
        },
        // 编辑地址
        edit(id) {
            this.$router.push({
                path: "/me/oftenpassenger/create",
                query: {
                    id: id
                }
            });
        },
        //删除
        del(id) {
            let _this = this;
            _this.isshow = 1;
            _this.id = id;
        },
        popup(x) {
            if (x == 1) {
                this.isshow = 0;
                this.$api.travellers.delete(this.id).then(res => {
                    this.$toast("常用旅客删除成功");
                    this.getList();
                });
            } else if (x == 0) {
                this.isshow = 0;
            }
        },
        back() {
            if (this.backPath == 1) {
                //
                this.$router.go(-1);
                // this.$router.push({path:'/ticketbooking'})
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
