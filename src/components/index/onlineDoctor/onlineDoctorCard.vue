<template>
  <div class="doctor">
    <img @click="showSharePic=false" v-show="showSharePic" class="share-pic" v-if="device=='android'"
         src="../../../../static/img/share.android.png"
         alt="">
    <img @click="showSharePic=false" v-show="showSharePic" class="share-pic" v-if="device=='iphone'"
         src="../../../../static/img/share.ios.png"
         alt="">
    <div class="topWrap">
      <img @click="back()" class="previous" src="../../../../static/img/返回.png" alt="">
      <span @click="follow" class="follow" v-if="isFollow"><img src="../../../../static/img/爱心2.png"
                                                                alt="">取消</span>
      <span @click="follow" class="follow" v-else><img src="../../../../static/img/爱心1.png" alt="">关注</span>
      <span @click="showShare" class="share"><img src="../../../../static/img/share.icon.png" alt="">分享</span>
    </div>
    <!--<v-header ref="topHeader" :title="title" :rightTitle="rightTitle" ></v-header>-->
    <div class="doctorCard" ref="doctorCard">
      <div>
        <div class="doctorFunc">
          <div class="doctorImg">
            <img :src="aboutDoctor.docAvatar?aboutDoctor.docAvatar:'./static/img/doctor.m.png'" alt="">
          </div>
          <div class="doctorIntro">
            <h4><span class="mainTitle">{{aboutDoctor.docName}}</span>
              <span class="chief" v-if="aboutDoctor.docFamousConsultStatus">名医</span>
              <span v-else>&nbsp;</span>
            </h4>
            <h6>{{aboutDoctor.docDeptName}}&nbsp; {{aboutDoctor.docTitle}}</h6>
            <h6>{{aboutDoctor.docHosName}}</h6>

            <div v-if="!aboutDoctor.docScoure" class="checkRating">
              <span>暂无评价</span>
            </div>
            <router-link v-if="aboutDoctor.docScoure" tag="div"
                         :to="{path:'/commentDetail',query:{docId:aboutDoctor.docId}}" class="checkRating">
              <star :size="24" :score="aboutDoctor.docScoure"></star>
              <span>{{ aboutDoctor.docScoure.toFixed(1) }}分 </span><span>查看评价</span>
            </router-link>
          </div>
        </div>
        <doc-nav @click="handleClick" :teamInfo="teamInfo" :docInfo="aboutDoctor"></doc-nav>
        <div class="border-1px"></div>
        <div class="institutionDes border-1px" v-if="teamInfo&&teamInfo.id">
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

        <div class="border-1px"></div>
        <div class="institutionDes border-1px" v-if="doctorIntro">
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

        <div class="border-1px"></div>
        <div class="institutionDes border-1px">
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
        <div class="border-1px"></div>
        <div class="institutionDes border-1px">
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
        <div class="border-1px"></div>
        <div class="institutionDes border-1px">
          <div class="desCenter team">
            <h4 class="article">医生文章 <span @click="goArticleList()" v-if="doctorArticle.length !=0">更多<img
              src="../../../../static/img/left-arrow.png" alt=""></span></h4>
            <div class="line"></div>
            <router-link tag="p" :to="{path:'/articleDetail',query:{articleId:item.articleId}}"
                         class="article"
                         v-for="(item,index) in doctorArticle" :key="item.id">
              <span> {{ item.title }}</span><span> {{ item.readTimes }}次阅读</span><span> {{ articleTime[index] }}</span>
            </router-link>
          </div>
        </div>
        <div class="border-1px"></div>
        <div class="institutionDes border-1px">
          <ul class="flex ercode">
            <li class="flex0 center" @click="openShare(aboutDoctor.cardPicUrl)">
              <img src="../../../../static/img/logo.web.png" alt="">
              <div><span class="app">APP</span>关注我,功能更丰富</div>
            </li>
            <li class="flex0 center" @click="openShare(aboutDoctor.cardPicWechatUrl)">
              <img src="../../../../static/img/logo.weixin.png" alt="">
              <div><span class="weixin">微信</span>关注我,咨询更方便</div>
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
  </div>
