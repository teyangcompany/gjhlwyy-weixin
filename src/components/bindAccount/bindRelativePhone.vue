<template>
    <div>
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
         <div class="bindPhone">
             <div class="bindPhoneCenter">
               <div class="bigMiddle">
                   <p>请先绑定您的手机号</p>
               </div>
               <div class="aboutNumber">
                 <div class="formContent">
                   <div class="form phone">
                     <label for="" class="phoneLabel">手机号</label>
                     <input type="text" placeholder="请输入手机号" class="numberInput" v-model="phone">
                   </div>
                   <div class="form verifyCode">
                     <label for="" class="codeLabel">验证码</label>
                     <input type="text" placeholder="请输入验证码" class="codeInput" v-model="code">
                     <button @click="getCode">获取验证码</button>
                   </div>
                 </div>
                 <button class="bottom" @click="verifyCode()">这是我的手机号</button>
               </div>
             </div>
         </div>
    </div>
</template>
<script>
   import header from '../../base/header'
   import api from '../../lib/api.js'
   export default{
       data(){
           return{
               title:"广济互联网医院",
               rightTitle:"",
               phone:"",
               code:"",
               cid:0
           }
       },
       created(){

       },
       methods:{
         getCode(){
             let that = this
           api("nethos.system.captcha.generate",{
             captchaType:"SMS",
             mobile:this.phone,
           }).then((data)=>{
               that.cid = data.obj
               console.log(that.cid)
           })
         },
         verifyCode(){
             console.log(this.cid)
             api("nethos.pat.checkcaptchamobile",{
               captcha:this.code,
               patMobile:this.phone,
               cid:this.cid,
               isType:"register"
             }).then((data)=>{
                 if(data.msg == '该手机号已被注册，请直接登陆'){
                     this.$router.push('/login')
                 }else{
                     this.$router.push("/register")
                 }
                 console.log(data)
             })
         }
       },
       components:{
           "VHeader":header
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
  .bindPhoneCenter{
    width:690rem/$rem;
    margin:0 auto;
    .bigMiddle{
      position: fixed;
      top: 50px;
      left:0;
      right:0;
      bottom:500rem/$rem;
      font-size: 32rem/$rem;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
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
            width: 100px;
            font-size: 16px;
            padding-left:1rem;
            font-size: 32rem/$rem;
            color: #333333;
            background-color: $bgColor2;
          }
          label.phoneLabel{
            border-top-left-radius: 7px;
          }
          label.codeLabel{
            border-bottom-left-radius: 7px;
          }
          input{
            flex: 1;
            border: none;
            outline: medium;
            font-size: 32rem/$rem;
            color: #999999;
            background-color: $bgColor2;
          }
          input.codeInput{
            border-bottom-right-radius: 7px;
          }
          p{
            flex:1;
            font-size: 32rem/$rem;
            color: #999999;
            background-color: $bgColor2;
            border-top-right-radius: 7px;
          }
        }
        .phone{
          /*margin-top: 20px;*/
        }
        .verifyCode{
          position: relative;

        }
        .verifyCode button{
          position: absolute;
          top:5px;
          right:0;
          height: 30px;
          line-height: 30px;
          width: 200rem/$rem;
          border:none;
          outline: medium;
          border-radius: 7px;
          font-size: 32rem/$rem;
          color: white;
          background-color: $buttonColor;
        }
      }
      button.bottom{
        width:690rem/$rem;
        height:80rem/$rem;
        border: none;
        outline: medium;
        border-radius: 7px;
        margin-top: 150rem/$rem;
        color: white;
        font-size: 32rem/$rem;
        background-color: $buttonColor;
      }
    }
  }
}
</style>
