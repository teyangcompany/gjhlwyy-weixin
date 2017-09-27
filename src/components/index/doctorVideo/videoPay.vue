<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="payInfo">
      <div class="paySum border-1px">
        <span>订单金额</span>
        <span>￥{{ aboutConsultFee }}</span>
      </div>
      <p class="border-1px payMethod">支付方式:</p>
      <div class="payBy border-1px">
        <div class="payByCenter">
          <div>
            <img src="../../../../static/img/weixin1.jpg" alt="">
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
  import weui from 'weui.js'
  import {tokenCache} from '../../../lib/cache'
  export default{
    data(){
      return{
        title:"支付",
        rightTitle:"",
        consultId:"",
        aboutConsultFee:"",
        returnInfo:"",
        appId:"",
        timeStamp:"",
        nonceStr:"",
        package:"",
        signType:"",
        paySign:"",
        showToast:false
      }
    },
    created(){
        this.consultId = this.$route.query.consultId
        api("nethos.consult.info.detail",{
          token:tokenCache.get(),
          consultId:this.consultId
        }).then((data)=>{
            if(data.code == 0){
              this.aboutConsultFee = data.obj.consult.consultFee
              console.log(this.aboutConsultFee)
              console.log(data)
            }else{
                weui.alert(data.msg)
            }
        })
    },
    methods:{
      goSuccess(){
//        location.href=`http://weixin.diandianys.com/wxpay/pay.html?back=${encodeURIComponent("https://nethosweb.diandianys.com/wechat/#/blankPage/"+this.consultId)}&amount=${(this.aboutConsultFee)*100}&obj=${this.consultId}`
          let that = this
          this.showToast = true
          api("nethos.consult.info.pay",{
            consultId:this.consultId,
            payChannel:"WECHAT"
          }).then((data)=>{
              console.log(data)
            this.showToast = false
              if(data.code == 0 &&　data.obj){
                this.returnInfo =  JSON.parse(data.obj)
                console.log(this.returnInfo)

                let conf={
                  "appId":this.returnInfo.appid,     //公众号名称，由商户传入
                  "timeStamp":this.returnInfo.time_stamp,         //时间戳，自1970年以来的秒数
                  "nonceStr":this.returnInfo.nonce_str, //随机串
                  "package":`prepay_id=${this.returnInfo.prepay_id}`,
                  "signType":"MD5",         //微信签名方式：
                  "paySign":this.returnInfo.pay_sign //微信签名
                }
//                alert(JSON.stringify(conf))

                  WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    conf,

                    function(res){

                      if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        that.$router.push({
                           path:'/allConsultSuccess',
                           query:{consultId:that.consultId}
                         })
                      }else if(res.err_msg == "get_brand_wcpay_request:cancel" ){
                          console.log("支付过程中用户取消")
                      }else if(res.err_msg == "get_brand_wcpay_request:fail"){
                          console.log("支付失败")
                          weui.alert(JSON.stringify(res))

                      }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    }
                  );

                if (typeof WeixinJSBridge == "undefined"){
                  if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                  }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                  }
                }
              }else if(data.code == -2 &&　data.msg == '当前订单已支付'){
                   weui.alert('当前订单已支付')
              }else if(data.code == 0 && !(data.obj)){
                this.$router.push({
                  path:'/allConsultSuccess',
                  query:{consultId:that.consultId}
                })
              }
          })
      }
    },
    components:{
      "VHeader":header,
      Toast
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .payInfo{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
    .paySum{
      width:100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child{
        font-size: 28rem/$rem;
        color: #999999;
      }
      span:last-child{
        font-size: 36rem/$rem;
        color: #333333;
        font-weight: bold;
      }
    }
    .payMethod{
      height:80rem/$rem;
      font-size: 28rem/$rem;
      color: #666666;
      background-color: rgb(245,245,245);
    }
    p{
      margin:0;
      padding-left:30rem/$rem;
      height: 50px;
      line-height: 50px;
    }
    .payBy{
      width:100%;
      height: 50px;
      .payByCenter{
        width:690rem/$rem;
        height: 50px;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        >div{
          display: flex;
          align-items: center;
          span{
            font-size: 32rem/$rem;
            color: #333333;
          }
          img{
            margin-right: 5px;
            width:60rem/$rem;
          }
        }
        img{
          width: 50rem/$rem;
          height: 50rem/$rem;
          border-radius: 50%;
        }
      }
    }
    .confirmPay{
      width:100%;
      height: 80rem/$rem;
      margin-top: 200px;
      .confirmCenter{
        width:690rem/$rem;
        margin: 0 auto;
      }
      button{
        width:690rem/$rem;
        border:none;
        outline: medium;
        height: 80rem/$rem;
        border-radius: 7px;
        color: white;
        font-size:32rem/$rem;
        background-color: #3CC51F;
      }
    }
  }

</style>
