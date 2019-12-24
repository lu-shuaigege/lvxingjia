<template>
    <div class="search">
        <div class="top">
            <div class="topcontent">
                <img src="@/assets/img/search/chakan.png" alt />
                <input
                    @click="searchfn()"
                    v-model="searchword"
                    class="topinput"
                    type="text"
                    placeholder="大家都在搜索“日本樱花”"
                />
            </div>
            <div class="over" @click="okSearch">搜索</div>
        </div>
        <div class="bottom">
            <div class="bottom-top">
                <div class="bottom-top-top">
                    <div>历史记录</div>
                    <img
                        @click="delsearch()"
                        src="@/assets/img/search/shanchu.png"
                        alt
                    />
                </div>
                <div v-show="nosearch" class="no">暂无历史记录</div>
                <div class="record">
                    <div
                        class="record-item"
                        @click="seach(item)"
                        v-for="(item, index) in search"
                        :key="index"
                    >
                        {{ item }}
                    </div>
                </div>
            </div>
            <div class="bottom-down">
                <div class="down-top">
                    <img src="@/assets/img/search/remai.png" alt />
                    <div>热搜推荐</div>
                </div>
                <div class="record">
                    <div
                        class="record-item"
                        @click="seach(item.keywords)"
                        v-for="(item, indexa) in hot"
                        :key="indexa"
                    >
                        {{ item.keywords }}
                    </div>
                </div>
            </div>
        </div>
        <div class="popup" v-show="isshow == 1">
            <div class="content">
                <div class="con-word">是否确认清空历史记录?</div>
                <div class="con-bottom">
                    <div class="nook" @click="popup(0)">取消</div>
                    <div class="isok" @click="popup(1)">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nosearch: true, //暂无历史记录显示不显示
            isshow: 0, //清除历史记录弹框显示不显示
            search: [], //搜索记录
            hot: [], //热搜推荐列表
            searchword: "" //搜索内容
        };
    },
    components: {},
    watch: {
        search(newsearch) {
            if (newsearch.length === 0) {
                this.nosearch = true;
            } else {
                this.nosearch = false;
            }
        }
    },
    created() {
        if (localStorage.getItem("linerecord") === null) {
            this.nosearch = true;
        } else {
            this.nosearch = false;
            this.search = JSON.parse(localStorage.getItem("linerecord"));
        }
        // 请求热搜关键词
        this.$api.keywords.index().then(res => {
            this.hot = res;
        });
        this.$wechat.timeline(false);
    },
    methods: {
        //点击搜索
        okSearch() {
            this.searchRecord();
        },
        //删除筛选记录
        delsearch: function() {
            this.isshow = true;
            localStorage.removeItem("linerecord");
            //   this.search = [];
        },
        //手机键盘回车搜索
        searchfn: function() {
            let _this = this;
            $(".topinput").on("keypress", function(e) {
                var keycode = e.keyCode;
                if (keycode == "13") {
                    _this.searchRecord();
                }
            });
        },
        //searchfn
        searchRecord: function() {
            let _this = this;
            if (_this.searchword === "") {
                _this.$router.push({
                    path: "/lineindex",
                    query: {
                        keywords: _this.searchword
                    }
                });
                return;
            }
            if (_this.search.length === 0) {
                _this.search.unshift(_this.searchword);
                localStorage.setItem(
                    "linerecord",
                    JSON.stringify(_this.search)
                );
                _this.search = JSON.parse(localStorage.getItem("linerecord"));
                //跳转线路列表
                _this.$router.push({
                    path: "/lineindex",
                    query: {
                        keywords: _this.searchword
                    }
                });
                _this.searchword = "";
            } else {
                for (let i = 0; i < _this.search.length; i++) {
                    if (_this.search[i] == _this.searchword) {
                        //跳转线路列表
                        _this.$router.push({
                            path: "/lineindex",
                            query: {
                                keywords: _this.searchword
                            }
                        });
                        _this.searchword = "";
                        return;
                    }
                }
                _this.search.unshift(_this.searchword);
                let arr = _this.search;
                if (arr.length > 5) {
                    _this.search = arr.slice(0, 5);
                }
                localStorage.setItem(
                    "linerecord",
                    JSON.stringify(_this.search)
                );
                _this.search = JSON.parse(localStorage.getItem("linerecord"));
                //跳转线路列表
                _this.$router.push({
                    path: "/lineindex",
                    query: {
                        keywords: _this.searchword
                    }
                });
                _this.searchword = "";
            }
        },
        //弹框
        popup(x) {
            if (x == 1) {
                this.search = [];
                this.isshow = 0;
            } else if (x == 0) {
                this.isshow = 0;
            }
        },
        seach: function(params) {
            let _this = this;
            _this.searchword = params;
            _this.searchRecord();
        }
    }
};
</script>
<style lang="scss" scoped>
@import "index";
</style>
