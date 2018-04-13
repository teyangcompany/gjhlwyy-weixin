<template>
  <div class="page flex">
    <app-header class="flex0" title="新闻详情"></app-header>
    <div class="main flex1 overflow-touch overflow-y-auto">
      <h3 class="fs18">{{info.title}}</h3>
      <h5 class="flex">
        <div class="flex0">{{info.createTime|formatTime('%Y-%m-%d')}}</div>
        <div class="flex1 right">{{info.viewCount}}次阅读</div>
      </h5>
      <div id="article_detail" v-html="info.content"></div>
    </div>
  </div>
</template>

<script>
  import AppHeader from "../../plugins/app-header";
  import weuijs from 'weui.js'
  import http from '../../lib/api'
  import {formatTime} from "../../lib/filter";

  export default {
    data() {
      return {
        info: {}
      }
    },
    computed: {},
    filters: {formatTime},
    components: {AppHeader},
    mixins: [],
    created() {
      this.getData();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getData() {
        let {params} = this.$route;
        //newId=5aa5e98384ae9b0664e83b81|newId=5a600c2a84ae5b9e58ae502b|newId=598272cd84ae2db11126cdbf
        let loading = weuijs.loading("加载中...");
        let ret = await http('nethos.system.information.details', {newId: params.newsId});
        loading.hide();
        if (ret.code == 0) {
          let info = ret.obj;
          this.info = info;
          if (info.newsType == "EXTERNALLINKS") location.replace(info.content);
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .page {
    flex-direction: column
  }

  .main {
    padding: $commonSpace;
  }

  h3 {
    line-height: 1.2;
  }

  h5 {
    margin-top: 10px;
    color: #666666;
    font-size: 16px
  }
</style>
