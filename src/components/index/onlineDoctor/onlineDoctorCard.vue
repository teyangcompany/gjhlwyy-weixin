<template>
  <div class="page doctor doc-detail overflow-hidden">
    <header class="flex" ref="header">
      <div class="back center">
        <img @click="doBackMixin_doBack" class="previous" src="../../../../static/img/返回.png" alt="">
      </div>
      <div class="name font-size-h3" :style="nameStyle">{{aboutDoctor.docName}}</div>
      <div class="right flex">
        <div class="follow" @click="follow">{{isFollow?'已关注':'+关注'}}</div>
        <div class="share iconfont center" @click="showShare">&#xe601;</div>
      </div>
    </header>
    <div class="doctorCard overflow-y-auto overflow-x-hidden overflow-touch" @scroll="scroll" ref="main" :style="style">
      <div>
        <doc-info :info="aboutDoctor"></doc-info>
        <div class="space-line"></div>
        <h4 class="title mp">医生服务</h4>
        <doc-nav @click="handleClick" :teamInfo="teamInfo" :docInfo="aboutDoctor"></doc-nav>
        <div class="space-line"></div>
        <div class="institutionDes" v-if="teamInfo&&teamInfo.id&&openTeampic">
          <div class="desCenter team" @click="goTeam(teamInfo.id)">
            <h4>我的团队</h4>
            <div class="line"></div>
            <div class="teaminfo flex">
              <div class="flex0">
                <div class="thumb">
                  <img :src="teamInfo.teamAvatar" alt="">
                </div>
              </div>
              <div class="flex1">
                <h3>{{teamInfo.teamName}}</h3>
                <div class="content">{{teamInfo.teamResume}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-line" v-if="teamInfo&&teamInfo.id"></div>

        <div class="institutionDes" v-if="doctorIntro">
          <div class="desCenter team">
            <h4>医生公告</h4>
            <div class="line"></div>
            <div class="forArrowLeft">
              <h6 class="good" v-if="noticeAll">{{ doctorIntro.noticeContent }}</h6>
              <p class="good" v-else>{{ doctorIntro.noticeContent }}</p>
              <div>
                <div v-if="noticeAll" @touchend="noticeDownMore()">
                  <img src="../../../../static/img/下.png" alt="">
                </div>
                <div v-else @touchend="noticeExcelClose()">
                  <img src="../../../../static/img/上.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-line" v-if="doctorIntro"></div>

        <div class="institutionDes">
          <div class="desCenter team">
            <h4>医生擅长</h4>
            <div class="line"></div>
            <div class="forArrowLeft">
              <h6 class="good" v-if="excelAll">{{ aboutDoctor.docSkill }}</h6>
              <p class="good" v-else>{{ aboutDoctor.docSkill }}</p>
              <div>
                <div v-if="excelAll" @touchend="excelDownMore()">
                  <img src="../../../../static/img/下.png" alt="">
                </div>
                <div v-else @touchend="excelClose()">
                  <img src="../../../../static/img/上.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-line"></div>

        <div class="institutionDes">
          <div class="desCenter team">
            <h4>医生介绍</h4>
            <div class="line"></div>
            <div class="forArrowLeft">
              <h6 class="intro" v-html="aboutDoctor.docResume" v-if="introAll"></h6>
              <p class="intro" v-html="aboutDoctor.docResume" v-else></p>
              <div>
                <div v-if="introAll" @touchend="introDownMore()">
                  <img src="../../../../static/img/下.png" alt="">
                </div>
                <div v-else @touchend="introClose()">
                  <img src="../../../../static/img/上.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-line"></div>

        <div class="institutionDes" v-if="doctorArticle.length>0">
          <div class="desCenter team">
            <h4 class="article">医生文章 <span @click="goArticleList()" v-if="doctorArticle.length !=0">更多<img
              src="../../../../static/img/left-arrow.png" alt=""></span></h4>
            <template v-for="(item,index) in doctorArticle">
              <article-item :item="item"></article-item>
            </template>
          </div>
        </div>

        <div class="institutionDes">
          <h4 class="title">医生二维码</h4>
          <ul class="flex ercode">
            <li class="flex0 center" @click="openShare(aboutDoctor.cardPicUrl)">
              <p><img src="../../../../static/img/logo.web.png" alt=""></p>
              <div><span class="app">APP</span>关注我<br>功能更丰富</div>
            </li>
            <li class="flex0 center" @click="openShare(aboutDoctor.cardPicWechatUrl)">
              <p><img src="../../../../static/img/logo.weixin.png" alt=""></p>
              <div><span class="weixin">微信</span>关注我<br>咨询更方便</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <v-dialog v-show="dialogDisplay" @on-cancel="cancel()" @on-download="download()"
              :dialogTitle="dialogTitle"
              :dialogMain="dialogMain"
              :dialogLeftFoot="dialogLeftFoot"
              :dialogRightFoot="dialogRightFoot"
    ></v-dialog>
    <doc-share ref="docShare" :src="shareSrc" :info="aboutDoctor"></doc-share>
    <share-pic ref="sharePic"></share-pic>
  </div>
</template>
<script>
  import DocNav from "../../../plugins/doc/nav"
  import header from '../../../base/header'
  import Dialog from '../../../base/dialog'
  import api from '../../../lib/api'
  import Star from '../../../base/star/star'
  import weui from 'weui.js'
  import {doBackMixin, isBindMixin, isLoginMixin, jssdkMixin, mainHeightMixin} from "../../../lib/mixin"
  import {tokenCache} from '../../../lib/cache'
  import {formatDate} from '../../../utils/formatTimeStamp'
  import {formatTime} from "../../../lib/filter";
  import DocShare from "../../../plugins/doc/share.vue"
  import {debug, getParamsFromUrl, getShareLink} from "../../../lib/util"
  import DocInfo from '../../../plugins/doc/info'
  import {OPEN_TEAMPIC} from "../../../lib/config";
  import SharePic from '../../../plugins/share-pic'
  import ArticleItem from '../../../plugins/doc/article-item'

  export default {
    mixins: [isLoginMixin, isBindMixin, jssdkMixin, mainHeightMixin, doBackMixin],
    data() {
      return {
        confirmDom: null,
        nameStyle: {
          opacity: 0
        },
        openTeampic: OPEN_TEAMPIC,
        style: {},
        showSharePic: false,
        device: window.device,
        title: "",
        rightTitle: "",
        dialogTitle: "",
        dialogMain: "微信暂不支持该功能，请前往应用商店下载app来和医生视频问诊",
        dialogLeftFoot: "取消",
        dialogRightFoot: "下载app",
        noticeAll: true,
        excelAll: true,
        introAll: true,
        dialogDisplay: false,
        doctorId: "",
        aboutDoctor: {},
        doctorIntro: "",
        doctorArticle: "",
        articleTime: [],
        isFollow: false,
        shareSrc: "",
        teamInfo: ""
      }
    },

    created() {
      this.doctorId = this.$route.query.docId
      if (window.device == 'iphone' || window.device == 'android') {
        this.getDocInfo();
        let isshare = this.isShare();
        if (isshare) {
        } else {
          this._isBind().then((res) => {
            if (res === false) {
              this.$router.replace({
                path: "/scanBind",
                query: {
                  docId: this.doctorId
                }
              })
            } else {
              this.getFollow();
            }
          })
        }
      } else {
        /*let env = getENV(),
          options = getParamsFromUrl(location.href);
        options.hostname = env.web;
        options.path = '/html/doc';
        options.query = {
          docId: this.doctorId
        };
        location.replace(makeUrl(options));*/
      }
    },

    mounted() {
      this.init();
    },

    beforeDestroy() {
      this.confirmDom && this.confirmDom.hide();
    },

    methods: {
      async jssdkShare() {
        let isOk = await this.jssdkMixin_getJssdkConfig();
        if (isOk) {
          let doc = this.aboutDoctor,
            conf = {
              title: doc.docName,
              link: getShareLink(location.href),
              imgUrl: doc.docAvatar, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              },

              desc: `您好，我是${doc.docHosName || ''}${doc.docDeptName || ''}${doc.docTitle || ''}`, // 分享描述
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            };
          debug('share', conf);
          wx.ready(() => {
            wx.onMenuShareTimeline(Object.assign({}, conf, {title: conf.desc}));
            wx.onMenuShareAppMessage(conf);
          })
        }
      },
      init() {
        this.style.width = `${window.innerWidth}px`;
      },
      scroll() {
        let dom = this.$refs.main,
          top = (dom.scrollTop),
          t = Math.min(top, 45);
        this.$set(this.nameStyle, 'opacity', (t / 45));
      },
      goTeam(id) {
        this.$router.push(`/team/${id}/detail`);
      },
      handleClick(name, open) {
        if (!open) {
          return false
        }else if (name == "pic") {
          this.goConsult();
        } else if (name == 'book') {
          this.goBookNum();
        } else if (name == 'team' && OPEN_TEAMPIC) {
          if (this.teamInfo && this.teamInfo.id) {
            this.goTeam(this.teamInfo.id);
          }
        } else {
          this.makeDisplay();
        }
      },
      showShare() {
        this.$refs.sharePic.show();
      },
      isShare() {
        let {query} = getParamsFromUrl(location.href);
        return (query && (query.comefrom == 'ios' || query.comefrom == "android" || query.comefrom == "share"));
      },
      openShare(src) {
        this.setShareSrc(src);
        this.$refs.docShare.show();
      },
      setShareSrc(src) {
        this.shareSrc = src;
      },
      async getDocInfo() {
        let options = {
          docId: this.doctorId
        };
        if (this.isShare()) {
          options.needToken = false
        }

        let loading = weui.loading("加载中...");
        let data = await api("nethos.doc.card", options);
        loading.hide();
        if (data.code == 0) {
          this.aboutDoctor = data.obj.sysDoc
          this.teamInfo = data.obj.teamInfo || {};
          this.shareSrc = this.aboutDoctor.cardPicUrl;
          this.doctorIntro = data.obj.sysDocNotice
          this.doctorArticle = data.obj.docArticleList
          for (var i = 0; i < this.doctorArticle.length; i++) {
            this.articleTime.push(formatDate(new Date(this.doctorArticle[i].createTime)))
          }
          this.jssdkShare();
        } else if (!(data.msg)) {
          weui.alert("网络错误，请稍后重试")
        } else {
          weui.alert(data.msg)
        }
      },
      getFollow() {
        api("nethos.follow.get", {
          token: tokenCache.get(),
          docId: this.doctorId
        }).then((data) => {
          if (data.code == 0) {
            if (data.obj.followDocpat) {
              this.isFollow = true
            }
          } else {
//                 weui.alert(data.msg)
          }
        })
      },
      goArticleList() {
        if (this.isShare()) {
          this.openShare(this.aboutDoctor.cardPicWechatUrl);
          return
        }
        this.$router.push({
          path: '/articleList',
          query: {docId: this.doctorId}
        })
      },
      goConsult() {
        if (this.isShare()) {
          this.openShare(this.aboutDoctor.cardPicWechatUrl);
          return
        }
        this.$router.push({path: '/pictureConsultApply', query: {docId: this.doctorId}})
      },
      goBookNum() {
        if (this.isShare()) {
          this.openShare(this.aboutDoctor.cardPicWechatUrl);
          return
        }
        if (!this.aboutDoctor.docBookId) {
          return
        }
        this.$router.push({path: '/famousPage', query: {bookDocId: this.aboutDoctor.docBookId}})
      },
      noticeDownMore() {
        this.noticeAll = false
      },
      noticeExcelClose() {
        this.noticeAll = true
      },
      excelDownMore() {
        this.excelAll = false
      },
      excelClose() {
        this.excelAll = true
      },
      introDownMore() {
        this.introAll = false
      },
      introClose() {
        this.introAll = true
      },
      goApply() {
        this.$router.push('/apply')
      },
      makeDisplay() {
        if (this.isShare()) {
          this.openShare(this.aboutDoctor.cardPicWechatUrl);
          return
        }
        this.dialogDisplay = true
      },
      cancel() {
        this.dialogDisplay = false
      },
      download() {
//          this.$router.push('/downloadPage')
        location.href = 'http://api.gjwlyy.com/api/download/pat/index.html'
      },
      back() {
        this.$router.back(-1)
      },
      follow() {
        if (this.isShare()) {
          this.openShare(this.aboutDoctor.cardPicWechatUrl);
          return
        }
        api("nethos.pat.info.get", {}).then((data) => {
          if (data.code == 0) {
            if (this.isFollow == false) {
              api("nethos.follow.dp.add", {
                docId: this.doctorId
              }).then((data) => {
                if (data.code == 0) {
                  this.isFollow = true
                } else {
                  weui.alert(data.msg)
                }
              })
            } else {
              this.confirmDom = weui.confirm('取消关注后你无法再收到医生的停诊通知、关怀随访、精选文章...', {
                  title: "取消关注？",
                  buttons: [
                    {
                      label: "确定取消",
                      type: "default",
                      onClick: () => {
                        api("nethos.follow.cancel", {
                          docId: this.doctorId
                        }).then((data) => {
                          if (data.code == 0) {
                            this.isFollow = false
                          } else {
                            weui.alert(data.msg)
                          }
                        })
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
            this.$router.replace({
              path: "/bindRelativePhone",
              query: {backPath: this.path}
            });
          }
        })
      }
    },
    filters: {formatTime},
    components: {
      "VHeader":
      header,
      "VDialog":
      Dialog,
      Star,
      DocShare,
      DocNav,
      DocInfo,
      SharePic,
      ArticleItem
    },
    watch: {}
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  @import '../../../common/var.scss';
  @import '../../../common/mixin.scss';

  header {
    justify-content: space-between;
    height: px2rem(45px);
    align-items: center;
    .back {
      width: 45px;
      img {
        width: px2rem(12px);
        height: px2rem(21px);
      }
    }
    .right {
      padding-right: $commonSpace;
      > div {
        @include h_lh(px2rem(26px));
        border-radius: 13px;
        color: white;
        background-color: #999999;
      }
      .follow {
        padding: 0 px2rem(10px);
      }
      .share {
        width: px2rem(26px);
        margin-left: $commonSpace;
      }
    }
  }

  .title {
    width: px2rem(690px, 750);
    margin: 0 auto;
    font-weight: bold;
    font-size: px2rem(17px);
    color: #333333;
  }

  .mp {
    margin-top: px2rem(15px);
  }

  .space-line {
    width: px2rem(690px, 750);
    margin: 0 auto;
    height: 1px;
    background-color: #f1f1f1;
  }

  .teaminfo {
    padding-top: px2rem(15px);
    .thumb {
      margin-right: px2rem(10px);
      @include thumb(px2rem(110px), px2rem(75px));
      overflow: hidden;
      border-radius: 5px;
    }
    h3 {
      font-size: px2rem(16px);
      color: #333333;
    }
    .content {
      font-size: px2rem(15px);
      @include lines(2);
      color: #777777;
    }
  }

  .doctor {
    .topWrap {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      z-index: 10000;
      background-color: white;
      .share, .follow {
        z-index: 2000;
        font-size: 32rem/$rem;
        display: flex;
        align-items: center;
        top: 14.5px;
        position: absolute;
        img {
          width: 35rem/$rem;
          margin-right: 5px;
        }
      }
      .follow {
        right: 160rem/$rem;
      }
      .share {
        right: 30rem/$rem;
      }
      img.previous {
        height: 15px;
        position: absolute;
        left: 30rem/$rem;
        top: 17.5px;
        z-index: 2000;
      }
    }
    /*}*/
  }

  .ercode {
    li {
      padding-bottom: 15px;
      padding-top: 15px;
      width: 50%;
      div {
        width: px2rem(104px);
        display: inline-block;
        padding: 5px 0px;
        border: 1px solid #979797;
        border-radius: 10px;
        margin-top: 5px;
      }
      span {
        color: $mainColor;
        font-size: 14px;
        &.weixin {
          color: green;
        }
      }
      img {
        width: 30%;
      }
    }
  }

  .doctorCard {
    .doctorFunc {
      width: 100%;
      height: 210px;
      background-color: white;
      .doctorImg {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
      .doctorIntro {
        width: 100%;
        height: 70px;
        line-height: 1.6;
        margin-top: 10px;
        text-align: center;
        h4 {
          font-weight: normal;
          margin: 0;
          span.mainTitle {
            margin-left: 60rem/$rem;
            font-size: 32rem/$rem;
            color: #333333;
          }
          span.chief {
            position: relative;
            font-size: 28rem/$rem;
            color: white;
            background-color: $assistColorBrown;
            display: inline-block;
            width: 58rem/$rem;
            height: 29rem/$rem;
            margin: 0;
            line-height: 31rem/$rem;
            text-align: center;
            left: 12rem/$rem;
          }
          span.empty {
            border: none;
          }
        }
        h6 {
          font-size: 28rem/$rem;
          font-weight: normal;
          color: gray;
          margin: 0;
        }
        .checkRating {
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            color: #666666;
            font-size: 28rem/$rem;
            margin-left: 10px;
          }
        }
        /*background-color: #0BB20C;*/
      }
    }
    .sortFunc {
      width: 690rem/$rem;
      margin: 0 auto;
      margin-top: 40rem/$rem;
      display: flex;
      justify-content: center;
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 70rem/$rem;
          height: 70rem/$rem;
        }
        p {
          margin-top: 30rem/$rem;
          font-size: 28rem/$rem;
          color: $mainColor;
        }
        span {
          font-size: 28rem/$rem;
          color: $mainColor;
        }
        p.videoWord {
          color: $assistWordBlue;
        }
        span.videoWord {
          font-size: 28rem/$rem;
          color: $assistWordBlue;
        }
        p.bookWord {
          color: $assistColorPink;
        }
        p.grayBookNumber {
          color: #999999;
        }
      }
    }
    .institutionDes {
      .desCenter {
        width: 690rem/$rem;
        margin: 0 auto;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .line {
          position: absolute;
          left: 0;
          top: 15px;
          width: 3px;
          height: 20px;
          display: none;
          background-color: $assistColorBrown;
        }
        .forArrowLeft {
          line-height: 1.6;
          display: flex;
          > div {
            > div {
              height: 70rem/$rem;
              img {
                width: 40rem/$rem;
              }
            }
          }
        }
        h4, h6 {
          margin: 0;
          padding: 0;
          font-weight: normal;
        }
        h4 {
          font-size: px2rem(17px);
          width: 690rem/$rem;
          font-weight: bold;
          color: #333333;
          display: flex;
          span {
            color: #999999;
            font-weight: normal;
            font-size: 28rem/$rem;
            width: 690rem/$rem;
            text-align: center;
            margin-bottom: 10px;
          }
        }
        h4.article {
          display: flex;
          justify-content: space-between;
          span {
            width: 200rem/$rem;
            text-align: right;
            img {
              width: 16rem/$rem;
              height: 24rem/$rem;
              margin-left: 5px;
            }
          }
        }
        h6.good, h6.intro, p.good, p.intro {
          text-align: left;
          font-size: 32rem/$rem;
          color: #666666;
          width: 650rem/$rem;
          word-break: break-all;
        }
        h6 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-align: center;
          img {
            width: 450rem/$rem;
          }
        }

      }
      .team {
      }
    }
    .blank {
      width: 100%;
      height: 10px;
      background-color: rgb(245, 245, 245);
    }
    .scanCode {
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 150px;
        height: 150px;
      }
    }
  }

  .ratings {
    color: #FF9900 !important;
  }

  .number {
    color: #3399FF !important;
  }
</style>
