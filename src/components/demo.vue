<template>
  <div class="">
    demo
  </div>
</template>

<script>
  import weuijs from 'weui.js';

  export default {
    data() {
      return {
        returnInfo: {}
      };
    },
    //{"code":"0","obj":"{\"return_msg\":\"OK\",\"prepay_id\":\"wx20180312133711b97bcaf8820914420437\",\"pay_sign\":\"1A2F707799DADE60ACA44C6E7AAEAB70\",\"appid\":\"wx493f2e86e758dacc\",\"nonce_str\":\"Bw6zUysbyocdh32S\",\"device_info\":\"WEB\",\"trade_type\":\"JSAPI\",\"sign\":\"EC452E0BF41A6BF7838AE501CF9DB445C4861BBD30BBC1DC14CCE1731C59288B\",\"result_code\":\"SUCCESS\",\"mch_id\":\"1409158102\",\"sub_appid\":\"wx7d475d39a1ea1aa9\",\"sub_mch_id\":\"1494754372\",\"return_code\":\"SUCCESS\",\"time_stamp\":\"1520833031\"}","succ":true}
    computed: {},
    components: {},
    mounted() {
      this.returnInfo = {}
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

        conf = {
          "paySign": "CF2C033EFF443F961042B40207226130",
          "appId": "wx7d475d39a1ea1aa9",
          "timeStamp": "1520845465",
          "signType": "MD5",
          "package": "prepay_id=wx20180312170346c19dab84ad0289584522",
          "nonceStr": "5aa6429935fa9dd1c6d74ee5"
        }
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          conf,
          function (res) {
            weuijs.alert(JSON.stringify(res));
            if (res.err_msg == "get_brand_wcpay_request:ok") {

            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {

            } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            }
          }
        );
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
