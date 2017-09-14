<template>
  <div class="recentChat">
    <div class="myDoctorList" ref="contactList" v-if="waitLoading == 1 && chatList.length > 0">
      <div>
        <ul v-if="chatList.length != 0" class="border-1px" v-for="(item,index) in chatList">
          <router-link tag="div" to="/chat">
            <li>
              <div class="cancelImg" v-if="item.sysDoc">
                <img :src="item.sysDoc.docAvatar" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="chatDoctor" v-if="item.sysDoc">{{ item.sysDoc.docName }}</span>
                  <!--<div class="badgeDoc">-->
                    <!--<span class="myDoctor">签约</span>-->
                  <!--</div>-->
                  <p v-if="item.followMessage">{{ item.followMessage.msgText}}</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span class="year" v-if="myCreateTime.length != 0">{{ myCreateTime[index] }}</span>
                  <p class="time" v-if="item.unReadCount != 0"><span class="badge">{{ item.unReadCount }}</span></p>
                </div>
              </div>
            </li>
          </router-link>
        </ul>


        <!--<ul  class="border-1px" v-for="item in chatList">-->
        <!--<router-link tag="div" to="/chat">-->
        <!--<li>-->
        <!--<div class="cancelImg">-->
        <!--<img :src=" item.docAvatar " alt="">-->
        <!--</div>-->
        <!--<div class="cancelIntro">-->
        <!--<div>-->
        <!--<span class="chatDoctor">{{ item.docName }}</span> <span class="doctorTitle">{{ item.docTitle }}</span>-->
        <!--<div class="badgeDoc">-->
        <!--<span class="myDoctor">签约</span>-->
        <!--</div>-->
        <!--<p>您的全科分诊已经开始，点击进入</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="cancelTime">-->
        <!--<div >-->
        <!--<span class="year">13:45</span>-->
        <!--<p class="time"><span class="badge">1</span></p>-->
        <!--</div>-->
        <!--</div>-->
        <!--</li>-->
        <!--</router-link>-->
        <!--</ul>-->
      </div>
    </div>
    <div class="myDoctorList" v-else-if="waitLoading == 1 && chatList.length == 0">
      <div class="emptyHistory">
        <span> 您还没有与医生进行聊天的记录</span>
      </div>
    </div>
    <div class="myDoctorList" v-else>
      <div class="emptyHistory">
        <loading></loading>
      </div>
    </div>
    <div class="loading-container" v-show="chatList.length == 0">

    </div>
    <!--<v-mask  v-show="chatList.length == 0"></v-mask>-->
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  import {formatDate} from '../../utils/formatTimeStamp'
//  import Loading from '../../base/loading/loading'
//  import VMask from '../../base/mask'
  export default{
    data(){
      return{
        showList:true,
        chatList:[],
        waitLoading:1,
        myCreateTime:[]
      }
    },
    mounted(){
      this._initRecentChat()
    },
    created(){
       api("nethos.follow.message.last.list",{
            token:localStorage.getItem("token"),
       }).then((data)=>{
           if(data.code == 0){
             this.chatList = data.list
             if(data.list){
               for(var i=0;i<data.list.length;i++){
                 this.myCreateTime.push(formatDate(new Date(data.list[i].followMessage.createTime)))
               }
             }
           }
           console.log(data)
       })
    },
    methods:{
      _initRecentChat(){
         if(this.waitLoading == 1 && this.chatList.length > 0){
           this.doctorListScroll = new BScroll(this.$refs.contactList,{
             click:true
           })
         }
      },
    },
    watch:{
      chatList(){
        this.$nextTick(()=>{
          this._initRecentChat()
        })
      }
    },
    components:{
//      Loading,
//      "VMask":VMask,
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .recentChat{
    width:100%;
    position: fixed;
    top: 50px;
    bottom: 0;
    left:0;
    right:0;
  }
  .myDoctorList{
    width:100%;
    position: fixed;
    top: 50px;
    bottom:98rem/$rem;
    left:0;
    right:0;
    z-index:1;
    /*background-color: white;*/
    .emptyHistory{
      position: fixed;
      top: 50px;
      left:0;
      right:0;
      bottom:0;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        display: inline;
        >div{
          color:#0FBDFF;
          display: inline;
        }
      }
    }
    ul{
      padding:0;
      margin:0;
      height: 180rem/$rem;
      li{
        list-style-type: none;
        height: 180rem/$rem;
        display: flex;
        .cancelImg{
          width: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          img{

          }
        }
        .cancelIntro{
          flex:2;
          display: flex;
          /*align-items: center;*/
          justify-content: center;
          line-height: 40rem/$rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          .badgeDoc{
            display: inline-block;
            padding-top: -5px;
            .myDoctor{
              width: 80rem/$rem;
              height: 36rem/$rem;
              background-color: darkturquoise;
              border-radius:5px;
              display: inline-block;
              font-size: 10px;
              color: white;
              line-height: 40rem/$rem;
              text-align: center;
            }
          }
          p{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            margin:0;
            color: #999999;
            font-size: 28rem/$rem;
          }
          span.chatDoctor{
            font-size: 32rem/$rem;
            color: #333333;
          }
          span.doctorTitle{
            font-size: 28rem/$rem;
            color: #666666;
          }
        }
        .cancelTime{
          /*flex:1;*/
          width:300rem/$rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-right: 20rem/$rem;
          span.year{
            font-size: 14px;
            color: #999999;
          }
          p.time{
            position: absolute;
            left:100rem/$rem;
            top:25rem/$rem;
            margin:0;
            text-align: right;
            span.badge{
              display: inline-block;
              top:0;
              width: 30rem/$rem;
              height: 30rem/$rem;
              border-radius: 50%;
              background-color: red;
              color: white;
              text-align: center;
              font-size: 14px;
              line-height: 15px;
            }
          }
        }
        img{
          width: 80rem/$rem;
          height: 80rem/$rem;
          border-radius: 50%;
        }
      }
    }
    .loading-container{
      position: absolute;
      /*background-color: #E64340;*/
      width:100%;
      top:50%;
      z-index:100;
      transform: translateY(-50%)
    }
  }
</style>
