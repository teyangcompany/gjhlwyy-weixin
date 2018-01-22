<template>
    <div class="">
        <app-header title="消费记录">
            <i slot="back" class="back"></i>
        </app-header>
        <scroll class="scroll overflow-hidden" :height="scrollHeight" :data="list">
            <div class="container">
                <div v-if="list.length==0" class="nodata fs45 pt500 center">
                    暂无消费记录
                    <br>
                    <router-link to="/internetRoom">问医生</router-link>
                </div>

                <div class="item" v-for="(item,key,index) in obj" :key="index">
                    <div class="time color_999">{{key}}</div>
                    <div class="content flex" v-for="(record,i) in item" :key="i">
                        <div class="ava flex0">
                            <img :src="record|docAva" alt="">
                        </div>
                        <div class="info lh1 flex1">
                            <h3 class="fs45 color_333">{{record.paySubject}}</h3>
                            <p class="color_999 fs32 mt37">{{record.createTime|formatTime("%Y-%m-%d %H:%M")}}</p>
                        </div>
                        <div class="price flex0 lh1">
                            <h2 class="fs45 color_666">￥{{record.payFee/100}}</h2>
                            <p class="color_999 fs32 mt30">{{record.payType=="PAY"?'交易成功':'退款成功'}}</p>
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
    filters: {docAva, formatTime},
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
          this.list = ret.list;
          this.obj = R.compose(
            R.groupBy(item => item.showTime),
            R.map(item => Object.assign(item, {showTime: formatTime(item.createTime, "%Y-%m-%d")}))
          )(this.list);
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

    .mt37 {
        margin-top: px2rem(35px, 1080);
    }

    .mt30 {
        margin-top: px2rem(25px, 1080);
    }

    .scroll {
        background-color: #F8F8F8;
    }

    .time {
        padding-left: $commonSpace;
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
        margin-right: $commonSpace;
        $w: px2rem(130px, 1080);
        img {
            @include w_h($w, $w);
            border-radius: 50%;
        }
    }
</style>
