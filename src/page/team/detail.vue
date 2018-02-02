<template>
  <div class="page team-detail flex">
    <header class="flex flex0" ref="header">
      <div class="back center">
        <img @click="doBackMixin_doBack" class="previous" src="../../../static/img/返回.png" alt="">
      </div>
      <div class="name font-size-h3" :style="nameStyle">{{info.teamName}}</div>
      <div class="right flex">
        <div class="follow" @click="doFollow">{{isFollow?'已关注':'+关注'}}</div>
        <div class="share iconfont center" @click="showSharePic">&#xe601;</div>
      </div>
    </header>
    <div class="main infobox flex1 overflow-touch" ref="main" @scroll="scroll">


      <team-info :info="info" :showRateList="true"></team-info>

      <div class="wrap">
        <div class="title">团队擅长</div>
        <div class="contentbox flex">
          <div class="content flex1">{{teamSkill}}</div>
          <div class="more flex0 icon" :class="[showText[0]?'up':'']" @click="changeShowText(0)"></div>
        </div>
      </div>

      <div class="wrap">
        <div class="title">团队介绍</div>
        <div class="contentbox flex">
          <div class="content flex1">{{teamResume}}</div>
          <div class="more flex0 icon" :class="[showText[1]?'up':'']" @click="changeShowText(1)"></div>
        </div>
      </div>

      <div class="wrap">
        <div class="title overflow-hidden">团队成员
          <a class="float-right" @click="changeType">{{showType=='part'?'查看更多':'收起'}}</a>
        </div>
        <ul class="overflow-hidden">
          <router-link :to="{path:'/onlineDoctorCard?docId='+member.docId}" :key="index" tag="li"
                       class="float-left lh1 relative"
                       v-if="index<showNumbers" v-for="(member,index) in info.members">
            <img src="../../../static/img/shouxi.png" class="absolute icon" alt="" v-if="member.showIndex==1">
            <div class="ava center">
              <img :src="member|docAva" alt="">
            </div>
            <div class="name center ellipsis">
              <b>{{member.docName}}</b> <span v-if="member.showIndex==1">首席</span>
            </div>
            <div class="dept center">{{member.deptName}}</div>
            <div class="zc center">{{member.docTitle}}</div>
          </router-link>
        </ul>
      </div>

      <div class="wrap">
        <div class="title">团队二维码</div>
        <ol class="flex ercode">
          <li class="flex0 center" @click="showQrcode('teamQrcodeUrl')">
            <p><img src="../../../static/img/logo.web.png" alt=""></p>
            <div><span class="app">APP</span>关注我<br>功能更丰富</div>
          </li>
          <li class="flex0 center" @click="showQrcode('teamQrcodeWechatUrl')">
            <p><img src="../../../static/img/logo.weixin.png" alt=""></p>
            <div><span class="weixin">微信</span>关注我<br>咨询更方便</div>
          </li>
        </ol>
      </div>
    </div>
    <router-link :to="{path:`/team/${id}/consult`}" tag="div" class="bottom flex0" ref="bottom">
      咨询团队{{info.consultPrice|formatPrice}}
    </router-link>

    <div class="qrcode" @click="isShowQrcode=false" v-if="isShowQrcode">
      <div class="mask fixed"></div>
      <div class="pic fixed">
        <img :src="qrcodeUrl" alt="">
      </div>
    </div>
    <share-pic ref="sharePic"></share-pic>
  </div>
</template>

