<template>
    <div>
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
          <div v-if="!orderDetail" class="loading">
            <img src="../../../static/img/loading.gif" alt="">
            <span>正在很努力的加载中...</span>
          </div>
         <div class="bookDetail" v-else ref="bookDetail">
           <div>
             <div class="bookCenter">
               <div class="weui-cells weuiMargin">
                 <div class="weui-cell">
                   <div class="weui-cell__hd"><img src="../../../static/img/book/用户@2x.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
                   <div class="weui-cell__bd">
                     <p>{{ orderDetail[index].compatName }}</p>
                   </div>
                   <div class="weui-cell__ft"></div>
                 </div>
                 <div class="weui-cell">
                   <div class="weui-cell__hd"><img src="../../../static/img/book/身份证@2x.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
                   <div class="weui-cell__bd">
                     <p>{{ orderDetail[index].compatIdcard }}</p>
                   </div>
                   <div class="weui-cell__ft"></div>
                 </div>
                 <div class="weui-cell">
                   <div class="weui-cell__hd"><img src="../../../static/img/book/手机@2x.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
                   <div class="weui-cell__bd">
                     <p>{{ orderDetail[index].compatMobile }}</p>
                   </div>
                   <div class="weui-cell__ft"></div>
                 </div>
               </div>
               <div class="weui-cells bg">
                 <div class="weui-cell">
                   <div class="weui-cell__hd"><p>就诊医院</p></div>
                   <div class="weui-cell__bd">
                     <p>{{ orderDetail[index].hosName }}</p>
                   </div>
                   <div class="weui-cell__ft"></div>
                 </div>
                 <div class="weui-cell">
                   <div class="weui-cell__hd"><p>就诊科室</p></div>
                   <div class="weui-cell__bd">
                     <p>{{ orderDetail[index].deptName }}</p>
                   </div>
                   <div class="weui-cell__ft"></div>
                 </div>
                 <div class="weui-cell">
                   <div class="weui-cell__hd"><p>就诊专家</p></div>
                   <div class="weui-cell__bd">
                     <p>{{ orderDetail[index].docName }}</p>
                   </div>
                   <div class="weui-cell__ft"></div>
                 </div>
                 <div class="weui-cell">
                   <div class="weui-cell__hd"><p>就诊时间</p></div>
                   <div class="weui-cell__bd">
                     <p>{{ orderDetail[index].bookTime }} {{ orderDetail[index].gotoTime }}</p>
                   </div>
                   <div class="weui-cell__ft"></div>
                 </div>
                 <div class="weui-cell">
                   <div class="weui-cell__hd"><p>支付方式</p></div>
                   <div class="weui-cell__bd">
                     <p>现场支付</p>
                   </div>
                   <div class="weui-cell__ft"></div>
                 </div>
                 <div class="weui-cell">
                   <div class="weui-cell__hd"><p>挂号支付</p></div>
                   <div class="weui-cell__bd">
                     <p>¥ {{ orderDetail[index].bookFee }}</p>
                   </div>
                   <div class="weui-cell__ft"></div>
                 </div>
                 <div class="weui-cell">
                   <div class="weui-cell__hd"><p>取号密码</p></div>
                   <div class="weui-cell__bd">
                     <p v-if="orderDetail[index].numPasswordZ2">{{ orderDetail[index].numPasswordZ2 }}</p>
                     <p v-else>{{ orderDetail[index].numPassword }}</p>
                   </div>
                   <div class="weui-cell__ft"></div>
                 </div>
               </div>
             </div>
             <div class="assistScroll">

             </div>
           </div>
         </div>
        <div class="bottom border-1px-top">
          <div class="fixedBottom" v-if="orderDetail">
            <button v-if="orderDetail[index].orderState == '0'" @click="cancelBook">取消挂号</button>
            <button v-if="orderDetail[index].orderState == '4'">预约已过期</button>
            <button v-if="orderDetail[index].orderState == '3'">已取消</button>
            <!--<button class="pay">付款</button>-->
          </div>
        </div>
        <div v-if="showAlertTips" class="loading">
            <alert-tips></alert-tips>
        </div>
        <toast v-if="showToast"></toast>
        <alert v-if="showAlert"
               :firstLine="firstLine"
               :bottomLine="bottomLine"
               @on-iKnow="iKnow"
        ></alert>
    </div>
