<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="bindPhone">
      <div class="bindPhoneCenter">
        <div class="bigMiddle">
          <p>请填写您的真实信息</p>
        </div>
        <div class="aboutNumber">
          <div class="formContent">
            <div class="form phone">
              <label for="" class="phoneLabel">姓名</label>
              <input type="text" placeholder="请输入您的真实姓名" class="numberInput">
            </div>
            <div class="form phone">
              <label for="" class="phoneLabel">身份证号</label>
              <input type="text" placeholder="请输入您的身份证号" class="numberInput">
            </div>
            <div class="form verifyCode">
              <label for="" class="codeLabel">密码</label>
              <input type="text" placeholder="请设置一个密码" class="codeInput">
            </div>
          </div>
          <button class="bottom">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  export default{
    data(){
      return{
        title:"广济互联网医院",
        rightTitle:""
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
            width: 100px;
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
          margin-top: 100rem/$rem;
          color: white;
          font-size: 32rem/$rem;
          background-color: $buttonColor;
        }
      }
    }
  }
</style>
