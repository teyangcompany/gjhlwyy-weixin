<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="patientInfo">
      <div>
        <div class="weui-cells wholeWeUi">
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p>姓名</p>
            </div>
            <div class="weui-cell__ft specialWord">马建军</div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p>性别</p>
            </div>
            <div class="weui-cell__ft specialWord">男</div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p>年龄</p>
            </div>
            <div class="weui-cell__ft specialWord">28</div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p>身份证号</p>
            </div>
            <div class="weui-cell__ft specialWord">4232435243544432532</div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p>手机号</p>
            </div>
            <div class="weui-cell__ft specialWord">1342413454356436</div>
          </a>
        </div>
        <span @click="goUsual()">切换就诊人</span>
      </div>
      <router-link tag="div" to="/videoSubmit" class="nextStep" >
        <div>
          <button>下一步</button>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import header from '../../../base/header'
  export default{
    data(){
      return{
        title:"填写就诊资料",
        rightTitle:"",
      }
    },
    mounted(){
      this.path = this.$route.path
    },
    methods:{
      goUsual(){
        this.$router.push('/usualPatient')
      }
    },
    components:{
      "VHeader":header
    },

  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .patientInfo{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
    >div{
      width:690rem/$rem;
      margin: 0 auto;
      .wholeWeUi{
        background-color: $bgColor2;
        border-radius: 7px;
        p{
          font-size: 32rem/$rem;
          color: #333333;
        }
        .specialWord{
          font-size: 32rem/$rem;
          color: #999999;
        }
      }
      span{
        font-size: 32rem/$rem;
        color: $mainColor;
      }
    }
    .nextStep{
      position: fixed;
      bottom:50rem/$rem;
      width:100%;
      >div{
        width:690rem/$rem;
        margin:0 auto;
        height:80rem/$rem;
      }
      button{
        width:690rem/$rem;
        height:80rem/$rem;
        border:none;
        outline: medium;
        background-color: $buttonColor;
        border-radius: 10px;
        font-size: 32rem/$rem;
        color: white;
      }
    }
  }
</style>
