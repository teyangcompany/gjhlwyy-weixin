<template>
    <div>
      <div id="loadingToast">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
          <i class="weui-loading weui-icon_toast"></i>
          <p class="weui-toast__content">数据加载中</p>
        </div>
      </div>
    </div>
</template>
<script>
</script>
<style scoped lang="scss">
  @import '../common/public.scss';
 .weui-loading weui-icon_toast{
   font-size: 32rem/$rem;
 }
.weui-toast__content{
  font-size: 32rem/$rem;
}
</style>
