<template>
  <div class="page">
    <app-header ref="header" :title="(info.docName||info.teamName)+'的文章'">
      <i slot="back" class="back"></i>
    </app-header>
    <scroll :height="scrollHeight" :data="list" class="main overflow-hidden">
      <ul>
        <router-link tag="li" :key="item.docArticle.articleId"
                     :to="{path:'/articleDetail',query:{articleId:item.docArticle.articleId}}"
                     v-for="item in list" class="lh1">
          <h3 class="flex">
            <div class="name color_333 flex1">{{item.docArticle.title}}</div>
            <div class="tag flex0" v-if="item.docArticle.isGrade">推荐</div>
          </h3>
          <div class="flex info color_999">
            <div class="ava flex0">
              <img :src="item.sysDoc|docAva" alt="">
            </div>
            <div class="name flex0">
              {{item.sysDoc.docName}}
            </div>
            <div class="time flex1">
              {{item.docArticle.createTime|formatTime('%Y/%m/%d')}}
            </div>
            <div class="num flex0">
              {{item.docArticle.readTimes}} 阅读
            </div>
          </div>
        </router-link>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import AppHeader from '../../plugins/app-header'
  import {jssdkMixin, mainHeightMixin, scrollHeightMixin} from "../../lib/mixin";
  import api from '../../lib/api'
  import weuijs from 'weui.js'
  import Scroll from '../../plugins/scroll'
  import {formatTime} from "../../lib/filter";

  import docAva from '../../utils/docAva'

  export default {
    data() {
      return {
        id: '',
        list: [],
        info: {}
      };
    },
    computed: {},
    filters: {formatTime, docAva},
    mixins: [mainHeightMixin, jssdkMixin, scrollHeightMixin],
    components: {AppHeader, Scroll},
    async created() {
      let {params, query} = this.$route;
      query && (query.docId) && (this.id = query.docId);
      query && (query.teamId) && (this.id = query.teamId);
      await this.getDetail();
      await this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getList() {
        let loading = weuijs.loading("加载中...");

        let ret, {query} = this.$route;
        if (query.docId) {
          ret = await api('nethos.doc.article.list', {docId: this.id, pageSize: 1000});
        } else {
          ret = await api('nethos.doc.article.team.list', {teamId: this.id, pageSize: 1000});
        }


        loading.hide();
        if (ret.code == 0) {
          this.list = ret.list;
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }

      },
      async getDetail() {
        let loading = weuijs.loading("加载中...");

        let ret, {query} = this.$route;
        if (query.docId) {
          ret = await api('nethos.doc.card', {docId: this.id})
        } else {
          ret = await api('smarthos.team.info.card', {id: this.id});
        }

        loading.hide();
        if (ret.code == 0) {
          this.info = ret.obj.sysDoc || ret.obj;
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  h3 {
    align-items: center;
    font-size: px2rem(18px);
    line-height: 1.2;
    .name {
      @include lines(2);
    }
  }

  .tag {
    color: orange;
    font-size: px2rem(12px);
    border: 0.5px solid orange;
    padding: 4px 6px;
    border-radius: 10px;
  }

  .info {
    margin-top: $commonSpace;
    align-items: center;
    font-size: px2rem(14px);
    .ava {
      $w: px2rem(30px);
      @include w_h($w, $w);
      img {
        @include w_h($w, $w);
        border-radius: 50%;
      }
    }
    .name, .ava {
      margin-right: px2rem(10px);
    }
  }

  .main {
    background-color: $bgColor;
    ul {
      padding-top: $commonSpace;
      li {
        background-color: white;
        padding: $commonSpace;
      }
      li + li {
        margin-top: $commonSpace;
      }
    }

  }
</style>
