<template>
  <div class="recentChat">
    <div class="myDoctorList" ref="contactList" v-if="waitLoading == 1 && chatList.length > 0">
      <div>
        <ul  class="border-1px" v-for="item in chatList">
          <router-link tag="div" to="/chat">
            <li>
              <div class="cancelImg">
                <img src="../../../static/img/ys1.jpg" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="chatDoctor">华立</span> <span class="doctorTitle">主治</span>
                  <div class="badgeDoc">
                    <span class="myDoctor">签约</span>
                  </div>
                  <p>[安排服务]</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span class="year">刚刚</span>
                  <p class="time"><span class="badge">2</span></p>
                </div>
              </div>
            </li>
          </router-link>
        </ul>
        <ul  class="border-1px" v-for="item in chatList">
          <router-link tag="div" to="/chat">
            <li>
              <div class="cancelImg">
                <img src="../../../static/img/ys2.jpg" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="chatDoctor">张康</span> <span class="doctorTitle">实习</span>
                  <div class="badgeDoc">
                    <span class="myDoctor">签约</span>
                  </div>
                  <p>你问一下华医生吧，我和他说过了</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span class="year">13:45</span>
                  <!--<p class="time"><span class="badge">1</span></p>-->
                </div>
              </div>
            </li>
          </router-link>
        </ul>
        <ul  class="border-1px" v-for="item in chatList">
          <router-link tag="div" to="/chat">
            <li>
              <div class="cancelImg">
                <img src="../../../static/img/ys3.jpg" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="chatDoctor">陈刚</span> <span class="doctorTitle">主治</span>
                  <div class="badgeDoc">
                    <!--<span class="myDoctor"></span>-->
                  </div>
                  <p>[图片]</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span class="year">09:10</span>
                  <!--<p class="time"><span class="badge">1</span></p>-->
                </div>
              </div>
            </li>
          </router-link>
        </ul>
        <ul  class="border-1px" v-for="item in chatList">
          <router-link tag="div" to="/chat">
            <li>
              <div class="cancelImg">
                <img src="../../../static/img/ys4.jpg" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="chatDoctor">李爱国</span> <span class="doctorTitle">护工</span>
                  <div class="badgeDoc">
                    <span class="myDoctor">签约</span>
                  </div>
                  <p>谢谢了，下个月还是这个时候就行</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span class="year">星期三</span>
                  <!--<p class="time"><span class="badge">1</span></p>-->
                </div>
              </div>
            </li>
          </router-link>
        </ul>
        <ul  class="border-1px" v-for="item in chatList">
          <router-link tag="div" to="/chat">
            <li>
              <div class="cancelImg">
                <img src="../../../static/img/ys5.jpg" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="chatDoctor">谢尚全</span> <span class="doctorTitle">主治</span>
                  <div class="badgeDoc">
                    <!--<span class="myDoctor">签约</span>-->
                  </div>
                  <p>你可以找你签约的医生说一下</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span class="year">2017/8/7</span>
                  <!--<p class="time"><span class="badge">1</span></p>-->
                </div>
              </div>
            </li>
          </router-link>
        </ul>
        <ul  class="border-1px" v-for="item in chatList">
          <router-link tag="div" to="/chat">
            <li>
              <div class="cancelImg">
                <img src="../../../static/img/ys6.jpg" alt="">
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="chatDoctor">赵乾坤</span> <span class="doctorTitle">护工</span>
                  <div class="badgeDoc">
                    <span class="myDoctor">签约</span>
                  </div>
                  <p>好的</p>
                </div>
              </div>
              <div class="cancelTime">
                <div >
                  <span class="year">2017/6/2</span>
                  <!--<p class="time"><span class="badge">1</span></p>-->
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
//  import Loading from '../../base/loading/loading'
//  import VMask from '../../base/mask'
  export default{
    data(){
      return{
        showList:true,
        chatList:[
          {
            docAvatar:"http://img.25pp.com/uploadfile/app/icon/20160901/1472663211278834.jpg",
            docName:"丁聪华",
            docTitle:"眼科",
          }
        ],
        waitLoading:1
      }
    },
    mounted(){
      this._initRecentChat()
    },
    methods:{
      _initRecentChat(){
        this.doctorListScroll = new BScroll(this.$refs.contactList,{
          click:true
        })
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
    top: 90px;
    bottom: 0;
    left:0;
    right:0;
  }
  .myDoctorList{
    width:100%;
    position: fixed;
    top: 90px;
    bottom:98rem/$rem;
    left:0;
    right:0;
    z-index:1;
    /*background-color: white;*/
    .emptyHistory{
      width:100%;
      height:100%;
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
          align-items: center;
          line-height: 40rem/$rem;
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
          flex:1;
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
