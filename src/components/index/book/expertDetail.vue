<template>
    <div class="expertDetail">
        <v-header :title="title" :rightTitle="rightTitle"></v-header>
        <div v-if="!(commonNumDetail && commonNumDetail[0] && commonNumDetail[0].schemeList)" class="loading">
          <img src="../../../../static/img/loading.gif" alt="">
          <span>正在很努力的加载中...</span>
        </div>
        <div class="expertList" ref="list">
          <div  v-if="commonNumDetail && commonNumDetail[0] && commonNumDetail[0].schemeList">
          <ul  class="border-1px">
            <div>
              <li>
                <div class="cancelImg">
                  <img src="../../../../static/img/普通-门诊.png" alt="">
                </div>
                <div class="cancelIntro">
                  <div v-if="commonNumDetail">
                    <span class="chatDoctor">{{ commonNumDetail[0].deptName }}</span> <span class="doctorTitle"></span>
                    <p>{{ commonNumDetail[0].deptName }}</p>
                    <!--<p>普通号</p>-->
                  </div>
                </div>
              </li>
            </div>
          </ul>
          <div v-for="parentItem in commonNumDetail">
            <div class="blank"></div>
            <div class="blank border-1px"></div>
            <div class="list border-1px" v-if="commonNumDetail">
              <p>{{ parentItem.deptName }}<img src="../../../../static/img/book/left-arrow.png" alt=""> </p>
            </div>
            <div class="list border-1px" v-for="(item,index) in parentItem.schemeList" @click="book(item,index)">
              <p class="specialBlack">{{ (item.schemeDate).substr(0,10) }} {{ weekNum[index] }} {{ item.schemeAmpm == 'pm'? '下午':'上午' }}
                <span class="year gray" v-if="item.schemeStats == 0">无</span>
                <span class="year gray" v-if="item.schemeStats == 1">停诊</span>
                <span class="year gray" v-if="item.schemeStats == 2">已满</span>
                <span class="year" v-if="item.schemeStats == 3">即将(未放号或号子被锁定)</span>
                <!--<span class="year" >预约</span>-->
                <span class="specialMoney" v-if="item.schemeStats == 4" >预约{{ item.bookFee }}元</span>
              </p>
            </div>
          </div>
          <!--<div class="list border-1px">-->
            <!--<p class="specialBlack">2017-08-24 周四 上午 <span class="specialMoney">预约10元</span> </p>-->
          <!--</div>-->
          <div class="blank"></div>
          <div class="blank border-1px"></div>
          <div class="list border-1px">
            <p>科室介绍<img src="../../../../static/img/book/left-arrow.png" alt=""> </p>
          </div>
          <div class="deptDescription">
              <p>{{ deptDescription }}</p>
          </div>
        </div>
        </div>
      <time-toggle :patList="patientAll" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closeTime()"></time-toggle>
      <toast v-if="showToast"></toast>
    </div>
