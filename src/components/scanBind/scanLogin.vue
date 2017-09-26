<template>
  <div>
    <!--<v-header :title="title" :rightTitle="rightTitle"></v-header>-->
    <div class="bindPhone">
      <div class="bindPhoneCenter">
        <div class="bigMiddle">
          <div class="doctorFunc">
            <div class="doctorImg">
              <img :src="docInfo.docAvatar" alt="">
            </div>
            <div class="doctorIntro">
              <h4><span class="mainTitle">{{ docInfo.docName }}</span><span class="chief" v-if="docInfo.docFamousConsultStatus == true">名医</span><span v-else>&nbsp;&nbsp;</span> </h4>
              <h6>{{ docInfo.docDeptName}}&nbsp; {{ docInfo.docTitle }}</h6>
              <h6>{{ docInfo.docHosName }}</h6>
            </div>
          </div>
        </div>
        <div class="tips">
          <p>您已经成功关注我</p>
          <p>欢迎在需要的时候向我咨询</p>
          <div class="nav"></div>
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
        backPath:"",
        docId:"",
        docInfo:""
      }
    },
    created(){
      this.backPath = this.$route.query.backPath
      this.docId = this.$route.query.docId
      api("nethos.doc.card",{
        docId:this.docId
      }).then((data)=>{
        this.docInfo = data.obj.sysDoc
        console.log(data)
      })
    },
    methods:{
      login(){
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
          this.$router.push({
            path:'/onlineDoctorCard',
            query:{docId:this.docId}
          })
        }else{
          this.$router.push({
            path:'/onlineDoctorCard',
            query:{docId:this.docId}
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
        top: 50px;
        left:0;
        right:0;
        bottom:500rem/$rem;
        font-size: 32rem/$rem;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        .doctorFunc{
          width:100%;
          height: 210px;
          background-color: white;
          .doctorImg {
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 140rem/$rem;
              height: 140rem/$rem;
              border-radius: 50%;
            }
          }
          .doctorIntro {
            width: 100%;
            height: 70px;
            margin-top: 10px;
            text-align: center;
            h4{
              font-weight: normal;
              margin:0;
              span.mainTitle{
                margin-left: 60rem/$rem;
                font-size: 32rem/$rem;
                color: #333333;
              }
              span.chief{
                position: relative;
                font-size: 28rem/$rem;
                color: white;
                background-color: $buttonColor;
                display: inline-block;
                width:58rem/$rem;
                height: 29rem/$rem;
                margin:0;
                line-height: 31rem/$rem;
                text-align: center;
                left: 12rem/$rem;
              }
              span.empty{
                border:none;
              }
            }
            h6{
              font-weight:normal;
              font-size: 28rem/$rem;
              color: #999999;
              margin:0;
            }
            /*background-color: #0BB20C;*/
          }
        }
      }
      .tips{
        position: absolute;
        top:500rem/$rem;
        width:690rem/$rem;
        text-align: center;
        border:1px solid #00ced1;
        border-radius: 5px;
        p{
          width:650rem/$rem;
          margin: 0 auto;
          text-align: center;
          font-size: 28rem/$rem;
          color: #00ced1;
        }
        p:nth-child(1){
          padding-top: 25rem/$rem;
        }
        p:nth-child(2){
          padding-bottom: 25rem/$rem;
        }
        .nav {
          position   :absolute;
          top    :-8px;
          right    :332rem/$rem;
          overflow   :hidden;
          width    :13px;
          height   :13px;
          background  :white;
          border-left  :1px solid  #00ced1;
          border-top  :1px solid  #00ced1;
          -webkit-transform :rotate(45deg);
          -moz-transform :rotate(45deg);
          -o-transform  :rotate(45deg);
          transform   :rotate(45deg);
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
