<template>
  <scroll class="scroll overflow-hidden" :height="height" :data="list">
    <ul>
      <div class="center pt100" v-if="list.length==0">
        暂未收到消息
      </div>
      <li @click="handler(item)" v-for="(item,index) in list" :key="index" class="flex">
        <div class="ava flex0">
          <img :src="item.sysDoc|docAva" alt="">
        </div>
        <div class="info flex1 overflow-hidden">
          <h3 class="flex">
            <b class="block flex1">{{item.sysDoc.docName}}</b>
            <span class="block flex0">{{item.followDocpat.createTime|formatTime('%Y-%m-%d')}}</span>
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
  import {formatTime} from "../../../lib/filter";
  import docAva from '../../../utils/docAva'
  import weuijs from 'weui.js'
  import Scroll from '../../../plugins/scroll'
  import MyDocMixin from '../../../lib/mixins/my-doc'
  import http from '../../../lib/api'
  import {chartCache} from "../../../lib/cache";
  import {DOWNLOAD, DOWNLOAD_CONTENT, OPEN_NEW_MYDOC_VERSION} from "../../../lib/config";

  export default {
    data() {
      return {
        list: [],
        height: 0
      };
    },
    computed: {},
    filters: {docAva, formatTime},
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
      handler(data) {
        if (OPEN_NEW_MYDOC_VERSION) {
          chartCache.set(data);
          this.$router.push(`/chart/${data.followMessage ? data.followMessage.followId : '0'}`)
          return
        }
        weuijs.confirm(`${DOWNLOAD_CONTENT}进行医患沟通`, {
          title: '提示',
          buttons: [
            {
              label: '取消',
              type: 'default',
              onClick: () => {
              }
            },
            {
              label: '下载APP',
              type: 'primary',
              onClick: () => {
                location.href = DOWNLOAD
              }
            }
          ]
        })
      },
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
  @import "../../../common/public";

  .scroll {
    .pt100 {
      padding-top: 100px;
    }
    ul{
      padding-top: $commonSpace;
    }
    li {
      @include border();
      background-color: white;
      padding: $commonSpace;
      .ava {
        margin-right: $commonSpace;
        $imgHeight: px2rem(170px, 1080);
        @include w_h($imgHeight, $imgHeight);
        img {
          @include w_h($imgHeight, $imgHeight);
          border-radius: 50%;
        }
      }
      .info {
        line-height: 1;
        h3 {
          b {
            font-size: px2rem(45px, 1080);
            color: #333333;
          }
          span {
            font-size: px2rem(35px, 1080);
            color: #656565;
          }
        }
        div {
          line-height: 1.2;
          @include lines(1);
          margin-top: px2rem(70px, 1080);
          color: #989898;
          font-size: 14px;
        }
      }
    }
  }
</style>
