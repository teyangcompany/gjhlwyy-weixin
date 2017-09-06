<template>
  <div class="settings">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="settingsArea">
      <div class="weui-cells weuiMargin">
        <a class="weui-cell weui-cell_access" href="javascript:;" @click="goOldPhone()">
          <div class="weui-cell__hd"></div>
          <div class="weui-cell__bd">
            <p>修改绑定手机号</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <router-link tag="a" to="/oldPass" class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__hd"></div>
          <div class="weui-cell__bd">
            <p>修改密码</p>
          </div>
          <div class="weui-cell__ft"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  export default{
    data(){
      return{
        title:"账户相关",
        rightTitle:""
      }
    },
    methods:{
      goOldPhone(){
        this.$router.push('/oldPhone')
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
        p{
          font-size: 32rem/$rem;
          color: #333333;
        }
      }
    }
  }
</style>
