<template>
  <div class="page">
    <app-header ref="header">
      <i slot="back" class="back"></i>
      <div slot="right" class="right absolute" @click="showShare=true">
        分享
      </div>
    </app-header>
    <div class="main lh1 overflow-y-auto" ref="main">
      <h3>{{info.title}}</h3>
      <ul class="flex">
        <li class="tag flex0" v-if="info.isGrade">
          推荐
        </li>
        <li class="time flex1">
          {{info.createTime|formatTime('%m-%d')}}
        </li>
        <li class="num flex0">
          {{info.readTimes}} 阅读
        </li>
      </ul>
      <div id="article_detail" class="container" v-html="content"></div>
    </div>
    <img v-if="device=='android'&&showShare" @click="showShare=false" class="absolute"
         src="../../../static/img/share.android.png" alt="">
    <img v-if="device=='iphone'&&showShare" @click="showShare=false" class="absolute"
         src="../../../static/img/share.ios.png" alt="">
  </div>
</template>

<script>
  import AppHeader from '../../plugins/app-header'
  import {jssdkMixin, mainHeightMixin} from "../../lib/mixin";
  import api from '../../lib/api'
  import weuijs from 'weui.js'
  import {delHtmlTag, filterHTML, formatTime} from "../../lib/filter";
  import {debug, getENV, getParamsFromUrl, getShareLink, makeUrl} from "../../lib/util";

  export default {
    data() {
      return {
        id: '',
        content: '',
        info: {},
        docInfo: {},
        showShare: false,
        device: window.device
      };
    },
    computed: {},
    filters: {formatTime},
    mixins: [mainHeightMixin, jssdkMixin],
    components: {AppHeader},
    async created() {
      let {params} = this.$route;
      params && (params.id) && (this.id = params.id);
      await this.getDetail();
      await this.getDoc();
      await this.setShare();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      getShareLink() {
        let options = getParamsFromUrl(location.href),
          env = getENV();
        options.hash = "/doc/article/" + this.id;
        options.path = '/gjhlwyy';
        options.hostname = env.jssdk;
        return getShareLink(makeUrl(options));
      },
      async setShare() {
        let isOk = await this.jssdkMixin_getJssdkConfig();
        if (isOk) {
          let doc = this.info,
            conf = {
              title: doc.title,
              link: this.getShareLink(),
              imgUrl: this.docInfo.docAvatar || 'http://static.hztywl.cn/project/gjyy/img/unrmsharelogo.jpg', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              },
              desc: delHtmlTag(this.content), // 分享描述
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            };
          debug('share', conf);
          wx.ready(() => {
            wx.onMenuShareTimeline(conf);
            wx.onMenuShareAppMessage(conf);
          })
        }
      },

      async getDoc() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('nethos.doc.card', {docId: this.info.docId});
        loading.hide();
        if (ret.code == 0) {
          this.docInfo = ret.obj.sysDoc;
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      },

      async getDetail() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('nethos.doc.article.detail', {articleId: this.id})
        loading.hide();
        if (ret.code == 0) {
          this.info = ret.obj.docArticle;
          this.content = ret.obj.articleContent ? filterHTML(ret.obj.articleContent) : '';
          if (this.info.articleType == "URL") {
            location.replace(this.content);
          }
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .page {
    > img {
      @include t_r_b_l();
      width: 100%;
      height: 100%;
    }
  }

  .main {
    padding-top: px2rem(17px);
    padding-left: px2rem(15px);
    padding-right: px2rem(15px);

    h3 {
      color: #333333;
      font-size: px2rem(24px);
      line-height: 1.2;
      @include lines(2);
    }

    ul {
      align-items: center;
      margin-top: px2rem(15px);

      li {
        font-size: px2rem(14px);
        color: #999999;
      }

      li.tag {
        color: #F5A623;
        border: 1px solid #F5A623;
        border-radius: 8px;
        font-size: px2rem(12px);
        padding: 2px 5px;
        margin-right: px2rem(10px);
      }
    }

  }
</style>
