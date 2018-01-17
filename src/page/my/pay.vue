<template>
  <div class="">
    <app-header title="消费记录">
      <i slot="back" class="back"></i>
    </app-header>
    <scroll class="scroll" :height="scrollHeight" :data="list">
      <div class="container">
        <div class="item" v-for="(item,key,index) in obj" :key="index">
          <div class="time center color_999">{{key}}</div>
          <div class="content flex" v-for="(record,i) in item" :key="i">
            <div class="ava flex0">
              <img :src="record|docAva" alt="">
            </div>
            <div class="info lh1">
              <h3>{{record.paySubject}}</h3>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import docAva from '../../utils/docAva'
  import AppHeader from '../../plugins/app-header'
  import Scroll from '../../plugins/scroll'
  import {scrollHeightMixin} from "../../lib/mixin";
  import weuijs from 'weui.js'
  import api from '../../lib/api'
  import * as R from 'ramda'
  import {formatTime} from "../../lib/filter";

  export default {
    data() {
      return {
        list: [],
        obj: null
      };
    },
    computed: {},
    mixins: [scrollHeightMixin],
    filters: {docAva},
    components: {AppHeader, Scroll},
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
        let ret = await api('nethos.pay.order.list', {});
        loading.hide();
        if (ret.code == 0) {
          let list = ret.list.map((item) => {
            item.showTime = formatTime(item.createTime, "%Y-%m-%d");
            return item;
          });
          this.list = list;
          this.obj = R.groupBy((res) => {
            return res.showTime;
          })(list);


        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .fs32 {
    font-size: px2rem(32px, 1080);
  }

  .fs45 {
    font-size: px2rem(45px, 1080);
  }

  .scroll {
    background-color: #F8F8F8;
  }

  .time {
    @include h_lh(px2rem(115px, 1080));
  }

  .item {
    .content + .content {
      @include border(top);
    }
  }

  .content {
    padding: $commonSpace;
    background-color: white;
  }

  .ava {
    $w: px2rem(130px, 1080);
    img {
      @include w_h($w, $w);
      border-radius: 50%;
    }
  }
</style>
