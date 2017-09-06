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
  </div>
</template>
<script>
  import header from "../../../base/header"
  import api from '../../../lib/api'
  export default{
    data(){
      return{
        title:"支付",
        rightTitle:"",
        consultId:"",
        aboutConsultFee:""
      }
    },
    created(){
        this.consultId = this.$route.query.consultId
        api("nethos.consult.info.detail",{
          token:localStorage.getItem("token"),
          consultId:this.consultId
        }).then((data)=>{
            this.aboutConsultFee = data.obj.consult.consultFee
          console.log(this.aboutConsultFee)
            console.log(data)
        })
    },
    methods:{
      goSuccess(){
        location.href=`http://weixin.diandianys.com/wxpay/pay.html?back=${encodeURIComponent("https://nethosweb.diandianys.com/wechat/#/blankPage/"+this.consultId)}&amount=${(this.aboutConsultFee)*100}&obj=${this.consultId}`
      }
    },
    components:{
      "VHeader":header
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
