<template>
  <div class="page team-consult-detail flex">
    <app-header ref="header" class="flex0" :img="img" :title="title">
      <i slot="back"></i>
      <div slot="right" @click="handleConsult('end')" class="right absolute"
           v-if="consult.consultStatus=='GOING'&&consult.replyCount">
        结束咨询
      </div>
    </app-header>
    <div class="patinfo flex">
      <div class="label flex0">患者资料：</div>
      <div class="text flex1">{{consult.consulterName}} {{consult.consulterGender|getGender}}
        {{consult.consulterAge}}岁
      </div>
      <div v-if="showInfo" class="flex0 color_666" @click="toTop">查看</div>
    </div>
    <scroll :height="scrollHeight" ref="scroll" :listenScroll="true" :probeType="2" @scroll="onScroll" class="flex1">
      <div class="main">
        <div class="info">
          <div class="item flex">
            <div class="label flex0">疾病名称：</div>
            <div class="text flex1">{{consult.illnessName||'暂无'}}</div>
          </div>
          <div class="container">
            <div class="content" v-html="consult.consultContent"></div>
            <ul v-if="attaList" class="pics overflow-hidden">
              <li v-for="pic in attaList" class="float-left">
                <img @click="scan(pic.url,attaList)" :src="pic.url" alt="">
              </li>
            </ul>
          </div>
          <div class="pat flex">
            <div class="ava flex0">
              <img :src="consult|patAva" alt="" @error="__avaError($event)">
            </div>
            <div class="name flex0">{{consult.patName}}</div>
            <div class="time flex1">{{consult.createTime|formatTime('%Y-%m-%d %H:%M:%S')}}</div>
          </div>
        </div>
        <div v-if="consult.consultType=='TEAMPIC'" class="team">
          <h3 class="overflow-hidden" @click="showType=showType=='part'?'all':'part'">
            专家团队成员
            <div class="icon float-right" :class="[showType]"></div>
          </h3>
          <ul class="overflow-hidden">
            <router-link tag="li" :key="index" :to="{path:'/onlineDoctorCard',query:{docId:member.docId}}"
                         v-for="(member,index) in members" v-if="index<showMember" class="float-left">
              <div class="ava">
                <img :src="member|docAva" alt="">
              </div>
              <div class="name ellipsis">{{member.docName}}</div>
            </router-link>
          </ul>
        </div>
        <div class="meaasge">
          <message-item ref="msg" v-for="message in messageList" :key="message.messageId"
                        :message="message" @play="play" @scan="scan"></message-item>
        </div>
      </div>
    </scroll>
    <bottom class="flex0" @cancel="getDetail" @sendok="sendok" :status="consult.consultStatus"
            :message="messageList"
            :consult="consult"></bottom>
    <app-audio :url="url" ref="audio"></app-audio>
    <div v-if="consult.consultStatus=='NEEDPAY'" class="djs-notice fixed center">
      <div class="content center">
        请在 <span>{{djs|formatTime('%M:%S')}}</span> 内完成支付 <br>
        超时订单自动取消
      </div>
      <div class="icon"></div>
    </div>
  </div>
</template>

