<template>
    <div class="releasetravels">
        <!-- 轮播图 -->
        <div class="banners">
            <img v-show="imgshow == 1" :src="imgAfterUrl + contents.img" alt />
            <div v-show="imgshow == 1" class="replacecover">
                <van-uploader :after-read="uploadFmImg" class="upload-fm">更换封面</van-uploader>
            </div>
            <div v-show="imgshow == 0" class="banners-con">
                <img v-show="imgshow == 1" :src="imgAfterUrl + contents.img" alt />
                <van-uploader :after-read="uploadFmImg" class="upload-fm"></van-uploader>
                <div class="banner-add-name">点击添加封面</div>
            </div>
        </div>

        <!-- 内容区 -->
        <div class="content">
            <div class="content-top">
                <input
                    type="text"
                    placeholder="请输入游记/标题"
                    v-model="contentTitle"
                    class="content-top-input"
                />
            </div>
            <div class="content-bottom">
                <div class="content-zw">
                    <div v-for="(item, index) in content" :key="index" class="con-item">
                        <textarea
                            name="travels"
                            id="travels"
                            class="travels"
                            @blur="handleInputBlur"
                            placeholder="请输入正文..."
                            :value="item"
                            @change="venueInput(index, $event)"
                            @click="click(index)"
                            v-if="item.indexOf('.jpg')==-1&&item.indexOf('.jpeg')==-1&&item.indexOf('.png')==-1&&item.indexOf('.gif')==-1&&item.indexOf('.bmp')==-1&&item.indexOf('.pic')==-1"
                        ></textarea>
                        <div
                            class="con-img"
                            v-if="!(item.indexOf('.jpg')==-1&&item.indexOf('.jpeg')==-1&&item.indexOf('.png')==-1&&item.indexOf('.gif')==-1&&item.indexOf('.bmp')==-1&&item.indexOf('.pic')==-1)"
                        >
                            <van-icon
                                name="delete"
                                class="content-delete"
                                @click="editContent(index)"
                            />
                            <img
                                v-if="item.indexOf('.jpg')!=-1||item.indexOf('.jpeg')!=-1||item.indexOf('.png')!=-1||item.indexOf('.gif')!=-1||item.indexOf('.bmp')!=-1||item.indexOf('.pic')==-1"
                                :src="imgAfterUrl + item"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-ok">
                <van-uploader :after-read="afterRead">
                    <img class="content-ok-left" src="@/assets/img/releasetravels/img.png" alt />
                </van-uploader>
                <div class="content-ok-right" @click="popupupfn">
                    <img src="@/assets/img/releasetravels/release.png" alt />
                    <div>发布</div>
                </div>
            </div>
        </div>

        <div class="popup-ok" ref="popupok">
            <div class="popup-ok-con">
                <div class="popupicon">
                    <img class="popupicon-img" src="@/assets/img/releasetravels/popupicon.png" alt />
                </div>

                <div class="popup-ok-con-center">游记发布成功!</div>
                <div class="popup-ok-con-bottom">恭喜您成功获得100积分！</div>
                <div class="popup-ok-con-btn" @click="popupokfn()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgAfterUrl: process.env.VUE_APP_BASE_API,
            imgshow: 0, //判断有没有封面
            blurIndex: 0, //输入框焦点失去时的位置
            index: "", //点击的哪个输入框
            word: "", //编辑的输入文字内容
            //   接口总数据
            contents: {
                img: ""
            },
            //页面内容
            content: [""],
            contentTitle: "",
            contentStatus: {
                status: "add",
                index: ""
            },
            item: [], //发布游记成功
            id: ""
        };
    },
    components: {},
    created() {
        this.$wechat.timeline(false);
        this.id = this.$route.query.id;
        if (this.id != undefined) {
            this.imgshow = 1;
            this.show();
        }
    },
    mounted() {
        //设置 textarea 的高度随着 内容 增加 自适应
        $(".travels").height($(".travels").scrollHeight);
        $(".travels").on("keyup keydown", function() {
            $(this).height(this.scrollHeight);
        });
    },
    methods: {
        // 输入框失去焦点时的位置
        handleInputBlur(e) {
            this.blurIndex = e.srcElement.selectionStart;
        },
        //如果全是数字就合并
        andword(tempArr) {
            let arr = [];

            let pre = "";
            for (let i = 0; i < tempArr.length; i++) {
                let current = tempArr[i];

                let preIsImage = pre.isPic();
                let currentIsImage = current.isPic();

                if (!preIsImage && !currentIsImage) {
                    //字字
                    if (pre != "" && pre != "\n") {
                        pre = pre + "\n";
                    }
                    pre = pre + current;
                }
                if (!preIsImage && currentIsImage) {
                    //字图
                    arr.push(pre);
                    pre = current;
                }
                if (preIsImage && !currentIsImage) {
                    //图字
                    arr.push(pre);
                    pre = current;
                }
                if (preIsImage && currentIsImage) {
                    //图图
                    arr.push(pre);
                    arr.push("");
                    pre = current;
                }
            }

            arr.push(pre);
            //如果图片结尾再添加一个输入框
            if (pre.isPic()) {
                arr.push("");
            }
            this.content = arr;
        },
        //上传图片
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            let formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                if (this.blurIndex == "") {
                    this.content.push(res.data.image_url);
                } else {
                    let wordLeft = this.content[this.index].slice(
                        0,
                        this.blurIndex
                    );
                    let wordRight = this.content[this.index].slice(
                        this.blurIndex,
                        this.content[this.index].length
                    );
                    this.content.splice(this.index, 1);
                    this.content.splice(
                        this.index,
                        0,
                        wordLeft,
                        res.data.image_url,
                        wordRight
                    );
                }
                console.log(this.content);
                this.andword(this.content);
                this.blurIndex = "";
                this.index = "";
                // this.content.splice(this.index, 0, res.data.image_url);
            });
        },
        //改变数组
        venueInput(index, e) {
            this.content[index] = e.target.value;
            console.log(this.content);
        },
        //点击输入框
        click(index) {
            this.index = index;
        },

        // 上传封面图
        uploadFmImg(file) {
            var formData = new FormData();
            formData.append("upfile", file.file);
            this.$api.upload.store(formData).then(res => {
                this.contents.img = res.data.image_url;
                this.imgshow = "1";
            });
        },
        //编辑内容
        editContent(index) {
            this.content.splice(index, 1);
            this.andword(this.content);
        },
        // 发布游记，打开弹窗
        popupupfn: function() {
            let param = {
                name: this.contentTitle,
                cover_img: this.contents.img,
                content: this.content
            };
            this.$api.travelnotes.release(param).then(res => {
                if (res == null) {
                    this.$refs.popupok.style.top = "0px";
                }
            });
            this.$api.travelnotes
                .update(this.id, param.name, param.cover_img, param.content)
                .then(res => {
                    this.item = res;
                    this.contentTitle = res.name;
                    this.content = res.content;
                });
        },
        // 点击弹窗确定
        popupokfn: function() {
            this.$refs.popupok.style.top = "100vh";
            this.$router.push({
                name: "travels"
            });
        },
        //获取游记内容
        show() {
            this.$api.travelnotes.show(this.id).then(res => {
                this.item = res;
                this.contents.img = res.cover_img;
                this.contentTitle = res.name;
                this.content = res.content;
            });
        }
    }
};
</script>
<style>
.upload-fm .van-uploader__wrapper .van-uploader__input-wrapper {
    width: 100% !important;
}
.upload-fm .van-uploader__wrapper {
    width: 100% !important;
    height: 100% !important;
}
.upload-fm .van-uploader__upload {
    width: 100% !important;
    height: 100% !important;
    margin: 0;
    border: none;
    background-color: #cacaca;
}
.upload-fm .van-uploader__upload-icon {
    color: #ffffff;
}
</style>
<style lang="scss" scoped>
@import "index";
</style>
