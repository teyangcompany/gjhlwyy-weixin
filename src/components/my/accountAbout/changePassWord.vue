<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle" @on-passConfirm="goConfirm"></v-header>
    <div class="verifyArea">
      <div class="formContent">
        <div class="form phone">
          <label for="" class="phoneLabel">手机号</label>
          <input type="text" placeholder="请输入新的密码" class="numberInput">
        </div>
        <div class="form verifyCode">
          <label for="" class="codeLabel">验证码</label>
          <input type="text" placeholder="请再输入一次新密码" class="codeInput">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../../base/header'
  export default{
    data(){
      return{
        title:"修改密码",
        rightTitle:"确认修改"
      }
    },
    methods:{
      goConfirm(){
        this.$router.push('/changePhoneSuccess')
      }
    },
    components:{
      "VHeader":header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public';
  .verifyArea{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
  }
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
      input.numberInput{
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
</style>
