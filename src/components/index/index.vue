<template>
  <div class="index">
    <!--<v-header :title="title" :rightTitle="rightTitle" :imgSrc="scanImg"></v-header>-->
    <div class="inputArea" ref="inputArea">
      <div class="inputCenter">
        <input type="text" placeholder="搜索医生" ref="input">
      </div>
    </div>
    <div ref="wholeScroll" class="wholeScroll">
      <div>
        <div class="carsoul" v-if="adImg != '' ">
          <carousel>
            <div v-for="item in adImg">
              <a href="">
                <img :src="item.adImgUrl" alt="">
              </a>
            </div>
          </carousel>
        </div>
        <div style="position: fixed">

        </div>
        <div class="wholeArea">
          <div class="mainFun">
              <router-link tag="div" to="/quickConsult" class="leftMain border-1px-right">
                <img src="../../../static/img/全科分诊@2x.png" alt="">
                <span class="allConsultWord">导医分诊</span>
                <span class="assistColor">15分钟极速响应</span>
              </router-link>
              <div class="rightMain">
                 <div>
                   <router-link tag="div" to="/videoIndex" class="topVideo border-1px">
                     <img src="../../../static/img/index/名医.png" alt="">
                     <div>
                       <p>名医视频</p>
                       <p class="assistColor">名医专家和您面对面</p>
                     </div>
                   </router-link>
                   <router-link taf="div" to="/internetRoom" class="bottomOnline">
                     <img src="../../../static/img/在线医生@2x.png" alt="">
                     <div>
                       <p>在线医生</p>
                       <p class="assistColor">浙二医生为您在线问诊</p>
                     </div>
                   </router-link>
                 </div>
              </div>
          </div>
          <div class="blankLine">

          </div>
          <div class="three">
            <router-link tag="div" to="/bookTerms" class="eyeSick border-1px-right">
              <img src="../../../static/img/预约挂号.png" alt="">
              <span>预约挂号</span>
            </router-link>
            <router-link tag="div" to="/checkReport" class="eyeOut border-1px-right">
              <img src="../../../static/img/检查报告.png" alt="">
              <span>查报告单</span>
            </router-link>
            <router-link tag="div" to="/waitCallNumber" class="repeatSee" @click="repeat">
              <img src="../../../static/img/排队叫号.png" alt="">
              <span>排队叫号</span>
            </router-link>
          </div>
          <div class="blankLine">

          </div>
          <div class="doctorKnow border-1px">
            <div class="left30">
              <span>健康资讯</span>
              <span class="doctorMore" @click="goHealthMore()"><span>更多 </span><img src="../../../static/img/left-arrow.png" alt=""> </span>
            </div>
          </div>
        </div>
        <router-link tag="div" :to="{path:'/healthInfoDetail',query:{newId:item.newId,title:item.title}}" class="healthList border-1px" v-for="item in healthList" :key="item.id">
           <div>
             <div>
               <img :src="item.imgUrl" alt="">
             </div>
             <div>
                 <p>{{ item.title }}</p>
                 <p>{{ item.content }}</p>
             </div>
           </div>
        </router-link>
      </div>
    </div>
    <div class="alertArea" v-if="showAlert">
      <div>
        <alert :alertTitle="alertTitle" :alertMsg="alertMsg" @on-set="close"></alert>
      </div>
    </div>
    <!--<div class="footer">-->
    <!--<router-link tag="div" :to="item.tabLink" v-for="item in tagNames" :key="item.id" :class="tellPath == '/myDoctorChat/followDoctor'? 'followBlue':''">-->
    <!--<img v-if="tellPath == '/patientIndex'" :src="item.imgLinkIndexOn">-->
    <!--<img v-else-if="tellPath == '/myDoctorChat/recentChat'" :src="item.imgLinkOn">-->
    <!--<img v-else-if="tellPath == '/myDoctorChat/followDoctor'" :src="item.imgLinkOn">-->
    <!--<img v-else-if="tellPath == '/patientIndex/my'" :src="item.imgLinkMyOn">-->
    <!--<span >{{item.title}}</span>-->
    <!--</router-link>-->
    <!--</div>-->
    <input type="text" placeholder="iofdahgdwsg" >
  </div>
