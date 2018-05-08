<template>
  <div class="page">
    <div class="bindPhoneCenter">
      <div class="bigMiddle">
        <div class="doctorFunc">
          <div class="doctorImg">
            <img :src="docInfo|docAva" alt="">
          </div>
          <div class="doctorIntro">
            <h4><span class="mainTitle">{{ docInfo.docName }}</span><span class="chief"
                                                                          v-if="docInfo.docFamousConsultStatus == true">名医</span><span
              v-else>&nbsp;&nbsp;</span></h4>
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
            <input type="text" placeholder="请输入您的身份证号(选填)" class="numberInput" v-model="idCard">
          </div>
          <!--<div class="form verifyCode border-1px">
            <label for="" class="codeLabel"> <img src="../../../static/img/密码.png" alt=""> </label>
            <input type="password" placeholder="8-20位大小写字母+数字" class="codeInput" v-model="passWord">
          </div>-->
          <div class="form verifyCode border-1px" v-if="activityStatus">
            <label for="" class="codeLabel"> <img src="../../../static/img/密码.png" alt=""> </label>
            <input type="text" placeholder="如有人推荐可输入邀请码" class="codeInput" v-model="inviteCode">
          </div>
        </div>
        <div class="buttonWrap">
          <button class="bottom" @touchend="confirmRegister()">确认</button>
        </div>
      </div>
    </div>
    <msg ref="msg"></msg>
  </div>
</template>
<script>
  import Msg from '../../plugins/msg'
  import header from '../../base/header'
  import {openidCache} from '../../lib/cache'
  import verify from '../../base/verify'
  import weuijs from 'weui.js'
  import {scrollIntoViewMixin} from "../../lib/mixin";
  import api from '../../lib/api'
  import docAva from '../../utils/docAva'

  export default {
    data() {
      return {
        activityStatus: false,
        title: "广济互联网医院",
        rightTitle: "",
        backPath: "",
        showVerify: false,
        verifyTips: "姓名不能为空",
        realName: "",
        idCard: "",
        passWord: "",
        inviteCode: "",
        docId: "",
        docInfo: ""
      }
    },
    async created() {
      this.backPath = this.$route.query.backPath
      this.cid = this.$route.query.cid
      this.codeValue = this.$route.query.codeValue
      this.docId = this.$route.query.docId
      await this.getDocInfo();
      await this.getCoupon();
    },
    methods: {
      async getCoupon() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.coupon.activity.details', {
          userScene: 'INVITE_REGISTER'
        });
        if (ret.code == 0) {
          this.activityStatus = ret.obj.activityStatus
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
        loading.hide();
        return
      },
      async getDocInfo() {
        let loading = weuijs.loading("加载中...");
        let data = await api("nethos.doc.card", {
          docId: this.docId
        });
        loading.hide();
        if (data.code == 0) {
          this.docInfo = data.obj.sysDoc
        } else {
          //this.$refs.msg.show(data.msg||"接口错误"+data.code);
        }
      },
      async confirmRegister() {
        if (this.realName == '') {
          this.verifyTips = "姓名不能为空"
          this.$refs.msg.show(this.verifyTips);
          // }else if (this.passWord == '') {
          //   this.verifyTips = "密码不能为空"
          //   this.$refs.msg.show(this.verifyTips);
          // } else if (this.passWord.length < 8) {
          //   this.verifyTips = "密码长度太短"
          //   this.$refs.msg.show(this.verifyTips);
        } else {
          // this.passWord = sha512(hex_md5(this.passWord) + this.passWord);
          let options = {
            captcha: this.codeValue,
            cid: this.cid,
            patName: this.realName,
            patIdcard: this.idCard,
            docId: this.docId,
            openid: openidCache.get()
          }
          if (this.inviteCode) {
            options.inviteCode = this.inviteCode;
          }
          let loading = weuijs.loading("加载中...");
          let data = await api("nethos.pat.register.v3", options)
          loading.hide();
          if (data.code == 0) {
            if (options.inviteCode) {
              this.$router.replace('/coupons/register');
              return
            }
            this.$router.replace({
              path: '/scanLogin',
              query: {backPath: this.backPath, docId: this.docId}
            })
          } else {
            this.passWord = ''
            weuijs.alert(data.msg)
          }
        }
      },
    },
    filters: {docAva},
    mixins: [scrollIntoViewMixin],
    components: {
      "VHeader": header,
      verify, Msg
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';

  .bindPhoneCenter {
    width: 690rem/$rem;
    margin: 0 auto;
    .bigMiddle {
      font-size: 32rem/$rem;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
      .doctorFunc {
        padding-top: 50px;
        padding-bottom: 13px;
        width: 100%;
        background-color: white;
        .doctorImg {
          width: 100%;
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
        padding-top: 15rem/$rem;
        padding-bottom: 15rem/$rem;
      }

      .nav {
        position: absolute;
        top: -8px;
        left: 50%;
        margin-left: -7px;
        overflow: hidden;
        width: 13px;
        height: 13px;
        background: white;
        border-left: 1px solid #00ced1;
        border-top: 1px solid #00ced1;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
    .aboutNumber {
      .formContent {
        width: 690rem/$rem;
        margin: 0 auto;
        margin-top: 10px;
        .form {
          width: 100%;
          height: 2.4rem;
          line-height: 40px;
          display: flex;
          margin-top: 1px;
          label {
            width: 50px;
            font-size: 16px;
            padding-left: 1rem;
            font-size: 32rem/$rem;
            color: #333333;
          }
          label.phoneLabel {
            border-top-left-radius: 7px;
            display: flex;
            align-items: center;
            .nameImg {
              width: 48rem/$rem;
              height: 45rem/$rem;
            }
            .idImg {
              width: 49rem/$rem;
              height: 41rem/$rem;
            }
          }
          label.codeLabel {
            border-bottom-left-radius: 7px;
            display: flex;
            align-items: center;
            img {
              width: 44rem/$rem;
              height: 49rem/$rem;
            }
          }
          input {
            flex: 1;
            border: none;
            outline: medium;
            font-size: 32rem/$rem;
            color: #999999;
          }
          input.codeInput {
            border-bottom-right-radius: 7px;
          }
          p {
            flex: 1;
            font-size: 32rem/$rem;
            color: #999999;
            background-color: $bgColor2;
            border-top-right-radius: 7px;
          }
        }
        .phone {
          /*margin-top: 20px;*/
        }
        .verifyCode {
          position: relative;

        }
        .verifyCode button {
          height: 30px;
          line-height: 30px;
          width: 100px;
          border: none;
          outline: medium;
          border-radius: 7px;
          font-size: 32rem/$rem;
          color: white;
          background-color: $buttonColor;
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

</style>
