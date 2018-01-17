<template>
  <div class="page">
    <app-header :title="title" class="flex0">
      <i slot="back" class="back"></i>
    </app-header>
    <scroll ref="scroll" :height="scrollHeight" class="overflow-hidden" :data="list">
      <div class="container">
        <msg-item v-for="(item,index) in list" :key="index" :data="item" :doc="sysDoc" :pat="sysPat"></msg-item>
      </div>
    </scroll>
    <msg-bottom v-if="bottomHeight>0" :followId="id" @sendok="sendok"></msg-bottom>
  </div>
</template>

<script>
  import MsgBottom from '../../../plugins/doc/msg-bottom'
  import MsgItem from '../../../plugins/doc/msg-item'
  import {scrollHeightMixin} from "../../../lib/mixin";
  import AppHeader from "../../../plugins/app-header"
  import Scroll from '../../../plugins/scroll'
  import {chartCache} from "../../../lib/cache";
  import weuijs from 'weui.js'
  import api from '../../../lib/api'

  export default {
    data() {
      return {
        bottomHeight: 0,
        id: "",
        info: {},
        list: [],
      };
    },
    computed: {
      title() {
        return Object.keys(this.info).length > 0 ? this.info.sysDoc.docName : ''
      },
      sysDoc() {
        return this.info.sysDoc ? this.info.sysDoc : {};
      },
      sysPat() {
        return this.info.sysPat ? this.info.sysPat : {};
      }
    },
    mixins: [scrollHeightMixin],
    components: {AppHeader, Scroll, MsgItem, MsgBottom},
    created() {
      this.info = chartCache.get();
      let {params} = this.$route;
      params && params.id && (this.id = params.id);
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      sendok(ret) {
        if (ret.code == 0) {
          this.getList();
        }
      },

      toend() {
        let scroll = this.$refs.scroll;
        scroll.refresh();
        setTimeout(() => {
          scroll.scrollTo(0, scroll.scroll.maxScrollY, 300);
        }, 20)

      },

      async getList() {
        if (this.id == "0") {
          return
        }
        let loading = weuijs.loading("加载中...");
        let ret = await api('nethos.follow.message.detail.list', {followId: this.id})
        loading.hide();
        if (ret.code == 0) {
          this.list = ret.list;
          this.info = ret.obj;
          let {followDocpat} = this.info;
          if (followDocpat.patVip) {
            this.bottomHeight = 50;
            this._calcScrollHeight();
          }
          setTimeout(this.toend, 200);
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../common/public";

  .container {
    padding-bottom: $commonSpace;
  }

  .consult-bottom {
    @include border(top);
  }
</style>
