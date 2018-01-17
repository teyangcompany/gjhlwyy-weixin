<template>
  <div class="consult-bottom">
     <div ref="replay" class="replay flex">
      <div class="input flex1">
        <input @focus="handler('focus')" @blur="handler('blur')" type="text" v-model="replyContent">
      </div>
      <div class="btn flex0">
        <a v-if="!replyContent" @click="$refs.uploader.click()" class="upload center">+</a>
        <a @click="send" class="sendmsg" v-else>发送</a>
      </div>
    </div>
    <uploader ref="uploader" @uploaded="uploaded"></uploader>
  </div>
</template>
<script>
  import http from "../../lib/api"
  import weuijs from "weui.js";
  import Uploader from '../../plugins/upload'

  export default {
    props: ['followId'],
    data() {
      return {
        replyContent: ''
      };
    },
    computed: {},
    components: {Uploader},
    created() {
      this.timer = null;
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
          case 'NEEDPAY':
            this.$router.push({
              path: '/videoPay', query: {
                consultId: this.consult.consultId
              }
            })
            break;
          case 'cancel':
            weuijs.confirm('是否确认取消申请？', () => {
              this.cancel();
            })
            break;
        }
      },
      intoView(type) {
        let replyEl = this.$refs.reply;
        switch (type) {
          case 'focus':
            replyEl && replyEl.scrollIntoViewIfNeeded();
            if (this.timer) {
              clearTimeout(this.timer);
              this.timer = null;
            }
            this.timer = setTimeout((res) => {
              this.intoView(type);
            }, 300)
            break;
          case 'blur':
            clearTimeout(this.timer);
            this.timer = null;
            break;
        }
      },
      uploaded(res) {
        if (res.code == 0) {
          this.send(res.obj);
        }
        //this.send(res);
      },
      async send(data) {
        let loading = weuijs.loading("加载中...");

        let params = {
          followId: this.followId
        };

        if (this.replyContent) {
          params.msgText = this.replyContent;
        } else {
          params.attaId = [data.attaId];
        }


        let ret = await http('nethos.follow.message.add', params);
        if (ret.code == 0) {
          this.replyContent = "";
          this.$emit('sendok', ret);
        } else {

        }
        loading.hide();
      },
      async cancel() {
        let loading = weuijs.loading("加载中...");
        let ret = await http('nethos.consult.info.cancel', {
          consultId: this.consult.consultId
        });
        if (ret.code == 0) {
          weuijs.toast('取消成功', {
            callback: () => {
              this.$emit('cancel');
            }
          })
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
