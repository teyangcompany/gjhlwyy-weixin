<template>
  <div class="page overflow-y-auto">
    <div class="bindPhone">
      <div class="bindPhoneCenter">
        <div class="bigMiddle">
          <div class="doctorFunc">
            <div class="doctorImg">
              <img :src="docInfo|docAva" alt="">
            </div>
            <div class="doctorIntro">
              <h4><span class="mainTitle">{{ docInfo.docName }}</span><span class="chief"
                                                                            v-if="docInfo.docFamousConsultStatus == true">名医</span><span
                v-else>&nbsp;&nbsp; </span></h4>
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
          <div class="formContent" ref="form">
            <div class="form phone border-1px">
              <label for="" class="phoneLabel"> <img src="../../../static/img/手机号.png" alt=""> </label>
              <input type="text" @focus="focus" @blur="blur" placeholder="请输入手机号"
                     class="numberInput" v-model="phone">
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
    <msg ref="msg"></msg>
  </div>
</template>
<script>
  import docAva from '../../utils/docAva'
  import Msg from '../../plugins/msg'
  import header from '../../base/header'
  import verify from '../../base/verify'
  import api from '../../lib/api.js'
  import weuijs from 'weui.js'
  import {scrollIntoViewMixin} from "../../lib/mixin";
  import {openidCache} from '../../lib/cache'

  export default {
    data() {
      return {
        timer: "",
        title: "广济互联网医院",
        rightTitle: "",
        phone: "",
        code: "",
        cid: 0,
        countdown: 60,
        verifyTips: "手机号不能为空",
        showVerify: false,
        a: "",
        docId: "",
        docInfo: ""
      }
    },
    created() {
      this.docId = this.$route.query.docId
      this.getDocInfo();
    },
    methods: {
      focus() {

      },
      blur() {

      },
      async getDocInfo() {
        let loading = weuijs.loading("加载中...");
        let data = await api("nethos.doc.card", {
          docId: this.docId
        });
        loading.hide();
        this.docInfo = data.obj.sysDoc
      },
      verifyCode() {
        if (this.phone == '') {
          this.verifyTips = "手机号不能为空"
          this.$refs.msg.show(this.verifyTips);
        }
        else {
          if (this.regStatus == 'REGISTER') {
            this.$router.replace({
              path: '/scanRegister',
              query: {cid: this.cid, codeValue: this.codeValue, backPath: this.backPath, docId: this.docId}
            })
          } else if (this.regStatus == 'BIND') {
            api("nethos.pat.wechat.bind", {
              captcha: this.codeValue,
              cid: this.cid,
              openid: openidCache.get()
            }).then((data) => {
              if (data.code == 0) {
                this.$router.replace({
                  path: '/scanLogin',
                  query: {backPath: this.backPath, docId: this.docId}
                })
              } else if (data.msg == '') {
                this.verifyTips = '网络错误，稍候重试'
                this.$refs.msg.show(this.verifyTips);
              } else {
                this.$refs.msg.show(data.msg);
              }
            })
          }
        }
      },
      async getCode() {
        if (this.phone == '') {
          this.verifyTips = "手机号不能为空";
          this.$refs.msg.show(this.verifyTips);
        } else {
          let loading = weuijs.loading("加载中...");
          let data = await api("nethos.system.captcha.pat.wechat.bind", {
            mobile: this.phone,
          });
          if (data.code == 0) {
            this.regStatus = data.regStatus
            this.cid = data.obj.cid
            this.codeValue = data.obj.value
            this.a = setInterval(() => {
              this.countdown--
            }, 1000)
          } else {
            this.verifyTips = data.msg
            this.$refs.msg.show(this.verifyTips);
          }
          loading.hide();
        }
      }
    },
    filters: {docAva},
    mixins: [scrollIntoViewMixin],
    components: {
      "VHeader": header,
      verify, Msg
    },
    watch: {
      countdown() {
        if (this.countdown == 0) {
          clearInterval(this.a)
          this.countdown = 60
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';

  .page {
    flex-direction: column;
  }

  .bindPhone {
    padding-top: 50px;
    .verifyCenter {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bindPhoneCenter {
      width: 690rem/$rem;
      margin: 0 auto;
      .bigMiddle {
        bottom: 500rem/$rem;
        font-size: 32rem/$rem;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        .doctorFunc {
          width: 100%;
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
            h4 {
              font-weight: normal;
              margin: 0;
              span.mainTitle {
                margin-left: 60rem/$rem;
                font-size: 32rem/$rem;
                color: #333333;
              }
              span.chief {
                position: relative;
                font-size: 28rem/$rem;
                color: white;
                background-color: $buttonColor;
                display: inline-block;
                width: 58rem/$rem;
                height: 29rem/$rem;
                margin: 0;
                line-height: 31rem/$rem;
                text-align: center;
                left: 12rem/$rem;
              }
              span.empty {
                border: none;
              }
            }
            h6 {
              font-weight: normal;
              font-size: 28rem/$rem;
              color: #999999;
              margin: 0;
            }
            /*background-color: #0BB20C;*/
          }
        }
      }
      .tips {
        margin-top: 13px;
        width: 690rem/$rem;
        text-align: center;
        border: 1px solid #00ced1;
        border-radius: 5px;
        position: relative;
        p {
          width: 650rem/$rem;
          margin: 0 auto;
          text-align: center;
          font-size: 28rem/$rem;
          color: #00ced1;
        }
        p:nth-child(1) {
          padding-top: 25rem/$rem;
        }
        p:nth-child(2) {
          padding-bottom: 25rem/$rem;
        }
        .nav {
          position: absolute;
          left: 50%;
          margin-left: -7px;
          top: -7px;
          overflow: hidden;
          width: 13px;
          height: 13px;
          background: white;
          border-left: 1px solid #00ced1;
          border-top: 1px solid #00ced1;
          transform: rotate(45deg);
        }
      }
      .aboutNumber {
        height: 500rem/$rem;
        .formContent {
          width: 630rem/$rem;
          margin: 0 auto;
          margin-top: 10px;
          .form {
            width: 100%;
            height: 40px;
            line-height: 40px;
            display: flex;
            margin-top: 1px;
            label {
              width: 60px;
              padding-left: 1rem;
              /*<!--background-color: $bgColor2;-->*/
            }
            label.phoneLabel {
              border-top-left-radius: 7px;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                height: 50rem/$rem;
                width: 30rem/$rem;
              }
            }
            label.codeLabel {
              border-bottom-left-radius: 7px;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                height: 45rem/$rem;
                width: 40rem/$rem;
              }
            }
            input {
              flex: 1;
              text-align: left;
              border: none;
              outline: medium;
              font-size: 32rem/$rem;
              color: #999999;
              /*<!--background-color: $bgColor2;-->*/
            }
            input.codeInput {
              border-bottom-right-radius: 7px;
            }
            p {
              flex: 1;
              font-size: 32rem/$rem;
              color: #999999;
              /*<!--background-color: $bgColor2;-->*/
              border-top-right-radius: 7px;
            }
          }
          .phone {
            /*margin-top: 20px;*/
          }
          .verifyCode {
            position: relative;
            height: 109rem/$rem
          }
          .verifyCode span {
            position: absolute;
            display: inline-block;
            top: 30rem/$rem;
            text-align: center;
            right: 0;
            height: 57rem/$rem;
            line-height: 57rem/$rem;
            width: 190rem/$rem;
            font-size: 26rem/$rem;
            border: 1px solid #3Dccc2;
            border-radius: 5px;
            color: #3Dccc2;
          }
        }
        .buttonWrap {
          width: 690rem/$rem;
          height: 90rem/$rem;
          margin-top: 69rem/$rem;
          text-align: center;
        }
        button.bottom {
          width: 650rem/$rem;
          height: 90rem/$rem;
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
