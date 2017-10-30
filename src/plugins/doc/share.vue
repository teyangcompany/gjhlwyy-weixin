<template>
  <div class="sharebox" v-show="showShare">
    <div class="mask" @click="hide"></div>
    <div class="mainbox">
      <!--<div class="info flex">
        <div class="thumb flex0"><img :src="docAvatar(info)" alt=""></div>
        <div class="desc flex1">
          <h3>{{info.docName}} {{info.docTitle}}</h3>
          <div>{{info.docHosName}} {{info.docDeptName}}</div>
        </div>
      </div>-->
      <div class="pic">
        <img :src="src" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import docAvatar from "../../utils/docAva"

  export default {
    props: {
      src: String,
      info: Object
    },
    data() {
      return {
        showShare: false
      };
    },
    computed: {},
    components: {},
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      docAvatar,
      show() {
        this.showShare = true;
      },
      hide() {
        this.showShare = false;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .sharebox {
    .mask {
      position: fixed;
      @include t_r_b_l();
      z-index: 10000;
      background-color: rgba(0, 0, 0, .5);
    }
    .mainbox {
      position: fixed;
      z-index: 20000;
      left: 30px;
      right: 30px;
      top: 80px;
      bottom: 80px;
      background-color: white;
    }
    .info {
      align-items: center;
      padding: 15px;
      .thumb {
        $w: 90px;
        overflow: hidden;
        border-radius: $w/2;
        @include w_h($w/2, $w/2);
        img {
          width: $w/2;
        }
      }
      .desc {
        padding-left: 10px;
        div {
          padding-top: 5px;
          font-size: 14px;
          color: #999999;
        }
      }
    }
    .pic {
      img {
        width: 100%;
      }
    }
  }
</style>
