<template>
  <div class="doctor">
      <img  @click="back()" class="previous" src="../../../../static/img/返回.png" alt="">
      <span @click="follow" class="follow" v-if="isFollow"><img src="../../../../static/img/爱心2.png" alt="">关注</span>
      <span @click="follow" class="follow" v-else><img src="../../../../static/img/爱心1.png" alt="">关注</span>
    <v-header ref="topHeader" :title="title" :rightTitle="rightTitle" ></v-header>
    <div class="doctorCard" ref="doctorCard">
      <div>
        <div class="doctorFunc">
          <div class="doctorImg">
            <img :src="aboutDoctor.docAvatar" alt="">
          </div>
          <div class="doctorIntro">
            <h4><span class="mainTitle">{{aboutDoctor.docName}}</span><span class="chief">名医</span></h4>
            <h6>{{aboutDoctor.docDeptName}}&nbsp; {{aboutDoctor.docTitle}}</h6>
            <h6>{{aboutDoctor.docHosName}}</h6>
            <div class="checkRating"> <span>查看评价</span> </div>
          </div>
        </div>
        <div class="sortFunc">
          <div v-if="!(aboutDoctor.docBookId)" class="bookNumber" @click="goBookNum()">
            <img src="../../../../static/img/index/预约1.png" alt="">
            <p class="grayBookNumber">预约挂号</p>
          </div>
          <router-link tag="div" v-else :to="{path:'/famousPage',query:{bookDocId:aboutDoctor.docBookId}}" class="bookNumber" @click="goBookNum()">
            <img src="../../../../static/img/index/预约.png" alt="">
            <p class="bookWord">预约挂号</p>
          </router-link>
          <router-link tag="div" :to="{path:'/pictureConsultApply',query:{docId:this.doctorId}}" class="pictureConsult">
            <img src="../../../../static/img/index/图文.png" alt="">
            <p>图文咨询</p>
            <span>¥ {{ aboutDoctor.docPicConsultPrice }}</span>
          </router-link>
          <div  class="videoConsult" @click="makeDisplay">
            <img src="../../../../static/img/index/视频问诊.png" alt="">
            <p class="videoWord">视频问诊</p>
            <span class="videoWord">¥ {{ aboutDoctor.docVideoConsultPrice }}</span>
          </div>
        </div>
        <div class="institutionDes border-1px">
          <div class="desCenter team">
            <h4>医生擅长</h4>
            <div class="line"></div>
            <h6 class="good" v-if="excelAll">{{ aboutDoctor.docSkill }}</h6>
            <p class="good" v-else>{{ aboutDoctor.docSkill }}</p>
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
            <h6 class="intro" v-if="introAll">{{ aboutDoctor.docResume }}</h6>
            <p  class="intro" v-else>{{ aboutDoctor.docResume }}</p>
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
              <img :src="aboutDoctor.docQrcodeUrl " alt=""></h6>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-show="dialogDisplay" @on-cancel="cancel()" @on-download="download()"
    :dialogTitle="dialogTitle"
    :dialogMain="dialogMain"
    :dialogLeftFoot="dialogLeftFoot"
    :dialogRightFoot="dialogRightFoot"
    ></v-dialog>
  </div>
