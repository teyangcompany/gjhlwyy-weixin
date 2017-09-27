<template>
  <div>
    <!--<v-header :title="title" :rightTitle="rightTitle"></v-header>-->
    <div class="bindPhone">
      <div class="bindPhoneCenter">
        <div class="bigMiddle">
          <p>
            <img src="../../../static/img/绑定成功.png" alt="">
            <span>绑定成功</span>
          </p>
        </div>
          <div class="aboutNumber">
            <div class="buttonWrap">
              <button class="bottom" @click="login()">继续使用</button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import api from '../../lib/api'
  export default{
    data(){
      return{
        title:"广济互联网医院",
        rightTitle:"",
        password:"",
        backPath:""
      }
    },
    created(){
      console.log(window.history,"路径")
       this.backPath = this.$route.query.backPath
    },
    methods:{
      login(){
//          this.password = sha512(hex_md5('a12345678') + 'a12345678' );
//          api("nethos.pat.login",{
//            patMobile:"17130049182",
//            patPassword:this.password
//          }).then((data)=>{
//              localStorage.setItem("token",data.token)
//              console.log(data)
//          })
        if(this.backPath == '/infoConfirm'){
            this.$router.push('/book')
        }else if(this.backPath == '/pictureConsultNext'){
            this.$router.push('/internetRoom')
        }else if(this.backPath == '/pictureConsultApply'){
          this.$router.push('/internetRoom')
        }else if(this.backPath == '/famousPage'){
          this.$router.push('/book')
        }else if(this.backPath == '/expertDetail'){
          this.$router.push('/book')
        }else if(this.backPath == '/bookType/date'){
          this.$router.push('/book')
        }else if(this.backPath == '/selectType'){
          this.$router.push('/book')
        }else if(this.backPath == '/onlineDoctorCard'){
          this.$router.push('/internetRoom')
        }else if(!(this.backPath)){
          this.$router.push('/Profile')
        }else{
          this.$router.push({
            path:this.backPath
          })
        }
      }
    },
    components:{
      "VHeader":header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .bindPhone{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
    .bindPhoneCenter{
      width:690rem/$rem;
      margin:0 auto;
      .bigMiddle{
        position: fixed;
        top: 280rem/$rem;
        left:0;
        right:0;
        bottom:500rem/$rem;
        font-size: 32rem/$rem;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        p{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img{
            width:321rem/$rem;
            height:247rem/$rem;
            margin-bottom: 85rem/$rem;
          }
          span{
            font-size: 50rem/$rem;
            color: #333333;
            padding-left: -15rem/$rem;
          }
        }
      }
      .aboutNumber{
        position: fixed;
        bottom:0;
        height:500rem/$rem;
        .buttonWrap{
          width:690rem/$rem;
          height:90rem/$rem;
          margin-top: 308rem/$rem;
          text-align: center;
          button.bottom{
            width:650rem/$rem;
            height:90rem/$rem;
            border: none;
            outline: medium;
            border-radius: 22px;
            color: white;
            font-size: 36rem/$rem;
            background-color: $buttonColor;
          }
        }
      }
    }
  }
</style>
