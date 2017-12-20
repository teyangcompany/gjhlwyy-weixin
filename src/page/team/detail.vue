<template>
  <div class="page team-detail">
    <app-header title="团队名片" ref="header">
      <i class="back" slot="back"></i>
    </app-header>
    <div class="main infobox" ref="main">
      <div class="banner">
        <img :src="info.teamAvatar" alt="">
      </div>
      <div class="info">
        <h3 class="center">{{info.teamName}}</h3>
        <div class="flex score" v-if="info.consultPrice">
          <star class="flex0" :size="36" :score="7.5"></star>
          <div class="flex0 text">7.5分</div>
          <div class="flex0 text">查看</div>
        </div>
        <div class="center score-no" v-else>
          暂无评分
        </div>
      </div>

      <div class="wrap">
        <div class="title">团队擅长</div>
        <div class="contentbox flex">
          <div class="content flex1">{{info.teamSkill}}</div>
          <!--<div class="more flex0 icon"></div>-->
        </div>
      </div>

      <div class="wrap">
        <div class="title">团队介绍</div>
        <div class="contentbox flex">
          <div class="content flex1">{{info.teamResume}}</div>
          <!--<div class="more flex0 icon"></div>-->
        </div>
      </div>

      <div class="wrap">
        <div class="title overflow-hidden">团队成员
          <a class="float-right" @click="changeType">{{showType=='part'?'查看更多':'收起'}}</a>
        </div>
        <ul class="overflow-hidden">
          <router-link :to="{path:'/onlineDoctorCard?docId='+member.docId}" :key="index" tag="li" class="float-left"
                       v-if="index<showNumbers" v-for="(member,index) in info.members">
            <div class="ava center">
              <img :src="member.docAvatar" alt="">
            </div>
            <div class="name center">
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
  import Star from "../../base/star/star"
  import {formatPrice} from "../../lib/filter";

  const SHOW_MAX = 4;

  export default {
    data() {
      return {
        id: "",
        showType: "part",
        info: {}
      };
    },
    computed: {
      showNumbers() {
        return this.showType == 'part' ? SHOW_MAX : this.info.members.length;
      }
    },
    filters: {formatPrice},
    mixins: [mainHeightMixin],
    components: {
      AppHeader, Star
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
      .info {
        background-color: white;
        padding-bottom: px2rem(15px);
        h3 {
          font-size: px2rem(18px);
          padding: px2rem(15px);
        }
        .score-no {
          font-size: px2rem(15px);
          color: #777777;
        }
        .score {
          justify-content: center;
          .text {
            margin-left: px2rem(10px);
            font-size: px2rem(15px);
            color: $mainColor;
          }
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
          border-left: 3px solid yellow;
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
            $w: px2rem(21px);
            $h: px2rem(12px);
            width: $w;
            height: $h;
            background-image: url(../../../static/img/下.png);
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
