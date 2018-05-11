<template>
  <div class="page flex">
    <app-header v-show="user" title="完善信息" class="flex0">
      <i class="back" slot="back"></i>
    </app-header>
    <div class="main flex1 overflow-touch">
      <validate-phone service="nethos.system.captcha.pat.info.perfect"></validate-phone>
    </div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import {isBindMixin} from "../../lib/mixin";
  import {getENV} from "../../lib/util";
  import SendCode from '../../plugins/send-code'
  import ValidatePhone from '../../plugins/account/phone'

  export default {
    data() {
      return {
        readonly: false,
        form: {},
        user: false
      }
    },
    computed: {},
    components: {SendCode, ValidatePhone},
    mixins: [isBindMixin],
    async created() {
      let user = await this._isBind();
      if (user) {
        this.user = user;
        this.readonly = true;
      }
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      sendOk(data) {
        if (data.value && getENV().plat == 'dev') this.$set(this.form, "captcha", data.value);
        this.$set(this.form, "cid", data.cid);
      },
      error(data) {
        this.$refs.msg.show(data);
      },
      async sub() {
        let {query} = this.$route;
        let service = 'nethos.pat.info.perfect.anonym';
        if (this.user) {
          this.form.patId = this.user.patId;
          service = 'nethos.pat.info.modify';
        }

        if (!this.form.patIdcard) {
          this.error('身份证不能为空');
          return false
        }


        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http(service, this.form);
        loading.hide();
        if (ret.code == 0) {
          if (query.back) this.$router.replace(query.back);
          else this.$router.replace('/Profile');
        } else {
          this.error(ret.msg || "接口错误" + ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../common/public';

  .page {
    flex-direction: column;
  }

</style>
