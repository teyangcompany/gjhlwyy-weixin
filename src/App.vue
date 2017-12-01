<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from './lib/api'
  import {tokenCache} from './lib/cache'
  import {openidCache} from "./lib/cache"

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
  @import "common/var";
  @import "common/base";

  #app, .page {
    /*display: flex;*/
    /*flex-direction: column;*/
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .bullet-active {
    background-color: $mainColor;
    opacity: 1;
  }
</style>
