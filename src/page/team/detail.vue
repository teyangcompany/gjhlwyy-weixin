<template>
    <div class="page team-detail">
        <app-header title="团队名片" ref="header">
            <i class="back" slot="back"></i>
        </app-header>
        <div class="main infobox" ref="main">
            <div class="banner">
                <img :src="info.teamAvatar" alt="">
            </div>

            <team-info :info="info"></team-info>

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
                                 class="float-left"
                                 v-if="index<showNumbers" v-for="(member,index) in info.members">
                        <div class="ava center">
                            <img :src="member|docAva" alt="">
                        </div>
                        <div class="name center ellipsis">
                            {{member.docName}}
                        </div>
                    </router-link>
                </ul>
            </div>
        </div>
        <router-link :to="{path:`/team/${id}/consult`}" tag="div" class="bottom" ref="bottom">
            咨询团队{{info.consultPrice|formatPrice}}
        </router-link>
    </div>
</template>

<script>
  import AppHeader from "../../plugins/app-header"
  import {mainHeightMixin} from "../../lib/mixin";
  import http from "../../lib/api"
  import weuijs from 'weui.js'
  import {formatPrice} from "../../lib/filter";
  import docAva from '../../utils/docAva'
  import TeamInfo from '../../plugins/team/info'

  const SHOW_MAX = 4;

  export default {
    data() {
      return {
        id: "",
        showType: "all",
        info: {},
        showText: [0, 0]
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
    mixins: [mainHeightMixin],
    components: {
      AppHeader, TeamInfo
    },
    created() {
      let {id} = this.$route.params;
      id && (this.id = id) && (this.getDetail());
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      subStr(str, index) {
        if (!str) {
          return ''
        }
        ;
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
      async getDetail() {
        let loading = weuijs.loading("加载中...");
        let ret = await http('smarthos.team.info.card', {id: this.id});
        if (ret.code == 0) {
          this.info = ret.obj;
        }
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../../common/public";

    .team-detail {
        background-color: #F8F8F8;
        .infobox {
            overflow-y: scroll;
            .banner {
                img {
                    width: 100%;
                    height: px2rem(150px);
                }
            }

            .wrap + .wrap {
                margin-top: px2rem(10px);
            }
            .wrap {
                padding-top: px2rem(10px);
                margin-top: 1px;
                background-color: white;
                .title {
                    @include h_lh(20px);
                    padding: 0 px2rem(15px);
                    border-left: 3px solid #FABE00;
                    font-size: px2rem(17px);
                    a {
                        font-size: px2rem(15px);
                        color: $mainColor;
                    }
                }
                ul {
                    padding-bottom: px2rem(10px);
                    li {
                        padding-top: px2rem(15px);
                        width: 25%;
                        .ava {
                            overflow: hidden;
                            img {
                                width: px2rem(60px);
                                height: px2rem(60px);
                            }
                        }
                        .name {
                            color: $mainColor;
                            font-size: px2rem(14px);
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
</style>
