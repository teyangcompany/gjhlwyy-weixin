<template>
    <div class="settings">
          <v-header :title="title" :rightTitle="rightTitle"></v-header>
          <div class="settingsArea">
            <div class="weui-cells weuiMargin">
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd">
                  <p>关于我们</p>
                </div>
                <div class="weui-cell__ft"></div>
              </a>
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd">
                  <p>检查新版本</p>
                </div>
                <div class="weui-cell__ft">1.00</div>
              </a>
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd">
                  <p>使用条款</p>
                </div>
                <div class="weui-cell__ft"></div>
              </a>
            </div>
          </div>
    </div>
</template>
<script>
  import header from '../../base/header'
  export default{
      data(){
          return{
            title:"关于",
            rightTitle:""
          }
      },
      components:{
          "VHeader":header
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public';
 .settings{
   position: fixed;
   top:0;
   right:0;
   left:0;
   bottom:0;
   background-color: white;
   .settingsArea{
     position: fixed;
     top: 50px;
     left:0;
     right:0;
     bottom:0;
     .blank{
       width:100%;
       height: 20rem/$rem;
       background-color: rgb(245,245,245);
     }
     .weuiMargin{
       margin:0;
     }
   }
 }
</style>
