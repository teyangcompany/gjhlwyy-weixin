<template>
    <div>
      <div class="js_dialog" id="iosDialog2">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
          <div class="weui-dialog__bd">
            <p>{{ firstLine }}</p>
            <p>{{ secondLine }}</p>
          </div>
          <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="iKnow">{{ bottomLine }}</a>
          </div>
        </div>
      </div>

    </div>
</template>
<script>
  export default{
      props:{
        firstLine:{
            type:String
        },
        secondLine:{
            type:String
        },
        bottomLine:{
            type:String
        }
      },
      methods:{
        iKnow(){
            this.$emit("on-iKnow")
        }
      }
  }
</script>
<style scoped lang="scss">
  .weui-dialog{
    text-align: left!important;
  }
  .weui-dialog__btn_primary{
    text-align: center;
  }
</style>
