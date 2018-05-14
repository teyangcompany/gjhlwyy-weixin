<template>
  <div class="validate-phone">
    <div class="center p">
      <img src="../../../static/img/填写手机号.png" alt="">
      <div class="fs18 center color_333">请填写您的真实身份证号</div>
    </div>
    <p class="fs12 color_999">身份证号涉及预约挂号、院内数据查询等多项业务，请务必填写本人真实身份证</p>
    <div class="aboutNumber">
      <div class="formContent">
        <div class="form phone border-1px">
          <label for="" class="phoneLabel"> <img class="icon-phone" style="height: 20px"
                                                 src="../../../static/img/身份证.png" alt=""> </label>
          <input type="number" v-model="form.patIdcard" placeholder="填写您的身份证" class="numberInput">
        </div>
      </div>
    </div>
    <div class="sub center mt" @click="sub">确定</div>
    <msg ref="msg"></msg>
  </div>
</template>
<script>
  import Validater from '../../lib/validate'

  export default {
    props: {
      user: [Object, Boolean],
      form: Object
    },
    data() {
      return {};
    },
    computed: {},
    components: {},
    mixins: [],
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async sub() {
        let {form} = this;
        let validater = new Validater();
        validater.add(form.patIdcard, [
          ['need', "身份证不能为空"],
          ['isIdCard', '身份证格式错误']
        ])
        let error = validater.start();
        if (error) {
          this.$refs.msg.show(error);
          return false;
        }
        let loading = this.$weuijs.loading("加载中...");
        let service = "nethos.pat.info.perfect.anonym";
        if (this.user) {
          form.patId = this.user.patId;
          service = 'nethos.pat.info.modify';
        }
        let ret = await this.$http(service, form);
        loading.hide();
        if (ret.code == 0) {
          this.$weuijs.toast('操作成功');
        } else {
          this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
        }
      }
    }
  }

</script>

<style scoped lang="scss">
  @import "../../common/public";

  .mt {
    margin-top: 10px;
  }

  .pr {
    padding-right: $commonSpace;
  }

  p {
    line-height: 1.2;
    padding: $commonSpace;
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

  .sub {
    border-radius: 10px;
    @extend %a;
  }
</style>