</template>
<script>
  import DocNav from "../../../plugins/doc/nav"
  import header from '../../../base/header'
  import Dialog from '../../../base/dialog'
  import api from '../../../lib/api'
  import Star from '../../../base/star/star'
  import weui from 'weui.js'
  import {isBindMixin, isLoginMixin, jssdkMixin} from "../../../lib/mixin"
  import {tokenCache} from '../../../lib/cache'
  import {formatDate} from '../../../utils/formatTimeStamp'
  import DocShare from "../../../plugins/doc/share.vue"
  import {debug, getParamsFromUrl, getShareLink} from "../../../lib/util"

  export default {
    mixins: [isLoginMixin, isBindMixin, jssdkMixin],
    data() {
      return {
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
    mounted() {
    },
    created() {
      this.doctorId = this.$route.query.docId
      this.getDocInfo();
      let isshare = this.isShare();
      if (isshare) {
      } else {
        this._isBind().then((res) => {
          if (res === false) {
            this.$router.push({
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

              desc: doc.docResume, // 分享描述
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
      goTeam(id) {
        this.$router.push(`/team/${id}/detail`);
      },
      handleClick(name) {
        if (name == "pic") {
          this.goConsult();
        } else if (name == 'book') {
          this.goBookNum();
        } else {
          this.makeDisplay();
        }
      },
      showShare() {
        this.showSharePic = true
      },
      _initDoctorScroll() {
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
      getDocInfo() {
        let options = {
          docId: this.doctorId
        };
        if (this.isShare()) {
          options.needToken = false
        }
        api("nethos.doc.card", options).then((data) => {
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
        })
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
        api("nethos.pat.info.get", {
          token: tokenCache.get()
        }).then((data) => {
          console.log(data.obj)
          if (data.code == 0) {
            console.log(data, 66666)
            if (this.isFollow == false) {
              api("nethos.follow.dp.add", {
                token: tokenCache.get(),
                docId: this.doctorId
              }).then((data) => {
                console.log(data)
                if (data.code == 0) {
                  this.isFollow = true
                } else {
                  weui.alert(data.msg)
                }
              })
            } else {
              api("nethos.follow.cancel", {
                token: tokenCache.get(),
                docId: this.doctorId
              }).then((data) => {
                console.log(data)
                if (data.code == 0) {
                  this.isFollow = false
                } else {
                  weui.alert(data.msg)
                }
              })
            }
          } else {
            this.$router.push({
              path: "/bindRelativePhone",
              query: {backPath: this.path}
            });
          }
        })
      }
    },
    components: {
      "VHeader": header,
      "VDialog": Dialog,
      Star,
      DocShare,
      DocNav
    },
    watch: {
//      excelAll(){
//        this.$nextTick(()=>{
//          setTimeout(()=>{
//            this._initDoctorScroll()
//          },20)
//        })
//      },
//      introAll(){
//        this.$nextTick(()=>{
//          setTimeout(()=>{
//            this._initDoctorScroll()
//          },20)
//        })
//      },
//      aboutDoctor(){
//        this.$nextTick(()=>{
//          setTimeout(()=>{
//            this._initDoctorScroll()
//          },200)
//        })
//      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  @import '../../../common/var.scss';
  @import '../../../common/mixin.scss';

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
    position: absolute;
    @include t_r_b_l();
    overflow-y: auto;
    overflow-x: hidden;

    .share-pic {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 20000;
    }

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
        display: inline-block;
        padding: 5px 5px;
        border: 1px solid #cccccc;
        border-radius: 5px;
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
    /*position: fixed;*/
    /*left:0;*/
    /*right:0;*/
    /*bottom: 0px;*/
    /*top: 10px;*/
    /*overflow: auto;*/
    margin-top: 80rem/$rem;
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
          width: 690rem/$rem;
          font-size: 32rem/$rem;
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
        h6.good, h6.intro {
          text-align: left;
          width: 650rem/$rem;
          word-break: break-all;
        }
        p.good, p.intro {
          text-align: left;
          width: 650rem/$rem;
          word-break: break-all;
        }
        h6 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 32rem/$rem;
          color: #666666;
          text-align: center;
          img {
            width: 450rem/$rem;
          }
        }
        p {
          margin: 0;
          padding: 0;
          font-weight: normal;
          font-size: 32rem/$rem;
          color: #666666;
        }
        p.article {
          line-height: 1.6;
          display: flex;
          justify-content: space-between;
          span:nth-child(1) {
            display: -webkit-box;
            /*<!--height:40rem/$rem;-->*/
            width: 200rem/$rem;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          span:nth-child(2) {
            display: inline-block;
            flex-basis: 200rem/$rem;
            text-align: center;
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
