<template>
  <div class="msg-item lh1" :class="[data.msgSenderType.toLowerCase()]">
    <div class="time center color_333 fs30">{{data.createTime|formatTime('%Y-%m-%d %H:%M:%S')}}</div>
    <div class="container flex">
      <div class="ava">
        <img v-if="data.msgSenderType.toLowerCase()=='doc'" :src="doc|docAva" alt="">
        <img v-if="data.msgSenderType.toLowerCase()=='pat'" :src="pat|patAva" alt="">
      </div>
      <div class="arrow"></div>
      <div class="msg">
        <span class="fs41" v-if="data.msgType=='TEXT'">{{data.msgText}}</span>
        <span v-if="data.msgType=='ARTICLE'">
          <router-link :to="{path:'/articleDetail',query:{articleId:msgText.articleId}}">{{msgText.title}}</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import docAva from '../../utils/docAva'
  import patAva from '../../utils/patAva'
  import {formatTime} from "../../lib/filter";

  export default {
    props: {
      data: Object,
      pat: Object,
      doc: Object
    },
    data() {
      return {};
    },
    computed: {
      msgText() {
        let text = this.data.msgText,
          type = this.data.msgType;
        if (type == 'ARTICLE') {
          return JSON.parse(text);
        }
        return text;
      }
    },
    filters: {docAva, patAva, formatTime},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .lh1 {
    line-height: 1;
  }

  .fs30 {
    font-size: px2rem(30px, 1080);
  }

  .fs41 {
    font-size: px2rem(41px, 1080);
  }

  .color_333 {
    color: #333333;
  }

  .msg-item {
    padding-top: px2rem(40px, 1080);
  }

  $arrowW: 10px;

  .container {
    padding-right: $commonSpace;
    padding-left: $commonSpace;
    margin-top: px2rem(40px, 1080);
    align-items: center;
  }

  .ava {
    $w: 35px;
    @include w_h($w, $w);
    img {
      @include w_h($w, $w);
      border-radius: 50%;
    }
  }

  .msg {
    padding: 10px;
    line-height: 1.5;
    max-width: px2rem(710px, 1080);
  }

  .arrow {
    transform: rotate(45deg);
    @include w_h($arrowW, $arrowW);
    background-color: $mainColor;
  }

  .doc {
    .arrow {
      margin-left: $arrowW;
      background-color: #f0f0f0;
    }
    .msg {
      margin-left: 0 - $arrowW / 2;
      background-color: #f0f0f0;
      span {
        color: #333333;
      }
      a {
        color: $mainColor;
      }
    }
  }

  .pat {
    .container {
      flex-direction: row-reverse;
    }
    .arrow {
      margin-right: $arrowW;
    }
    .msg {
      background-color: $mainColor;
      margin-right: 0 - $arrowW / 2;
      span {
        color: white;
      }
    }
  }

</style>
