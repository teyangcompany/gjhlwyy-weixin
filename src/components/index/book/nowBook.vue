<template>
     <div>
          <v-header :title="title" :rightTitle="rightTitle"></v-header>
       <div class="contentWrap" ref="contentWrap">
         <div>
           <div class="content" style="display: block">
             <div  class="border-1px" v-if="!parentItem.bookDocId" v-for="(parentItem,index) in commonRoom">
               <div  class="border-1px" v-for="(secondItem,index) in parentItem.deptSchemeList">
                 <div class="border-1px" @click="selectTime(single,index)" v-for="single in secondItem.schemeList">
                   <div class="cancelImg">
                     <img src="../../../../static/img/普通-门诊.png" alt="">
                   </div>
                   <div class="cancelIntro">
                     <div>
                       <span class="chatDoctor"></span> <span class="doctorTitle">{{ parentItem.docName }}</span>
                       <p class="oneLine">{{ parentItem.hosName }}</p>
                       <p>{{ single.schemeDate.substr(0,10) }} {{ single.schemeAmpm == 'am'? '上午':'下午' }} {{ single.docName }}</p>
                     </div>
                   </div>
                   <div class="cancelTime">
                     <div >
                       <span class="year gray" v-if="single.schemeStats == 0">无</span>
                       <span class="year gray" v-if="single.schemeStats == 1">停诊</span>
                       <span class="year gray" v-if="single.schemeStats == 2">已满</span>
                       <span class="year" v-if="single.schemeStats == 3">即将(未放号或号子被锁定)</span>
                       <!--<span class="year" >预约</span>-->
                       <span class="specialMoney" v-if="single.schemeStats == 4">预约{{ single.bookFee }}元</span>
                       <img src="../../../../static/img/查看更多.png" alt="">
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div class="blank border-1px"></div>
           <div class="content" style="display: block">
             <div class="border-1px"  v-if="parentItem.bookDocId" v-for="parentItem in commonRoom">
               <div  class="border-1px"  v-for="(secondItem,index) in parentItem.deptSchemeList">
                 <div class="border-1px" @click="selectTime(single,index)" v-for="single in secondItem.schemeList">
                   <div class="cancelImg">
                     <img class="avartarImg" :src="parentItem.docAvatar" alt="">
                   </div>
                   <div class="cancelIntro">
                     <div>
                       <span class="chatDoctor"></span> <span class="doctorTitle">{{ parentItem.docName }}</span>
                       <p class="oneLine">{{ parentItem.hosName }}</p>
                       <p>{{ single.schemeDate.substr(0,10) }} {{ single.schemeAmpm == 'am'? '上午':'下午' }} 专家</p>
                     </div>
                   </div>
                   <div class="cancelTime">
                     <div >
                       <span class="year gray" v-if="single.schemeStats == 0">无</span>
                       <span class="year gray" v-if="single.schemeStats == 1">停诊</span>
                       <span class="year gray" v-if="single.schemeStats == 2">已满</span>
                       <span class="year" v-if="single.schemeStats == 3">即将(未放号或号子被锁定)</span>
                       <!--<span class="year" >预约</span>-->
                       <span class="specialMoney" v-if="single.schemeStats == 4">预约{{ single.bookFee }}元</span>
                       <img src="../../../../static/img/查看更多.png" alt="">
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
       <time-toggle :patList="patientAll" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closeTime()"></time-toggle>
       <toast v-if="showToast"></toast>
     </div>
</template>
<script>
  import header from '../../../base/header'
  import api from '../../../lib/api'
  import TimeToggle from '../../../base/timeToggle'
  import Toast from '../../../base/toast'
  import {nowTime} from '../../../utils/formatTimeStamp'
  export default{
      data(){
          return{
              patientAll:[],
              showPat:false,
              patOption:"",
            showToast:false,
              title:"",
              rightTitle:"",
              deptName:"",
              nowTime:"",
            bookDeptId:"",
            commonRoom:"",
            listIndex:"",
            bookSchemeId:""
          }
      },
      components:{
          "VHeader":header,
            TimeToggle,
            Toast
      },
      created(){
          this.deptName = this.$route.query.deptName
          this.bookDeptId = this.$route.query.bookDeptId
          this.title = this.deptName
          this.nowTime = nowTime(new Date())
          console.log(this.nowTime)
          api("nethos.book.doc.list.scheme.list",{
            bookDeptId:this.bookDeptId,
            date:this.nowTime
          }).then((data)=>{
              console.log(data)
              if(data.code == 0){
                  this.commonRoom = data.list
              }
          })
      },
      methods:{
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
        closeTime(){
          this.showPat=false;
        },
        selectTime(index,single){
          console.log(index)
          console.log(single)
          this.listIndex = single
//          if(index.schemeAmpm == 'am'){
//            this.patOption =this.completeTimeArray[this.selected]
//            this.patOption= this.patOption + "上午"
//          }else{
//            this.patOption =this.completeTimeArray[this.selected]
//            this.patOption= this.patOption + "下午"
//          }
//          console.log(this.patOption)
          this.allInfo = JSON.stringify(index)
          this.bookSchemeId = index.bookSchemeId
          if(index.schemeStats == 4 ){
            this.showToast = true
            api("nethos.book.num.list",{
              token:localStorage.getItem("token"),
              bookSchemeId:this.bookSchemeId
            }).then((data)=>{
              if(data.code == 0){
                this.patientAll = data.list
                this.showPat=true;
                this.showToast = false
                console.log(data)
              }else{
                this.showToast = false
                this.showPat=true;
              }
            })
          }

        },
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .blank{
    width:100%;
    height: 20rem/$rem;
    background-color: rgb(245,245,245);
  }
  .contentWrap{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
    >div{
      .content{
        >div{
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
            }
          }
        }
      }
    }
  }
</style>
