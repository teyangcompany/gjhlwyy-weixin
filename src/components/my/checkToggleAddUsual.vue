<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle" @0n-add="goAdd()"></v-header>
    <div class="verifyArea">
      <div class="formContent nameContent">
        <div class="form phone">
          <label for="">姓名</label>
          <input type="text" placeholder="请输入您的真实姓名" v-model="compatName">
        </div>
        <div class="form verifyCode">
          <label for="">身份证号</label>
          <input type="text" placeholder="请输入您的身份证号" v-model="compatIdcard">
        </div>
      </div>
      <div class="formContent">
        <div class="form phone">
          <label for="">手机号</label>
          <input type="text" placeholder="请输入真实的手机号" v-model="compatMobile">
          <img src="../../../static/img/u691.png" alt="" @click="showInfo()" >
        </div>
        <div class="form verifyCode">
          <label for="">验证码</label>
          <input type="text" placeholder="请输入验证码" v-model="captcha">
          <button @click="getCode()">获取验证码</button>
        </div>
      </div>
    </div>
    <alert v-show="infoDisplay" @on-iKnow="iKnow()" :firstLine="firstLine" :secondLine="secondLine" :bottomLine="bottomLine"></alert>
    <alert v-show="showAlert" @on-iKnow="iKnow()" :firstLine="alertContent" :secondLine="alertSecond" :bottomLine="bottomLine"></alert>
  </div>
</template>
<script>
  import header from '../../base/header'
  import Alert from '../../base/alert'
  import api from '../../lib/api'
  export default{
    data(){
      return{
        title:"添加就诊人",
        rightTitle:"下一步",
        firstLine:"若该患者曾前往浙二就诊过，最好填写在浙二留的手机号",
        secondLine:"若该手机号不再使用，可以前往医院修改，或者直接填写真实的本人使用的手机号",
        bottomLine:"知道了",
        infoDisplay:false,
        alertContent:"",
        alertSecond:"",
        showAlert:false,
        compatName:"",
        compatIdcard:"",
        compatMobile:"",
        captcha:"",
        cid:0
      }
    },
//    validations:{
//      compatName:{
//          required,
//          minLength: minLength(2)
//      }
//    },
    methods:{
      showInfo(){
        this.infoDisplay =true
      },
      iKnow(){
        this.infoDisplay =false
        this.showAlert = false
      },
      getCode(){
        api("nethos.system.captcha.generate",{
          captchaType:"SMS",
          mobile:this.compatMobile
        }).then((data)=>{
          this.cid = data.obj
        })
      },
      goAdd(){
        console.log(this.cid)
        api("nethos.pat.compat.add",{
          token:localStorage.getItem("token"),
          compatName:this.compatName,
          compatMobile:this.compatMobile,
          compatIdcard:this.compatIdcard,
          cid:this.cid,
          captcha:this.captcha
        }).then((data)=>{
          console.log(this.cid)
          console.log(this.compatIdcard)
          console.log(data)
          if(data.code == 0){
            this.$router.push('/checkTogglePatient')
          }else{
            this.alertContent = data.msg
            this.showAlert = true
          }
        })
      }
    },
    components:{
      "VHeader":header,
      Alert
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .verifyArea{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
  }
  .formContent{
    width:690rem/$rem;
    margin: 0 auto;
    margin-top: 10px;
    .form{
      width:100%;
      height: 40px;
      line-height: 40px;
      background-color:white;
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
      input{
        flex: 1;
        border: none;
        outline: medium;
        font-size: 32rem/$rem;
        color: #999999;
        background-color: $bgColor2;
      }
    }
    .phone{
      /*margin-top: 20px;*/
    }
    .verifyCode,.phone{
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
      border-radius: 7px;
      outline:medium;
      font-size: 32rem/$rem;
      color: white;
      background-color: $buttonColor;
    }
    .phone img{
      position: absolute;
      top:5px;
      right:15rem/$rem;
    }
  }
</style>
