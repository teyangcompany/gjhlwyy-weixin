<template>
  <div class="header relative center">
    <div class="back absolute" @click.stop="doBackMixin_doBack">
      <slot name="back"></slot>
    </div>
    <slot name="right"></slot>
    <span class="overflow-hidden">
      <img :src="img|docAva" v-if="Object.keys(img).length>0" alt="" class="float-left">
      {{title}}
    </span>
  </div>
</template>

<script>
  import docAva from '../utils/docAva'
  import {doBackMixin, jssdkMixin} from "../lib/mixin";

  export default {
    props: {
      img: {
        type: Object,
        default: () => {
          return {}
        }
      },
      title: {
        type: String,
        default: ""
      }
    },
    data() {
      return {};
    },
    computed: {},
    filters: {docAva},
    components: {},
    mixins: [jssdkMixin, doBackMixin],
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../common/var";
  @import "../common/mixin";

  %a {
    line-height: 45px; /*no*/
    height: 45px; /*no*/
  }

  img {
    margin-top: 8px;
    @include w_h(30px, 30px);
    border-radius: 50%;
    margin-right: 5px;
  }

  span {
    display: inline-block;
  }

  .header {
    font-size: 18px; /*no*/
    background-color: white;
    @include border(bottom);
    @extend %a;
    position: relative;

    .back {
      position: absolute;
      @include t_r_b_l(0, 1, 1, 0);
      i {
        display: block;
        width: 45px; /*no*/
        height: 45px; /*no*/
        background-image: url(../../static/img/返回.png);
        @include backgroundImageSet(21px/2, 34px/2, $commonSpace);
      }
    }

    .right {
      right: $commonSpace;
      top: 0px;
      position: absolute;
      @extend %a;
      font-size: 16px; /*no*/
      color: $mainColor;
    }
  }
</style>
