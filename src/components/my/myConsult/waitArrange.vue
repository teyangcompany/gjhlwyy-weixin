<template>
  <div class="chat">
    <v-header :title="title" :rightTitle="goingTitle" :waitImg="waitImg" v-if="aboutConsult.consultStatus == 'NEEDPAY' && aboutConsult.consultTypeName == '图文咨询' && aboutReplyMessage.length == 0" @on-cancel="goCancel"> </v-header>
    <v-header :title="title" :rightTitle="goingTitle" :waitImg="waitImg" v-else-if="aboutConsult.consultStatus == 'GOING'&& aboutConsult.consultTypeName == '全科分诊' && aboutReplyMessage.length == 0" @on-cancel="goAllCancel"> </v-header>
    <v-header :title="title" :rightTitle="overConsultTitle" :waitImg="waitImg" v-else-if="aboutConsult.consultStatus == 'GOING'&& aboutConsult.consultTypeName == '图文咨询' && aboutReplyMessage.length != 0" @on-cancel="goOverConsult"> </v-header>
    <v-header :title="title" :rightTitle="rightTitle" :waitImg="waitImg" v-else> </v-header>
    <div class="tips" v-if="aboutConsult">
      <!--<span v-if="aboutConsult.consultStatusDescription.substr(15,16) == '按钮'">进行中</span>-->
      <span> {{aboutConsult.consultStatusDescription}}</span>
    </div>
    <!--<div class="tips" v-else>-->
      <!--{{ aboutConsult.consultStatusDescription }}-->
    <!--</div>-->
    <scroll class="conversation"  :data="aboutReplyMessage"   @click="goDown()" ref="conversation" :listen-scroll="listenScroll" :probe-type="probeType">
      <section class="conversationList" ref="slideList" @touchstart.prevent="hideKeyBoard()">
        <ul v-if="aboutConsult != ''">
          <li ref="chatLi">
            <div class=" other mysay">
              <img v-if="aboutConsult.patAvatar" :src="aboutConsult.patAvatar" alt="">
              <img v-if="aboutConsult.consulterGender == 'F' && !(aboutConsult.patAvatar)" src="../../../../static/img/患者女.jpg" alt="">
              <img v-if="aboutConsult.consulterGender == 'M' && !(aboutConsult.patAvatar)" src="../../../../static/img/患者男.jpg" alt="">
              <div class="whatsay">
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-right"></use>
                  </svg>
                </div>
                <div class="whatsay_text">
                  <p>{{ aboutConsult.consultContent }}</p>
                  <img v-for="(item,index) in attachImg" :src="item.url" alt="" @click="makePatientBig(item,index)">
                  <!--<p>就诊人:{{ aboutConsult.consulterName }} {{ aboutConsult.consulterGender == "M"?"男":"女" }} {{ aboutConsult.consulterAge }}岁</p>-->
                  <!--<p>手机号:{{ aboutConsult.consulterMobile }} </p>-->
                  <!--<p>身份证号:{{ aboutConsult.consulterIdcard }} </p>-->
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul >
          <li v-for="item in aboutReplyMessage" ref="chatLi">
            <div class="other" :class="{mysay:item.replierType == 'PAT'}">
              <img :src="aboutConsult.patAvatar" alt="" v-if="item.replierType == 'PAT'">
              <img :src="item.replierAvatar" alt="" v-else>
              <div class="whatsay">
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-left"></use>
                  </svg>
                </div>
                <div class="whatsay_text" v-if="!(item.hasOwnProperty('attaList'))">
                     {{ item.replyContent }}
                </div>
                <div class="whatsay_text" v-else-if="(item.hasOwnProperty('attaList')) && item.attaList.length == 0">
                  {{ item.replyContent }}
                </div>
                <div class="whatsay_text" v-else>
                  <img v-for="(image,index) in item.attaList" :src="image.url" alt="" @click="makeLarge(image,index)">
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </scroll>
    <footer v-if="aboutConsult.consultStatus == 'NEEDPAY'&& aboutReplyMessage && aboutReplyMessage.length == 0" class="payButton">
       <div class="payWrap">
         <button @click="pay()">付款</button>
       </div>
      <div class="assistScroll">

      </div>
    </footer>
    <footer v-else-if="aboutConsult.consultStatus == 'GOING' && aboutReplyMessage && aboutReplyMessage.length == 0" class="payButton">

    </footer>
    <footer v-else-if="aboutConsult.consultStatus == 'NEEDCOMMENT'" class="payButton">
      <div class="payWrap">
        <button @click="comment()">评价</button>
      </div>
    </footer>
    <footer :class="{footshow:seeMore}" ref="footer" v-else-if="aboutConsult.consultStatus == 'GOING' && aboutReplyMessage.length != 0">
      <section class="foot_top">
        <div class="picture">
          <input type="file" name="picture" id="upPicture" ref="picture" @change="onFileChange">
          <img src="../../../../static/img/图片.png" alt="" @click="selectImg()">
        </div>
        <div class="chatInput">
          <input type="text" id="forInput"  maxlength="100"  @blur="blured" @focus="focus()" ref="inputFocus" v-model="inputInfo" @input="whatInput" @keyup.enter="enterThing()">
        </div>
        <div class="chatSend">
          <div class="send" @touchstart.prevent="send()" v-if="light">
            <span>发送</span>
          </div>
          <div v-else @click="upMore()" class="addmore">
            <img src="../../../../static/img/聊天界面-添加.png" alt="">
          </div>
        </div>
      </section>
      <section class="foot_bottom">
      </section>
    </footer>
    <v-dialog @on-cancel="close" @on-download="closeCancel" v-if="showDialog"
              :dialogTitle="dialogTitle"
              :dialogMain="dialogMain"
              :dialogLeftFoot="dialogLeftFoot"
              :dialogRightFoot="dialogRightFoot"
    ></v-dialog>
    <v-dialog @on-cancel="closeAll" @on-download="closeAllCancel" v-if="showAllDialog"
              :dialogTitle="dialogTitle"
              :dialogMain="dialogMain"
              :dialogLeftFoot="dialogLeftFoot"
              :dialogRightFoot="dialogRightFoot"
    ></v-dialog>
    <v-dialog @on-cancel="over" @on-download="overConsult" v-if="showOverConsult"
              :dialogTitle="dialogOverTitle"
              :dialogMain="dialogOverMain"
              :dialogLeftFoot="dialogOverLeft"
              :dialogRightFoot="dialogOverRight"
    ></v-dialog>
    <div class="largePicArea" v-if="showLargePic">
      <img :src="largePic" alt="" @click="makeSmall">
    </div>
    <toast v-if="showToast"></toast>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from '../../../base/header'
  import Scroll from '../../../base/scroll'
  import api from '../../../lib/api'
  import dialog from '../../../base/dialog'
  import Toast from '../../../base/toast'
  import weui from 'weui.js'
  import {tokenCache} from '../../../lib/cache'
  import {openidCache} from "../../../lib/cache"
  export default{
    data(){
      return{
        title:"",
        rightTitle:"",
        waitImg:"",
        goingTitle:"取消申请",
        dialogTitle:"取消申请",
        overConsultTitle:"结束咨询",
        dialogOverTitle:"结束咨询",
        dialogOverMain:"您将结束本次咨询，无法继续沟通",
        dialogOverLeft:"取消",
        dialogOverRight:"确定结束",
        dialogMain:"我们将为您取消申请",
        dialogLeftFoot:"暂不取消",
        dialogRightFoot:"确定取消",
        showDialog:false,
        showAllDialog:false,
        showOverConsult:false,
        seeMore:false,
        light:false,
        inputInfo:"",
        chatText:[ ],
        displayDate:"",
        displayMessage:"",
        displayPicked:"",
        previewImg:[],
        consultId:"",
        aboutConsult:"",
        aboutReplyMessage:[],
        aboutReply:[],
        attachImg:"",
        sendContent:"",
        attaId:[],
//        推送时得到的
        pushConsultId:"",
        returnInfo:"",
        showLargePic:false,
        largePic:"",
        showToast:false,
        messageLength:""
      }
    },
    components:{
      "VHeader":header,
      "VDialog":dialog,
       Scroll,
       Toast
    },
    created(){

      this.listenScroll = true
      this.probeType = 3
      this.displayDate = this.$route.query.date
      this.displayMessage = this.$route.query.message
      this.displayPicked = this.$route.query.picked
      console.log(this.displayDate)
      this.consultId = this.$route.query.consultId
      this.showToast = true
      this.$nextTick(()=>{
        api("nethos.consult.info.detail",{
          token:tokenCache.get(),
          consultId:this.consultId
        }).then((data)=>{
           console.log(data)
          this.messageLength = data.obj.messageList.length
          this.showToast = false
          if(data.code == 0){
            this.$nextTick(()=>{
              this.aboutConsult = data.obj.consult
              this.aboutReplyMessage = data.obj.messageList
              this.attachImg = data.obj.attaList
              this.title = this.aboutConsult.docName
              this.waitImg = this.aboutConsult.docAvatar
              console.log("下面data")
              console.log(data)
              console.log("上面的data")
              console.log(this.aboutReplyMessage)
              console.log(this.aboutConsult)

              let o = document.getElementsByClassName("chat")[0];
              let h = o.offsetHeight;  //高度
              let content = h
              console.log(o)


                setTimeout(()=>{
                  if(this.$refs.slideList.offsetHeight > content-10){
                    this.$refs.conversation.scrollTo(0,content-this.$refs.slideList.offsetHeight-140)
                    console.log(this.$refs.slideList.offsetHeight)
                    console.log(content)
                  }
                },300)


            })
          }else if(!(data.msg)){
              weui.alert("网络错误，请稍后重试")
              console.log("错误的data")
              console.log(data)
              console.log("上面是错误的data")
          }else{
              weui.alert(data.msg)
          }
//          console.log(this.attachImg)
        })
      })
      api("nethos.pat.info.get",{
          token:tokenCache.get()
      }).then((data)=>{
          console.log(data)
      })
    },
    mounted(){
//      const socket = io("nethoswebsocket.diandianys.com");
//         socket.on("connect",function(){
//             console.log("这里是socket.id")
//             api("nethos.push.deviceid.register",{
//               token:tokenCache.get(),
//               deviceId:socket.id
//             }).then((data)=>{
//                 console.log(data)
//             })
//         })
         let that = this

         setInterval(()=>{
           api("nethos.consult.info.detail",{
             token:tokenCache.get(),
             consultId:that.consultId
           }).then((data)=>{
               console.log(data)
             if(data.code == 0){
                  console.log(that.messageLength)

                if(that.messageLength != data.obj.messageList.length){
                  that.$nextTick(()=>{
                    that.$set(that.$data,'aboutReplyMessage',data.obj.messageList)
//                 this.aboutReplyMessage = data.obj.messageList
                    let o = document.getElementsByClassName("chat")[0];
                    let h = o.offsetHeight;  //高度
                    let content = h
                    console.log(o)
                    setTimeout(()=>{
                      if(that.$refs.slideList.offsetHeight > content-10){
//                     console.log(that.$refs.slideList.offsetHeight)
                        console.log("医生回复你了")
                        that.$refs.conversation.scrollTo(0,content-that.$refs.slideList.offsetHeight-140)
                      }
                    },10)
                    that.messageLength = data.obj.messageList.length
                  })
                }
             }
           })
         },3000)

//         window.socket.on("pushevent",function(data){
//
//         })
    },
    watch:{
      seeMore(){
           this.$nextTick(()=>{
             let o = document.getElementsByClassName("chat")[0];
             let h = o.offsetHeight;  //高度
             let content = h
             console.log(o)
             setTimeout(()=>{
               if(this.$refs.slideList.offsetHeight > content-10){
                 console.log(this.$refs.slideList.offsetHeight)
                 this.$refs.conversation.scrollTo(0,content-this.$refs.slideList.offsetHeight-140)
               }
             },300)

           })
      }
    },
    methods:{
      goDown(){
        this.seeMore = false
      },
      goCancel(){
       this.showDialog= true
      },
      goAllCancel(){
        this.showAllDialog = true
      },
      goOverConsult(){
        this.showOverConsult = true
      },
      close(){
        this.showDialog = false
      },
      over(){
        this.showOverConsult = false
      },
      makePatientBig(item,index){
          console.log(item)
        this.largePic = item.url
        this.showLargePic =true
      },
      makeLarge(image,index){
          console.log(image)
          console.log(index)
          this.largePic = image.url
           this.showLargePic =true
      },
      makeSmall(){
        this.showLargePic =false
      },
//      结束咨询
      overConsult(){
        this.showOverConsult = false
        api("nethos.consult.info.complete",{
          token:tokenCache.get(),
          consultId:this.consultId
        }).then((data)=>{
          console.log(data)
          location.reload()
        })
      },
      pay(){
//            location.href=`http://weixin.diandianys.com/wxpay/pay.html?back=${encodeURIComponent("https://nethosweb.diandianys.com/wechat/#/blankPage"+this.consultId)}&amount=${(this.aboutConsult.consultFee)*100}&obj=${this.consultId}`

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

                  that.showToast = true
                  api("nethos.consult.info.detail",{
                    token:tokenCache.get(),
                    consultId:that.consultId
                  }).then((data)=>{
                    console.log(data)
                    that.showToast = false
                    if(data.code == 0){
                      that.$nextTick(()=>{
                        that.aboutConsult = data.obj.consult
                        that.aboutReplyMessage = data.obj.messageList
                        that.attachImg = data.obj.attaList
                        that.title = that.aboutConsult.docName
                        that.waitImg = that.aboutConsult.docAvatar
                        console.log("下面data")
                        console.log(data)
                        console.log("上面的data")
                        console.log(this.aboutReplyMessage)
                        console.log(this.aboutConsult)

                        let o = document.getElementsByClassName("chat")[0];
                        let h = o.offsetHeight;  //高度
                        let content = h
                        console.log(o)


                        setTimeout(()=>{
                          if(that.$refs.slideList.offsetHeight > content-10){
                            that.$refs.conversation.scrollTo(0,content-that.$refs.slideList.offsetHeight-140)
                            console.log(that.$refs.slideList.offsetHeight)
                            console.log(content)
                          }
                        },300)


                      })
                    }else if(!(data.msg)){
                      weui.alert("网络错误，请稍后重试")
                      console.log("错误的data")
                      console.log(data)
                      console.log("上面是错误的data")
                    }else{
                      weui.alert(data.msg)
                    }
//          console.log(this.attachImg)
                  })














                       location.reload()
                }else if(res.err_msg == "get_brand_wcpay_request:cancel" ){
                  console.log("支付过程中用户取消")
                }else if(res.err_msg == "get_brand_wcpay_request:fail"){
                  console.log("支付失败")
                  alert(JSON.stringify(res))

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
          }else{
               weui.alert(data.msg)
          }
        })






      },
