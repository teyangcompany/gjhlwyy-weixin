<template>
  <scroll class="scroll overflow-hidden" :height="height" :data="list">
    <ul>
      <div class="center pt100 fs16" v-if="list.length==0">
        暂未关注团队 <br>
        <router-link class="color_main" to="/team/list">找团队</router-link>
      </div>
      <list-item :data="item.teamInfo" v-for="item in list" :key="item.id"></list-item>
    </ul>
  </scroll>
</template>

<script>
  import {formatTime} from "../../../lib/filter";
  import MyDocMixin from '../../../lib/mixins/my-doc'
  import Scroll from '../../../plugins/scroll'
  import weuijs from 'weui.js'
  import docAva from '../../../utils/docAva'
  import api from '../../../lib/api'
  import ListItem from '../../../plugins/team/list-item'

  export default {
    data() {
      return {
        list: []
      };
    },
    computed: {},
    filters: {docAva, formatTime},
    mixins: [MyDocMixin],
    components: {
      ListItem,
      Scroll
    },
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
        let data = await api("smarthos.follow.teampat.list", {})
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

    ul{
      padding-top: $commonSpace;
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
