<template>
    <div>
      <div class="js_dialog" id="iosDialog1">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
          <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{ dialogTitle }}</strong></div>
          <div class="weui-dialog__bd">{{ dialogMain }}</div>
          <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="cancel">{{ dialogLeftFoot }}</a>
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="download()">{{ dialogRightFoot }}</a>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default{
      props:{
        dialogTitle:{
            type:String
        },
        dialogMain:{
          type:String
        },
        dialogLeftFoot:{
          type:String
        },
        dialogRightFoot:{
            type:String
        }
      },
      methods:{
        cancel(){
            this.$emit("on-cancel")
        },
        download(){
            this.$emit("on-download")
        }
      }
  }
</script>
<style>

</style>
