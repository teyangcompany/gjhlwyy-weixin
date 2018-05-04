<template>
  <div class="bindPhoneCenter flex page">
    <div class="bigMiddle flex0">
      <p>
        <img src="../../../static/img/填写真实信息.png" alt="">
        <span>请填写您的真实信息</span>
      </p>
    </div>
    <div class="aboutNumber flex1">
      <div class="formContent">
        <div class="form phone border-1px">
          <label for="" class="phoneLabel"> <img class="nameImg" src="../../../static/img/姓名.png" alt=""> </label>
          <input type="text" placeholder="请输入您的真实姓名" class="numberInput" v-model="realName">
        </div>
        <div class="form phone border-1px">
          <label for="" class="phoneLabel"> <img class="idImg" src="../../../static/img/身份证.png" alt=""> </label>
          <input type="text" placeholder="请输入您的身份证号，可为空" class="numberInput" v-model="idCard">
        </div>
        <!--<div class="form verifyCode border-1px">
          <label for="" class="codeLabel"> <img src="../../../static/img/密码.png" alt=""> </label>
          <input type="password" placeholder="8-20位大小写字母+数字" class="codeInput" v-model="passWord">
        </div>-->
        <div class="form verifyCode border-1px" v-if="activityStatus">
          <label for="" class="codeLabel"> <img src="../../../static/img/密码.png" alt=""> </label>
          <input type="text" placeholder="请输入邀请码" class="codeInput" v-model="inviteCode">
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
  import api from '../../lib/api'
  import weuijs from 'weui.js'
  import {scrollIntoViewMixin} from "../../lib/mixin";

  export default {
    data() {
      return {
        activityStatus: false,
        title: "广济互联网医院",
        rightTitle: "",
        cid: "",
        codeValue: "",
        realName: "",
        idCard: "",
        passWord: "",
        inviteCode: "",
        backPath: "",
        showVerify: false,
        verifyTips: "姓名不能为空",
      }
    },
    created() {
      this.backPath = this.$route.query.backPath
      this.cid = this.$route.query.cid
      this.codeValue = this.$route.query.codeValue
      this.getCoupon();
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
      async confirmRegister() {
        if (this.realName == '') {
          this.verifyTips = "姓名不能为空"
          this.$refs.msg.show(this.verifyTips);
        // } else if (this.passWord == '') {
        //   this.verifyTips = "密码不能为空"
        //   this.$refs.msg.show(this.verifyTips);
        // } else if (this.passWord.length < 8) {
        //   this.verifyTips = "密码长度太短"
        //   this.$refs.msg.show(this.verifyTips);
        } else {
          //this.passWord = sha512(hex_md5(this.passWord) + this.passWord);
          let options = {
            captcha: this.codeValue,
            cid: this.cid,
            patName: this.realName,
            patIdcard: this.idCard,
            openid: openidCache.get()
          };
          if (this.inviteCode) {
            options.inviteCode = this.inviteCode;
          }
          let loading = weuijs.loading("加载中...");
          let ret = await api("nethos.pat.register.v3", options);
          loading.hide();
          if (ret.code == 0) {
            if (options.inviteCode) {
              this.$router.push('/coupons/register');
              return
            }

            this.$router.replace({
              path: '/login',
              query: {backPath: this.backPath}
            })
          } else {
            this.passWord = ''
            this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
          }
        }
      },
    },
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
    flex-direction: column;
    .bigMiddle {
      width: 690rem/$rem;
      margin: 0 auto;
      padding-top: 50px;
      p {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 321rem/$rem;
          height: 251rem/$rem;
          margin-bottom: 85rem/$rem;
        }
        span {
          font-size: 50rem/$rem;
        }
      }
    }
    .aboutNumber {
      width: 690rem/$rem;
      margin: 0 auto;
      background-color: white;
      .formContent {
        width: 690rem/$rem;
        margin: 0 auto;
        margin-top: 10px;
        .form {
          width: 100%;
          height: 90rem/$rem;
          line-height: 40px;
          display: flex;
          margin-top: 1px;
          label {
            width: 50px;
            font-size: 16px;
            padding-left: 1rem;
            font-size: 32rem/$rem;
            color: #333333;
            /*<!--background-color: $bgColor2;-->*/
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
            /*<!--background-color: $bgColor2;-->*/
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
          position: absolute;
          top: 5px;
          right: 0;
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