//      图文问诊取消
      closeCancel(){
        this.showDialog = false
        console.log("123")
        api("nethos.consult.info.docpic.cancel",{
          token:tokenCache.get(),
          consultId:this.consultId
        }).then((data)=>{
            console.log(data)
            location.reload()
        })
      },
      closeAll(){
        this.showAllDialog = false
      },
//      全科图文取消
      closeAllCancel(){
        this.showAllDialog = false
        api("nethos.consult.info.pic.cancel",{
          token:tokenCache.get(),
          consultId:this.consultId
        }).then((data)=>{
            console.log(data)
           location.reload()
        })
      },
      //去评价
      comment(){
        this.$router.push({
          path:'/comment',
          query:{consultId:this.consultId}
        })
      },
      whatInput(){
        if(this.inputInfo.replace(/\s+/g,"") == ''){
          this.light=false
        }else{
          this.light=true
        }
      },
      enterThing(){
        if(this.light){
          this.send()
        }
      },
      send(){
        api("nethos.consult.info.reply",{
          token:tokenCache.get(),
          consultId:this.consultId,
          replyContent:this.inputInfo,
//          attaIdList:this.attaId
        }).then((data)=>{
            console.log(data)
           this.seeMore = false
            this.$nextTick(()=>{
              this.aboutReplyMessage.push(data.obj)
              console.log(this.aboutReplyMessage)
              let o = document.getElementsByClassName("chat")[0];
              let h = o.offsetHeight;  //高度
              let content = h
              console.log(o)
              setTimeout(()=>{
                if(this.$refs.slideList.offsetHeight > content-10){
                  console.log(this.$refs.slideList.offsetHeight)
                  this.$refs.conversation.scrollTo(0,content-this.$refs.slideList.offsetHeight-140)
                }
              },300)
            })
        })
        this.inputInfo = ''
        this.light=false
      },
      selectImg(e){
        this.$refs.picture.click()
      },
      onFileChange(e){
        console.log(e)
        var file = e.target.files[0]
        this.createImage(file)
        this.seeMore = false
      },
      createImage(file){
        if(typeof FileReader === "undefined"){
          weui.alert("您的浏览器不支持图片上传，请升级您的浏览器")
          return false
        }
        let that = this
        let fileName = file.name
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function(){
          that.previewImg.push(this.result)
          api("nethos.system.atta.upload.image.base64",{
            base64:this.result,
            originalName:fileName
          }).then((data)=>{
            that.attaId.push(data.obj.attaId)
            console.log(that.attaId)
            api("nethos.consult.info.reply",{
              token:tokenCache.get(),
              consultId:that.consultId,
              replyContent:"",
              attaIdList:that.attaId
            }).then((data)=>{
                console.log(that.attaId)
                console.log(data)
              location.reload()
              if(data.code == 0){
//                location.reload()



                api("nethos.consult.info.detail",{
                  token:tokenCache.get(),
                  consultId:that.consultId
                }).then((data)=>{
                  console.log(data)
                  that.showToast = false
                  if(data.code == 0){
                    that.$nextTick(()=>{
                      that.aboutConsult = data.obj.consult
                      that.aboutReplyMessage = data.obj.messageList
                      that.attachImg = data.obj.attaList
                      that.title = that.aboutConsult.docName
                      that.waitImg = that.aboutConsult.docAvatar
                      console.log("下面data")
                      console.log(data)
                      console.log("上面的data")
                      console.log(this.aboutReplyMessage)
                      console.log(this.aboutConsult)

                      let o = document.getElementsByClassName("chat")[0];
                      let h = o.offsetHeight;  //高度
                      let content = h
                      console.log(o)


                      setTimeout(()=>{
                        if(that.$refs.slideList.offsetHeight > content-10){
                          that.$refs.conversation.scrollTo(0,content-that.$refs.slideList.offsetHeight-140)
                          console.log(that.$refs.slideList.offsetHeight)
                          console.log(content)
                        }
                      },300)


                    })
                  }else if(!(data.msg)){
                    weui.alert("网络错误，请稍后重试")
                    console.log("错误的data")
                    console.log(data)
                    console.log("上面是错误的data")
                  }else{
                    weui.alert(data.msg)
                  }
//          console.log(this.attachImg)
                })























              }else{
                  weui.alert(data.msg)
              }
            })
          })
        }
      },
      hideKeyBoard(){
        this.seeMore = false
        document.getElementById('forInput').blur()
      },
      upMore(){
//        this.seeMore = !this.seeMore
      },
      focus(){
//        this.seeMore = false

//          document.getElementsByClassName("foot_top")[0].scrollIntoView()


      },
