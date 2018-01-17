<template>
  <div class="page">
    <app-header title="挂号详情" ref="header">
      <i slot="back" class="back"></i>
    </app-header>
    <div class="main overflow-y-auto" ref="main">
      <div class="jsbarcode lh1">
        <p class="center"><img id="code"></p>
        <p class="color_999 fs40 center">病案号：{{order.bind}}</p>
      </div>
      <div class="container lh1">
        <h3 class="flex">
          <div class="time flex1">{{order.bookTime}} {{order.bookAmpm|getOrderAmpm}} {{order.bookNo}}号</div>
          <div class="status flex0" :class="['status'+order.orderStatus]">{{order.orderStatus|getOrderStatus}}</div>
        </h3>
        <div class="ordertime fs40">
          就诊预估时间：{{order.gotoTime}}
        </div>

        <ul class="info">
          <li>
            <my-label title="医院"></my-label>
            <span>{{order.hosName}}</span>
          </li>
          <li>
            <my-label title="科室"></my-label>
            <span>{{order.deptName}}</span>
          </li>
          <li>
            <my-label title="医生"></my-label>
            <span>{{order.docName}}</span>
          </li>
          <li>
            <my-label title="费用"></my-label>
            <span>{{order.bookFee}}</span>
          </li>
          <li>
            <my-label title="支付方式"></my-label>
            <span>线下支付</span>
          </li>
          <li>
            <my-label title="取号密码"></my-label>
            <span>{{order.numPasswordZ2}}</span>
          </li>
        </ul>

        <ol class="pat">
          <li>
            <my-label title="患者信息"></my-label>
            <span>{{order.compatName}}</span>
          </li>
          <li>
            <my-label title="身份证号"></my-label>
            <span>{{order.compatIdcard}}</span>
          </li>
          <li>
            <my-label title="手机号码"></my-label>
            <span>{{order.compatMobile}}</span>
          </li>
        </ol>
      </div>
      <div class="container fs40 color_999">
        <h4>注意事项:</h4>
        <div class="content">
          <p>1.请于就诊当日凭就诊人本人身份证到医院窗口或自助机上取号。</p>
          <p>1.预约挂号可在就诊当天使用医院现场自助机、收费窗口支付的方式完成费用支付。</p>
        </div>
      </div>
    </div>
    <div class="bottom right" ref="bottom" v-if="order.orderStatus==0||order.orderStatus==1">
      <span v-if="order.orderStatus==1" @click.stop="handleOrder('cancel',order)">取消</span>
    </div>
  </div>
</template>

<script>
  import {getOrderAmpm, getOrderStatus} from "../../../lib/filter";
  import AppHeader from '../../../plugins/app-header'
  import {orderCache} from "../../../lib/cache";
  import {mainHeightMixin} from "../../../lib/mixin";
  import MyLabel from '../../../plugins/my-label'
  import JsBarcode from 'jsbarcode'
  import weuijs from 'weui.js'
  import api from '../../../lib/api'

  export default {
    data() {
      return {
        order: {}
      };
    },
    computed: {},
    filters: {getOrderStatus, getOrderAmpm},
    mixins: [mainHeightMixin],
    components: {AppHeader, MyLabel},
    created() {
      this.order = orderCache.get();
      console.log(this.order);
      this.makeCode();
    },
    mounted() {

    },
    beforeDestroy() {
      orderCache.remove();
    },
    methods: {
      makeCode() {
        let imgDom = document.querySelector("#code");
        if (!imgDom) {
          setTimeout(this.makeCode, 20);
        } else {
          JsBarcode('#code', this.order.bind, {
            displayValue: false,
            margin: 0
          });
        }
      },
      handleOrder(type, book) {
        switch (type) {
          case "cancel":
            weuijs.confirm('是否取消预约', () => {
              this.cancelOrder(book)
            });
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
              this.order = Object.assign(this.order, {
                orderStatus: 5
              });
              this._calcMainHeight();
            }
          })
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../common/public";

  .lh1 {
    line-height: 1;
  }

  .fs40 {
    font-size: px2rem(40px, 1080);
  }

  .page {
    background-color: white;
    left: 0;
    top: 0;
  }

  .main {
    background-color: #F8F8F8;
    .jsbarcode {
      background-color: white;
      padding-top: px2rem(67px, 1080);
      padding-bottom: px2rem(46px, 1080);
      img {
        @include w_h(px2rem(474px, 1080), px2rem(210px, 1080));
      }
      p:nth-child(2) {
        margin-top: px2rem(46px, 1080);
      }
    }
    .container {
      margin-top: $commonSpace;
      padding: $commonSpace;
      background-color: white;
      h3 {
        font-weight: bold;
        color: #333333;
        font-size: px2rem(47px, 1080);
        .status {
          color: $mainColor;
          &.status5 {
            color: #A1A1A1;
          }
        }
      }
      .ordertime {
        color: #777777;
        margin-top: px2rem(47px, 1080);
      }
      .info, .pat {
        margin-top: px2rem(64px, 1080);
        li + li {
          margin-top: px2rem(44px, 1080);
        }
        li {
          @extend .fs40;
          display: flex;
          > div {
            display: flex;
            width: px2rem(60px);
            justify-content: space-between;
            color: #999999;
          }
          > span {
            margin-left: $commonSpace;
            color: #333333;
            display: block;
          }
        }

      }
      .pat {
        padding-top: px2rem(50px, 1080);
        margin-top: px2rem(50px, 1080);
        @include border(top);
        &:after {
          border-top-style: dashed;
        }
      }
    }
  }

  .bottom {
    padding-right: $commonSpace;
    @include h_lh(45px);
    @include border(top);
    span {
      font-size: px2rem(40px, 1080);
      color: #A1A1A1;
      border: 1px solid #A1A1A1;
      padding: 2px 7px;
      border-radius: 5px;
    }
  }

</style>