</template>
<script>
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  import Alert from '../../base/alert'
  import Toast from '../../base/toast'
  import api from '../../lib/api'
  import AlertTips from '../../base/alertTips.vue'
  export default{
      data(){
          return{
            title:"挂号详情",
            rightTitle:"",
            index:"",
            orderDetail:"",
            showAlert:false,
            showToast:false,
            showAlertTips:false,
            firstLine:"",
            bottomLine:"我知道了"
          }
      },
      mounted(){

      },
      created(){
          this.index = this.$route.query.index
          console.log(this.index)
          api("nethos.book.order.list",{
            token:localStorage.getItem('token')
          }).then((data)=>{
            this.orderDetail = data.list
            console.log(data)
          })
      },
       methods:{
         cancelBook(){
             this.showToast = true
             api("nethos.book.order.cancel",{
               token:localStorage.getItem("token"),
               orderId: this.orderDetail[this.index].orderId
             }).then((data)=>{
                 console.log(data)
               this.showToast = false
                 if(data.code == 0){
                     location.reload()
                 }else if(!(data.msg)){
                    this.showAlertTips = true
                   setTimeout(()=>{
                     this.showAlertTips = false
                   },1000)
                 }else{
                   this.firstLine = data.msg
                   this.showAlert = true
                 }
             })
         },
         iKnow(){
           this.showAlert = false
         },
         _initBookDetailScroll(){
             if(this.orderDetail){
               this.bookDetailScroll = new BScroll(this.$refs.bookDetail,{
                 click:true
               })
             }
           console.log(this.bookDetailScroll)
         }
       },
      components:{
          "VHeader":header,
           Alert,
           Toast,
        AlertTips
      },
      watch:{
        orderDetail(){
          this.$nextTick(()=>{
              setTimeout(()=>{
                this._initBookDetailScroll()
              },20)
          })
        }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .loading{
    position: fixed;
    top: 90px;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      width:100rem/$rem;
      margin-bottom: 10px;
    }
    span{
      font-size: 32rem/$rem;
      color: #999999;
    }
  }
.bookDetail{
  position: fixed;
  top: 50px;
  left:0;
  right:0;
  bottom:0;
  .bookCenter{
    width:690rem/$rem;
    margin: 0 auto;
    .weuiMargin{
      border-radius: 7px;
      background-color: $bgColor2;
      .weui-cell__bd{
        p{
          font-size: 32rem/$rem;
          color: #333333;
        }
      }
    }
    .bg{
      border-radius: 7px;
      background-color: $bgColor2;
      .weui-cell__hd{
         P{
           font-size: 32rem/$rem;
           color: #333333;
         }
      }
      .weui-cell__bd{
        p{
          font-size: 32rem/$rem;
          color: #333333;
          padding-left: 10px;
        }
      }
    }
  }
  .assistScroll{
    height: 100px;
  }
}
  .bottom{
    position: fixed;
    left:0;
    right:0;
    bottom:0;
    width: 100%;
    z-index:100;
    height:90rem/$rem;
    .fixedBottom{
      height:90rem/$rem;
      width:690rem/$rem;
      margin: 0 auto;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      button{
        width:140rem/$rem;
        height:60rem/$rem;
        border:none;
        outline: medium;
        color: #666666;
        border-radius: 7px;
        background-color: white;
        border:1px solid gray;
      }
      button.pay{
        background-color: $assistColorBrown;
        border:none;
        color: white;
        border-radius: 7px;
        font-size: 32rem/$rem;
        margin-left: 10px;
      }
    }
  }
</style>
