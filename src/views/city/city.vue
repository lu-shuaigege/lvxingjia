<template>
    <div class="city">
        <div class="defaultcity">
            <div class="defaultcity-title">默认城市</div>
            <div
                class="defaultcity-item"
                @click="cityid(defaultCityId, defaultCityName)"
            >{{ defaultCityName }}</div>
        </div>
        <div class="cityHistory" v-if="cityHistory.length>0">
            <div class="cityHistory-title">
                <div>历史城市</div>
                <img
                    @click="delcityHistory()"
                    class="cityHistory-del"
                    src="../../assets/img/my/del.png"
                />
            </div>
            <div class="cityHistory-list">
                <div
                    class="cityHistory-item"
                    v-for="(item,index) of cityHistory"
                    :key="index"
                    @click="cityid(item.cityid, item.cityname)"
                >{{ item.cityname }}</div>
            </div>
        </div>
        <div class="hotcity">
            <div class="hotcity-title">
                <div>热门城市</div>
            </div>
            <div class="hotcity-list">
                <div
                    class="hotcity-item"
                    v-for="(item,index) of hotcity"
                    :key="index"
                    @click="cityid(item.cityid, item.cityname)"
                >{{ item.cityname }}</div>
            </div>
        </div>
        <div class="content">
            <div class="citylist" v-for="(item, index) in citylist" :key="index">
                <i :id="item[0].chart"></i>
                <div class="title">{{ item[0].chart }}</div>
                <div
                    class="list-item"
                    @click="cityid(itema.id, itema.name)"
                    v-for="(itema, indexa) in item"
                    :key="indexa"
                >{{ itema.name }}</div>
            </div>
        </div>
        <!-- 侧边字母 -->
        <div class="rightlist">
            <div class="alist" v-for="(itemx, indexx) in letter" :key="indexx">
                <div href="#" @click="anchor(itemx)">{{ itemx }}</div>
            </div>
        </div>
    </div>
</template>

<script>
// import { get_city } from "@/api/api";
import { Dialog } from "vant";
export default {
    data() {
        return {
            citylist: {},
            defaultCityName: "苏州",
            defaultCityId: 0,
            letter: [],
            hotcity: [
                { cityid: 2, cityname: "北京市" },
                { cityid: 861, cityname: "上海市" },
                { cityid: 2138, cityname: "广州市" },
                { cityid: 2164, cityname: "深圳市" },
                { cityid: 2509, cityname: "成都市" },
                { cityid: 2468, cityname: "重庆市" },
                { cityid: 1858, cityname: "武汉市" },
                { cityid: 3066, cityname: "西安市" }
            ], //热门城市
            cityHistory: [] //城市搜索历史
        };
    },
    components: {},
    created() {
        if (JSON.parse(localStorage.getItem("cityNameId")) == null) {
            this.cityname = "苏州";
        } else {
            this.defaultCityName = JSON.parse(
                localStorage.getItem("cityNameId")
            ).cityname;
            this.defaultCityId = JSON.parse(
                localStorage.getItem("cityNameId")
            ).cityid;
        }
        if (localStorage.getItem("cityHistory")) {
            this.cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
        }
        this.getcitiesfn();
        this.$wechat.timeline(false);
    },
    mounted() {},
    methods: {
        //锚点定位
        anchor: function(anchorname) {
            document.querySelector("#" + anchorname + "").scrollIntoView(true);
        },
        //删除城市历史
        delcityHistory() {
            Dialog.confirm({
                // title: "标题",
                message: "确认清除城市历史记录吗"
            })
                .then(() => {
                    localStorage.setItem("cityHistory", "");
                    this.cityHistory = [];
                })
                .catch(() => {
                    return;
                });
        },
        //点击选择地址
        cityid: function(cityid, cityname) {
            let cityNameId = {
                cityid: cityid,
                cityname: cityname
            };
            localStorage.setItem("cityNameId", JSON.stringify(cityNameId));
            this.searchRecord(cityNameId);
            this.$router.go(-1); //返回上一层
        },

        //searchfn
        searchRecord: function(cityNameId) {
            let _this = this;
            if (_this.cityHistory.length === 0) {
                _this.cityHistory.unshift(cityNameId);
                localStorage.setItem(
                    "cityHistory",
                    JSON.stringify(_this.cityHistory)
                );
                _this.cityHistory = JSON.parse(
                    localStorage.getItem("cityHistory")
                );
            } else {
                for (let i = 0; i < _this.cityHistory.length; i++) {
                    if (_this.cityHistory[i].cityid == cityNameId.cityid) {
                        return;
                    }
                }
                _this.cityHistory.unshift(cityNameId);
                let arr = _this.cityHistory;
                if (arr.length > 8) {
                    _this.cityHistory = arr.slice(0, 8);
                }
                localStorage.setItem(
                    "cityHistory",
                    JSON.stringify(_this.cityHistory)
                );
                _this.search = JSON.parse(localStorage.getItem("linerecord"));
            }
        },
        // 获取城市列表
        getcitiesfn: function() {
            this.$api.cities.index().then(res => {
                this.citylist = res;
                var citylist = this.citylist;
                for (let item in citylist) {
                    this.letter.push(item);
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "city.scss";
</style>
