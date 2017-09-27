<template>
  <div>
    <div class="bindPhone">
      <div class="bindPhoneCenter">
        <div class="bigMiddle">
          <p>
            <img src="../../../static/img/填写手机号.png" alt="">
            <span>请先填写您的手机号</span>
          </p>
        </div>
        <!--<div class="verifyTips">-->
        <!--<span class="form-group__message" v-if="!$v.phone.required">手机号不能为空</span><span class="form-group__message" v-if="!$v.phone.minLength">Name must have at least {{$v.phone.$params.minLength.min}} letters.</span>-->
        <!--</div>-->
        <div class="aboutNumber">
          <div class="formContent" ref="formContent">
            <div class="form phone border-1px">
              <label for="" class="phoneLabel"> <img src="../../../static/img/手机号.png" alt=""> </label>
              <input type="number" placeholder="请输入手机号"  @focus="focus()" @blur="blur()" v-model.trim="phone" @input="$v.phone.$touch()" class="numberInput">
            </div>
            <div class="form verifyCode border-1px">
              <label for="" class="codeLabel"> <img src="../../../static/img/验证码.png" alt=""> </label>
              <input type="number" @focus="focus()" @blur="blur()" placeholder="请输入验证码" class="codeInput" v-model="code">
              <span @click="getCode" v-if="countdown == 60 || countdown == 0">获取验证码</span>
              <span v-else>{{ countdown }}s后重新获取</span>
            </div>
          </div>
          <div class="buttonWrap">
            <button class="bottom" @touchend="verifyCode()">这是我的手机号</button>
          </div>
        </div>
      </div>
      <!--<div style="background-color: white" class="layer">-->
        <!--<v-mask v-if="showMask"></v-mask>-->
      <!--</div>-->
      <div class="verifyCenter">
        <verify v-if="showVerify" :verifyTips="verifyTips"></verify>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import api from '../../lib/api.js'
  import mask from '../../base/mask'
  import verify from '../../base/verify'
  import {openidCache} from '../../lib/cache'
  import {isLoginMixin} from "../../lib/mixin"
  import {tokenCache} from '../../lib/cache'
  import { required, minLength, between } from 'vuelidate/lib/validators'
  export default{
    mixins: [isLoginMixin],
    data(){
      return{
        phone:"",
        code:"",
        cid:"",
        codeValue:"",
        showMask:false,
        regStatus:"",
        showVerify:false,
        verifyTips:"手机号不能为空",
        countdown:60,
        a:"",
        backPath:"",
        docId:""
      }
    },
    validations: {
      phone: {
        required,
        minLength: minLength(4)
      },
      age: {
        between: between(20, 30)
      }
    },
    created(){
       this.backPath = this.$route.query.backPath
      this.docId = this.$route.query.docId
      console.log(document.getElementsByTagName("body")[0].offsetHeight)
      console.log(window.innerHeight)
//      if(this.docId != ''){
//          api("nethos.pat.info.get", {
//            token:tokenCache.get()
//          }).then((data) => {
//            if (data.code == 0) {
//  //          this.patientInfo = data.obj
//              this.$router.push({
//                path:"/scanLogin",
//                query:{docId:this.docId}
//              })
//            } else {
//              this.$router.push({
//                path:"/scanBind",
//                query:{docId:this.docId}
//              })
//            }
//          })
//      }else{
        api("nethos.pat.info.get", {
          token:tokenCache.get()
        }).then((data) => {
          if (data.code == 0) {
            //          this.patientInfo = data.obj
            this.$router.replace({
              path:"/repeatBind",
              query:{backPath:this.path}
            });
          } else {

          }
        })
//      }
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
      verifyCode(){
          if(this.phone == ''){
            this.verifyTips = "手机号不能为空"
            this.showVerify = true
            setTimeout(()=>{
              this.verifyTips = '手机号不能为空'
              this.showVerify = false
            },1000)
          }
          else if(this.code == ''){
            this.verifyTips = "验证码不能为空"
            this.showVerify = true
            setTimeout(()=>{
              this.verifyTips = '验证码不能为空'
              this.showVerify = false
            },1000)
          }
          else if(this.code != this.codeValue){
            this.verifyTips = "验证码输入错误"
            this.showVerify = true
            setTimeout(()=>{
              this.verifyTips = '验证码输入错误'
              this.showVerify = false
            },1000)
          }
          else{
            if(this.regStatus == 'REGISTER'){
              this.$router.push({
                path:'/register',
                query:{cid:this.cid,codeValue:this.codeValue,backPath:this.backPath}
              })
            }else if(this.regStatus == 'BIND'){
              api("nethos.pat.wechat.bind",{
//                token:`OPENID_`+localStorage.getItem("token"),
                captcha:this.code,
                cid:this.cid,
                openid:openidCache.get()
              }).then((data)=>{
                console.log(data)
                console.log(this.codeValue)
                console.log(this.cid)
                console.log(openidCache.get())
                if(data.code == 0){
                  this.$router.push({
                    path:'/login',
                    query:{backPath:this.backPath}
                  })
                } else if(data.msg = ''){
                  this.verifyTips = '网络错误，稍候重试'
                  this.showVerify = true
                  setTimeout(()=>{
                    this.verifyTips = '手机号不能为空'
                    this.showVerify = false
                  },1000)
            } else{
                  alert(data.msg)
                }
                console.log(data)
              })
            }
          }
        console.log(this.cid)
      },
      focus(){
//            this.showMask = true
        console.log(window.innerHeight)
        document.getElementsByClassName("formContent")[0].style.height = window.innerHeight
        document.getElementsByClassName("formContent")[0].style.backgroundColor = 'white'
        console.log(document.getElementsByTagName("body")[0].offsetHeight)
//             setInterval(function(){
//                 console.log("123")
//                 document.getElementsByClassName("formContent")[0].scrollIntoView()
//             },200)
        let UA = window.navigator.userAgent.toLocaleLowerCase();
        if (/iphone/.test(UA)) {
          window.device = "iphone";
        }
        if (/android/.test(UA)) {
          window.device = "android";
        }
        if (window.device == "iphone") {
//          this.ios = true
        }else{
          this.showMask = true
        }


      },
      blur(){
        this.showMask = false
      }
    },
    components:{
      "VHeader":header,
      "VMask":mask,
      verify
    },
    watch:{
        phone(){
            if(!this.$v.phone.required){
                this.showVerify = true
                setTimeout(()=>{
                  this.showVerify = false
                },1000)
            }
        },
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
    top: 0px;
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
        margin-top: 200rem/$rem;
        font-size: 32rem/$rem;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        p{
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            width:319rem/$rem;
            height:246rem/$rem;
            margin-bottom: 85rem/$rem;
          }
          span{
            font-size: 50rem/$rem;
            color: #333333;
          }
        }
      }
      .verifyTips{
        margin-top: 130rem/$rem;
        position: relative;
        text-align: center;
      }
      .aboutNumber{
        position: fixed;
        bottom:100rem/$rem;
        background-color: white;
        z-index:100;
        border-radius: 7px;
        /*<!--margin-top: 18rem/$rem;-->*/
        /*<!--height:500rem/$rem;-->*/
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
