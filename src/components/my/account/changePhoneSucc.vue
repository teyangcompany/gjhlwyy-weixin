<template>
    <div class="page">
        <top>
            <div class="middle big bf">修改绑定手机号</div>
        </top>
      <div class="wrap">
        <div class="title">

        </div>
        <div class="text">
          修改成功
        </div>
      </div>
      <div class="btn">
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="goNext">立即登录</a>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../../base/app-header.vue'
    export default{
        components: {
            top
        },
        data(){
            return {}
        },
        mounted(){

        }
    }
</script>
<style scoped lang="scss">
    @import '../../../common/public.scss';
  .page{
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .title{
    margin-top: 160rem/$rem;
    width: 260rem/$rem;
    height: 260rem/$rem;
    background: #ff9999;
  }
  .wrap{
    margin: 0 auto;
  }
  .text{
    width: 100%;
    text-align: center;
    font-size: 36rem/$rem;
    margin: 100rem/$rem 0 160rem/$rem 0;
  }
  .btn{
    box-sizing: border-box;
    text-align: center;
    margin:  0 auto;
    width: 670rem/$rem;
  }
  .weui-btn_primary{
    background: #0aace9;
  }
</style>
