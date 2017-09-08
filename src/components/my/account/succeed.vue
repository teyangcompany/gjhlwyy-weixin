<template>
    <div class="page">
      <top>
        <div class="middle big bf">{{msg}}</div>
      </top>
      <div  class="title">
        <div class="page__bd page__bd_spacing">
          <div class="icon-box">
            <i class="weui-icon-success weui-icon_msg"></i>
          </div>
          </div>
        </div>
      <div class="text">
        成功
      </div>
      <div class="btn">
        <a style="background: rgb(48, 207, 208)" href="javascript:;" class="weui-btn weui-btn_primary" @click="login">立即登录</a>
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
            return {
              msg:''
            }
        },
        mounted(){
          this.$set(this.$data,'msg',this.$route.params.msg)
        },
      methods:{
        login(){
          this.$router.push('/')
        }
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
    margin-top: 250rem/$rem;
    text-align: center;
  }
  .text{
    font-size: 36rem/$rem;
    margin-top: 90rem/$rem;
    text-align: center;
  }
  .btn{
    box-sizing: border-box;
    text-align: center;
    margin: 142rem/$rem auto 0 auto;
    width: 670rem/$rem;
  }
  .weui-icon_msg{
    font-size: 280rem/$rem;
  }
  .weui-icon-success{
    color:rgb(48, 207, 208)
  }
</style>