</template>
<script >
  import header from '../../base/header'
  import Carousel from '../../base/carousel'
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
//  import { formDateMinute,formatDate } from '../utils/formatTimeStamp.js'
  export default{
    data(){
      return{
        title:"首页",
        rightTitle:"",
        adImg:[],
        knowDetail:{},
        playTime:[],
        time:[],
        clickTime:[],
        a:0,
        temp:'',
        scanImg:"../../static/img/扫一扫.png",
        clickLikes:0,
        showAlert:false,
        alertTitle:"温馨提示",
        alertMsg:"请勿重复点赞哦",
        tellPath:"",
        healthList:"",
        adList:""
      }
    },
    mounted(){

    },
    created(){
      api("nethos.system.app.pat.index",{
      }).then((data)=>{
        console.log(data)
        this.adImg = data.obj.sysAdSettingList
        this.healthList = data.obj.sysInformationList
        console.log(this.healthList,33333)
      })
    },
    methods:{
      appoint(){
        this.$router.push("/book/");
      },
      askDoc(){
        console.log("ask doc");
        this.$router.push("/Consult/")
      },
      goHealthMore(){
         this.$router.push('/myProfile/healthIndex/beautify')
      },
      repeat(){
        console.log("12234132")
        this.$router.push({
          name:"addList"
        })
      },
      _initKnowScroll(){
        this.knowScroll = new BScroll(this.$refs.wholeScroll,{
          click:true,
          probeType:3
        })
        this.knowScroll.on('scroll', (pos) => {
          if(pos.y>-40){
            this.$refs.inputArea.style.backgroundColor = ''
            this.$refs.inputArea.style.opacity = 1
            this.$refs.input.style.opacity = 0.7
          }else if(pos.y>-80 && pos.y<-40){
            this.$refs.inputArea.style.opacity = 0.2
            this.$refs.input.style.opacity = 0.7
          }else if(pos.y>-120 && pos.y<-80){
            this.$refs.inputArea.style.backgroundColor = '#30CFD0'
            this.$refs.inputArea.style.opacity = 0.4
            this.$refs.input.style.opacity = 0.7
          }else if(pos.y>-160 && pos.y<-120){
            this.$refs.inputArea.style.backgroundColor = '#30CFD0'
            this.$refs.inputArea.style.opacity = 0.6
            this.$refs.input.style.opacity = 1
          }else if(pos.y>-200 && pos.y<-160){
            this.$refs.inputArea.style.backgroundColor = '#30CFD0'
            this.$refs.inputArea.style.opacity = 0.8
            this.$refs.input.style.opacity = 1
          }else if(pos.y<-200){
            this.$refs.inputArea.style.backgroundColor = '#30CFD0'
            this.$refs.inputArea.style.opacity = 1
            this.$refs.input.style.opacity = 1
          }
        })
      },
      close(){
        this.showAlert = false
      }
    },
    components:{
      "VHeader":header,
      Carousel,
    },
    watch:{
      knowDetail(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initKnowScroll()
          },20)
          let that = this
          for(var i =0;i<this.$refs.playaudio.length;i++){
            this.$refs.playaudio[i].addEventListener('loadedmetadata',function(){
              that.playTime.push(formDateMinute(new Date(this.duration)))
            })
          }
        })
      },
      healthList(){
        this.$nextTick(()=>{
          this.tellPath = this.$route.path
          this._initKnowScroll()
        })
      },
      "$route":function(){
        this.tellPath = this.$route.path
      }
    }
  }
