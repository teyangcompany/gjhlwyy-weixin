<template>
  <div>
    <!--<v-header :title="title" :rightTitle="rightTitle"></v-header>-->
    <div class="bindPhone">
      <div class="bindPhoneCenter">
        <div class="bigMiddle">
          <div class="doctorFunc">
            <div class="doctorImg">
              <img :src="docInfo.docAvatar" alt="">
            </div>
            <div class="doctorIntro">
              <h4><span class="mainTitle">{{ docInfo.docName }}</span><span class="chief" v-if="docInfo.docFamousConsultStatus == true">名医</span><span v-else>&nbsp;&nbsp; </span> </h4>
              <h6>{{ docInfo.docDeptName }}&nbsp; {{ docInfo.docTitle }}</h6>
              <h6>{{ docInfo.docHosName }}</h6>
            </div>
          </div>
        </div>
        <div class="tips">
          <p>您好！欢迎关注我。</p>
          <p>请在下方输入您的真实手机号，方便联系</p>
          <div class="nav"></div>
        </div>
        <div class="aboutNumber">
          <div class="formContent">
            <div class="form phone border-1px">
              <label for="" class="phoneLabel"> <img src="../../../static/img/手机号.png" alt=""> </label>
              <input type="text" placeholder="请输入手机号" class="numberInput" v-model="phone">
            </div>
            <div class="form verifyCode border-1px">
              <label for="" class="codeLabel"> <img src="../../../static/img/验证码.png" alt=""> </label>
              <input type="text" placeholder="请输入验证码" class="codeInput" v-model="code">
              <span @click="getCode" v-if="countdown == 60 || countdown == 0">获取验证码</span>
              <span v-else>{{ countdown }}s后重新获取</span>
            </div>
          </div>
          <div class="buttonWrap">
            <button class="bottom" @click="verifyCode()">这是我的手机号</button>
          </div>
        </div>
      </div>
      <div class="verifyCenter" v-if="showVerify">
        <verify :verifyTips="verifyTips"></verify>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import verify from '../../base/verify'
  import api from '../../lib/api.js'
  import weui from 'weui.js'
  import {openidCache} from '../../lib/cache'
  export default{
    data(){
      return{
        title:"广济互联网医院",
        rightTitle:"",
        phone:"",
        code:"",
        cid:0,
        countdown:60,
        verifyTips:"手机号不能为空",
        showVerify:false,
        a:"",
        docId:"",
        docInfo:""
      }
    },
    created(){
         this.docId = this.$route.query.docId
         api("nethos.doc.card",{
           docId:this.docId
         }).then((data)=>{
             this.docInfo = data.obj.sysDoc
             console.log(data)
         })
    },
    methods:{
      getCode(){
        if(this.phone == ''){
          this.verifyTips = "手机号不能为空"
          this.showVerify = true
          setTimeout(()=>{
            this.verifyTips = '手机号不能为空'
            this.showVerify = false
          },1000)
        }else{
          api("nethos.system.captcha.pat.wechat.bind",{
            mobile:this.phone,
          }).then((data)=>{
            console.log(data)
            if(data.code == 0){
              console.log(data)
              this.regStatus = data.regStatus
              this.cid = data.obj.cid
              this.codeValue = data.obj.value
              console.log(this.cid)
              console.log(this.codeValue)
              this.a = setInterval(()=>{
                this.countdown--
              },1000)
            }else{
              this.verifyTips = data.msg
              this.showVerify = true
              setTimeout(()=>{
                this.verifyTips = '手机号不能为空'
                this.showVerify = false
              },1000)
            }
          })
        }
      },







//      getCode(){
//        let that = this
//        api("nethos.system.captcha.generate",{
//          captchaType:"SMS",
//          mobile:this.phone,
//        }).then((data)=>{
//          that.cid = data.obj
//          console.log(that.cid)
//        })
//      },
//      verifyCode(){
//        console.log(this.cid)
//        api("nethos.pat.checkcaptchamobile",{
//          captcha:this.code,
//          patMobile:this.phone,
//          cid:this.cid,
//          isType:"register"
//        }).then((data)=>{
//          if(data.msg == '该手机号已被注册，请直接登陆'){
//            this.$router.push('/login')
//          }else{
//            this.$router.push("/register")
//          }
//          console.log(data)
//        })
//      }


      verifyCode(){
        if(this.phone == ''){
          this.verifyTips = "手机号不能为空"
          this.showVerify = true
          setTimeout(()=>{
            this.verifyTips = '手机号不能为空'
            this.showVerify = false
          },1000)
        }
//          else if(this.code == ''){
//            this.verifyTips = "验证码不能为空"
//            this.showVerify = true
//            setTimeout(()=>{
//              this.verifyTips = '验证码不能为空'
//              this.showVerify = false
//            },1000)
//          }
//          else if(this.code != this.codeValue){
//            this.verifyTips = "验证码输入错误"
//            this.showVerify = true
//            setTimeout(()=>{
//              this.verifyTips = '验证码输入错误'
//              this.showVerify = false
//            },1000)
//          }
        else{
          if(this.regStatus == 'REGISTER'){
            this.$router.push({
              path:'/scanRegister',
              query:{cid:this.cid,codeValue:this.codeValue,backPath:this.backPath,docId:this.docId}
            })
          }else if(this.regStatus == 'BIND'){
            api("nethos.pat.wechat.bind",{
//                token:`OPENID_`+localStorage.getItem("token"),
              captcha:this.codeValue,
              cid:this.cid,
              openid:openidCache.get()
            }).then((data)=>{
              console.log(data)
              console.log(this.codeValue)
              console.log(this.cid)
              console.log(openidCache.get())
              if(data.code == 0){
                this.$router.push({
                  path:'/scanLogin',
                  query:{backPath:this.backPath,docId:this.docId}
                })
              } else if(data.msg = ''){
                this.verifyTips = '网络错误，稍候重试'
                this.showVerify = true
                setTimeout(()=>{
                  this.verifyTips = '手机号不能为空'
                  this.showVerify = false
                },1000)
              } else{
                weui.alert(data.msg)
              }
              console.log(data)
            })
          }
        }
        console.log(this.cid)
      },














    },
    components:{
      "VHeader":header,
      verify
    },
    watch:{
      countdown(){
        if(this.countdown == 0){
          clearInterval(this.a)
          this.countdown = 60
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .bindPhone{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
    .verifyCenter{
      position: fixed;
      left:0;
      right:0;
      top:0;
      bottom:0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bindPhoneCenter{
      width:690rem/$rem;
      margin:0 auto;
      .bigMiddle{
        position: fixed;
        top: 30px;
        left:0;
        right:0;
        bottom:500rem/$rem;
        font-size: 32rem/$rem;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        .doctorFunc{
          width:100%;
          height: 210px;
          background-color: white;
          .doctorImg {
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 140rem/$rem;
              height: 140rem/$rem;
              border-radius: 50%;
            }
          }
          .doctorIntro {
            width: 100%;
            height: 70px;
            margin-top: 10px;
            text-align: center;
            h4{
              font-weight: normal;
              margin:0;
              span.mainTitle{
                margin-left: 60rem/$rem;
                font-size: 32rem/$rem;
                color: #333333;
              }
              span.chief{
                position: relative;
                font-size: 28rem/$rem;
                color: white;
                background-color: $buttonColor;
                display: inline-block;
                width:58rem/$rem;
                height: 29rem/$rem;
                margin:0;
                line-height: 31rem/$rem;
                text-align: center;
                left: 12rem/$rem;
              }
              span.empty{
                border:none;
              }
            }
            h6{
              font-weight:normal;
              font-size: 28rem/$rem;
              color: #999999;
              margin:0;
            }
            /*background-color: #0BB20C;*/
          }
        }
      }
      .tips{
        position: absolute;
        top:430rem/$rem;
        width:690rem/$rem;
        text-align: center;
        border:1px solid #00ced1;
        border-radius: 5px;
        p{
          width:650rem/$rem;
          margin: 0 auto;
          text-align: center;
          font-size: 28rem/$rem;
          color: #00ced1;
        }
        p:nth-child(1){
          padding-top: 25rem/$rem;
        }
        p:nth-child(2){
          padding-bottom: 25rem/$rem;
        }
        .nav {
          position   :absolute;
          top    :-8px;
          right    :332rem/$rem;
          overflow   :hidden;
          width    :13px;
          height   :13px;
          background  :white;
          border-left  :1px solid  #00ced1;
          border-top  :1px solid  #00ced1;
          -webkit-transform :rotate(45deg);
          -moz-transform :rotate(45deg);
          -o-transform  :rotate(45deg);
          transform   :rotate(45deg);
        }
      }
      .aboutNumber{
        position: fixed;
        bottom:0;
        height:500rem/$rem;
        .formContent{
          width: 690rem/$rem;
          margin: 0 auto;
          margin-top: 10px;
          .form{
            width:100%;
            height: 40px;
            line-height: 40px;
            display: flex;
            margin-top: 1px;
            label{
              width: 60px;
              padding-left:1rem;
              /*<!--background-color: $bgColor2;-->*/
            }
            label.phoneLabel{
              border-top-left-radius: 7px;
              display: flex;
              align-items: center;
              justify-content: center;
              img{
                height:50rem/$rem;
                width:30rem/$rem;
              }
            }
            label.codeLabel{
              border-bottom-left-radius: 7px;
              display: flex;
              align-items: center;
              justify-content: center;
              img{
                height:45rem/$rem;
                width:40rem/$rem;
              }
            }
            input{
              flex: 1;
              text-align: left;
              border: none;
              outline: medium;
              font-size: 32rem/$rem;
              color: #999999;
              /*<!--background-color: $bgColor2;-->*/
            }
            input.codeInput{
              border-bottom-right-radius: 7px;
            }
            p{
              flex:1;
              font-size: 32rem/$rem;
              color: #999999;
              /*<!--background-color: $bgColor2;-->*/
              border-top-right-radius: 7px;
            }
          }
          .phone{
            /*margin-top: 20px;*/
          }
          .verifyCode{
            position: relative;
            height:109rem/$rem
          }
          .verifyCode span{
            position: absolute;
            display: inline-block;
            top:30rem/$rem;
            text-align: center;
            right:0;
            height: 57rem/$rem;
            line-height: 57rem/$rem;
            width: 190rem/$rem;
            font-size: 26rem/$rem;
            border:1px solid #3Dccc2;
            border-radius: 5px;
            color: #3Dccc2;
          }
        }
        .buttonWrap{
          width:690rem/$rem;
          height:90rem/$rem;
          margin-top: 69rem/$rem;
          text-align: center;
        }
        button.bottom{
          width:650rem/$rem;
          height:90rem/$rem;
          border: none;
          outline: medium;
          border-radius: 22px;
          color: white;
          font-size: 36rem/$rem;
          background-color: $buttonColor;
        }
      }
    }
  }
</style>
