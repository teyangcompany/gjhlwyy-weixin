<template>
    <scroll class="scroll overflow-hidden" :height="height" :data="list">
        <ul>
            <router-link tag="li" :to="{path:'/onlineDoctorCard',query:{docId:item.sysDoc.docId}}" v-for="(item,index) in list" :key="index" class="flex">
                <div class="ava flex0">
                    <img :src="item.sysDoc|docAva" alt="">
                </div>
                <div class="info flex1">
                    <h3 class="flex">
                        <b class="block flex0">{{item.sysDoc.docName}}</b>
                        <span class="block flex0">{{item.sysDoc.docHosName}}</span>
                    </h3>
                    <div class="content">
                        {{item.sysDoc.docDeptName}}
                    </div>
                </div>
            </router-link>
        </ul>
    </scroll>
</template>

<script>
  import {formatTime} from "../../../lib/filter";
  import MyDocMixin from '../../../lib/mixins/my-doc'
  import Scroll from '../../../plugins/scroll'
  import weuijs from 'weui.js'
  import api from '../../../lib/api'
  import docAva from '../../../utils/docAva'

  export default {
    data() {
      return {
        list: []
      };
    },
    computed: {},
    filters: {docAva, formatTime},
    mixins: [MyDocMixin],
    components: {Scroll},
    created() {
      this.getList()

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getList() {
        let loading = weuijs.loading("加载中...");
        let data = await api("nethos.follow.docpat.list", {})
        loading.hide();
        if (data.code == 0) {
          this.list = data.list;
          if (!this.list || this.list.length == 0) {
            this.nodata = true;
          }
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
            background-image: url("../../../../static/img/arrow.png");
            @include backgroundImageSet(px2rem(17px,600), px2rem(30px,600), px2rem(1000px, 1080));
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
                    b {
                        margin-right: $commonSpace;
                    }
                    span {
                        color: #666666;
                    }
                }
                div {
                    color: #666666;
                    font-size: 14px;
                }
            }
        }
    }
</style>
