<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'app',
    mounted() {
      console.log(999999);

//    socket.on("pushevent",function (data) {
//      console.log('收到推送')
//      console.log(data,22222)
//    })
    }
  }
</script>

<style lang="scss">
  @import "./common/public";

  #test-detail {
    .wrap {
      padding: 10px;
      background-color: white;
      h5 {
        padding: 10px 0;
        font-size: 14px;
      }
      p {
        padding: 10px;
        font-size: 12px;
        background-color: $bgColor;
        border-radius: 5px;
        color: #666666;
      }
      .red {
        padding: 0 5px;
        color: red;
      }
    }
  }

  #test-detail2 {
    padding-bottom: 10px;
    .wrap {
      @include lines(6);
      margin: 10px 10px 0;
      background-color: white;
    }
    .red {
      padding: 0 5px;
      color: red;
    }
  }

  #article_detail {
    line-height: 1.5;
    padding-top: px2rem(15px);
    span {
      font-size: px2rem(16px);
      padding-bottom: px2rem(15px);
      display: inline-block;
      line-height: 1.5;
    }
    img {
      margin-bottom: px2rem(15px);
      width: 100%;
    }
  }

  #app, .page {
    /*display: flex;*/
    /*flex-direction: column;*/
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    padding-bottom: constant(safe-area-inset-bottom);
  }

  .notice-msg {
    margin: 0 auto;
    margin-bottom: px2rem(10px);
    border-radius: 5px;
    padding: 2px 4px;
    width: px2rem(345px - 35px*2 - 10px*2);
    font-size: 12px;
    color: white;
    background-color: rgb(204, 204, 204);
    span {
      color: $mainColor;
    }
  }

  .bullet-active {
    background-color: $mainColor;
    opacity: 1;
  }
</style>
