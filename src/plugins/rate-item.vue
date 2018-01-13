<template>
    <div class="rate-item flex">
        <div class="ava flex0">
            <img :src="sysPat|patAva" alt="">
        </div>
        <div class="info flex1">
            <h3 class="flex">
                <div class="name flex1">{{sysPat.patName|formatCardAndMobile(1,0,2)}}</div>
                <div class="rate flex0">
                    <star :size="24" :score="sysComment.score"></star>
                </div>
            </h3>
            <div class="time">
                {{types[sysComment.moudleType]}} {{sysComment.createTime|formatTime('%m/%d %H:%M')}}
            </div>
            <div class="content">
                {{sysComment.content||'暂无文字评价'}}
            </div>
        </div>

    </div>
</template>

<script>
  import patAva from '../utils/consultPatAva'
  import {formatCardAndMobile, formatTime} from "../lib/filter";
  import Star from '../base/star/star'
  import {CONSULT_TYPE} from "../lib/config";


  export default {
    props: ['data'],
    data() {
      return {
        types: CONSULT_TYPE
      };
    },
    computed: {
      sysComment() {
        return this.data.sysComment || {};
      },
      sysDoc() {
        return this.data.sysDoc || {}
      },
      sysPat() {
        return this.data.sysPat || {}
      }

    },
    filters: {patAva, formatCardAndMobile, formatTime},
    components: {Star},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
    @import "../common/public";

    .rate-item {
        @include border();
        &:after {
            left: px2rem(40px, 1081);
        }
        padding: px2rem(40px, 1081);
        .ava {
            margin-right: px2rem(30px, 1081);
            img {
                border-radius: 50%;
                @include w_h(px2rem(105px, 1081), px2rem(105px, 1081));
            }
        }
        .info {
            line-height: 1;
            .name, .content {
                font-size: px2rem(38px, 1081);
                color: #333333;
            }
            .time {
                font-size: px2rem(33px, 1081);
                color: #666666;
            }
            .time, .content {
                margin-top: px2rem(30px, 1081);
            }
            .content {
                line-height: 1.5;
            }

        }
    }
</style>
