<template>
  <div class="message-item" :class="[message.replierType.toLowerCase()]">
    <div class="time center">{{message.replyTime|formatTime('%Y-%m-%d %H:%M:%S')}}</div>
    <div class="container flex">
      <div class="ava flex0">
        <img :src="message|patAva" alt="">
      </div>
      <div class="content flex1">
        <div class="name">{{message.replierName}}</div>
        <div class="msgbox flex">
          <div class="arrow"></div>
          <div class="msg">
            {{message.replyContent}}
            <ul v-if="message.hasAtta">
              <li v-for="atta in message.attaList">
                <img :src="atta.url">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatTime} from "../../lib/filter";
  import patAva from '../../utils/consultPatAva'

  export default {
    props: ['message'],
    data() {
      return {};
    },
    computed: {},
    filters: {formatTime, patAva},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

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
        img{
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