</template>
<script>
  import header from '../../../base/header'
  import BScroll from 'better-scroll'
  import Dialog from '../../../base/dialog'
  import api from '../../../lib/api'
  import { formatDate } from '../../../utils/formatTimeStamp'
  export default{
    data(){
      return{
        title:"",
        rightTitle:"",
        dialogTitle:"温馨提示",
        dialogMain:"微信暂不支持该功能，请前往应用商店下载app来和医生视频问诊",
        dialogLeftFoot:"取消",
        dialogRightFoot:"下载app",
        excelAll:true,
        introAll:true,
        dialogDisplay:false,
        doctorId:"",
        aboutDoctor:"",
        doctorIntro:"",
        doctorArticle:"",
        articleTime:[],
        isFollow:false,
      }
    },
    mounted(){
//      this.$nextTick(()=>{
//        setTimeout(()=>{
//          this._initDoctorScroll()
//        },100)
//      })

    },
    created(){
         this.doctorId = this.$route.query.docId
         api("nethos.doc.card",{
           docId:this.doctorId
         }).then((data)=>{
             console.log(data)
             this.aboutDoctor = data.obj.sysDoc
             this.doctorIntro = data.obj.sysDocNotice
             this.doctorArticle = data.obj.docArticleList
             for(var i=0;i<this.doctorArticle.length;i++){
               this.articleTime.push(formatDate( new Date(this.doctorArticle[i].createTime)))
             }
         })
         api("nethos.follow.get",{
            token:localStorage.getItem("token"),
           docId:this.doctorId
         }).then((data)=>{
             console.log("123")
             console.log(data)
             if(data.obj.followDocpat){
                 this.isFollow = true
             }
             console.log("456")
         })
    },
    methods:{
      _initDoctorScroll(){
        this.doctorScroll = new BScroll(this.$refs.doctorCard,{
          click:true,
          probeType:3
        })
        this.doctorScroll.on('scroll', (pos) => {
            if(pos.y>-40){
              this.title = ""
              this.$refs.topHeader.$el.style.opacity = 0
            }else if(pos.y>-80 && pos.y<-40){
              this.title = ""
              this.$refs.topHeader.$el.style.opacity = 0.2
            }else if(pos.y>-120 && pos.y<-80){
              this.title = ""
              this.$refs.topHeader.$el.style.opacity = 0.4
            }else if(pos.y>-160 && pos.y<-120){
              this.title = "医生名片"
              this.$refs.topHeader.$el.style.opacity = 0.6
            }else if(pos.y>-200 && pos.y<-160){
              this.title = "医生名片"
              this.$refs.topHeader.$el.style.opacity = 0.8
            }else if(pos.y<-200){
              this.title = "医生名片"
              this.$refs.topHeader.$el.style.opacity = 1
            }
        })
      },
      goBookNum(){

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
        this.$router.push('/apply')
      },
      makeDisplay(){
         this.dialogDisplay = true
      },
      cancel(){
        this.dialogDisplay = false
      },
      download(){
          this.$router.push('/downloadPage')
      },
      back(){
        this.$router.back(-1)
      },
      follow(){
          if(this.isFollow == false){
            api("nethos.follow.dp.add",{
              token:localStorage.getItem("token"),
              docId:this.doctorId
            }).then((data)=>{
              console.log(data)
              if(data.code == 0){
                this.isFollow = true
              }
            })
          }else{
            api("nethos.follow.cancel",{
              token:localStorage.getItem("token"),
              docId:this.doctorId
            }).then((data)=>{
              console.log(data)
              if(data.code == 0){
                this.isFollow = false
              }
            })
          }
      }
    },
    components:{
      "VHeader":header,
       "VDialog":Dialog
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
    /*.gradual{*/
      /*<!--position: relative;-->*/
      /*<!--top:0;-->*/
      /*<!--width:690rem/$rem;-->*/
      /*<!--height: 50px;-->*/
      /*<!--display: flex;-->*/
      /*<!--margin:0 auto;-->*/
      /*<!--z-index: 20;-->*/
      /*<!--justify-content: space-between;-->*/
      /*<!--align-items: center;-->*/
     .follow{
       position: absolute;
       right:30rem/$rem;
       top: 14.5px;
       z-index:20;
       font-size: 32rem/$rem;
       display: flex;
       align-items: center;
       img{
         width:35rem/$rem;
         margin-right: 5px;
       }
     }
      img.previous{
        height: 15px;
        position: absolute;
        left:30rem/$rem;
        top: 17.5px;
        z-index:20;
      }
    /*}*/
  }
  .doctorCard{
    position: fixed;
    left:0;
    right:0;
    bottom: 0px;
    top: 10px;
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
    .sortFunc{
      width:690rem/$rem;
      margin: 0 auto;
      margin-top: 40rem/$rem;
      display: flex;
      justify-content: center;
      >div{
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width:70rem/$rem;
          height:70rem/$rem;
        }
        p{
          margin-top:30rem/$rem;
          font-size: 28rem/$rem;
          color: $mainColor;
        }
        span{
          font-size: 28rem/$rem;
          color: $mainColor;
        }
        p.videoWord{
          color: $assistWordBlue;
        }
        span.videoWord{
          font-size: 28rem/$rem;
          color: $assistWordBlue;
        }
        p.bookWord{
          color: $assistColorPink;
        }
        p.grayBookNumber{
          color: #999999;
        }
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
          position: absolute;
          right:0;
          /*margin: 0 auto;*/
          background-color: #E64340;
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
        h6.good,h6.intro{
          text-align: left;
          width:650rem/$rem;
        }
        p.good,p.intro{
          text-align: left;
          width:650rem/$rem;
        }
        h6{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size:32rem/$rem;
          color: #666666;
          text-align: center;
          img{
            width:200rem/$rem;
          }
        }
        p{
          margin:0;
          padding:0;
          font-weight: normal;
          font-size:32rem/$rem;
          color: #666666;
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
  .ratings{
    color: #FF9900!important;
  }
  .number{
    color: #3399FF!important;
  }
</style>
