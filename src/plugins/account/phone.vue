<template>
  <div class="validate-phone">
    <div class="center p">
      <img src="../../../static/img/填写手机号.png" alt="">
      <div class="fs18 center color_333">请先填写您的手机号</div>
    </div>
    <div class="aboutNumber">
      <div class="formContent">
        <div class="form phone border-1px">
          <label for="" class="phoneLabel"> <img class="icon-phone" src="../../../static/img/手机号.png" alt=""> </label>
          <input type="number" v-model="form.mobile" placeholder="请输入手机号" class="numberInput">
        </div>
        <div class="form verifyCode border-1px pr">
          <label for="" class="codeLabel"> <img src="../../../static/img/验证码.png" alt=""> </label>
          <input type="number" v-model="form.captcha" placeholder="请输入验证码" class="codeInput">
          <send-code @ok="ok" :mobile="form.mobile" :service="service" @error="error"></send-code>
        </div>
      </div>
    </div>
    <div class="sub center mt" @click="sub">这是我的手机号</div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import SendCode from "../send-code";

  export default {
    props: {
      service: String,
      form: {}
    },
    data() {
      return {};
    },
    computed: {},
    components: {SendCode},
    mixins: [],
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      ok(data) {
        if (data.cid) this.$set(this.form, 'cid', data.cid);
      },
      error(msg) {
        this.$refs.msg.show(msg);
      },
      async sub() {
        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http('nethos.system.captcha.checkcaptcha.v2', this.form);
        loading.hide();
        if (ret.code == 0) {
          this.$emit("ok", this.form);
        } else {
          this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
          process.env.NODE_ENV === "development" && this.$emit("ok", this.form);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .mt {
    margin-top: 10px;
  }

  .pr {
    padding-right: $commonSpace;
  }

  .p {
    padding-top: 2.5rem;
    img {
      width: 8.5rem;
      height: 6.5rem;
    }
    .fs18 {
      margin-top: 2.7rem;
      font-size: 1.3rem;
    }
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

  .sub {
    border-radius: 10px;
    @extend %a;
  }
</style>
