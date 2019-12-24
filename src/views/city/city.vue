<template>
    <div class="city">
        <div class="defaultcity">
            <div class="defaultcity-title">默认城市</div>
            <div
                class="defaultcity-item"
                @click="cityid(defaultCityId, defaultCityName)"
            >
                {{ defaultCityName }}
            </div>
        </div>
        <div class="content">
            <div
                class="citylist"
                v-for="(item, index) in citylist"
                :key="index"
            >
                <i :id="item[0].chart"></i>
                <div class="title">{{ item[0].chart }}</div>
                <div
                    class="list-item"
                    @click="cityid(itema.id, itema.name)"
                    v-for="(itema, indexa) in item"
                    :key="indexa"
                >
                    {{ itema.name }}
                </div>
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
export default {
    data() {
        return {
            citylist: {},
            defaultCityName: "苏州",
            defaultCityId: 0,
            letter: []
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

        this.getcitiesfn();
        this.$wechat.timeline(false);
    },
    mounted() {},
    methods: {
        //锚点定位
        anchor: function(anchorname) {
            document.querySelector("#" + anchorname + "").scrollIntoView(true);
        },
        //点击选择地址
        cityid: function(cityid, cityname) {
            let cityNameId = {
                cityid: cityid,
                cityname: cityname
            };
            localStorage.setItem("cityNameId", JSON.stringify(cityNameId));
            this.$router.go(-1); //返回上一层
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
