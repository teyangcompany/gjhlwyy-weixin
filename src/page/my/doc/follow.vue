<template>
  <scroll class="scroll overflow-hidden" :height="height" :data="list">
    <ul>
      <div class="center pt100 fs16" v-if="list.length==0">
        暂未关注医生 <br>
        <router-link class="color_main" to="/internetRoom">找医生</router-link>
      </div>
      <router-link tag="li" :to="{path:'/onlineDoctorCard',query:{docId:item.sysDoc.docId}}"
                   v-for="(item,index) in list" :key="index" class="flex">
        <div class="ava flex0">
          <img :src="item.sysDoc|docAva" alt="">
        </div>
        <div class="info flex1">
          <h3 class="flex">
            <b class="block flex0">{{item.sysDoc.docName}}</b>
            <span class="block flex0">{{item.sysDoc.docTitle}}</span>
          </h3>
          <div class="content">
            {{item.sysDoc.docHosName}}
          </div>
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
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../common/public";

  .scroll {
    .fs16 {
      font-size: 16px;
    }
    .color_main {
      color: $mainColor;
    }
    .pt100 {
      padding-top: 100px;
    }

    li {
      @include border();
      background-image: url("../../../../static/img/arrow.png");
      @include backgroundImageSet(px2rem(17px, 600), px2rem(30px, 600), px2rem(1000px, 1080));
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
            margin-right: $commonSpace;
          }
          span {
            font-size: px2rem(40px, 1080);
            color: #989898;
          }
        }
        div {
          margin-top: px2rem(25px, 1080);
          font-size: px2rem(40px, 1080);
          color: #989898;
        }
      }
    }
  }
</style>
