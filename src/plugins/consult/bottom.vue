<template>
  <div class="consult-bottom">
    <div class="wait center flex" @click="handler(status)"
         v-if="status=='CANCEL'">
      咨询已取消<br/>如有退款将在7~10个工作日返回您的支付账户
    </div>

    <div class="wait center" @click="handler(status)"
         v-if="status=='GOING' && !consult.replyCount">
      {{consult.consultStatusDescription}}
    </div>


    <div class="rate" v-else-if="status=='NEEDPAY'">
      <ul class="flex">
        <li class="flex0 center" @click="handler('cancel')">取消申请</li>
        <li class="flex0 center" @click="handler(status)">
          支付{{consult.canRefundFee}}元
        </li>
      </ul>
    </div>

    <div class="rate" v-else-if="status=='NEEDCOMMENT'">
      <ul class="flex">
        <li @click="repeat" class="flex0 center">再次咨询</li>
        <router-link tag="li" :to="{path:'/comment',query:{consultId:consult.consultId}}" class="flex0 center">
          评价
        </router-link>
      </ul>
    </div>

    <div class="finish" v-else-if="status=='FINSH'">
      <div @click="repeat" class="flex0 center">再次咨询</div>
    </div>

    <div ref="replay" class="replay flex" v-else>
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
  import {handlerHTML} from "../../lib/util";
  import http from "../../lib/api"
  import weuijs from "weui.js";
  import Uploader from '../../plugins/upload'

  export default {
    props: ['status', 'message', 'consult'],
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
      handlerHTML,
      repeat() {
        if (this.consult.consultType == 'TEAMPIC') {
          this.$router.push({path: '/team/' + this.consult.teamId + '/detail'})
        } else {
          this.$router.push({path: '/onlineDoctorCard', query: {docId: this.consult.docId}})
        }
      },
      handler(type) {
        switch (type) {
          case 'focus':
          case 'blur':
            this.intoView(type);
            break;
          case 'NEEDPAY':
            this.$router.push({
              path: '/videoPay', query: {
                consultId: this.consult.consultId,
                back: "list"
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
          consultId: this.consult.consultId
        };

        if (this.replyContent) {
          params.replyContent = this.replyContent;
        } else {
          params.attaIdList = [data.attaId];
        }


        let ret = await http('nethos.consult.info.reply', params);
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

  .notice {
    left: 0;
    bottom: $h;
    z-index: 2001;
  }

  .consult-bottom {
    height: $h;
    .wait {
      background-color: #f8f8f8;
      font-size: 12px;
      color: #333;
      height: $h;
      justify-content: center;
      align-items: center;
      line-height: 1.2;
    }
    .rate {
      li {
        @include h_lh($h);
        width: 50%;
        font-size: 16px;
      }
      li:nth-child(2) {
        color: white;
        background-color: $mainColor;
      }
    }
    .finish {
      div {
        @include h_lh($h);
        width: 100%;
        font-size: 16px;
      }
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
