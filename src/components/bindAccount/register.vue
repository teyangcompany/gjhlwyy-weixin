<template>
  <div>
    <!--<v-header :title="title" :rightTitle="rightTitle"></v-header>-->
    <div class="bindPhone">
      <div class="bindPhoneCenter">
        <div class="bigMiddle">
          <p>
            <img src="../../../static/img/填写真实信息.png" alt="">
            <span>请填写您的真实信息</span>
          </p>
        </div>
        <div class="aboutNumber">
          <div class="formContent">
            <div class="form phone border-1px">
              <label for="" class="phoneLabel"> <img class="nameImg" src="../../../static/img/姓名.png" alt=""> </label>
              <input type="text" placeholder="请输入您的真实姓名" class="numberInput" @focus="focus()" v-model="realName">
            </div>
            <div class="form phone border-1px">
              <label for="" class="phoneLabel"> <img class="idImg" src="../../../static/img/身份证.png" alt=""> </label>
              <input type="text" placeholder="请输入您的身份证号" class="numberInput" @focus="focus()" v-model="idCard">
            </div>
            <div class="form verifyCode border-1px">
              <label for="" class="codeLabel"> <img src="../../../static/img/密码.png" alt=""> </label>
              <input type="password" placeholder="8-20位大小写字母+数字" class="codeInput" @focus="focus()" v-model="passWord">
            </div>
          </div>
          <div class="buttonWrap">
            <button class="bottom" @touchend="confirmRegister()">确认</button>
          </div>
        </div>
      </div>
      <div class="verifyCenter"  v-if="showVerify">
        <verify :verifyTips="verifyTips"></verify>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import {openidCache} from '../../lib/cache'
  import verify from '../../base/verify'
  import api from '../../lib/api'
  export default{
    data(){
      return{
        title:"广济互联网医院",
        rightTitle:"",
        cid:"",
        codeValue:"",
        realName:"",
        idCard:"",
        passWord:"",
        backPath:"",
        showVerify:false,
        verifyTips:"姓名不能为空",
      }
    },
    created(){
        this.backPath = this.$route.query.backPath
       this.cid = this.$route.query.cid
       this.codeValue = this.$route.query.codeValue
      console.log(this.cid)
      console.log(this.codeValue)
    },
    methods:{
      confirmRegister(){
          console.log("123")
          if(this.realName == ''){
            this.verifyTips = "姓名不能为空"
            this.showVerify = true
            setTimeout(()=>{
              this.verifyTips = '姓名不能为空'
              this.showVerify = false
            },1000)
          }else if(this.idCard == ''){
            this.verifyTips = "身份证号不能为空"
            this.showVerify = true
            setTimeout(()=>{
              this.verifyTips = '身份证号不能为空'
              this.showVerify = false
            },1000)
          }else if(this.passWord == ''){
            this.verifyTips = "密码不能为空"
            this.showVerify = true
            setTimeout(()=>{
              this.verifyTips = '密码不能为空'
              this.showVerify = false
            },1000)
          }else if(this.passWord.length < 8){
            this.verifyTips = "密码长度太短"
            this.showVerify = true
            setTimeout(()=>{
              this.verifyTips = '密码长度太短'
              this.showVerify = false
            },1000)
          }else{
            this.passWord = sha512(hex_md5(this.passWord) + this.passWord );
            api("nethos.pat.register.v3",{
              captcha:this.codeValue,
              cid:this.cid,
              patPassword:this.passWord,
              patName:this.realName,
              patIdcard:this.idCard,
              openid:openidCache.get()
            }).then((data)=>{
              console.log(data)
              if(data.code == 0){
                this.$router.push({
                  path:'/login',
                  query:{backPath:this.backPath}
                })
              }else{
                this.passWord = ''
                alert(data.msg)
              }
            })
          }
      },
    },
    components:{
      "VHeader":header,
      verify
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
    z-index:100;
    .verifyCenter{
      position: fixed;
      left:0;
      right:0;
      top:0;
      bottom:0px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
        p{
          display: flex;
          flex-direction: column;
         align-items: center;
          img{
            width:321rem/$rem;
            height:251rem/$rem;
            margin-bottom: 85rem/$rem;
          }
          span{
            font-size: 50rem/$rem;
          }
        }
      }
      .aboutNumber{
        position: fixed;
        bottom:100rem/$rem;
        background-color: white;
        /*<!--height:500rem/$rem;-->*/
        .formContent{
          width: 690rem/$rem;
          margin: 0 auto;
          margin-top: 10px;
          .form{
            width:100%;
            height: 90rem/$rem;
            line-height: 40px;
            display: flex;
            margin-top: 1px;
            label{
              width: 50px;
              font-size: 16px;
              padding-left:1rem;
              font-size: 32rem/$rem;
              color: #333333;
              /*<!--background-color: $bgColor2;-->*/
            }
            label.phoneLabel{
              border-top-left-radius: 7px;
              display: flex;
              align-items: center;
              .nameImg{
                width:48rem/$rem;
                height:45rem/$rem;
              }
              .idImg{
                width:49rem/$rem;
                height:41rem/$rem;
              }
            }
            label.codeLabel{
              border-bottom-left-radius: 7px;
              display: flex;
              align-items: center;
              img{
                width:44rem/$rem;
                height:49rem/$rem;
              }
            }
            input{
              flex: 1;
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
            width: 100px;
            border:none;
            outline: medium;
            border-radius: 7px;
            font-size: 32rem/$rem;
            color: white;
            background-color: $buttonColor;
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