</template>
<script>
  import header from '../../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../../lib/api'
  import TimeToggle from '../../../base/timeToggle'
  import Toast from '../../../base/toast'
  import weui from 'weui.js'
  import {isLoginMixin} from "../../../lib/mixin"
  import {tokenCache} from '../../../lib/cache'
  export default{
    mixins: [isLoginMixin],
      data(){
         return{
             patientAll:[],
             showPat:false,
             patOption:"",
             title:"科室",
             rightTitle:"",
             commonNumDetail:"",
             bookDeptId:"",
             weekNum:[],
             bookSchemeId:"",
             showToast:false,
             clickedIndex:"",
             bookSort:"",
           deptDescription:""
         }
      },
    mounted(){

    },
    created(){
      this.bookDeptId = this.$route.query.bookDeptId
      this.bookSort=this.$route.query.bookSort
      console.log(this.bookSort)
      console.log(this.bookDeptId)
      api("nethos.book.doc.normal.scheme.list",{
        bookDeptId:this.bookDeptId
      }).then((data)=>{
          if(data.code == 0){
            console.log("下面是data")
            console.log(data)
            console.log("上面是data")
            this.commonNumDetail = data.obj.deptSchemeList
            console.log(this.commonNumDetail)
            for(var i=0;i<this.commonNumDetail[0].schemeList.length;i++){
             console.log(this.commonNumDetail[0].schemeList[i].weekNo)
              var arr = []
              arr[i] = this.commonNumDetail[0].schemeList[i].weekNo
              console.log(arr[i])
//              let that = this
//             (function(){
//                 console.log(i)
                 switch (arr[i]){
                   case 1:
                     this.weekNum.push("周一")
                     break;
                   case 2:
                     this.weekNum.push("周二")
                     break;
                   case 3:
                     this.weekNum.push("周三")
                     break;
                   case 4:
                     this.weekNum.push("周四")
                     break;
                   case 5:
                     this.weekNum.push("周五")
                     break;
                   case 6:
                     this.weekNum.push("周六")
                     break;
                   case 7:
                     this.weekNum.push("周日")
                     break;

                 }
//               })(i)
//                if(this.commonNumDetail[0].schemeList[i].weekNo == 1){
//                  this.weekNum = "周一"
//                }else if(this.commonNumDetail[0].schemeList[i].weekNo == 2){
//                  this.weekNum = "周二"
//                }else if(this.commonNumDetail[0].schemeList[i].weekNo == 3){
//                  this.weekNum = "周三"
//                }else if(this.commonNumDetail[0].schemeList[i].weekNo == 4){
//                  this.weekNum = "周四"
//                }else if(this.commonNumDetail[0].schemeList[i].weekNo == 5){
//                  this.weekNum = "周五"
//                }else if(this.commonNumDetail[0].schemeList[i].weekNo == 6){
//                  this.weekNum = "周六"
//                }else{
//                  this.weekNum = "周日"
//                }




            }
          }else{
              weui.alert(data.msg)
          }
      })
      api("nethos.book.dept.info",{
        bookDeptId:this.bookDeptId
      }).then((data)=>{
          if(data.code == 0){
            this.deptDescription = data.obj.deptDescription
            console.log(data)
          }else{
              weui.alert(data.msg)
          }
      })
    },
    methods:{
       _initListScroll(){
           this.listScroll = new BScroll(this.$refs.list,{
                click:true
           })
         console.log(this.listScroll )
       },
      check(index,item){
        this.showPat=false;
//          console.log(item)
        this.clickedIndex = index
        console.log(index)
//        console.log(item)
        this.$router.push({
          path:'/infoConfirm',
          query:{bookDeptId:this.bookDeptId,bookNumId:this.patientAll[this.clickedIndex].bookNumId,numTime:this.patientAll[this.clickedIndex].numTime,allInfo:this.allInfo,listIndex:this.listIndex,bookSort:this.bookSort}
        })
      },
      closeTime(){
        this.showPat=false;
      },
      book(index,item){
        console.log("123")
        console.log(index)
        console.log(item)
        this.listIndex = item
        this.patOption = (index.schemeDate).substr(0,10) + (index.schemeAmpm == 'am'?'上午':'下午')
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

      }
    },
    components:{
        "VHeader":header,
         TimeToggle,
         Toast
    },
    watch:{
      commonNumDetail(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initListScroll()
          },20)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
 .expertDetail{
   position: fixed;
   top:0;
   left:0;
   right:0;
   bottom:0;
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
   .expertList{
     position: fixed;
     top: 50px;
     left:0;
     right:0;
     bottom:0;
     .blank{
       width:100%;
       height: 20rem/$rem;
       background-color: rgb(245,245,245);
     }
     .list{
       width:100%;
       height: 50px;
       display: block;
       p{
         width:690rem/$rem;
         height: 50px;
         margin:0 auto;
         height: 50px;
         font-size: 32rem/$rem;
         color: #999999;
         display: flex;
         align-items: center;
         justify-content: space-between;
         img{
           width: 16rem/$rem;
           height: 20rem/$rem;
         }
       }
       p.specialBlack{
         color: #333333;
         .specialMoney{
           min-width: 170rem/$rem;
           height: 60rem/$rem;
           font-size: 32rem/$rem;
           color: white;
           display: flex;
           align-items: center;
           justify-content: center;
           border-radius: 7px;
           background-color: $mainColor;
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
           width: 160rem/$rem;
           display: flex;
           justify-content: center;
           align-items: center;
           img{
             width: 110rem/$rem;
             height: 110rem/$rem;
             border-radius: 50%;
           }
         }
         .avartarImg{
           width: 160rem/$rem;
           display: flex;
           justify-content: center;
           align-items: center;
           img{
             width: 110rem/$rem;
             height: 110rem/$rem;
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
           img{
             width:16rem/$rem;
             height: 24rem/$rem;
           }
           span.year{
             font-size: 28rem/$rem;
             color: $mainColor;
           }
           span.full{
             color: #999999;
           }
         }
       }
     }
     .deptDescription{
       p{
         width:690rem/$rem;
         font-size: 32rem/$rem;
         margin:10rem/$rem auto;
       }
     }
   }
 }
</style>
