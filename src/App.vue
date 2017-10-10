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
  mounted(){
    console.log(999999);

//    socket.on("pushevent",function (data) {
//      console.log('收到推送')
//      console.log(data,22222)
//    })
  }
}
</script>

<style>
  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