<script>
  import AppHeader from "../../plugins/app-header"
  import {doBackMixin, jssdkMixin, mainHeightMixin} from "../../lib/mixin";
  import http from "../../lib/api"
  import weuijs from 'weui.js'
  import {debug, getShareLink} from "../../lib/util";
  import {formatPrice} from "../../lib/filter";
  import docAva from '../../utils/docAva'
  import TeamInfo from '../../plugins/team/info'
  import {OPEN_TEAMPIC} from "../../lib/config";
  import SharePic from '../../plugins/share-pic'

  const SHOW_MAX = 3;

  export default {
    data() {
      return {
        confirmDom: null,
        isFollow: false,
        qrcodeUrl: "",
        isShowQrcode: false,
        openTeampic: OPEN_TEAMPIC,
        id: "",
        showType: "all",
        info: {},
        showText: [0, 0],
        nameStyle: {
          opacity: 0
        }
      };
    },
    computed: {
      teamSkill() {
        return this.subStr(this.info.teamSkill, 0);
      },
      teamResume() {
        return this.subStr(this.info.teamResume, 1);
      },
      showNumbers() {
        return this.showType == 'part' ? SHOW_MAX : this.info.members.length;
      }
    },
    filters: {formatPrice, docAva},
    mixins: [mainHeightMixin, jssdkMixin, doBackMixin],
    components: {
      AppHeader, TeamInfo, SharePic
    },
    created() {
      let {id} = this.$route.params;
      id && (this.id = id) && (this.getDetail());
    },
    mounted() {

    },
    beforeDestroy() {
      this.confirmDom && this.confirmDom.hide();
    },
    methods: {
      scroll() {
        let el = this.$refs.main,
          top = el.scrollTop;
        this.$set(this.nameStyle, 'opacity', `${Math.min(top, 45) / 45}`);
      },

      showQrcode(field) {
        if (this.info[field]) {
          this.isShowQrcode = true
          this.qrcodeUrl = this.info[field];
        }
      },
      subStr(str, index) {
        if (!str) {
          return ''
        }
        let isOpen = this.showText[index];
        if (isOpen) {
          return str;
        } else {
          return str.substr(0, 40) + '...';
        }
      },
      changeShowText(index) {
        let isOpen = this.showText[index];
        isOpen = isOpen ? 0 : 1;
        this.showText.splice(index, 1, isOpen);
      },
      changeType() {
        this.showType = this.showType == 'part' ? 'all' : 'part';
      },

      doFollow() {
        if (this.isFollow) {
          this.confirmDom = weuijs.confirm('取消关注后你无法再收到医生的停诊通知、关怀随访、精选文章...', {
            title: "取消关注?",
            buttons: [
              {
                label: '确定取消',
                type: 'default',
                onClick: () => {
                  this.unfollow();
                }
              },
              {
                label: '我再想想',
                type: 'primary',
                onClick: () => {
                }
              }
            ]
          });
        } else {
          this.follow();
        }
      },

      showSharePic() {
        this.$refs.sharePic.show();
      },

      async follow() {
        let loading = weuijs.loading("加载中...");
        let ret = await http('smarthos.follow.teampat.add', {teamId: this.id});
        loading.hide();
        if (ret.code == 0) {
          this.isFollow = true
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      },

      async unfollow() {
        let loading = weuijs.loading("加载中...");
        let ret = await http('smarthos.follow.teampat.cancel', {teamId: this.id})
        loading.hide();

        if (ret.code == 0) {
          this.isFollow = false
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      },

      async jssdkShare() {
        let isOk = await this.jssdkMixin_getJssdkConfig();
        if (isOk) {
          let doc = this.info,
            conf = {
              title: doc.teamName,
              link: getShareLink(location.href),
              imgUrl: doc.teamAvatar, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              },

              desc: `您好，我是${doc.teamName}团队，${doc.members.length}个专家组团来为您服务`,//doc.teamResume, // 分享描述
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            };
          debug('share', conf);
          wx.ready(() => {
            wx.onMenuShareTimeline(Object.assign({},conf, {title: conf.desc}));
            wx.onMenuShareAppMessage(conf);
          })
        }
      },

      async getDetail() {
        let loading = weuijs.loading("加载中...");
        let ret = await http('smarthos.team.info.card', {id: this.id});
        if (ret.code == 0) {
          this.info = ret.obj;
          if (this.info.teampat && Object.keys(this.info.teampat).length > 0) {
            this.isFollow = true;
          }
        }
        loading.hide();
        await this.jssdkShare();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .page {
    flex-direction: column;
  }

  header {
    justify-content: space-between;
    height: px2rem(45px);
    align-items: center;
    background-color: white;
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

  .team-detail {
    background-color: #F8F8F8;
    .infobox {
      overflow-y: scroll;


      .wrap + .wrap {

      }
      .wrap {
        @include border(top);
        padding-top: px2rem(10px);
        background-color: white;
        &:after {
          left: px2rem(15px);
          width: px2rem(375px - 30px);
        }
        .title {
          @include h_lh(20px);
          padding: 0 px2rem(15px);
          font-size: px2rem(17px);
          a {
            font-size: px2rem(15px);
            color: $mainColor;
          }
        }
        ul {
          padding-bottom: px2rem(10px);
          padding-top: px2rem(10px);
          li + li + li + li {
            margin-top: px2rem(10px);
          }
          li {
            border: 0.5px solid rgba(74, 144, 226, 0.20);
            border-radius: px2rem(3px);
            width: px2rem(112px);
            margin-left: px2rem(10px);
            padding-bottom: px2rem(18px);
            padding-top: px2rem(18px);
            > img {
              left: px2rem(112px - 26px -17px);
              top: px2rem(18px + 60px - 15px);
              width: px2rem(17px);

            }
            .ava {
              overflow: hidden;
              img {
                border-radius: 50%;
                width: px2rem(60px);
                height: px2rem(60px);
              }
            }
            .name {
              margin-top: px2rem(10px);
              line-height: 1.2;
              color: #777777;
              font-size: px2rem(15px);
              span {
                font-size: px2rem(10px);
              }
            }
            .zc, .dept {
              margin-top: px2rem(5px);
              color: #999999;
              font-size: px2rem(12px);
            }
          }
        }
        .contentbox {
          margin-top: px2rem(10px);
          padding: 0 px2rem(5px) 0 px2rem(15px);
          .content {
            font-size: px2rem(15px);
            color: #777777;
            padding-bottom: px2rem(10px);
          }
          .icon {
            margin: 0 px2rem(5px) 0 px2rem(5px);
            $w: px2rem(21px);
            $h: px2rem(12px);
            width: $w;
            height: $h;
            background-image: url(../../../static/img/下.png);
            &.up {
              background-image: url(../../../static/img/上.png);
            }
            @include backgroundImageSet($w, $h);
          }
        }
      }
    }

    .bottom {
      @include h_lh(45px);
      font-size: px2rem(18px);
      text-align: center;
      color: white;
      background-color: $mainColor;
    }

  }

  .qrcode {
    .mask {
      @include t_r_b_l();
      background-color: rgba(0, 0, 0, 0.5);
    }
    .pic {
      left: 5%;
      top: 10%;
      right: 5%;
      bottom: 10%;
      img {
        width: 100%
      }
    }
  }
</style>
