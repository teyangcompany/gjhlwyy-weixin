<template>
  <div class="page flex">
    <div class="header relative center flex0">
      <div class="back absolute" @click.stop="$router.go(-1)">
        <i></i>
      </div>
      <div class="right absolute" @click="goSearch"><i class="weui-icon-search"></i></div>
      <span>
        <input v-model="key" type="text" placeholder="输入科室名称、医生姓名">
      </span>
    </div>
    <scroll ref="scroll"
            :probeType="probeType"
            :height="scrollHeight"
            :data="list"
            :listenScroll="listenScroll"
            class="flex0 relative overflow-hidden">
      <ul class="list">
        <router-link :key="index" :to="{path:'/onlineDoctorCard',query:{docId:doc.docId}}" tag="li"
                     class="flex"
                     v-for="(doc,index) in list">
          <div class="thumb flex0 flex">
            <img @load="onload" :src="docAva(doc)" alt="">
          </div>
          <div class="info flex1">
            <h3><b>{{doc.docName}}</b>{{doc.docTitle}}</h3>
            <div>{{doc.docHosName}} {{doc.docDeptName}}</div>
            <p class="flex"><span class="flex"> <img src="../../static/img/11.png" alt=""
                                                     v-if="doc.docPicConsultStatus == true"> {{ doc.docPicConsultStatus == true ? "图文咨询" : ""
              }}</span>
              <span class="flex"> <img src="../../static/img/shipin.png" alt=""
                                       v-if="doc.docVideoConsultStatus == true"> {{ doc.docVideoConsultStatus == true ? "视频问诊" : ""
                }}</span>
            </p>
          </div>
          <div class="flex0 flex score" v-if="doc.docScoure">
            <span class="">{{doc.docScoure ? doc.docScoure.toFixed(1) : "0.0" }}</span> 分
            <img src="../../static/img/left-arrow.png" alt="">
          </div>
          <div class="flex0 flex score" v-else>
            暂无评分
          </div>
        </router-link>
      </ul>
    </scroll>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import Msg from "../plugins/msg.vue"
  import weuijs from "weui.js"
  import Scroll from "../plugins/scroll.vue"
  import {isBindMixin, scrollHeightMixin} from "../lib/mixin"
  import api from "../lib/api"
  import {debug} from "../lib/util"
  import docAva from "../utils/docAva"

  export default {
    mixins: [scrollHeightMixin, isBindMixin],
    data() {
      return {
        listenScroll: true,
        probeType: 2,
        nodata: false,
        list: [],
        key: ""
      };
    },
    computed: {},
    components: {
      Scroll, Msg
    },
    created() {
      let query = this.$route.query, key = query.key || "";
      if (key) {
        this.key = key;
        this.getList();
      }
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
      goSearch() {
        let key = this.key;
        if (!key) {
          return
        }
        this.$router.replace({
          path: "search",
          query: {key}
        })
      },
      async getList(key) {
        let loading = weuijs.loading("搜索中...");
        if (!key) {
          key = this.key
        }
        let ret = await api("nethos.system.search.index", {key});
        debug("ret", ret);
        loading.hide();
        if (ret.code != 0) {
          this.$refs.msg.show(ret.msg || "服务端错误" + ret.code);
        }
        this.list = ret.list;
      }
    },
    watch: {
      $route(to, from) {
        this.key = to.query.key;
        this.getList();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/public";

  %a {
    line-height: 45px; /*no*/
    height: 45px; /*no*/
  }

  .header {
    font-size: 18px; /*no*/
    background-color: white;
    @include border(bottom);
    @extend %a;
    position: relative;
    > span {
      display: block;
      position: absolute;
      left: 45px;
      right: 45px;
      input {
        font-size: 15px;
        width: 90%;
      }
    }

    .back {
      position: absolute;
      @include t_r_b_l(0, 1, 1, 0);
      i {
        display: block;
        width: 45px; /*no*/
        height: 45px; /*no*/
        background-image: url(../../static/img/返回.png);
        @include backgroundImageSet(21px/2, 34px/2, $commonSpace);
      }
    }

    .right {
      right: $commonSpace;
      top: 0px;
      position: absolute;
      @extend %a;
      font-size: 16px; /*no*/
      color: $mainColor;
    }
  }

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
