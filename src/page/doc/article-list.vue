<template>
  <div class="page">
    <app-header ref="header" :title="(info.docName||info.teamName)+'的文章'">
      <i slot="back" class="back"></i>
    </app-header>
    <scroll :height="scrollHeight" :data="list" class="main overflow-hidden">
      <ul>
        <article-item v-for="(item,index) in list" :item="item" :key="index"></article-item>
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
  import ArticleItem from '../../plugins/doc/article-item2'
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
    components: {AppHeader, Scroll, ArticleItem},
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

  .main {
    background-color: $bgColor;
    ul {
      padding-top: $commonSpace;
    }

  }
</style>
