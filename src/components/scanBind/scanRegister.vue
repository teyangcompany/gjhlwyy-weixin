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
              <h4><span class="mainTitle">{{ docInfo.docName }}</span><span class="chief" v-if="docInfo.docFamousConsultStatus == true">名医</span><span v-else>&nbsp;&nbsp;</span> </h4>
              <h6>{{ docInfo.docDeptName }}&nbsp; {{ docInfo.docTitle }}</h6>
              <h6>{{ docInfo.docHosName }}</h6>
            </div>
          </div>
        </div>
        <div class="tips">
          <p>请填写您的真实信息</p>
          <div class="nav"></div>
        </div>
        <div class="aboutNumber">
          <div class="formContent">
            <div class="form phone border-1px">
              <label for="" class="phoneLabel"> <img class="nameImg" src="../../../static/img/姓名.png" alt=""> </label>
              <input type="text" placeholder="请输入您的真实姓名" class="numberInput" v-model="realName">
            </div>
            <div class="form phone border-1px">
              <label for="" class="phoneLabel"> <img class="idImg" src="../../../static/img/身份证.png" alt=""> </label>
              <input type="text" placeholder="请输入您的身份证号" class="numberInput" v-model="idCard">
            </div>
            <div class="form verifyCode border-1px">
              <label for="" class="codeLabel"> <img src="../../../static/img/密码.png" alt=""> </label>
              <input type="password" placeholder="8-20位大小写字母+数字" class="codeInput" v-model="passWord">
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
  import weui from 'weui.js'
  import api from '../../lib/api'
  export default{
    data(){
      return{
        title:"广济互联网医院",
        rightTitle:"",
        backPath:"",
        showVerify:false,
        verifyTips:"姓名不能为空",
        realName:"",
        idCard:"",
        passWord:"",
        docId:"",
        docInfo:""
      }
    },
    created(){
      this.backPath = this.$route.query.backPath
      this.cid = this.$route.query.cid
      this.codeValue = this.$route.query.codeValue
      this.docId = this.$route.query.docId
      api("nethos.doc.card",{
        docId:this.docId
      }).then((data)=>{
        this.docInfo = data.obj.sysDoc
        console.log(data)
      })
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
                path:'/scanLogin',
                query:{backPath:this.backPath,docId:this.docId}
              })
            }else{
              this.passWord = ''
              weui.alert(data.msg)
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
        top:500rem/$rem;
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
           padding-top: 15rem/$rem;
          padding-bottom: 15rem/$rem;
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
        bottom:100rem/$rem;
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
              width: 50px;
              font-size: 16px;
              padding-left:1rem;
              font-size: 32rem/$rem;
              color: #333333;
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
