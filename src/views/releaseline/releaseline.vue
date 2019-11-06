<template>
  <div class="releaseline">
    <div class="top">
      <div class="toplist">
        <div class="list-left">选择路线类型</div>
        <div class="list-right">
          <img class="rightimg" src="../../assets/img/my/right.png" alt />
        </div>
      </div>
      <div class="toplist">
        <div class="list-left">所属旅游大类</div>
        <div class="list-right">
          <img class="rightimg" src="../../assets/img/my/right.png" alt />
        </div>
      </div>
      <div class="toplist">
        <div class="list-left">线路名称</div>
        <div class="list-right">
          <input type="text" class="right-input" placeholder="请输入线路名称" />
        </div>
      </div>
      <div class="toplist-last">
        <div class="title">线路描述</div>
        <textarea name id class="textarea" cols="30" rows="10" placeholder="请输入线路描述"></textarea>
      </div>
    </div>
    <div class="center">
      <div class="toplist">
        <div class="list-left">起步价</div>
        <div class="list-right">
          <div class="list-right">
            <input type="text" class="right-input" placeholder="请输入起步价" />
            元
          </div>
        </div>
      </div>
      <div class="toplist">
        <div class="list-left">成人价</div>
        <div class="list-right">
          <div class="list-right">
            <input type="text" class="right-input" placeholder="请输入成人价" />
            元
          </div>
        </div>
      </div>
      <div class="toplist">
        <div class="list-left">儿童价</div>
        <div class="list-right">
          <div class="list-right">
            <input type="text" class="right-input" placeholder="请输入儿童价" />
            元
          </div>
        </div>
      </div>
      <div class="toplist">
        <div class="list-left">出发城市</div>
        <div class="list-right">
          <img class="rightimg" src="../../assets/img/my/right.png" alt />
        </div>
      </div>
      <div class="toplist">
        <div class="list-left">目的地</div>
        <div class="list-right">
          <img class="rightimg" src="../../assets/img/my/right.png" alt />
        </div>
      </div>
      <div class="toplist">
        <div class="list-left">套餐设置</div>
        <div class="list-right">
          <img class="rightimg" src="../../assets/img/my/right.png" alt />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="toplist">
        <div class="list-left-b">集合地设置</div>
        <div class="list-right">
          <img class="plus" src="../../assets/img/my/plus.png" alt />
        </div>
      </div>
      <div class="toplist">
        <input v-model="resort" type="text" class="list-left" placeholder="请输入集合地名称" />
        <div class="list-right">
          <img class="plus" src="../../assets/img/my/reduce.png" alt />
        </div>
      </div>
    </div>
    <div class="downbtn">
      <div class="downbtn-left">取消</div>
      <div class="downbtn-right">下一步</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "releaseline",
  data() {
    return {
      linetype: "",
      traveltype: "",
      linename: "",
      lineword: "",
      gomoney: "",
      adult: "",
      children: "",
      gocity: "",
      overcity: "",
      setmeal: "",
      resort: "苏州纳米科技园"
    };
  },
  components: {},
  methods: {
    //axios请求
    pagination: function() {
      this.$api.get(
        "cases",
        {
          page: this.page,
          per_page: 12
        },
        response => {
          if (response.status >= 200 && response.status < 300) {
            let data = response.data.data.data;
            for (var index in data) {
              this.imglist.push(data[index]);
            }

            this.total = response.data.data.total;
            this.display = response.data.per_page;
            this.current_page = response.data.current_page;
            this.last_page = response.data.last_page;
            if (this.current_page == this.last_page) {
              this.updown = "- 我也是有底线的 -";
            }
          } else {
          }
        }
      );
    },
    //跳转线路详情页
    linedetailsfn: function(x) {
      this.linedetailsid = x;
      //把页面要传的参数存到sessionStorage里面
      sessionStorage.setItem("linedetailsid", this.linedetailsid);
      //路由跳转携带参数
      this.$router.push({
        name: "linedetails",
        params: {
          linedetailsid: this.linedetailsid
        }
      });
    },
    //跳转发布线路
    releasefn: function() {
      this.$router.push({
        name: "linedetails"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "releaseline.scss";
</style>