<script>
  import AppAudio from '../../plugins/audio'
  import patAva from '../../utils/consultPatAva'
  import Scroll from "../../plugins/scroll"
  import weuijs from "weui.js"
  import AppHeader from "../../plugins/app-header"
  import api from "../../lib/api"
  import {avaErrorMixin, jssdkMixin, scrollHeightMixin} from "../../lib/mixin";
  import Bottom from '../../plugins/consult/bottom'
  import {formatTime, getGender, TijianzdToHtml} from "../../lib/filter";
  import MessageItem from "../../plugins/consult/message-item"
  import docAva from '../../utils/docAva'
  import {audioPlayStatusCache} from "../../lib/cache";

  const MAX = 4;
  export default {
    data() {
      return {
        showInfo: false,
        bottomHeight: 50 + 45,
        showType: 'part',
        id: "",
        info: {},
        url: '',
        djs: 0,
        messageList: [],
        teamInfo: {},
        messageLength: 0
      };
    },
    computed: {
      title() {
        if (this.info && this.info.consult && this.info.consult.consultType == 'DOCPIC') {
          return this.info.consult.docName;
        } else if (this.info && this.info.consult && this.info.consult.consultType == 'TEAMPIC') {
          return this.teamInfo.teamName;
        }
      },
      img() {
        if (this.info && this.info.consult && this.info.consult.consultType == 'DOCPIC') {
          return this.info.consult;
        } else {
          return {};
        }
      },
      consult() {
        let {info} = this;
        if (info.consult) {
          info.consult.consultContent = TijianzdToHtml(info.consult.consultContent);
          info.consult.consultContent = info.consult.consultContent.replace(/[\d]{4}-[\d]{2}-[\d]{2}/g, s => `<font class="color_red">${s}</font>`);
          return info.consult;
        }
        return {}
      },
      attaList() {
        return this.info.attaList ? this.info.attaList : []
      },
      members() {
        return this.teamInfo ? this.teamInfo.members : []
      },
      showMember() {
        return this.showType == 'part' ? MAX : this.members.length;
      }
    },
    filters: {getGender, formatTime, patAva, docAva},
    mixins: [scrollHeightMixin, jssdkMixin, avaErrorMixin],
    components: {
      AppHeader, Scroll, Bottom, MessageItem, AppAudio
    },
    created() {
      this.timer = null;
      this.djsTimer = null;
      this.doDjs();
      this.jssdk();
      let {id} = this.$route.params;
      id && (this.id = id) && (this.getDetail());
    },
    mounted() {
      window.addEventListener('resize', this.resize);
    },
    beforeDestroy() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    methods: {
      doDjs() {
        if (this.djs) {
          this.djs += (0 - 1000);
        } else {

        }
        if (this.djsTimer) {
          clearTimeout(this.djsTimer);
          this.djsTimer = null;
        }
        this.djsTimer = setTimeout(this.doDjs, 1000);
      },
      resize() {
        let scrollC = (this.$refs.scroll);
        setTimeout(() => {
          this._calcScrollHeight();
          scrollC.refresh();
        }, 200);
      },
      sendok() {
        //this.getMsgList();
      },

      onScroll() {
        let scroll = this.$refs.scroll.scroll;
        if (scroll && scroll.y < 0) {
          this.showInfo = true;
        } else {
          this.showInfo = false;
        }
      },

      toTop() {
        setTimeout((res) => {
          let scroll = this.$refs.scroll.scroll;
          if (scroll) {
            this.showInfo = false;
            this.$refs.scroll.scrollTo(0, 0, 300);
          }
          //this.$refs.scroll.scrollToElement(this.$refs.msg[this.$refs.msg.length - 1].$el.querySelector('.msg'), 300);
        }, 300)
      },
      toBottom() {
        setTimeout((res) => {
          let scroll = this.$refs.scroll.scroll;
          if (scroll && scroll.maxScrollY < 0 && this.consult.consultStatus == "GOING") {
            this.showInfo = true;
            this.$refs.scroll.scrollTo(0, scroll.maxScrollY, 300);
          }
          //this.$refs.scroll.scrollToElement(this.$refs.msg[this.$refs.msg.length - 1].$el.querySelector('.msg'), 300);
        }, 300)
      },

      handleConsult(type) {
        switch (type) {
          case 'end':
            weuijs.confirm('若您的问题已经解决，可以结束咨询', () => {
                this.endConsult();
              },
              () => {
              },
              {title: '结束咨询'})
            break;
        }
      },

      play(url) {
        audioPlayStatusCache.set({url, status: 'playing'});
        this.url = url;
        this.$refs.audio && (this.$refs.audio.play());
      },

      scan(url, list) {
        if (!list) {
          list = [{url}];
        }
        let urls = list.map(pic => pic.url);
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: urls // 需要预览的图片http链接列表
        });
      },

      checkMsgLength() {
        if (this.info.messageList) {
          if (this.messageLength != this.info.messageList.length) {
            this.messageLength = this.info.messageList.length;
            this.messageLength && (this.toBottom());
          }
        }
      },

      async endConsult() {
        let loading = weuijs.loading("加载中...");
        let ret = await
          api('nethos.consult.info.complete', {consultId: this.id});
        loading.hide();
        if (ret.code == 0) {
          weuijs.toast('操作成功', {
            callback: () => {
              this.getDetail();
              /*if (this.consult.consultType == 'TEAMPIC') {
                this.$router.push({path: `/team/${this.consult.teamId}/detail`})
              } else if (this.consult.consultType == 'DOCPIC') {
                this.$router.push({path: '/onlineDoctorCard', query: {docId: this.consult.docId}});
              }*/
            }
          });
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      },

      async getMsgList() {
        let ret = await api('nethos.consult.message.list.v2', {consultId: this.id, pageSize: 10000, msgLevel: "SYS"});
        if (ret.code == 0) {
          let t = 0;
          this.messageList = ret.list.map((item, index) => {
            if (t && item.replyTime - t > 20 * 60 * 1000) {
              item.showTime = formatTime(item.replyTime, '%Y-%m-%d %H:%M:%S');
            }
            t = item.replyTime;
            return item;
          });
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      },

      async getDetail(type) {
        let loading;
        if (!type) {
          loading = weuijs.loading("加载中...");
        }

        let ret = await api('nethos.consult.info.detail', {consultId: this.id});
        if (ret.code == 0) {
          this.info = ret.obj;
          this.checkMsgLength();
          await this.getMsgList();
          if (this.info.consult.consultType == "TEAMPIC") {
            await this.getTeamInfo();
          }
        }

        if (!type) {
          loading.hide();
        }

        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        /*if(this.info.consult.consultStatus=="GOING"){

        }*/
        this.timer = setTimeout(() => {
          this.getDetail('lunxun');
        }, 5000);
      },

      async getTeamInfo() {
        let ret = await api("smarthos.team.info.card", {id: this.info.consult.teamId});
        if (ret.code == 0) {
          this.teamInfo = ret.obj;
        }
      },

      async jssdk() {
        await this.jssdkMixin_getJssdkConfig();
      }
    },
    watch: {
      info(newV) {
        if (newV.payWaitSeconds) {
          (!this.djs) && (this.djs = newV.payWaitSeconds * 1000);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .djs-notice {
    left: 55%;
    bottom: 50px;
    width: 40%;
    .content, .icon {
      color: white;
      font-size: 12px;
      background-color: $mainColor;
    }
    .content {
      border-radius: 10px;
      padding: 5px 0;
      transform: translateY(11px);
    }
    .icon {
      display: inline-block;
      transform: rotate(45deg);
      @include w_h(10px, 10px);
    }
  }

  .team-consult-detail {
    flex-direction: column;
    .scrollwrapper {
      background-color: #F8F8F8;
      overflow: hidden;
    }

    .patinfo {
      @include border();
      padding-left: px2rem(15px);
      padding-right: px2rem(15px);
      @include h_lh(45px);
      .label {
        font-size: 14px;
      }
    }

    .main {
      .info {
        background-color: white;
        .item + .item, .container {
          @include border(top);
        }
        .item {
          @extend .patinfo;
        }
        .container {
          padding: px2rem(5px) px2rem(15px);
          .content {
            font-size: 12px;
          }
          .pics {
            padding-top: 10px;
            li {
              padding-bottom: 10px;
              width: (100%/3);
              img {
                @include w_h(5rem, 5rem);
              }
            }
          }
        }
        .pat {
          padding: 0 px2rem(15px);
          align-items: center;
          height: 45px;
          .ava {
            img {
              border-radius: 15px;
              @include w_h(30px, 30px);
            }
          }
          .name {
            padding-left: 15px;
            color: #777777;
          }
          .time {
            color: #777777;
            text-align: right;
          }
        }
      }
      .team {
        margin-top: px2rem(15px);
        background-color: white;
        h3 {
          @include h_lh(35px);
          padding: 0 px2rem(15px);
          .icon {
            @include w_h(35px/2, 20px/2);
            margin-top: 13px;
            @include backgroundImageSet();
            &.part {
              background-image: url(../../../static/img/下.png);
            }
            &.all {
              background-image: url(../../../static/img/上.png);
            }

          }
        }
        ul {
          padding: 0 px2rem(15px);
          padding-top: 5px;
          li {
            width: 25%;
            text-align: center;
            padding-bottom: 5px;
            img {
              border-radius: 50%;
              @include w_h(3rem, 3rem);
            }
            .name {
              font-size: 14px;
              color: $mainColor;
            }
          }
        }
      }
      .meaasge {
        padding: 20px 0;
        > div {
          &:last-child {
            margin-top: px2rem(10px);
          }
        }
      }
    }
  }

</style>
