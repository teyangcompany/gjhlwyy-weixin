<template>
  <scroll class="scroll overflow-hidden" :height="height">
    <ul>
      <li v-for="(item,index) in list" :key="index" class="flex">
        <div class="ava flex0">
          <img :src="item.sysDoc.docAvatar" alt="">
        </div>
        <div class="info flex1">
          <h3 class="flex">
            <b class="block flex1">{{item.sysDoc.docName}}</b>
            <span class="block flex0">{{item.followDocpat.createTime}}</span>
          </h3>
          <div class="content" v-if="item.followMessage">
            {{item.followMessage.msgText}}
          </div>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<script>
  import weuijs from 'weui.js'
  import Scroll from '../../../plugins/scroll'
  import MyDocMixin from '../../../lib/mixins/my-doc'
  import http from '../../../lib/api'

  export default {
    data() {
      return {
        list: [],
        height: 0
      };
    },
    computed: {},
    mixins: [MyDocMixin],
    components: {Scroll},
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
        let ret = await http('nethos.follow.message.last.list', {})
        loading.hide();
        if (ret.code == 0) {
          this.list = ret.list;
        } else {
          //this.$refs.msg.show(.msg||"接口错误"+.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .scroll {
    li {

      .ava{
        img{

        }
      }
    }
  }
</style>
