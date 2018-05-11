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
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import SendCode from "../send-code";

  export default {
    props: {
      service: String
    },
    data() {
      return {
        form: {
          mobile: ''
        }
      };
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
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

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
</style>
