<template>
  <div class="page flex">
    <app-header title="医生团队" class="flex0">
      <i slot="back" class="back"></i>
    </app-header>
    <scroll :data="list" :height="scrollHeight" class="flex1 overflow-y-hidden">
      <div>
        <list-item v-for="item in list" :data="item" :key="item.id"></list-item>
      </div>
    </scroll>
  </div>
</template>

<script>
  import AppHeader from '../../plugins/app-header'
  import {scrollHeightMixin} from "../../lib/mixin";
  import Scroll from "../../plugins/scroll";
  import ListItem from '../../plugins/team/list-item'
  import weuijs from 'weui.js'
  import api from '../../lib/api'

  export default {
    data() {
      return {
        list: []
      };
    },
    computed: {},
    mixins: [scrollHeightMixin],
    components: {
      Scroll,
      AppHeader,
      ListItem
    },
    created() {
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getList() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.team.info.list', {});
        loading.hide();
        if (ret.code == 0) {
          this.list = ret.list;
        } else {
          this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .page {
    flex-direction: column;
  }
</style>