</script>
<style scoped lang="scss">
 @import '../../common/public.scss';
 .index{
   position: fixed;
   top:0;
   left:0;
   right:0;
   bottom:98rem/$rem;
   .inputArea{
     width:100%;
     position: fixed;
     height: 50px;
     top:0px;
     line-height: 50px;
     /*background-color: #E6434;*/
     z-index:1000;
     .inputCenter{
       width:690rem/$rem;
       margin: 0 auto;
       text-align: center;
       input{
         border-radius: 20px;
         height: 50rem/$rem;
         width:690rem/$rem;
         border:none;
         outline:medium;
         opacity: 0.7;
         text-align: center;
         font-size: 32rem/$rem;
         color: white!important;
         display: flex;
         align-items: center;
         margin-top: 25rem/$rem;
       }
     }
   }
 }
  .bottemFooter{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2.5rem;
  }
  .wholeScroll{
    width:100%;
    position: fixed;
    top: 0px;
    bottom: 98rem/$rem;
    left:0;
    right:0;
    /*z-index:201;*/
    overflow: hidden;
    background-color: white;
    >div{
      .carsoul{
        width:100%;
        overflow: hidden;
        height:340rem/$rem;
        /*position: absolute;*/
        /*top: 0;*/
        /*margin-top: 50px;*/
        /*background-color: #3CC51F;*/
      }
      .wholeArea{
        width:100%;
        /*position: absolute;*/
        /*background-color: white;*/
        /*<!--margin-top: 212rem/$rem;-->*/
        .mainFun{
            display: flex;
            align-items: center;
            height:320rem/$rem;
            .leftMain{
              height:320rem/$rem;
              width: 280rem/$rem;
              flex:0 0 auto;
              display: flex;
              flex-direction: column;
              /*justify-content: center;*/
              align-items: center;
              img{
                height:93rem/$rem;
                width: 92rem/$rem;
                margin-top: 60rem/$rem;
                margin-bottom: 30rem/$rem;
              }
              span{
                font-size: 32rem/$rem;
                color: #333333;
              }
              span.allConsultWord{
                /*<!--margin-bottom: 20rem/$rem;-->*/
              }
            }
            .rightMain{
              height:320rem/$rem;
              width:470rem/$rem;
              flex:0 0 auto;
              margin:0;
              padding:0;
              display: flex;
              align-items: center;
              .topVideo{
                img{
                  height:90rem/$rem;
                  width:60rem/$rem;
                  margin-left: 43rem/$rem;
                  margin-right: 35rem/$rem;
                }
              }
              .bottomOnline{
                img{
                  width:57rem/$rem;
                  height:81rem/$rem;
                  margin-left: 43rem/$rem;
                  margin-right: 35rem/$rem;
                }
              }
              .topVideo,.bottomOnline{
                display:flex;
                height:160rem/$rem;
                width:470rem/$rem;
                justify-content: flex-start;
                align-items: center;
                /*<!--padding-left: 20rem/$rem;-->*/
                >div{
                     /*<!--margin-left: 20rem/$rem;-->*/
                  p{
                    margin:0;
                    padding:0;
                    font-size: 32rem/$rem;
                    font-family: PingFang-SC-Regular;
                    color: #333333;
                  }
                }
              }
              .bottomOnline{
                /*<!--margin-top: 60rem/$rem;-->*/
              }
            }
            /*<!--img{-->*/
              /*<!--width:80rem/$rem;-->*/
              /*<!--height:80rem/$rem;-->*/
            /*<!--}-->*/
        }
        .blankLine{
          width:100%;
          height:20rem/$rem;
          background-color:#F5F5F5 ;
        }
        .three{
          width:100%;
          height:190rem/$rem;
          display: flex;
          .eyeSick{
            display: flex;
            flex:1;
            display: flex;
            flex-direction: column;
            align-items: center;
            /*justify-content: center;*/
            span{
              font-size: 32rem/$rem;
              color: #333333;
              font-family: PingFang-SC-Regular;
            }
            img{
              width:78rem/$rem;
              height: 78rem/$rem;
              margin-top:30rem/$rem ;
              margin-bottom: 20rem/$rem;
            }
          }
          .eyeOut{
            display: flex;
            flex:1;
            display: flex;
            flex-direction: column;
            align-items: center;
            /*justify-content: center;*/
            span{
              font-size: 32rem/$rem;
              color: #333333;
              font-family: PingFang-SC-Regular;
            }
            img{
              width:78rem/$rem;
              height: 75rem/$rem;
              margin-top:30rem/$rem ;
              margin-bottom: 20rem/$rem;
            }
          }
          .repeatSee{
            display: flex;
            flex:1;
            display: flex;
            flex-direction: column;
            align-items: center;
            /*justify-content: center;*/
            span{
              font-size: 32rem/$rem;
              color: #333333;
              font-family: PingFang-SC-Regular;
            }
            img{
              width:68rem/$rem;
              height: 76rem/$rem;
              margin-top:30rem/$rem ;
              margin-bottom: 20rem/$rem;
            }
          }
        }
        .doctorKnow{
          width:100%;
          height:88rem/$rem;
          display: flex;
          align-items: center;
          .left30{
            /*background-color: #E64340;*/
            width:690rem/$rem;
            height:50rem/$rem;
            margin:0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
              font-size:32rem/$rem;
              color: rgb(51,51,51);
              font-family: PingFang-SC-Regular;
            }
            span.doctorMore{
              font-size: 24rem/$rem;
              color: rgb(102,102,102);
              height:50rem/$rem;
              font-family: PingFang-SC-Regular;
              display: flex;
              align-items: center;
              span{
                font-size: 24rem/$rem;
                color: rgb(102,102,102);
                margin-right: 5px;
                /*<!--margin-top: 10rem/$rem;-->*/
              }
              img{
                width:11rem/$rem;
                height:22rem/$rem;
              }
            }
          }
        }
      }
      .healthList{
        width:100%;
        >div{
          width: 690rem/$rem;
          height: 180rem/$rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          >div{
            height:135rem/$rem;
            img{
              width:180rem/$rem;
              height:135rem/$rem;
              margin-right: 32rem/$rem;
            }
            p:nth-child(1){
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              font-size: 32rem/$rem;
              font-family: PingFang-SC-Regular;
              color: #333333;
              line-height: 46rem/$rem;
            }
            p:nth-child(2){
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              font-size: 28rem/$rem;
              color: #999999;
              line-height: 46rem/$rem;
            }
          }
        }
      }
    }
    .assistColor{
      color: #999999!important;
      font-size: 28rem/$rem;
    }
  }

  .alertArea{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:300;
    /*background-color: #3CC51F;*/
  }
  .footer{
    width:100%;
    height:98rem/$rem;
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    display: flex;
    .router-link-exact-active{
      span{
        font-size:22rem/$rem;
        color: #0fbdff;
        font-family: PingFangSC;
      }

    }
    >div{
      flex:1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 10rem/$rem;
      img{
        width:50rem/$rem;
        height:50rem/$rem;
      }
      span{
        font-size:22rem/$rem;
        color: #999999;
        font-family: PingFangSC;
      }
    }
    >div.followBlue:nth-child(2){
      span{
        font-size:22rem/$rem;
        color: #0fbdff;
        font-family: PingFangSC;
      }
    }

    /*background-color: #3CC51F;*/
  }
</style>
