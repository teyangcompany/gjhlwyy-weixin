<template>
  <div class="page">
    <app-header title="我的挂号" ref="header">
      <i slot="back" class="back"></i>
    </app-header>
    <scroll :height="scrollHeight" class="main overflow-hidden" :data="list">
      <ul>
        <div v-if="list.length==0" class="nodata center pt500 fs46">
          暂无挂号记录 <br>
          <router-link to="/bookTerms">去挂号</router-link>
        </div>
        <li v-for="(data,index) in list" :key="index" @click="handleOrder('detail',data)">
          <h3 class="flex">
            <div class="title flex1">{{data.deptName}} {{data.docName}}</div>
            <div class="status flex0" :class="['status'+data.orderStatus]">
              {{data.orderStatus|getOrderStatus}}
            </div>
          </h3>
          <div class="time">
            {{data.bookTime}} {{data.bookAmpm|getOrderAmpm}} {{data.bookNo}}号
          </div>
          <div class="hos">
            {{data.hosName}}
          </div>
          <div class="pat">
            就诊人:{{data.compatName}}
          </div>
          <div class="fee">
            挂号费:￥{{data.bookFee}}
          </div>
          <div class="bottom right" v-if="data.orderStatus==0||data.orderStatus==1">
            <span v-if="data.orderStatus==1" @click.stop="handleOrder('cancel',data)">取消</span>
          </div>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {orderCache} from "../../lib/cache";
  import AppHeader from '../../plugins/app-header'
  import weuijs from 'weui.js'
  import api from '../../lib/api'
  import Scroll from '../../plugins/scroll'
  import {getOrderAmpm, getOrderStatus} from "../../lib/filter";
  import {scrollHeightMixin} from "../../lib/mixin";

  export default {
    data() {
      return {
        list: []
      };
    },
    computed: {},
    filters: {getOrderStatus, getOrderAmpm},
    mixins: [scrollHeightMixin],
    components: {AppHeader, Scroll},
    created() {
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      handleOrder(type, book) {
        switch (type) {
          case "cancel":
            weuijs.confirm('是否取消预约', () => {
              this.cancelOrder(book)
            });
            break;
          case "detail":
            orderCache.set(book);
            this.$router.push(`/my/book/${book.orderId}`);
            break;
        }
      },

      async cancelOrder(book) {
        let loading = weuijs.loading("加载中...");
        let ret = await api('nethos.book.order.cancel', {
          orderId: book.orderId
        })
        loading.hide();
        if (ret.code == 0) {
          weuijs.toast('取消成功', {
            callback: () => {
              this.getList();
            }
          })
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      },

      async getList() {
        let loading = weuijs.loading("加载中...");
        let ret = await
          api("nethos.book.order.list", {});
        loading.hide();
        if (ret.code == 0) {
          this.list = ret.list;
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .pt500 {
    margin-top: px2rem(512px, 1080);
  }

  .fs46 {
    font-size: px2rem(46px, 1080);
  }

  .main {
    background-color: #F8F8F8;
    ul {
      padding-top: $commonSpace;
    }
    li + li {
      margin-top: $commonSpace;
    }
    li {
      border-radius: 10px;
      margin-left: $commonSpace;
      margin-right: $commonSpace;
      padding: $commonSpace;
      background-color: white;
      line-height: 1;
      h3 {
        font-weight: bold;
        font-size: px2rem(46px, 1080);
        color: #333333;
        .status {
          color: $mainColor;
          &.status5 {
            color: #A1A1A1;
          }
        }
      }
      .time {
        margin-top: px2rem(46px, 1080);
        font-size: px2rem(40px, 1080);
        color: #333333;
      }
      .hos {
        margin-top: px2rem(60px, 1080);
      }
      .pat, .fee, .bottom {
        margin-top: px2rem(42px, 1080);
      }
      .hos, .pat, .fee {
        font-size: px2rem(40px, 1080);
        color: #999999;
      }
      .bottom {
        margin-left: 0 - $commonSpace;
        margin-right: 0 - $commonSpace;
        @include border(top);
        padding-top: $commonSpace;
        padding-right: $commonSpace;
        span {
          font-size: px2rem(40px, 1080);
          color: #A1A1A1;
          border: 1px solid #A1A1A1;
          padding: 2px 7px;
          border-radius: 5px;
        }
      }
    }
  }
</style>
