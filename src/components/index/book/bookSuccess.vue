<template>
  <transition name="slide">
    <div class="container">
      <v-header :title="title" :rightTitle="rightTitle"></v-header>
      <div class="page">
        <div class="weui-msg">
          <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
          <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">预约成功</h2>
            <p class="weui-msg__desc">您的取号密码</p>
            <p class="numberCode" v-if="orderInfo.numPasswordZ2">{{ orderInfo.numPasswordZ2 }}</p>
            <p class="numberCode" v-else>{{ orderInfo.numPassword }}</p>
            <p class="seeMore">您可以前往个人中心查看预约记录</p>
          </div>
          <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
              <a href="javascript:;" class="weui-btn weui-btn_default" @click="goMyBookNumber()">查看预约记录</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import header from '../../../base/header'
  export default{
    data(){
      return{
        title:"预约成功",
        rightTitle:"",
        orderInfo:"",
        orderInfoString:""
      }
    },
    created(){
        this.orderInfoString = this.$route.query.orderInfo
         this.orderInfo = JSON.parse(this.$route.query.orderInfo)
    },
    methods:{
      goMyBookNumber(){
        this.$router.push({
          path:'/myBookNumber',
          query:{orderInfo:this.orderInfoString}
        })
      }
    },
    components:{
      "VHeader":header
    }
  }

</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
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
      p.numberCode{
        font-size: 40rem/$rem;
        font-weight: bold;
        margin-top:20rem/$rem;
        margin-bottom:20rem/$rem;
      }
      p.seeMore{
        color: #999999;
      }
    }
  }
</style>
