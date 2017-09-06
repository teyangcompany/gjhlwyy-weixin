<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="checkList">
      <div class="topMenu border-1px">
        <p class="picked" @click="seeTime('一周内')">一周内</p>
        <p @click="seeTime('三个月')">三个月</p>
        <p @click="seeTime('半年内')">半年内</p>
        <p @click="seeTime('一年内')">一年内</p>
      </div>
      <div v-if="reportInfo == 1" class="loading">
        <img src="../../../../static/img/loading.gif" alt="">
        <span>正在很努力的加载中...</span>
      </div>
      <div v-else-if="reportInfo.length == 0" class="loading">
        <span>抱歉，未能查询到您的相关报告</span>
      </div>
      <div v-else>
        <router-link tag="div" :to="{path:'/checkReportCard',query:{specialIndex:specialIndex,index:index,compatId:compatId,reportInfoString:reportInfoString}}" class="checkCenter" style="display: block" v-for="(item,index) in reportInfo">
          <div class="reportList">
            <h3 class="border-1px">{{ item.sendDept }}报告</h3>
            <p><span>{{ item.name }}</span><span>{{ item.checkTime }}</span></p>
          </div>
        </router-link>
        <!--<router-link tag="div" to="/testReportCard" class="checkCenter">-->
        <!--<div class="reportList">-->
        <!--<h3 class="border-1px">三个月报告</h3>-->
        <!--<p><span>张三</span><span>2016/07/08</span></p>-->
        <!--</div>-->
        <!--</router-link>-->
        <!--<router-link tag="div" to="/testReportCard" class="checkCenter">-->
        <!--<div class="reportList">-->
        <!--<h3 class="border-1px">半年内报告</h3>-->
        <!--<p><span>张三</span><span>2016/07/08</span></p>-->
        <!--</div>-->
        <!--</router-link>-->
        <!--<router-link tag="div" to="/testReportCard" class="checkCenter">-->
        <!--<div class="reportList">-->
        <!--<h3 class="border-1px">一年内报告</h3>-->
        <!--<p><span>张三</span><span>2016/07/08</span></p>-->
        <!--</div>-->
        <!--</router-link>-->
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../../base/header'
  import api from '../../../lib/api'
  export default{
    data(){
      return{
        title:"检查报告",
        rightTitle:"",
        selectValue:"",
        patCard:"",
        compatId:"",
        index:"",
        reportInfo:1,
        reportInfoString:"",
        oneWeek:"",
        threeMonth:"",
        halfYear:"",
        oneYear:"",
        nowTime:""
      }
    },
    mounted(){
      this.$nextTick(()=>{
        var ps = document.getElementsByClassName("topMenu")[0].getElementsByTagName("p")
//           var divs = document.getElementsByClassName("checkCenter")
        var lastIndex = 0;
        console.log(ps)
        for(var i=0;i<ps.length;i++){
          ps[i].index = i;
          ps[i].onclick = function(){
            ps[lastIndex].className = ""
//                   divs[lastIndex].style.display = 'none'
            this.className = 'picked'
//                   divs[this.index].style.display = 'block'
            lastIndex = this.index;
          }
        }
        this.oneWeek = this.GetDateStr(7)
        this.threeMonth = this.getMonth(3)
        this.halfYear = this.getMonth(6)
        this.oneYear = this.getMonth(12)
        this.nowTime = this.getNow()
        console.log(this.getMonth(12))
        console.log()
      })
    },
    created(){
      this.selectValue = this.$route.query.selectValue
      this.index= this.$route.query.index
      this.patCard = this.$route.query.patCard
      this.compatId = this.$route.query.compatId
      this.specialIndex = this.$route.query.specialIndex
      if(this.selectValue == '检查报告'){
        api("nethos.book.inspect.examination",{
          token:localStorage.getItem("token"),
          startDate:this.oneWeek,
          endDate:this.nowTime,
          compatId:this.compatId
        }).then((data)=>{
            if(data.code == 0){
              this.reportInfo = data.list
              this.reportInfoString = JSON.stringify(this.reportInfo)
              console.log(data)
            }
        })
      }
    },
    methods:{
      GetDateStr(i){
        var dd = new Date();
        dd.setDate(dd.getDate()-i);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var month = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y + "-" + (month < 10 ? "0" + month : month)+"-"+(d < 10 ? "0" + d : d);
      },
      getNow(){
        var dd = new Date();
        var y = dd.getFullYear();
        var month = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y + "-" + (month < 10 ? "0" + month : month)+"-"+(d < 10 ? "0" + d : d);
      },
      getMonth(i){
        var dd = new Date();
        dd.setMonth(dd.getMonth()- i)
        var y = dd.getFullYear();
        var month = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y + "-" + (month < 10 ? "0" + month : month)+"-"+(d < 10 ? "0" + d : d);
      },
      seeTime(time){
        if(time == "一周内"){
          this.reportInfo = 1
          if(this.selectValue == '检查报告'){
            api("nethos.book.inspect.examination",{
              token:localStorage.getItem("token"),
              startDate:this.oneWeek,
              endDate:this.nowTime,
              compatId:this.compatId
            }).then((data)=>{
              this.reportInfo = data.list
              this.reportInfoString = JSON.stringify(this.reportInfo)
              console.log(data)
            })
          }
        }else if(time == '三个月'){
          this.reportInfo = 1
          if(this.selectValue == '检查报告'){
            api("nethos.book.inspect.examination",{
              token:localStorage.getItem("token"),
              startDate:this.threeMonth,
              endDate:this.nowTime,
              compatId:this.compatId
            }).then((data)=>{
              this.reportInfo = data.list
              this.reportInfoString = JSON.stringify(this.reportInfo)
              console.log(data)
            })
          }
        }else if(time == '半年内'){
          this.reportInfo = 1
          if(this.selectValue == '检查报告'){
            api("nethos.book.inspect.examination",{
              token:localStorage.getItem("token"),
              startDate:this.halfYear,
              endDate:this.nowTime,
              compatId:this.compatId
            }).then((data)=>{
              this.reportInfo = data.list
              this.reportInfoString = JSON.stringify(this.reportInfo)
              console.log(data)
            })
          }
        }else{
          this.reportInfo = 1
          if(this.selectValue == '检查报告'){
            api("nethos.book.inspect.examination",{
              token:localStorage.getItem("token"),
              startDate:this.oneYear,
              endDate:this.nowTime,
              compatId:this.compatId
            }).then((data)=>{
              this.reportInfo = data.list
              this.reportInfoString = JSON.stringify(this.reportInfo)
              console.log(data)
            })
          }
        }
      }
    },
    components:{
      "VHeader":header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
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
  .checkList{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
    .topMenu{
      height:90rem/$rem;
      display: flex;
      align-items: center;
      P{
        flex:1;
        text-align: center;
        height:90rem/$rem;
        line-height: 90rem/$rem;
        font-size: 28rem/$rem;
        color: #999999;
      }
      .picked{
        color: $mainColor;
        border-bottom:2px solid $mainColor;
      }
    }
    >div{
      .checkCenter{
        width:690rem/$rem;
        margin: 0 auto;
        display: none;
        .reportList{
          margin-top: 10px;
          border-radius: 7px;
          background-color: $bgColor2;
          h3{
            font-weight: normal;
            font-size: 32rem/$rem;
            color: #323333;
            padding-bottom: 30rem/$rem;
            padding-left: 15rem/$rem;
          }
          p{
            margin-top: 30rem/$rem;
            font-size: 28rem/$rem;
            color: #999899;
            font-family: PingFangSC;
            display: flex;
            justify-content: space-between;
            span:nth-child(1){
              margin-left: 15rem/$rem;
            }
            span:nth-child(2){
              margin-right: 15rem/$rem;
            }
          }
        }
      }
    }
  }
</style>
