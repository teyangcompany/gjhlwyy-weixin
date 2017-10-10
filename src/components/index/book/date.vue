<template>
    <div class="date">
      <div class="dateList">
        <div class="menu">
          <ul ref="wrapWidth" class="border-1px">
            <li class="border-1px-right arrangeTime" :class="{picked:selected == index}"  v-for="(item,index) in timeArray" @click="selectOne(index)">
              <p>{{timeArray[index]}}</p>
              <p>{{ weekArray[index] }}</p>
            </li>
          </ul>
        </div>
        <div v-if="!commonRoom" class="loading">
          <img src="../../../../static/img/loading.gif" alt="">
          <span>正在很努力的加载中...</span>
        </div>
        <div v-else-if="commonRoom.length == 0" class="loading">
          <tips></tips>
        </div>
        <div class="contentWrap" ref="contentWrap">
          <div>
            <div class="content" style="display: block">
                <div  class="border-1px" v-if="!item.bookDocId" v-for="(item,index) in commonRoom">
                  <div  class="border-1px" @click="selectTime(single,index)"  v-for="(single,index) in item.deptSchemeList[0].schemeList">
                      <div class="cancelImg">
                        <img src="../../../../static/img/普通-门诊.png" alt="">
                      </div>
                      <div class="cancelIntro">
                        <div>
                          <span class="chatDoctor"></span> <span class="doctorTitle">{{ item.docName }}</span>
                          <p class="oneLine">{{ item.hosName }}</p>
                          <p style="color: #333333;">{{ single.schemeDate.substr(0,10) }} <span style="color: #2AB6B3;">{{ single.schemeAmpm == 'am'? '上午':'下午' }}</span> {{ single.docName }}</p>
                        </div>
                      </div>
                      <div class="cancelTime specialCancel"  v-if="single.schemeStats == 4">
                        <div >
                          <p>预约</p>
                          <p> {{ single.bookFee }}元 </p>
                        </div>
                        <!--<img src="../../../../static/img/查看更多.png" alt="">-->
                      </div>
                      <div class="cancelTime" v-else>
                        <div >
                          <span class="year gray" v-if="single.schemeStats == 0">无</span>
                          <span class="year gray" v-if="single.schemeStats == 1">停诊</span>
                          <span class="year gray" v-if="single.schemeStats == 2">已满</span>
                          <span class="year" v-if="single.schemeStats == 3">即将(未放号或号子被锁定)</span>
                          <!--<span class="year" >预约</span>-->
                          <span class="specialMoney" v-if="single.schemeStats == 4">预约{{ single.bookFee }}元</span>
                          <!--<img src="../../../../static/img/查看更多.png" alt="">-->
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            <div class="blank border-1px"></div>
            <div class="content" style="display: block">
                  <div class="border-1px"  v-if="item.bookDocId" v-for="item in commonRoom">
                    <div  class="border-1px" @click="selectTime(single,index)"  v-for="(single,index) in item.deptSchemeList[0].schemeList">
                      <div class="cancelImg">
                        <img class="avartarImg" :src="item.docAvatar" alt="" onerror="javascript:this.src='./static/img/doctor.m.png'">
                      </div>
                      <div class="cancelIntro">
                        <div>
                          <span class="chatDoctor"></span> <span class="doctorTitle">{{ item.docName }}</span>
                          <p class="oneLine">{{ item.hosName }}</p>
                          <p style="color: #333333;">{{ single.schemeDate.substr(0,10) }} <span style="color: #2AB6B3"> {{ single.schemeAmpm == 'am'? '上午':'下午' }}</span> 专家</p>
                        </div>
                      </div>
                      <div class="cancelTime specialCancel" id="" v-if="single.schemeStats == 4">
                        <div >
                          <p>预约</p>
                          <p> {{ single.bookFee }}元 </p>
                        </div>
                        <!--<img src="../../../../static/img/查看更多.png" alt="">-->
                      </div>
                      <div class="cancelTime" v-else>
                        <div >
                          <span class="year gray" v-if="single.schemeStats == 0">无</span>
                          <span class="year gray" v-if="single.schemeStats == 1">停诊</span>
                          <span class="year gray" v-if="single.schemeStats == 2">已满</span>
                          <span class="year" v-if="single.schemeStats == 3">即将(未放号或号子被锁定)</span>
                          <!--<span class="year" >预约</span>-->
                          <span class="specialMoney" v-if="single.schemeStats == 4">预约{{ single.bookFee }}元</span>
                          <!--<img src="../../../../static/img/查看更多.png" alt="">-->
                        </div>
                      </div>
                    </div>
                        <!--<div class="avartarImg">-->
                            <!--<img :src="item.docAvatar" alt="">-->
                        <!--</div>-->
                        <!--<div class="cancelIntro">-->
                          <!--<div>-->
                             <!--<span class="chatDoctor">{{ item.docName }}</span> <span class="doctorTitle">{{ item.docTitle }}</span>-->
                             <!--<p>{{ item.docDescription }}</p>-->
                              <!--<p>{{ item.deptSchemeList[0].schemeList[0].schemeDate.substr(0,10) }} {{ item.deptSchemeList[0].schemeList[0].schemeAmpm == 'am'? '上午':'下午' }} 专家</p>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--<div class="cancelTime">-->
                        <!--<div >-->
                          <!--<span class="year gray" v-if="item.deptSchemeList[0].schemeList[0].schemeStats == 0">无</span>-->
                          <!--<span class="year gray" v-if="item.deptSchemeList[0].schemeList[0].schemeStats == 1">停诊</span>-->
                          <!--<span class="year gray" v-if="item.deptSchemeList[0].schemeList[0].schemeStats == 2">已满</span>-->
                          <!--<span class="year" v-if="item.deptSchemeList[0].schemeList[0].schemeStats == 3">即将(未放号或号子被锁定)</span>-->
                          <!--&lt;!&ndash;<span class="year" >预约</span>&ndash;&gt;-->
                          <!--<span class="specialMoney" v-if="item.deptSchemeList[0].schemeList[0].schemeStats == 4">预约{{ item.deptSchemeList[0].schemeList[0].bookFee }}元</span>-->
                          <!--<img src="../../../../static/img/查看更多.png" alt="">-->
                        <!--</div>-->
                      <!--</div>-->
                  </div>
            </div>
          </div>
        </div>
        <div v-if="showAlertTips" class="loading">
          <alert-tips ></alert-tips>
        </div>
      </div>
      <time-toggle :patList="patientAll" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closeTime()"></time-toggle>
      <toast v-if="showToast"></toast>
    </div>
