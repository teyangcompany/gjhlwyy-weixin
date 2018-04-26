<template>
  <div class="message-item" :class="[message.replierType?message.replierType.toLowerCase():'']">
    <template v-if="message.msgLevel=='SYS'">
      <div class="notice-msg center" v-html="handlerHTML(message.replyContent)"></div>
    </template>
    <template v-else>
      <div class="time center" v-if="message.showTime">{{message.showTime}}</div>
      <div class="container flex">
        <div class="ava flex0" @click="handler(message)">
          <img :src="message|patAva" alt="">
        </div>
        <div class="content flex1">
          <div class="name">{{message.replierName}}</div>
          <div class="msgbox flex">
            <div class="arrow"></div>
            <div class="msg">
              <span v-html="replyContent"></span>
              <ul v-if="message.hasAtta">
                <li v-for="atta in message.attaList">
                  <playing-icon :src="atta.url" ref="playingIcon" class="iconfont fs45 audio block"
                                @click="play(atta.url)"
                                v-if="atta.fileType&&atta.fileType=='AUDIO'">
                  </playing-icon>
                  <img :src="atta.url" @click="scan(atta.url)" v-else>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import PlayingIcon from '../../plugins/playing'
  import {formatTime} from "../../lib/filter";
  import patAva from '../../utils/consultPatAva'
  import {handlerHTML} from "../../lib/util";

  import msgItemHandle from '../../utils/msgItem'

  export default {
    props: ['message'],
    data() {
      return {};
    },
    computed: {
      replyContent() {
        if (this.message.replyContent) {
          return msgItemHandle(this.message);
        } else {
          return ""
        }

      }
    },
    filters: {
      formatTime, patAva
    },
    components: {PlayingIcon},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      handlerHTML,
      handler(data) {
        if (data.replierType == "DOC") {
          this.$router.push({
            path: '/onlineDoctorCard',
            query: {
              docId: data.replierId
            }
          })
        }
      },
      scan(url) {
        this.$emit('scan', url);
      },
      play(url) {
        this.$emit('play', url);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .fs45 {
    font-size: px2rem(45px, 1080);
  }

  .audio {
    width: px2rem(150px);
  }

  .message-item {
    padding: 0 px2rem(15px);
    .time {
      @include h_lh(35px);
    }

    .container {
      .ava {
        padding-top: 15px;
        $w: 35px;
        @include w_h($w, $w);
        img {
          @include w_h($w, $w);
          border-radius: 50%;
        }
      }
      .msgbox {
        align-items: center;
        margin-top: 5px;
      }
      .name {
        font-size: 12px;
      }
      .arrow {
        @include w_h(10px, 10px);
        transform: rotate(45deg);
      }
      .msg {
        max-width: 13rem;
        padding: 10px;
        border-radius: 5px;
        img {
          width: 100px;
        }
      }
    }
    &.pat {
      .container {
        flex-direction: row-reverse;
        .content {
          margin-right: px2rem(10px);
          .name {
            text-align: right;
          }
          .msgbox {
            flex-direction: row-reverse;
            .arrow {
              background-color: $mainColor;
            }
            .msg {
              transform: translateX(px2rem(5px));
              color: white;
              background-color: $mainColor;
            }
          }

        }
      }
    }
    &.doc {
      .container {
        padding-top: px2rem(10px);
        .content {
          margin-left: px2rem(10px);
          .msgbox {
            .arrow {
              background-color: white;
            }
            .msg {
              transform: translateX(px2rem(-5px));
              background-color: white;
            }
          }
        }
      }
    }
  }
</style>
