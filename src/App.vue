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

  #article_detail {
    padding-top: px2rem(15px);
    > span {
      font-size: px2rem(16px);
      padding-bottom: px2rem(15px);
      line-height: 1.5;
    }
    > img {
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

  .bullet-active {
    background-color: $mainColor;
    opacity: 1;
  }
</style>
