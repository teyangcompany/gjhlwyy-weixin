<template>
    <scroll class="scroll overflow-hidden" :height="height" :data="list">
        <ul>
            <li v-for="(item,index) in list" :key="index" class="flex">
                <div class="ava flex0">
                    <img :src="item.sysDoc|docAva" alt="">
                </div>
                <div class="info flex1">
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

  export default {
    data() {
      return {
        list: [],
        height: 0
      };
    },
    computed: {},
    filters: {docAva,formatTime},
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
    @import "../../../common/public";

    .scroll {
        li + li {
            @include border(top);
        }
        li {
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
                h3 {
                    font-size: 16px;
                    color: #333333;
                }
                div {
                    color: #666666;
                    font-size: 14px;
                }
            }
        }
    }
</style>
