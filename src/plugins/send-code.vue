<template>
  <div class="flex">
    <span class="fs16" @click="send">{{showText}}</span>
  </div>
</template>

<script>
  import Validater from '../lib/validate'

  const CUTDOWN = 60;
  /**
   *
   * @event ok
   * @event error
   */
  export default {
    props: {
      service: String,
      mobile: String
    },
    data() {
      return {
        cutdown: CUTDOWN
      };
    },
    computed: {
      showText() {
        return this.cutdown == "60" ? "发送验证码" : this.cutdown + "秒后重发"
      }
    },
    components: {},
    mixins: [],
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      doCutdown() {
        this.cutdown--;
        if (this.cutdown > 0) {
          setTimeout(this.doCutdown, 1000);
        } else {
          this.cutdown = CUTDOWN;
        }
      },
      async send() {

        let validater = new Validater();
        validater.add(this.mobile, [
          ['need', '手机号不能为空'],
          ['isPhone', '手机号格式不正确']
        ]);
        let error = validater.start();
        if (error) {
          this.$emit('error', error);
          return false
        }


        if (this.cutdown != CUTDOWN) return;
        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http(this.service, {
          mobile: this.mobile
        });
        if (ret.code == 0) {
          this.$emit('ok', ret.obj);
          this.doCutdown();
        } else {
          this.$emit("error", ret.msg || "接口错误" + ret.code);
        }
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/public";

  div {
    flex: 0 0 auto;
    align-items: center;
    span {
      line-height: 1.2;
      padding: 3px 5px;
      border-radius: 5px;
      border: 1px solid $mainColor;
      color: $mainColor;
    }
  }
</style>
