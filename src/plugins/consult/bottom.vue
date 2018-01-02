<template>
  <div class="consult-bottom">
    <div class="wait center" v-if="(status=='GOING'||status=='CANCEL') && consult.consultStatusDescription">
      {{consult.consultStatusDescription}}
    </div>
    <div ref="replay" class="replay flex" v-else>
      <div class="input flex1">
        <input @focus="handler('focus')" @blur="handler('blur')" type="text" v-model="replyContent">
      </div>
      <div class="btn flex0">
        <a v-if="!replyContent" class="upload center">+</a>
        <a @click="send" class="sendmsg" v-else>发送</a>
      </div>
    </div>
  </div>
</template>
<script>
  import http from "../../lib/api"
  import weuijs from "weui.js";

  export default {
    props: ['status', 'message', 'consult'],
    data() {
      return {
        replyContent: ''
      };
    },
    computed: {},
    components: {},
    created() {
      this.scrollTo = null;
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      handler(type) {
        switch (type) {
          case 'focus':
          case 'blur':
            this.intoView(type);
            break;
        }
      },
      intoView(type) {
        let replyEl = this.$refs.reply;
        switch (type) {
          case 'focus':
            replyEl && replyEl.scrollIntoViewIfNeed();
            this.scrollTo = setInterval((res) => {
              this.intoView(type);
            }, 200)
            break;
          case 'blur':
            clearInterval(this.scrollTo);
            this.scrollTo = null;
            break;
        }
      },
      async send() {
        let loading = weuijs.loading("加载中...");
        let ret = await http('nethos.consult.info.reply', {
          consultId: this.consult.consultId,
          replyContent: this.replyContent
        });
        if (ret.code == 0) {
          this.replyContent = "";
          this.$emit('sendok', ret);
        } else {

        }
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  $h: 50px;
  .consult-bottom {
    height: $h;
    .wait {
      line-height: $h;
      background-color: #f8f8f8;
      font-size: 12px;
      color: #333;
    }
    .replay {
      height: $h;
      align-items: center;
      .btn {
        padding-right: 10px;
        .upload {
          display: block;
          @include w_h(30px, 30px);
          line-height: 30px;
          border: 1px solid #333;
          border-radius: 15px;
          color: #333;
          font-size: 16px;
        }
        .sendmsg {
          color: white;
          background-color: $mainColor;
          display: block;
          @include h_lh(30px);
          padding: 0 10px;
        }
      }
      .input {
        padding: 10px;
        input {
          width: 100%;
          height: 30px;
          background-color: #f8f8f8;
          border-radius: 5px;
        }
      }
    }
  }
</style>
