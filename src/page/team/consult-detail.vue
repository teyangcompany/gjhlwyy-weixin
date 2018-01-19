<template>
  <div class="page team-consult-detail flex">
    <app-header ref="header" class="flex0" :title="consult.consultTypeName">
      <i slot="back"></i>
      <div slot="right" @click="handleConsult('end')" class="right absolute"
           v-if="consult.consultStatus=='GOING'&&!consult.consultStatusDescription">
        结束问诊
      </div>
    </app-header>
    <scroll :height="scrollHeight" ref="scroll" class="flex1">
      <div class="main">
        <div class="info">
          <div class="item flex">
            <div class="label flex0">患者资料：</div>
            <div class="text flex1">{{consult.consulterName}} {{consult.consulterGender|getGender}}
              {{consult.consulterAge}}岁
            </div>
          </div>
          <div class="item flex">
            <div class="label flex0">疾病名称：</div>
            <div class="text flex1">{{consult.illnessName}}</div>
          </div>
          <div class="container">
            <div class="content">
              {{consult.consultContent}}
            </div>
            <ul v-if="attaList" class="pics overflow-hidden">
              <li v-for="pic in attaList" class="float-left">
                <img :src="pic.url" alt="">
              </li>
            </ul>
          </div>
          <div class="pat flex">
            <div class="ava flex0">
              <img :src="consult|patAva" alt="">
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
            <li v-for="(member,index) in members" v-if="index<showMember" class="float-left">
              <div class="ava">
                <img :src="member|docAva" alt="">
              </div>
              <div class="name ellipsis">{{member.docName}}</div>
            </li>
          </ul>
        </div>
        <div class="meaasge">
          <message-item ref="msg" v-for="message in messageList" :key="message.messageId"
                        :message="message"></message-item>
        </div>
      </div>
    </scroll>
    <bottom class="flex0" @cancel="getDetail" @sendok="sendok" :status="consult.consultStatus" :message="messageList"
            :consult="consult"></bottom>
  </div>
</template>

<script>
  import patAva from '../../utils/consultPatAva'
  import Scroll from "../../plugins/scroll"
  import weuijs from "weui.js"
  import AppHeader from "../../plugins/app-header"
  import api from "../../lib/api"
  import {scrollHeightMixin} from "../../lib/mixin";
  import Bottom from '../../plugins/consult/bottom'
  import {formatTime, getGender} from "../../lib/filter";
  import MessageItem from "../../plugins/consult/message-item"
  import docAva from '../../utils/docAva'

  const MAX = 4;
  export default {
    data() {
      return {
        bottomHeight: 50,
        showType: 'part',
        id: "",
        info: {},
        teamInfo: {}
      };
    },
    computed: {
      consult() {
        return this.info.consult ? this.info.consult : {};
      },
      attaList() {
        return this.info.attaList ? this.info.attaList : []
      },
      messageList() {
        return this.info.messageList ? this.info.messageList : []
      },
      members() {
        return this.teamInfo ? this.teamInfo.members : []
      },
      showMember() {
        return this.showType == 'part' ? MAX : this.members.length;
      }
    },
    filters: {getGender, formatTime, patAva, docAva},
    mixins: [scrollHeightMixin],
    components: {
      AppHeader, Scroll, Bottom, MessageItem
    },
    created() {
      let {id} = this.$route.params;
      id && (this.id = id) && (this.getDetail());
    },
    mounted() {
      window.addEventListener('resize', this.resize);
    },
    beforeDestroy() {

    },
    methods: {
      resize() {
        let scrollC = (this.$refs.scroll);
        setTimeout(() => {
          this._calcScrollHeight();
          scrollC.refresh();
        }, 200);
      },
      sendok() {
        this.getDetail();
        setTimeout((res) => {
          this.$refs.scroll.scrollToElement(this.$refs.msg[this.$refs.msg.length - 1].$el.querySelector('.msg'), 300);
        }, 200)

      },

      handleConsult(type) {
        switch (type) {
          case 'end':
            weuijs.confirm('是否确认结束问诊？', () => {
              //console.log(res);
              this.endConsult();
            })
            break;
        }
      },

      async endConsult() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('nethos.consult.info.complete', {consultId: this.id});
        loading.hide();
        if (ret.code == 0) {
          weuijs.toast('操作成功', {
            callback: () => {
              this.getDetail();
            }
          });
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      },

      async getDetail() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('nethos.consult.info.detail', {consultId: this.id});
        if (ret.code == 0) {
          this.info = ret.obj;
          if (this.info.consult.consultType == "TEAMPIC") {
            let ret2 = await api("smarthos.team.info.card", {id: this.info.consult.teamId});
            if (ret2.code == 0) {
              this.teamInfo = ret2.obj;
            }
          }
        }
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .team-consult-detail {
    flex-direction: column;
    .scrollwrapper {
      background-color: #F8F8F8;
      overflow: hidden;
    }
    .main {
      .info {
        background-color: white;
        .item + .item, .container {
          @include border(top);
        }
        .item {
          padding-left: px2rem(15px);
          @include h_lh(45px);
          .label {
            font-size: 14px;
          }
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
      }
    }
  }

</style>
