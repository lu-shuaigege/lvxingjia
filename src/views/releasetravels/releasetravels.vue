<template>
  <div class="releasetravels">
    <!-- 轮播图 -->
    <div class="banners">
      <img v-show="imgshow==1" :src="contents.img" alt />
      <div v-show="imgshow==1" class="replacecover">更换封面</div>
      <div v-show="imgshow==0" class="banners-con">
        <div class="banners-con-top">+</div>
        <div class="banners-con-bottom">点击添加封面</div>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="content">
      <div class="content-top">
        <input type="text" placeholder="请输入游记/标题" class="content-top-input" />
      </div>
      <div class="content-bottom">
        <input
          @blur="handleInputBlur"
          type="text"
          placeholder="请输入正文..."
          class="content-bottom-input"
          v-model="a"
        />
      </div>

      <div class="content-ok">
        <img class="content-ok-left" src="../../assets/img/releasetravels/img.png" alt />
        <div class="content-ok-right" @click="popupupfn()">
          <img src="../../assets/img/releasetravels/release.png" alt />
          <div>发布</div>
        </div>
      </div>
    </div>

    <!-- bidirectional data binding（双向数据绑定） -->
    <!-- <quill-editor
      v-model="content"
      ref="myQuillEditor"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    ></quill-editor>-->

    <div class="popup-ok" ref="popupok">
      <div class="popup-ok-con">
        <div class="popupicon">
          <img class="popupicon-img" src="../../assets/img/releasetravels/popupicon.png" alt />
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
  name: "releasetravels",
  data() {
    return {
      imgshow: 0, //判断有没有封面
      blurIndex: 0,
      //   接口总数据
      contents: {
        img: require("../../assets/img/home/1-2.png")
      },
      messages: [],
      content: ""
    };
  },
  components: {},
  created() {
    // //实现瀑布流
    // this.waterFall();
  },
  mounted() {
    //实现瀑布流
    // this.waterFall();
  },
  methods: {
    // 富文本编辑器用得
    onEditorBlur() {
      console.log("blur", this.messages);
    },

    onEditorFocus() {
      console.log("focus", this.messages);
    },

    onEditorReady() {
      console.log("ready", this.messages);
    },
    // 打开弹窗
    popupupfn: function() {
      this.$refs.popupok.style.top = "0px";
    },

    handleInputBlur(e) {
      this.blurIndex = e.srcElement.selectionStart;
      console.log(this.blurIndex);
    },
    // 点击弹窗确定
    popupokfn: function() {
      this.$refs.popupok.style.top = "100vh";
      this.$router.push({
        name: "travels",
        params: {
          // hoteldetailsid: this.hoteldetailsid
        }
      });
    },
    //跳转门票详情
    doorticketdetailsfn: function(x) {
      // this.hoteldetailsid = x;
      //把页面要传的参数存到sessionStorage里面
      // sessionStorage.setItem("hoteldetailsid", this.hoteldetailsid);
      //路由跳转携带参数
      this.$router.push({
        name: "hoteldetails",
        params: {
          // hoteldetailsid: this.hoteldetailsid
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "releasetravels.scss";
</style>
