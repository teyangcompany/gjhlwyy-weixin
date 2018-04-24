<template>
  <div class="page flex">
    <app-header title="完善信息" class="flex0">
      <i class="back" slot="back"></i>
    </app-header>
    <div class="main flex1 overflow-touch">
      <div class="aboutNumber flex1">
        <div class="formContent">
          <div class="form phone border-1px">
            <label for="" class="phoneLabel"> <img class="icon-phone" src="../../../static/img/手机号.png" alt=""> </label>
            <input type="number" placeholder="请输入手机号" v-model.trim="user.patMobile" class="numberInput" readonly>
          </div>
          <div class="form verifyCode border-1px" style="padding-right: 15px">
            <label for="" class="codeLabel"> <img src="../../../static/img/验证码.png" alt=""> </label>
            <input type="number" placeholder="请输入验证码" class="codeInput"
                   v-model="form.captcha">
            <send-code service="nethos.system.captcha.pat.info.perfect" @ok="sendOk"
                       :mobile="user.patMobile"></send-code>
          </div>
          <div class="form phone border-1px">
            <label for="" class="phoneLabel"> <img class="idImg" src="../../../static/img/身份证.png" alt=""> </label>
            <input type="text" placeholder="请输入您的身份证号" class="numberInput" v-model="form.patIdcard">
          </div>
          <div class="buttonWrap">
            <button class="bottom" @click="sub">确认</button>
          </div>
        </div>
      </div>
    </div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import {isBindMixin} from "../../lib/mixin";
  import SendCode from '../../plugins/send-code'

  export default {
    data() {
      return {
        form: {},
        user: {}
      }
        ;
    },
    computed: {},
    components: {SendCode},
    mixins: [isBindMixin],
    async created() {
      let user = await this._isBind();
      user && (this.user = user);
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      sendOk(data) {
        if (data.value) this.$set(this.form, "captcha", data.value);
        this.$set(this.form, "cid", data.cid);
      },
      error(data) {
        this.$refs.msg.show(data);
      },
      async sub() {
        let {query} = this.$route;
        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http('nethos.pat.info.perfect.anonym', this.form);
        if (ret.code == 0) {
          if (query.back) this.$router.replace(query.back);
          else this.$router.replace('/Profile');
        } else {
          this.error(ret.msg || "接口错误" + ret.code);
        }
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../common/public';

  .page {
    flex-direction: column;
  }

  .aboutNumber {
    width: 100%;
    .formContent {
      margin-top: 0px;
      width: 100%;
    }
  }

  .icon-phone {
    height: px2rem(25px);
  }
</style>
