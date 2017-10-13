<template>
  <div class="page flex">
    <app-header class="header flex0" ref="header" title="我的医生">
    </app-header>
    <scroll ref="scroll"
            :probeType="probeType"
            :height="scrollHeight"
            :data="list"
            :listenScroll="listenScroll"
            class="flex0 relative overflow-hidden">
      <ul class="list">
        <router-link :key="index" :to="{path:'/onlineDoctorCard',query:{docId:doc.sysDoc.docId}}" tag="li"
                     class="flex"
                     v-for="(doc,index) in list">
          <div class="thumb flex0 flex">
            <img @load="onload" :src="docAva(doc.sysDoc)" alt="">
          </div>
          <div class="info flex1">
            <h3><b>{{doc.sysDoc.docName}}</b>{{doc.sysDoc.docTitle}}</h3>
            <div>{{doc.sysDoc.docHosName}} {{doc.sysDoc.docDeptName}}</div>
            <p class="flex"><span class="flex"> <img src="../../../static/img/11.png" alt=""
                                                     v-if="doc.sysDoc.docPicConsultStatus == true"> {{ doc.sysDoc.docPicConsultStatus == true ? "图文咨询" : ""
              }}</span>
              <span class="flex"> <img src="../../../static/img/shipin.png" alt=""
                                       v-if="doc.sysDoc.docVideoConsultStatus == true"> {{ doc.sysDoc.docVideoConsultStatus == true ? "视频问诊" : ""
                }}</span>
            </p>
          </div>
          <div class="flex0 flex score">
            <span class="">{{doc.sysDoc.docScoure ? doc.sysDoc.docScoure.toFixed(1) : "0.0" }}</span> 分
            <img src="../../../static/img/left-arrow.png" alt="">
          </div>
        </router-link>
      </ul>
      <div class="nodata center absolute" v-if="nodata==true">
        <p>您暂未关注任何医生</p>
        <router-link to="/internetRoom">找医生</router-link>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../plugins/scroll.vue"
  import AppHeader from "../../plugins/app-header.vue"
  import {scrollHeightMixin, isBindMixin} from "../../lib/mixin"
  import api from "../../lib/api"
  import {debug} from "../../lib/util"
  import docAva from "../../utils/docAva"

  export default {
    mixins: [scrollHeightMixin, isBindMixin],
    data() {
      return {
        listenScroll: true,
        probeType: 2,
        nodata: false,
        list: []
      };
    },
    computed: {},
    components: {
      AppHeader,
      Scroll
    },
    created() {
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      docAva,
      onload() {
        //debug("imgload");
        this.$refs.scroll.refresh();
      },
      getList() {
        this._isBind().then((res) => {
          if (res !== false) {
            api("nethos.follow.docpat.list", {})
              .then((data) => {
                if (data.code == 0) {
                  this.list = data.list;
                  if (!this.list || this.list.length == 0) {
                    this.nodata = true;
                  }
                  ///this.list = [];
                }
              })
          }
        })
      }
    },
    watch: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/var";
  @import "../../common/base";
  @import "../../common/mixin";
  @import "../../common/public";

  .page {
    flex-direction: column;
    .list {
      li + li {
        @include border(top);
      }
      li {
        padding: 5px 0;
        .thumb {
          align-items: center;
          justify-content: center;
          width: 4.3rem;
          img {
            border-radius: 7px;
            @include thumb(3.2rem, 3.2rem);
          }
        }
        .info {
          h3, div, p {
            font-size: .75rem;
          }
          p, div {
            margin-top: 5px;
          }
          h3 {
            b {
              margin-right: 10px;
              font-size: .85rem;
              color: #333333;
            }
            color: #666666;
          }
          div {
            color: #999999;
          }
          p {

            span {
              &:nth-child(1) {
                margin-right: 10px;
              }
              align-items: center;
            }
            img {
              width: 1.1rem;
            }
            color: $mainColor;
          }
        }
        .score {
          padding-right: .8rem;
          span {
            color: #FAAC79;
            margin-right: 5px;
          }
          img {
            margin-left: 5px;
            @include w_h(.43rem, .64rem);
          }
          color: #999999;
          font-size: .75rem;
          align-items: center;
        }
      }
    }
  }
</style>
