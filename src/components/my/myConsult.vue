<template>
    <div>
         <v-header :title="title" :rightTitle="rightTitle"  @on-internet="goInternet" v-if="path == '/myConsult/online/commented'"></v-header>
        <v-header :title="title" :rightTitle="rightTitle"  @on-internet="goInternet" v-else-if="path == '/myConsult/online/waitPay'"></v-header>
        <v-header :title="title" :rightTitle="rightTitle"  @on-internet="goInternet" v-else-if="path == '/myConsult/online/doing'"></v-header>
        <v-header :title="title" :rightTitle="rightTitle"  @on-internet="goInternet" v-else-if="path == '/myConsult/online/waitComment'"></v-header>
         <v-header :title="title" :rightTitle="rightTitle" @on-profile="goProfile()" v-else></v-header>
         <nav-bar :tagNames="onlineNames1" v-if="path == '/myConsult/online/waitComment'"></nav-bar>
        <nav-bar :tagNames="onlineNames1" v-else-if="path == '/myConsult/online/doing'"></nav-bar>
        <nav-bar :tagNames="onlineNames1" v-else-if="path == '/myConsult/online/waitPay'"></nav-bar>
        <nav-bar :tagNames="onlineNames1" v-else-if="path == '/myConsult/online/commented'"></nav-bar>
        <nav-bar :tagNames="onlineNames" v-else></nav-bar>
         <router-view></router-view>
    </div>
</template>
<script>
  import header from '../../base/header'
  import navBar from '../../base/navBar'
  export default{
      data(){
          return{
              title:"我的咨询",
              rightTitle:"",
              path:"",
              onlineNames:[
                {title1:"全部",tabLink:'/myConsult/commented'},
                {title1:"待付款",tabLink:'/myConsult/waitPay'},
                {title1:"进行中",tabLink:'/myConsult/doing'},
                {title1:"待评价",tabLink:'/myConsult/waitComment'},
              ],
            onlineNames1:[
              {title1:"全部",tabLink:'/myConsult/online/commented'},
              {title1:"待付款",tabLink:'/myConsult/online/waitPay'},
              {title1:"进行中",tabLink:'/myConsult/online/doing'},
              {title1:"待评价",tabLink:'/myConsult/online/waitComment'},
            ],
          }
      },
      methods:{
        goProfile(){
//            this.$router.push('/myProfile')
        },
        goInternet(){
            this.$router.push('/internetRoom')
        }
      },
      mounted(){
        this.path = this.$route.path
        console.log(this.path)
      },
      components:{
          "VHeader":header,
           navBar
      },
      watch:{
        "$route":function(){
          this.path = this.$route.path
        }
      }
  }
</script>
<style>

</style>
