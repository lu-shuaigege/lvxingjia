<template>
    <div class="releaselinenext">
        <div class="images">
            <div class="title">上传图集</div>
            <div class="imgcontent">
                <div class="nannerImg_div" v-for="(item, index) in imageList" :key="index">
                    <div @click="delImg(index)" class="delImg">x</div>
                    <img class="nannerImg" :src="imgAfterUrl + item" />
                </div>

                <van-uploader :max-count="5" :after-read="uploadFmImg" v-if="imageList.length < 5" />
            </div>
            <div class="is">（最多上传5张图，默认第一张为封面图，建议1M以下）</div>
        </div>
        <div class="destination">
            <div class="title">目的地介绍</div>
            <van-field
                v-model="listData.introduce"
                rows="5"
                autosize
                type="textarea"
                maxlength="500"
                placeholder="请输入景点介绍"
                show-word-limit
                style="padding: 0"
            />
        </div>

        <div class="destination">
            <div class="title">行程安排</div>
            <van-field
                v-model="listData.plans"
                rows="5"
                autosize
                type="textarea"
                maxlength="500"
                placeholder="请输入行程安排"
                show-word-limit
                style="padding: 0"
            />
        </div>
        <div class="destination">
            <div class="title">费用说明</div>
            <van-field
                v-model="listData.expense_explanation"
                rows="5"
                autosize
                type="textarea"
                maxlength="500"
                placeholder="请输入费用说明"
                show-word-limit
                style="padding: 0"
            />
        </div>
        <div class="destination">
            <div class="title">注意事项</div>
            <van-field
                v-model="listData.remark"
                rows="5"
                autosize
                type="textarea"
                maxlength="500"
                placeholder="请输入注意事项"
                show-word-limit
                style="padding: 0"
            />
        </div>
        <div class="tobereleased">
            <div class="go_left">
                <div class="go_edit" @click="releaselinetopfn()">
                    <img src="@/assets/img/Linelist/goout.png" alt />
                    <div class="go_edit_text">返回</div>
                </div>
                <div class="shu"></div>
                <div class="go_edit go_del" @click="save(0)">
                    <img src="@/assets/img/Linelist/savedraft.png" alt />
                    <div class="go_edit_text">保存</div>
                </div>
            </div>
            <div class="go_tight" @click="save(1)">发布</div>
        </div>
        <!-- <div class="downbtn">
            <div class="downbtn-left" @click="releaselinetopfn()">上一步</div>
            <div class="downbtn-right" @click="save()">发布</div>
        </div>-->
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgAfterUrl: process.env.VUE_APP_IMGURL,
            id: "",
            imageList: [],
            listData: {
                banners: [],
                introduce: "",
                plans: "",
                expense_explanation: "",
                remark: ""
            }
        };
    },
    components: {},
    created() {
        this.id = this.$route.query.id;
        this.getDetail();
        this.$wechat.timeline(false);
    },
    methods: {
        //上传文件
        // 上传封面图
        uploadFmImg(file) {
            var formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                this.imageList.push(res.data.image_url);
            });
        },
        // 删除上传轮播图
        delImg(index) {
            let index_over;
            if (index == 0) {
                index_over = index + 1;
            } else {
                index_over = index;
            }
            this.imageList.splice(index, index_over);
        },
        //获取详情
        getDetail() {
            let _this = this;
            _this.listData.banners = [];
            if (parseInt(_this.id) >= 0) {
                _this.$api.itinerary.show(_this.id).then(res => {
                    _this.listData = res.detail;
                    if (res.banners) {
                        _this.imageList = res.banners;
                    } else {
                        _this.imageList = [];
                    }
                });
            }
        },

        //跳转发布线路上一步
        releaselinetopfn: function() {
            // this.$router.go(-1);
            this.$router.push({
                path: "/me/creatstep1",
                query: {
                    id: this.id
                }
            });
        },
        //保存
        save: function(is_pub) {
            let _this = this;
            _this.listData.banners = [];
            _this.listData.banners = _this.imageList;
            if (!_this.listData.banners.length) {
                this.$toast("请选择图集");
                return;
            }
            if (!_this.listData.introduce) {
                this.$toast("请输入景点介绍");
                return;
            }
            if (!_this.listData.plans) {
                this.$toast("请输入行程安排");
                return;
            }
            if (!_this.listData.expense_explanation) {
                this.$toast("请输入费用说明");
                return;
            }
            if (!_this.listData.remark) {
                this.$toast("请输入注意事项");
                return;
            }

            let data = {
                banners: _this.listData.banners,
                introduce: _this.listData.introduce,
                plans: _this.listData.plans,
                expense_explanation: _this.listData.expense_explanation,
                remark: _this.listData.remark,
                is_pub: is_pub
            };
            _this.$api.itinerary.updatestep2(_this.id, data).then(res => {
                // _this.$toast("线路发布成功");
                _this.$router.go(-2);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