</template>
<script>
  import TimeToggle from '../../../base/timeToggle'
  import Toast from '../../../base/toast'
  import Tips from '../../../base/tips'
  import AlertTips from '../../../base/alertTips'
  import BScroll from 'better-scroll'
  import api from '../../../lib/api'
  import weui from 'weui.js'
  import {isLoginMixin} from "../../../lib/mixin"
  import {tokenCache} from '../../../lib/cache'
  export default{
    mixins: [isLoginMixin],
      data(){
         return{
           patientAll:[],
           showPat:false,
           showAlertTips:false,
           patOption:"",
           commonRoom:"",
           commonDoctor:"",
           selected:0,
           timeArray:[],
           weekArray:[],
           completeTimeArray:[],
           isImg:[],
           commonInfo:[],
           infoWrap:[],
           bookSchemeId:"",
           showToast:false,
           clickedIndex:"",
           listIndex:"",
           allInfo:[],
         }
      },
      created(){
          this.bookDeptId = this.$route.query.bookDeptId
          this.bookSort = this.$route.query.bookSort
//         api("nethos.book.doc.normal.scheme.list",{
//           bookDeptId:this.bookDeptId,
//           date:"2017-09-05"
//         }).then((data)=>{
////              this.commonDoctor = data.obj
//             console.log(data)
////             console.log(this.commonDoctor)
//         })
        for(var i=1;i<8;i++){
          this.timeArray.push(this.GetDateStr(i))
          this.weekArray.push(this.getWeek(i))
          this.completeTimeArray.push(this.getcompleteTime(i))
        }
        this.patOption =this.completeTimeArray[this.selected]
        if(this.completeTimeArray.length != 0){
          api("nethos.book.doc.list.scheme.list",{
            bookDeptId:this.bookDeptId,
            date:this.completeTimeArray[this.selected]
          }).then((data)=>{
            console.log("123")
            console.log(this.completeTimeArray[this.selected])
            console.log("456")
            console.log(data)
            console.log("456")
            if(data.code == 0){
              this.commonRoom = data.list
              for(var i=0;i<this.commonRoom.length;i++){
                if(this.commonRoom[i].hasOwnProperty("docAvatar")){
                  this.isImg.push("")
                }else{

                  this.commonInfo.push(this.commonRoom[i].hosName)
                  this.commonInfo.push(this.commonRoom[i].docName)
                  this.infoWrap.push(this.commonInfo)
                  this.isImg.push(this.commonRoom[i].hosName)
                }
              }
              console.log()
              console.log(this.infoWrap)
              console.log(this.isImg)
            }else if(!(data.msg)){
              this.commonRoom = true
                this.showAlertTips = true
                setTimeout(()=>{
                  this.showAlertTips = false
                },1000)
            }else{
              this.commonRoom = true
                weui.alert(data.msg)
            }
          })
        }
      },
      mounted(){

        console.log(this.weekArray)
        console.log(this.timeArray)
        console.log(this.completeTimeArray)
//          this.$nextTick(()=>{
//              setTimeout(()=>{
//                var lastIndex = 0;
//                var li = document.getElementsByClassName("arrangeTime")
//                var divs =document.getElementsByClassName("content")
//                for(var i=0;i<li.length;i++){
//                  li[i].index = i;
//                  li[i].onclick = function(){
//                    li[lastIndex].style.background = "white";
//                    li[lastIndex].style.color = "#333333";
//                    this.style.color="white"
//                    this.style.background = '#2AB6B3'
//                    lastIndex = this.index;
//                    console.log(this.index)
//                    let that = this
//                    console.log(that)
//                    console.log(this)
//
//                  }
//                }
//              },100)
//          })
      },
      methods:{
        GetDateStr(i){
          var dd = new Date();
          dd.setDate(dd.getDate()+i);//获取AddDayCount天后的日期
//          var y = dd.getFullYear();
          var month = dd.getMonth()+1;//获取当前月份的日期
          var d = dd.getDate();

          return(month < 10 ? "0" + month : month)+"-"+(d < 10 ? "0" + d : d);
        },
        getcompleteTime(i){
          var dd = new Date();
          dd.setDate(dd.getDate()+i);//获取AddDayCount天后的日期
          var y = dd.getFullYear();
          var month = dd.getMonth()+1;//获取当前月份的日期
          var d = dd.getDate();

          return y+'-'+(month < 10 ? "0" + month : month)+"-"+(d < 10 ? "0" + d : d);
        },
        getWeek(i){
          var dd = new Date();
          dd.setDate(dd.getDate()+i);//获取AddDayCount天后的日期
          var week = dd.getDay()
          switch (week){
            case 0:
              week="周日";
              break;
            case 1:
              week="周一";
              break;
            case 2:
              week="周二";
              break;
            case 3:
              week="周三";
              break;
            case 4:
              week="周四";
              break;
            case 5:
              week="周五";
              break;
            case 6:
              week="周六";
              break;
          }
          return week
        },
        selectOne(index){
          this.selected = index
          this.commonRoom = ''
          api("nethos.book.doc.list.scheme.list",{
            bookDeptId:this.bookDeptId,
            date:this.completeTimeArray[this.selected]
          }).then((data)=>{
            console.log("123")
            console.log(data)
            if(data.code == 0){
              this.commonRoom = data.list
            }else if(!(data.msg)){
              this.commonRoom = true
              this.showAlertTips = true
              setTimeout(()=>{
                this.showAlertTips = false
              },1000)
            }else{
              this.commonRoom = true
                weui.alert(data.msg)
            }
          })
        },
        check(index){
          this.showPat=false;
//          console.log(item)
          this.clickedIndex = index
          console.log(index)
          this.$router.push({
            path:'/infoConfirm',
            query:{bookDeptId:this.bookDeptId,bookNumId:this.patientAll[this.clickedIndex].bookNumId,numTime:this.patientAll[this.clickedIndex].numTime,allInfo:this.allInfo,listIndex:this.listIndex,bookSort:this.bookSort}
          })
        },
        selectTime(index,single){
          console.log("123")
          console.log(index)
          console.log(single)
          this.listIndex = single
          if(index.schemeAmpm == 'am'){
            this.patOption =this.completeTimeArray[this.selected]
            this.patOption= this.patOption + "上午"
          }else{
            this.patOption =this.completeTimeArray[this.selected]
            this.patOption= this.patOption + "下午"
          }
          console.log(this.patOption)
          this.allInfo = JSON.stringify(index)
          this.bookSchemeId = index.bookSchemeId

          api("nethos.pat.info.get", {
            token:tokenCache.get()
          }).then((data) => {
            console.log(data.obj)
            if (data.code == 0) {
              console.log(data,66666)
              if(index.schemeStats == 4 ){
                this.showToast = true
                api("nethos.book.num.list",{
                  token:tokenCache.get(),
                  bookSchemeId:this.bookSchemeId
                }).then((data)=>{
                  if(data.code == 0){
                    this.patientAll = data.list
                    this.showPat=true;
                    this.showToast = false
                    console.log(data)
                  }else if(!(data.msg)){
                    this.showToast = false
                    this.showAlertTips = true
                    setTimeout(()=>{
                      this.showAlertTips = false
                    },1000)
                  }else{
                    this.showToast = false
                    weui.alert(data.msg)
                  }
                })
              }
            } else {
              this.$router.push({
                path:"/bindRelativePhone",
                query:{backPath:this.path}
              });
            }
          })


        },
        closeTime(){
          this.showPat=false;
        },
        _initDateList(){
            this.dateList = new BScroll(this.$refs.contentWrap,{
              click:true
            })
            console.log(this.dateList)
        }
      },
      components:{
        TimeToggle,
        Toast,
        Tips,
        AlertTips
      },
      watch:{
        commonRoom(){
            this.$nextTick(()=>{
              setTimeout(()=>{
                this._initDateList()
              },100)
            })
        }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
.date{
  position: fixed;
  top: 50px;
  left:0;
  right:0;
  bottom:0;
  background-color: white;
  .dateList{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
    background-color: white;
    .menu{
      position: fixed;
      left:0;
      right:0;
      top: 50px;
      z-index:100;
      ul{
        width:100%;
        display: flex;
        height: 50px;
        background-color: white;
        li{
          list-style-type: none;
          flex:1;
          font-size: 32rem/$rem;
          text-align: center;
          height: 50px;
          p{
            height: 25px;
            font-size: 32rem/$rem;
            color: #333333;
            line-height: 25px;
          }
        }
        li.picked{
          p{
            background-color:#2AB6B3;
            color: white!important;
          }
        }
      }
    }
    .loading{
      position: fixed;
      top: 90px;
      left:0;
      right:0;
      bottom:0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        width:100rem/$rem;
        margin-bottom: 10px;
      }
      span{
        font-size: 32rem/$rem;
        color: #999999;
      }
    }
    .blank{
      width:100%;
      height: 20rem/$rem;
      background-color: rgb(245,245,245);
    }
    .contentWrap{
      position: fixed;
      top: 100px;
      left:0;
      right:0;
      bottom:0;
      >div{
        .content{
           >div{
             >div{
               height: 180rem/$rem;
               display: flex;
               .cancelImg{
                 width: 160rem/$rem;
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 img{
                   width: 110rem/$rem;
                   height: 110rem/$rem;
                   border-radius: 50%;
                 }
                 img.avartarImg{
                   border-radius: 0px;
                 }
               }
               .cancelIntro{
                 flex:2;
                 display: flex;
                 align-items: center;
                 p{
                   display: -webkit-box;
                   -webkit-box-orient: vertical;
                   -webkit-line-clamp:1;
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
                 >div{
                   display: flex;
                   justify-content: space-between;
                   align-items: center;
                   img{
                     width:16rem/$rem;
                     height:24rem/$rem;
                   }
                   span.year{
                     font-size: 28rem/$rem;
                     color: $mainColor;
                     margin-right: 5px;
                   }
                   .specialMoney{
                     min-width:170rem/$rem;
                     height:60rem/$rem;
                     color: white;
                     font-size: 32rem/$rem;
                     margin-right: 5px;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                     border-radius: 7px;
                     background-color: $mainColor;
                   }
                   span.gray{
                     color: #999999;
                     margin-right: 5px;
                   }
                 }
               }
               .specialCancel{
                 >div{
                   display: flex;
                   flex-direction: column;
                   align-items: center;
                   justify-content: center;
                   /*<!--margin-right: 10rem/$rem;-->*/
                   p:nth-child(1){
                     height:60rem/$rem;
                     margin-bottom: 10rem/$rem;
                     font-size: 32rem/$rem;
                   }
                   p:nth-child(2){
                     color: $assistWordBrown;
                     font-size: 32rem/$rem;
                   }
                 }
                 img{
                   width:16rem/$rem;
                   height:24rem/$rem;
                 }
               }
             }
           }
        }
      }
    }
  }
}
</style>
