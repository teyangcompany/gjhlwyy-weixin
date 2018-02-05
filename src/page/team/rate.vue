<template>
  <div class="page">
    <app-header title="团队评价" ref="header">
      <i slot="back" class="back"></i>
    </app-header>
    <div class="main" ref="main">
      <team-info class="info" :thumb="'radius'" :info="info" :showRateList="false"></team-info>
      <div class="list">
        <rate-item v-for="(data,index) in list" :key="index" :data="data"></rate-item>
        <div class="nodata center" v-if="list.length==0">
          暂无评价信息
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import weuijs from 'weui.js'
  import TeamInfo from '../../plugins/team/info'
  import AppHeader from '../../plugins/app-header'
  import {mainHeightMixin} from "../../lib/mixin";
  import http from '../../lib/api'
  import RateItem from '../../plugins/rate-item'

  export default {
    data() {
      return {
        info: {},
        id: '',
        list: []
      };
    },
    computed: {},
    mixins: [mainHeightMixin],
    components: {AppHeader, TeamInfo, RateItem},
    created() {
      let {id} = this.$route.params;
      id && (this.id = id) && (this.getDetail()) && (this.getRate());
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getDetail() {
        let loading = weuijs.loading("加载中...");
        let ret = await http('smarthos.team.info.card', {id: this.id});
        if (ret.code == 0) {
          this.info = ret.obj;
        }
        loading.hide();
      },
      async getRate() {
        let loading = weuijs.loading("加载中...");
        let ret = await http('nethos.doc.comment.list', {moudleId: this.id, moudleType: 'TEAMPIC'});
        if (ret.code == 0) {
          this.info = ret.list;
        }
        loading.hide();
      }

    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .main {
    .info {
      @include border();
    }
  }
</style>
