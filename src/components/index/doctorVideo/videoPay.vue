<template>
  <div class="page">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="payInfo">
      <div class="paySum border-1px">
        <span class="name">支付金额</span>
        <span><i>￥</i>{{ showFee }}</span>
      </div>
      <div class="payBy border-1px">
        <div @click="chooseCoupons" class="payByCenter">
          <div>
            <img class="icon" src="../../../../static/img/coupons/coupons-pay.png" alt="">
            <span>礼券</span>
          </div>
          <div class="icon_sp_area">
            <span v-if="coupons&&coupons.desc">{{coupons.desc}}{{coupons.type}}&nbsp;&nbsp;</span>
            <span v-else>{{count}}张可用优惠券&nbsp;&nbsp;</span>
            <img src="../../../../static/img/arrow.png" alt="">
          </div>
        </div>
      </div>
      <div class="payBy border-1px">
        <div class="payByCenter">
          <div>
            <img class="icon" src="../../../../static/img/weixin1.jpg" alt="">
            <span>微信</span>
          </div>
          <div class="icon_sp_area">
            <i class="weui-icon-success"></i>
          </div>
        </div>
      </div>
      <div class="confirmPay">
        <div class="confirmCenter">
          <button @click="goSuccess()">确认支付</button>
        </div>
      </div>
    </div>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script>
  import header from "../../../base/header"
  import api from '../../../lib/api'
  import Toast from '../../../base/test'
  import weuijs from 'weui.js'
  import {couponsCache, tokenCache} from '../../../lib/cache'

  export default {
    data() {
      return {
        title: "支付",
        rightTitle: "",
        consultId: "",
        aboutConsult: {},
        count: 0,
        aboutConsultFee: "",
        returnInfo: "",
        appId: "",
        timeStamp: "",
        nonceStr: "",
        package: "",
        signType: "",
        paySign: "",
        showToast: false,
        coupons: {}
      }
    },
    computed: {
      showFee() {
        let fee = parseFloat(this.aboutConsultFee) || 0;
        fee = fee * 100;
        if (Object.keys(this.coupons).length > 0) {
          let reductionMoney = this.coupons.reductionMoney;
          switch (this.coupons.couponType) {
            case 'FULL_REDUCTION_COUPON':
            case 'DIRECT_REDUCTION_COUPON':
              fee = fee - reductionMoney;
              break;
            case 'DISCOUNT_COUPON':
              fee = fee * reductionMoney / 100;
              break;
          }
        }
        fee = fee / 100;
        fee = Math.max(0, fee);
        return fee.toFixed(2);
      }
    },
    created() {
      let coupons = couponsCache.get();
      coupons && (this.coupons = coupons);
      this.consultId = this.$route.query.consultId
      this.getDetail();
    },
    methods: {
      chooseCoupons() {
        let {consultType: currentService, consultFee: payMoney} = this.aboutConsult;
        this.count > 0 && (this.$router.push({
          path: '/coupons/select',
          query: {currentService, payMoney}
        }));
      },

      async getCouponsCount() {
        let loading = weuijs.loading("加载中...");
        let {consultType: currentService, consultFee: payMoney} = this.aboutConsult;
        payMoney = payMoney * 100;
        let ret = await api("smarthos.coupon.mycoupon.unused.count", {payMoney, currentService});
        this.count = ret.obj;
        loading.hide();
      },


      async getDetail() {
        let loading = weuijs.loading("加载中...");
        let data = await api("nethos.consult.info.detail", {
          token: tokenCache.get(),
          consultId: this.consultId
        });
        if (data.code == 0) {
          this.aboutConsult = data.obj.consult;
          this.aboutConsultFee = data.obj.consult.consultFee
        } else {
          weuijs.alert(data.msg)
        }
        loading.hide();
        await this.getCouponsCount();
      },


      async goSuccess() {
        if (typeof WeixinJSBridge === 'undefined') {
          weuijs.alert('请在微信当中打开');
          return
        }


//        location.href=`http://weixin.diandianys.com/wxpay/pay.html?back=${encodeURIComponent("https://nethosweb.diandianys.com/wechat/#/blankPage/"+this.consultId)}&amount=${(this.aboutConsultFee)*100}&obj=${this.consultId}`
        let that = this
        this.showToast = true

        let opts = {
          consultId: this.consultId,
          payChannel: "WECHAT"
        };

        if (that.coupons && that.coupons.desc) {
          opts.myCouponId = that.coupons.id;
        }

        let data = await api("nethos.consult.info.pay", opts);
        this.showToast = false
        if (data.code == 0 && data.obj) {
          if (data.obj.toUpperCase() == 'SUCCESS') {
            that.$router.push({
              path: '/allConsultSuccess',
              query: {consultId: that.consultId}
            });
            return
          }


          this.returnInfo = JSON.parse(data.obj)
          let conf = {
            "appId": this.returnInfo.appid,     //公众号名称，由商户传入
            "timeStamp": this.returnInfo.time_stamp,         //时间戳，自1970年以来的秒数
            "nonceStr": this.returnInfo.nonce_str, //随机串
            "package": `prepay_id=${this.returnInfo.prepay_id}`,
            "signType": "MD5",         //微信签名方式：
            "paySign": this.returnInfo.pay_sign //微信签名
          }
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            conf,
            function (res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                that.$router.push({
                  path: '/allConsultSuccess',
                  query: {consultId: that.consultId}
                })
              } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                console.log("支付过程中用户取消")
              } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                console.log("支付失败")
                weuijs.alert(JSON.stringify(res))
              }
            }
          );
        } else if (data.code == -2 && data.msg == '当前订单已支付') {
          weui.alert('当前订单已支付')
        } else if (data.code == 0 && !(data.obj)) {
          this.$router.push({
            path: '/allConsultSuccess',
            query: {consultId: that.consultId}
          })
        }
      }
    },
    components: {
      "VHeader": header,
      Toast
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';

  .page {
    background-color: #F8F8F8;
  }

  .payInfo {
    .paySum {
      width: 100%;
      height: px2rem(230px, 750);
      display: flex;
      background-color: white;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child {
        font-size: px2rem(32px, 750);
        color: #f4888c;
      }
      span:last-child {
        i {
          font-style: normal;
          font-size: px2rem(36px, 750);
        }
        font-size: px2rem(72px, 750);
        color: #f4888c;
      }

    }
    .payMethod {
      height: 80rem/$rem;
      font-size: 28rem/$rem;
      color: #666666;
      background-color: rgb(245, 245, 245);
    }
    p {
      margin: 0;
      padding-left: 30rem/$rem;
      height: 50px;
      line-height: 50px;
    }
    .payBy {
      margin-top: 10px;
      background-color: white;
      width: 100%;
      height: 50px;
      .payByCenter {
        width: 690rem/$rem;
        height: 50px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon_sp_area {
          span {
            color: #999;
          }
          img {
            height: 15px
          }
        }
        > div {
          display: flex;
          align-items: center;
          span {
            font-size: 32rem/$rem;
            color: #333333;
          }
          img.icon {
            margin-right: 5px;
            width: 50rem/$rem;
          }
        }
      }
    }
    .confirmPay {
      width: 100%;
      height: 80rem/$rem;
      margin-top: 200px;
      .confirmCenter {
        width: 690rem/$rem;
        margin: 0 auto;
      }
      button {
        width: 690rem/$rem;
        border: none;
        outline: medium;
        height: 80rem/$rem;
        border-radius: 7px;
        color: white;
        font-size: 32rem/$rem;
        background-color: #3CC51F;
      }
    }
  }

</style>