//      inputHide(e){
//        this.seeMore = false
//        this.$refs.inputFocus.blur()
////        this.$refs.footer.style.bottom=-160 + 'px'
//      },
      blured(){
//          this.$refs.footer.style.bottom=-160 + 'px'
      },
//      forceFocused(){
//        this.$refs.inputFocus.focus()
//      },
//      focused(){
//        this.seeMore = false
//        this.$refs.footer.style.bottom=-160 + 'px'
//      },
    },
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .chat{
    width:100%;
    position: fixed;
    top:0;
    bottom:0;
    .largePicArea{
      position: fixed;
      top:0px;
      left:0;
      right:0;
      bottom:0;
      z-index:10000;

      /*background-color: #999999;*/
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width:100%;
        z-index:2000;
      }
    }
  }
  .tips{
    position: fixed;
    top: 50px;
    width:100%;
    height: 40px;
    z-index:10;
    line-height: 40px;
    text-align: center;
    font-size: 32rem/$rem;
    color: white;
    background-color: $buttonColor;
  }
  .conversation{
    width:100%;
    /*padding-top: 50px;*/
    /*overflow: auto;*/
    /*height: 500px;*/
    position: fixed;
    top: 90px;
    bottom: 98rem/$rem;
    overflow: hidden;
    /*overflow: auto;*/
    /*-webkit-overflow-scrolling: touch;*/
    /*overflow: auto;*/
    background-color: white;
    /*ul{*/
      /*padding:0;*/
      /*margin:0;*/
      /*margin-top: 10px;*/
    /*}*/
  }
  .conversationList{
    width:100%;
    /*overflow: auto;*/
    /*position: relative;*/
    .loadTip{
      width:100%;
      span.pullMore{
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        img{
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      }
    }
    li{
      .other{
        width:96%;
        display: flex;
        justify-content: flex-start;
        /*padding-top: 25px;*/
        margin-bottom: 25px;
        /*align-items: top;*/
        position: relative;
        img{
          width: 80rem/$rem;
          height: 80rem/$rem;
          border-radius: 50%;
          display: inline-block;
          margin-left: 30rem/$rem;
        }
        .whatsay{
          position: relative;
          margin-top: 0.4rem;
          /*<!--.onlyThis{-->*/
            /*<!--height: 50rem/$rem;-->*/
            /*<!--width:280rem/$rem;-->*/
            /*<!--&gt;div{-->*/
              /*<!--position: absolute;-->*/
              /*<!--left: 210rem/$rem;-->*/
            /*<!--}-->*/
          /*<!--}-->*/
          .whatsay_svg{
            width:0.4266666667rem;
            height: 0.64rem;
            position: absolute;
            top:.5546667rem;
            left:.63rem;
            z-index:2;
            svg{
              display:block;
              width:0.4266666667rem;
              height: 0.64rem;
            }
          }
          .whatsay_text{
            margin-left: 20px;
            max-width: 490rem/$rem;
            background:#f5f5f5;
            padding:0.42rem 0.384rem;
            border-radius:10px;
            font-size: 28rem/$rem;
            line-height: 48rem/$rem;
            color: #333333;
            word-break: break-all;
            img{
              border-radius: 0;
              margin-left: 0;
              margin-right: 5px;
              width:110rem/$rem;
              height:110rem/$rem;
            }
          }
        }
      }
      .mysay{
        display:flex;
        flex-direction:row-reverse;
        .say-time{
          left:8.8rem;
        }
        .whatsay{
          .onlySquare{
            p{
              font-size:32rem/$rem;
            }
            span{
              font-size: 28rem/$rem;
              color: #666666;
            }
          }
          .whatsay_svg{
            right: 0rem;
            left:auto;
          }
          .whatsay_text{
            margin-right: 0.38rem;
            margin-left:0;
            background:#9fe658;
          }
        }
      }
    }
  }
  footer.payButton{
    margin-bottom: 10rem/$rem;
    width:100%;
    div.payWrap{
      width:690rem/$rem;
      margin: 0 auto;
      button{
        width:690rem/$rem;
        height:80rem/$rem;
        border:none;
        outline:medium;
        font-size: 32rem/$rem;
        color: white;
        border-radius: 7px;
        background-color: $buttonColor;
      }
    }
    .assistScroll{
      height: 500px;
    }
  }
  footer{
    width:100%;
    height: 200px;
    position: fixed;
    bottom: -160px;
    background-color: white;
    .foot_top{
      display: flex;
      .picture{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10rem/$rem;
        /*<!--margin-top: 60rem/$rem;-->*/
        img{
          width: 60rem/$rem;
          height: 60rem/$rem;
          display: block;
          margin-bottom: 15px;
        }

        /*<!--span{-->*/
          /*<!--font-size: 28rem/$rem;-->*/
          /*<!--color:#666666-->*/
        /*<!--}-->*/
        /*<!--span.red{-->*/
          /*<!--margin-top: 5px;-->*/
          /*<!--color: red;-->*/
        /*<!--}-->*/
      }
      .picture{
        >input{
          display: none;
        }
      }
      .chatInput{
        width: 520rem/$rem;
        margin-left: 20rem/$rem;
        text-align: center;
        input{
          width: 520rem/$rem;
          height: 64rem/$rem;
          border:none;
          font-size: 32rem/$rem;
          outline: medium;
          border-radius:7px;
          background-color: rgb(243,243,243);
          border-bottom: 1px solid #e0e0e0;
        }
        .greenBorder{
          border-bottom: 1px solid #19ad17;
          /*border-color:#19ad17;*/
        }
      }
      .chatSend{
        width: 110rem/$rem;
        height: 70rem/$rem;
        margin-left: 20rem/$rem;
        /*background-color: dodgerblue;*/
        text-align: center;
        .send{
          width: 110rem/$rem;
          height: 70rem/$rem;
          background:#16af17;
          border-radius:5px;
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            display: block;
            color: white;
          }
        }
        .addmore{
          img{
            width: 58rem/$rem;
            height: 58rem/$rem;
          }
        }
      }
    }
    .foot_bottom{
      display: flex;
      .camera, .picture{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 60rem/$rem;
        margin-top: 60rem/$rem;
        img{
          width: 114rem/$rem;
          height: 114rem/$rem;
          display: block;
          margin-bottom: 15px;
        }
        span{
          font-size: 28rem/$rem;
          color:#666666
        }
        span.red{
          margin-top: 5px;
          color: red;
        }
      }
      .picture,.camera{
        >input{
          display: none;
        }
      }
    }
  }
  .footshow{
    bottom:0;
    transition: all .2s;
  }
</style>
