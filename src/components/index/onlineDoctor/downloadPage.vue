<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="downloadPage">
      <div class="downloadCenter">
        <div class="tips">
          <p v-if="ios == true">点击右上角“<img src="../../../../static/img/u330.png" alt="">在safari中打开”以下载</p>
          <p v-else>点击右上角“<img src="../../../../static/img/u313.png" alt="">在浏览器中打开”以下载</p>
          <div class="nav"></div>
        </div>
        <div class="icon">
          <img src="../../../../static/img/logo.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../../base/header'

  export default {
    data() {
      return {
        title: "下载app",
        rightTitle: "",
        ios: false
      }
    },
    mounted() {
      let UA = window.navigator.userAgent.toLocaleLowerCase();
      if (/iphone/.test(UA)) {
        window.device = "iphone";
      }
      if (/android/.test(UA)) {
        window.device = "android";
      }
      if (window.device == "iphone") {
        this.ios = true
      } else {
        this.ios = false
      }
    },
    components: {
      "VHeader": header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';

  .downloadPage {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    .downloadCenter {
      width: 690rem/$rem;
      margin: 0 auto;
      .tips {
        width: 690rem/$rem;
        height: 100rem/$rem;
        font-size: 32rem/$rem;
        margin-top: 20px;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid $fontColorLow;
        border-radius: 7px;
        animation: move 1.5s infinite;
        p {
          display: flex;
          height: 80rem/$rem;
          align-items: center;
          img {
            width: 50rem/$rem;
            height: 50rem/$rem;
          }
        }
        .nav {
          position: absolute;
          top: -8px;
          right: 30px;
          overflow: hidden;
          width: 13px;
          height: 13px;
          background: white;
          border-left: 1px solid $fontColorLow;
          border-top: 1px solid $fontColorLow;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        @keyframes move {
          @for $i from 0 through 50 {
            @if ($i<=25) {
              #{$i}% {
                transform: translateY($i/5*1px);
              }
            }
            @if ($i<=50 and $i>25) {
              #{$i}% {
                transform: translateY(5px - ($i - 25)/5*1px);
              }
            }
            @if ($i<=75 and $i>50) {
              #{$i}% {
                transform: translateY(($i - 50)/5*1px);
              }
            }
            @if ($i<=100 and $i>75) {
              #{$i}% {
                transform: translateY(5px - ($i - 75)/5*1px);
              }
            }
          }
        }
      }
      .icon {
        width: 690rem/$rem;
        height: 800rem/$rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
