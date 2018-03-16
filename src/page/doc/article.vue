<template>
  <div class="page">
    <app-header ref="header">
      <i slot="back" class="back"></i>
      <div slot="right" class="right absolute" @click="showShare=true">
        分享
      </div>
    </app-header>
    <div class="main lh1 overflow-y-auto overflow-touch" ref="main">
      <div class="docinfo flex">
        <div class="ava flex0">
          <img :src="docInfo.docAvatar" alt="">
        </div>
        <div class="doc flex1">
          <h3>
            <span class="name">{{docInfo.docName}}</span>
            <span class="title color_999">{{docInfo.docTitle}}</span>
          </h3>
          <div class="mt38">
            <span class="hos color_999">{{docInfo.docHosName}}</span>
            <span class="dept color_999">{{docInfo.docDeptName}}</span>
          </div>
        </div>
        <div class="follow flex0">
          <template v-if="docInfo.follow">
            <div class="yes" @click.stop="doFollow('cancel')">已关注</div>
          </template>
          <template v-else>
            <div class="no" @click.stop="doFollow('follow')">+关注</div>
          </template>
        </div>
      </div>
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
      <div id="article_detail" class="container"></div>
      <div class="content-arr">
        <div class="content-item" :class="[item.contentType.toLowerCase()]" v-for="(item,index) in contentArr"
             :key="index">
          <span v-if="item.contentType=='TEXT'">{{item.content}}</span>
          <img :src="item.content" v-if="item.contentType=='IMAGE'" alt="">
          <video-player class="video-player-box vjs-big-play-centered"
                        ref="videoPlayer"
                        :options="playerOptions[index]" v-if="item.contentType=='VIDEO'">
          </video-player>
          <vue-audio :file="item.content" v-if="item.contentType=='AUDIO'"></vue-audio>


        </div>
      </div>
    </div>
    <img v-if="device=='android'&&showShare" @click="showShare=false" class="absolute"
         src="../../../static/img/share.android.png" alt="">
    <img v-if="device=='iphone'&&showShare" @click="showShare=false" class="absolute"
         src="../../../static/img/share.ios.png" alt="">
  </div>
</template>

<script>
  import VueAudio from 'vue-audio'
  import AppHeader from '../../plugins/app-header'
  import {isBindMixin, jssdkMixin, mainHeightMixin} from "../../lib/mixin";
  import api from '../../lib/api'
  import weuijs from 'weui.js'
  import {videoPlayer} from 'vue-video-player'
  import "video.js/dist/video-js.css"
  import {delHtmlTag, filterHTML, formatTime} from "../../lib/filter";
  import {debug, getENV, getParamsFromUrl, getShareLink, makeUrl} from "../../lib/util";

  export default {
    data() {
      return {
        id: '',
        contentArr: [],
        content: '',
        info: {},
        playerOptions: {},
        docInfo: {},
        showShare: false,
        device: window.device
      };
    },
    computed: {},
    filters: {formatTime},
    mixins: [mainHeightMixin, jssdkMixin, isBindMixin],
    components: {AppHeader, videoPlayer, VueAudio},
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
      videoInit(arr) {
        arr.forEach((res, index) => {
          if (res.contentType == "VIDEO") {
            this.playerOptions[index] = {
              // videojs options
              width: window.px2rem * (20 - 0.8 * 2),
              muted: true,
              language: 'en',
              sources: [{
                type: "video/mp4",
                src: res.content
              }],
            }
          }
        })
      },
      getShareLink() {
        let options = getParamsFromUrl(location.href),
          env = getENV();
        options.hash = "/doc/article/" + this.id;
        options.path = '/gjhlwyy';
        options.hostname = env.jssdk;
        return getShareLink(makeUrl(options));
      },
      async doFollow(type) {
        let ret = await this._isBind();
        if (ret) {
          if (type == 'follow') {
            await this.follow();
          }
          if (type == 'cancel') {
            this.confirmDom = weuijs.confirm('取消关注后你无法再收到医生的停诊通知、关怀随访、精选文章...', {
                title: "取消关注？",
                buttons: [
                  {
                    label: "确定取消",
                    type: "default",
                    onClick: () => {
                      this.cancel();
                    }
                  },
                  {
                    label: '我再想想',
                    type: 'primary',
                    onClick: () => {
                    }
                  }
                ]
              }
            );
          }
        } else {
          this.$router.replace({path: '/onlineDoctorCard', query: {docId: this.info.docId}})
        }
      },

      async follow() {
        let loading = weuijs.loading("加载中...");
        let ret = await api("nethos.follow.dp.add", {docId: this.info.docId});
        loading.hide();
        if (ret.code == 0) {
          await this.getDoc();
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      },

      async cancel() {
        let loading = weuijs.loading("加载中...");
        let ret = await api("nethos.follow.cancel", {
          docId: this.info.docId
        });
        loading.hide();
        if (ret.code == 0) {
          await this.getDoc();
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
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
          } else {
            this.contentArr = (ret.obj.contentApps);
            this.videoInit(this.contentArr);
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

  .content-item + .content-item {
    margin-top: 10px;
  }

  .content-item {
    img {
      width: 100%;
    }
    video {
      width: 100%;
    }
    &.audio {
      margin-top: 20px;
      margin-bottom: 30px;
    }
    &.text {
      line-height: 1.5;
      font-size: 16px;
      color: #333333;
    }
  }

  .page {
    > img {
      @include t_r_b_l();
      width: 100%;
      height: 100%;
    }
  }

  .mt38 {
    margin-top: px2rem(38px, 1080);
  }

  .main {
    padding-top: px2rem(17px);
    padding-left: px2rem(15px);
    padding-right: px2rem(15px);

    .docinfo {
      margin: 0 px2rem(0-15px);
      padding-left: px2rem(15px);
      padding-right: px2rem(15px);
      padding-bottom: $commonSpace;
      @include border();
      align-items: center;
      margin-bottom: $commonSpace;
      .ava {
        @include thumb(px2rem(105px, 1080), px2rem(105px, 1080));
        margin-right: px2rem(45px, 1080);
      }
      .name {
        color: #2e2e2e;
        font-size: px2rem(45px, 1080);
      }
      .title {
        font-size: px2rem(38px, 1080);
      }
      .hos, .dept {
        font-size: px2rem(34px, 1080);
      }
      .follow {
        div {
          padding: 3px 5px;
          border-radius: 5px;
        }
        .yes {
          color: $mainColor;
          border: 1px solid $mainColor;
        }
        .no {
          color: #666666;
          border: 1px solid #666666;
        }
      }
    }

    > h3 {
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
