<template>
  <div class="">
    demo
  </div>
</template>

<script>
  export default {
    data() {
      return {
        returnInfo: {}
      };
    },
    computed: {},
    components: {},
    mounted() {
      this.returnInfo = {
        "result_code": "SUCCESS",
        "sign": "4B392F06544C528ADB996EDCC36536EC",
        "mch_id": "1409158102",
        "sub_appid": "wx7d475d39a1ea1aa9",
        "prepay_id": "wx2018011615340476204bd59b0035487546",
        "sub_mch_id": "1494754372",
        "return_msg": "OK",
        "appid": "wx493f2e86e758dacc",
        "nonce_str": "5f9jaXpENIeDh2gL",
        "return_code": "SUCCESS",
        "trade_type": "JSAPI"
      }

      setTimeout(this.pay, 5000);
    },
    beforeDestroy() {

    },
    methods: {
      pay() {
        let conf = {
          "appId": this.returnInfo.appid,     //公众号名称，由商户传入
          "timeStamp": this.returnInfo.time_stamp,         //时间戳，自1970年以来的秒数
          "nonceStr": this.returnInfo.nonce_str, //随机串
          "package": `prepay_id=${this.returnInfo.prepay_id}`,
          "signType": "MD5",         //微信签名方式：
          "paySign": this.returnInfo.sign //微信签名
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
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
