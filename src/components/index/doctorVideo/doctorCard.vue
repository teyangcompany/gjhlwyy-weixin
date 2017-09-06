<template>
  <div class="doctor">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="doctorCard" ref="doctorCard">
      <div>
        <div class="doctorFunc ">
          <div class="doctorImg">
            <img :src="aboutDoctor.docAvatar" alt="">
          </div>
          <div class="doctorIntro">
            <h4><span class="mainTitle">{{aboutDoctor.docName}}</span><span class="chief">名医</span></h4>
            <h6>{{aboutDoctor.docDeptName}}&nbsp;&nbsp;&nbsp;{{aboutDoctor.docTitle}}</h6>
            <h6>{{aboutDoctor.docHosName}}</h6>
            <div class="checkRating"> <span>查看评价</span> </div>
          </div>
        </div>
        <div class="institutionDes border-1px">
          <div class="desCenter team">
            <h4>医生擅长</h4>
            <div class="line"></div>
                <h6 v-if="excelAll">{{ aboutDoctor.docSkill }}</h6>
                <p v-else>{{ aboutDoctor.docSkill }}</p>
            <div>
              <div v-if="excelAll" @touchend="excelDownMore()">
                <img src="../../../../static/img/下.png" alt="" >
              </div>
              <div  v-else @touchend="excelClose()">
                <img src="../../../../static/img/上.png" alt="" >
              </div>
            </div>
          </div>
        </div>
        <div class="blank border-1px"></div>
        <div class="institutionDes border-1px">
          <div class="desCenter team">
            <h4>医生介绍</h4>
            <div class="line"></div>
                <h6 v-if="introAll">{{ aboutDoctor.docResume }}</h6>
                <p v-else>{{ aboutDoctor.docResume }}</p>
            <div>
              <div v-if="introAll" @touchend="introDownMore()">
                <img src="../../../../static/img/下.png" alt="" >
              </div>
              <div  v-else @touchend="introClose()">
                <img src="../../../../static/img/上.png" alt="" >
              </div>
            </div>
          </div>
        </div>
        <div class="blank border-1px"></div>
        <div class="institutionDes border-1px">
          <div class="desCenter team">
            <h4>医生文章</h4>
            <div class="line"></div>
                <p class="article" v-for="(item,index) in doctorArticle"><span> {{ item.title }}</span><span> {{ item.readTimes }}次阅读</span><span> {{ articleTime[index] }}</span> </p>
          </div>
        </div>
        <div class="blank border-1px"></div>
        <div class="institutionDes border-1px">
          <div class="desCenter team">
            <h4><span>扫描二维码，关注我</span> </h4>
            <h6>
              <img src="../../../../static/img/qr.png" alt=""></h6>
          </div>
        </div>
      </div>
    </div>
    <div class="aboutTeam border-1px-top">
      <span class="border-1px-right">价格：¥ {{ aboutDoctor.docFamousConsultPrice }}</span>
      <span class="green" @click="goApply()">预约名医</span>
    </div>
  </div>
</template>
<script>
  import header from '../../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../../lib/api'
  import { formatDate } from '../../../utils/formatTimeStamp'
  export default{
    data(){
      return{
        title:"医生名片",
        rightTitle:"",
        excelAll:true,
        introAll:true,
        docId:"",
        aboutDoctor:"",
        doctorIntro:"",
        doctorArticle:"",
        articleTime:[]
      }
    },
    mounted(){
        this.$nextTick(()=>{
            setTimeout(()=>{
              this._initDoctorScroll()
            },100)
        })
    },
    created(){
        this.docId = this.$route.query.docId
       api("nethos.doc.card",{
         token:localStorage.getItem("token"),
         docId:this.docId
       }).then((data)=>{
         this.aboutDoctor = data.obj.sysDoc
         this.doctorIntro = data.obj.sysDocNotice
         this.doctorArticle = data.obj.docArticleList
         for(var i=0;i<this.doctorArticle.length;i++){
           this.articleTime.push(formatDate( new Date(this.doctorArticle[i].createTime)))
         }
            console.log(data)
       })
    },
    methods:{
      _initDoctorScroll(){
        this.doctorScroll = new BScroll(this.$refs.doctorCard,{
          click:true
        })
      },
      excelDownMore(){
        this.excelAll = false
      },
      excelClose(){
        this.excelAll = true
      },
      introDownMore(){
         this.introAll = false
      },
      introClose(){
         this.introAll = true
      },
      goApply(){
        this.$router.push({
          path:'/apply',
          query:{docId:this.docId}
        })
      }
    },
    components:{
      "VHeader":header
    },
    watch:{
      excelAll(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initDoctorScroll()
          },20)
        })
      },
      introAll(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initDoctorScroll()
          },20)
        })
      },
      aboutDoctor(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initDoctorScroll()
          },100)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  @import '../../../common/var.scss';
  @import '../../../common/mixin.scss';
  .doctor{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom: 0;
  }
  .doctorCard{
    position: fixed;
    left:0;
    right:0;
    bottom: 50px;
    top: 50px;
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
          width: 70px;
          height: 70px;
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
            background-color: $assistColorBrown;
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
          color: gray;
          margin:0;
        }
        .checkRating{
          span{
            color: #666666;
            font-size: 28rem/$rem;
          }
        }
        /*background-color: #0BB20C;*/
      }
    }
    .institutionDes{
      .desCenter{
        width: 690rem/$rem;
        margin:0 auto;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .line{
          position: absolute;
          left:0;
          top: 15px;
          width: 3px;
          height: 20px;
          background-color: $assistColorBrown;
        }
        >div{
          width: 50px;
          margin: 0 auto;
          text-align: center;
          img{
            width:24rem/$rem;
            height:16rem/$rem;
          }
        }
        h4,h6{
          margin:0;
          padding:0;
          font-weight: normal;
        }
        h4{
          width:690rem/$rem;
          font-size: 32rem/$rem;
          font-weight: bold;
          color: #333333;
          display: flex;
          span{
            color: #999999;
            font-weight: normal;
            font-size: 28rem/$rem;
            width:690rem/$rem;
            text-align: center;
            margin-bottom: 10px;
          }
        }
        h6{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size:32rem/$rem;
          color: #999999;
          text-align: center;
          img{
            width:120rem/$rem;
          }
        }
        p{
          margin:0;
          padding:0;
          font-weight: normal;
          font-size:32rem/$rem;
          color: #999999;
        }
        p.article{
          display: flex;
          justify-content: space-between;
          span:nth-child(1){
            display: -webkit-box;
            height:40rem/$rem;
            width:200rem/$rem;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          span:nth-child(2){
            display: inline-block;
            flex-basis: 200rem/$rem;
            text-align: center;
          }
        }
      }
      .team{
      }
    }
    .blank{
      width:100%;
      height: 10px;
      background-color: rgb(245,245,245);
    }
    .scanCode{
      width:100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 150px;
        height: 150px;
      }
    }
  }
  .aboutTeam{
    position: fixed;
    bottom:0;
    width:100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: white;
    span{
      flex:1;
      height: 50px;
      display: inline-block;
      line-height: 50px;
      text-align: center;
      font-size: 32rem/$rem;
      color: #333333;
    }
    span.green{
      color: white;
      background-color: $assistColorBrown;
    }
  }
  .ratings{
    color: #FF9900!important;
  }
  .number{
    color: #3399FF!important;
  }
</style>
