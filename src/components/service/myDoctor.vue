<template>
    <div class="myDoctor">
        <div class="navigator border-1px">
             <router-link tag="div" to="/myDoctor/recentChat">最近消息</router-link>
             <router-link tag="div" to="/myDoctor/followDoctor">关注医生</router-link>
        </div>
       <router-view></router-view>
    </div>
</template>
<script>
  import header from '../../base/header'
  import navBar from '../../base/navBar'
  export default{
      data(){
          return{
              title:"我的医生",
              rightTitle:"",
              tellPath:"",
          }
      },
      mounted(){
        this.$nextTick(()=>{
          this.tellPath = this.$route.path
        })
      },
      methods:{
        goMain(){
            this.$router.push('/myProfile/serviceIndex')
        }
      },
      components:{
          "VHeader":header,
           navBar
      },
      watch:{
        "$route":function(){
          this.tellPath = this.$route.path
          console.log(this.tellPath)
        }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .myDoctor{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    /*z-index:1000;*/
    background-color: #ffffff;
    .navigator{
      height: 50px;
      width:100%;
      background-color: #ffffff;
      display: flex;
      z-index:1000;
      >div{
        width:50%;
        height: 50px;
        display: flex;
        font-size: 32rem/$rem;
        color: #333333;
        align-items: center;
        justify-content: center;
      }
      .router-link-exact-active{
        background-color: $bgColor2;
        color: $buttonColor;
        border-bottom:2px solid $buttonColor;
      }
    }
  }
</style>
