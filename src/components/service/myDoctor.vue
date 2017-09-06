<template>
    <div class="myDoctor">
        <div class="myDoctorWrap">
          <v-header :title="title" :rightTitle="rightTitle" v-if="tellPath == '/myDoctor/recentChat'" @on-main="goMain()"></v-header>
          <v-header :title="title" :rightTitle="rightTitle" v-else @on-main="goMain()"></v-header>
          <nav-bar :tagNames="tagNames" v-if="tellPath == '/myDoctor/recentChat'"></nav-bar>
          <nav-bar :tagNames="tagNames" v-else></nav-bar>
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
              tagNames:[
                {title1:"最近消息",tabLink:'/myDoctor/recentChat'},
                {title1:"我的医生",tabLink:'/myDoctor/followDoctor'},
              ],
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
    .myDoctorWrap{
      position: fixed;
      top:0;
      left:0;
      right:0;
      height: 100px;
    }
  }
</style>
