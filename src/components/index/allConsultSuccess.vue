<template>
  <transition name="slide">
    <div class="container">
       <v-header :title="title" :rightTitle="rightTitle"></v-header>
      <div class="page">
        <div class="weui-msg">
          <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
          <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">提交成功</h2>
            <p class="weui-msg__desc">您的问诊已经提交，我们会尽快回答您的问题</p>
          </div>
          <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
              <a href="javascript:;" class="weui-btn weui-btn_primary" @click="goDoctorList()">查看申请记录</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import header from '../../base/header'
  export default{
     data(){
        return{
          consultId:"",
          title:"提交成功",
          rightTitle:""
        }
     },
    methods:{
      goDoctorList(){
        this.$router.replace({
          path:'/waitArrange',
          query:{consultId:this.consultId}
        })
      }
    },
    mounted(){
        this.consultId = this.$route.query.consultId
    },
    components:{
        "VHeader":header
    }
  }

</script>
<style scoped lang="scss">
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform:  translate3d(100%,0,0);
  }
  .container{
    position: absolute;
    width:100%;
    height:100%;
    bottom:0;
    top:0;
    background-color:rgb(249,249,249);
    z-index: 200;
    .page{
      margin-top: 50px;
    }
  }
</style>
