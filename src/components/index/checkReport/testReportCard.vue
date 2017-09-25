<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="reportDetail" ref="reportDetail">
      <div>
        <div class="topBanner">
           <p>{{ reportInfoArray[index].inspectType }}</p>
        </div>
        <div class="testType">
          <div class="type">
            <h4>NO.{{ reportInfoArray[index].recordId }}</h4>
          </div>
          <div class="name">
            <p class="first">姓名：{{ reportInfoArray[index].name }}</p>
            <p>科室：{{ reportInfoArray[index].inspectDept }}</p>
          </div>
          <div class="name">
            <p class="first">性别：{{ reportInfoArray[index].gender == 2? '女':'男' }}</p>
            <p>病区：{{ reportInfoArray[index].inspectDept }}</p>
          </div>
          <div class="name">
            <p class="first">年龄：{{ reportInfoArray[index].age }}</p>
            <p>床号：{{  reportInfoArray[index].bedNo }}</p>
          </div>
          <div class="name">
            <p class="first">送检医生：</p>
            <p>标本类型：{{ reportInfoArray[index].specimenType }}</p>
          </div>
          <div class="name lastArrangeName">
            <p class="first">检验医生：{{  reportInfoArray[index].inspectDoc }}</p>
            <p>检验样本号：{{ reportInfoArray[index].sampleNum }}</p>
          </div>
          <p class="checkDoctor">临床诊断：{{ reportInfoArray[index].diagnosis }}</p>
          <p>采集日期：{{ reportInfoArray[index].collectionDate }}</p>
          <p>检验日期：{{ reportInfoArray[index].inspectDate }}</p>
          <div class="checkDoctor">
            <p>审核医生：{{ reportInfoArray[index].examineDoc }}</p>
          </div>
          <div class="detailTips">
            <p>具体报告信息请以医院纸质报告为准！</p>
          </div>
        </div>
        <div class="blank"></div>
        <div class="testInfo">
          <table>
            <tr style="text-align: center" class="title">
              <td>NO</td>
              <td>项目</td>
              <td>结果</td>
              <td>参考值</td>
              <td>单位</td>
            </tr>
            <tr v-for="(item,index) in experiment">
              <td>{{ item.expCode }}</td>
              <td>{{ item.expName }}</td>
              <td >{{ item.expResultNum }}
                <img v-if="status[index] == 'up'" src="../../../../static/img/up@2x.png" alt="">
                <img v-else-if="lowStatus[index] == 'down'" src="../../../../static/img/down@2x.png" alt="">
              </td>
              <td>{{ item.consult}}</td>
              <td>{{ item.expUnit }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../../lib/api'
  import weui from 'weui.js'
  import {tokenCache} from '../../../lib/cache'
  export default{
      data(){
          return{
              title:"检验报告",
              rightTitle:"",
              recordId:"",
              reportInfoArray:"",
              index:"",
              experiment:"",
              completeRange:[],
              lowValue:[],
            highValue:[],
            status:[],
            lowStatus:[]
          }
      },
      created(){
        this.recordId = this.$route.query.recordId
        this.reportInfoArray = JSON.parse(this.$route.query.item)
        this.index = this.$route.query.index
        console.log(this.index)
        console.log(this.reportInfoArray)
        api("nethos.book.inspect.info",{
          token:tokenCache.get(),
          recordId:this.recordId
        }).then((data)=>{
            if(data.code == 0){
              this.experiment = data.list
              for(var i=0;i<data.list.length;i++){
                 console.log(data.list[i].consult.indexOf('-'))
                 if(data.list[i].consult.indexOf('-') != -1){
                     this.completeRange.push(1)
                     console.log(data.list[i].consult.substr(0,data.list[i].consult.indexOf('-')))
                     this.lowValue.push(data.list[i].consult.substr(0,data.list[i].consult.indexOf('-')))
                     this.highValue.push(data.list[i].consult.substr(data.list[i].consult.indexOf('-')+1))
                 }else{
                     if(data.list[i].consult.indexOf('<') != -1){
                         console.log(data.list[i].consult.substr(data.list[i].consult.indexOf('<')+1))
                       this.lowValue.push('-10000000000000000000000000000000000000')
                       this.highValue.push(data.list[i].consult.substr(data.list[i].consult.indexOf('<')+1))

                     }else if(data.list[i].consult.indexOf('>') != -1){
                       this.highValue.push('1000000000000000000000000')
                       this.lowValue.push(data.list[i].consult.substr(data.list[i].consult.indexOf('>')+1))
                     }
//                   this.completeRange.push(0)
//                   this.lowValue.push('')
//                   this.highValue.push('')
                 }

              }
              if(this.highValue.length == data.list.length){
                for(var i=0;i<data.list.length;i++){
                  if(parseFloat(data.list[i].expResultNum) > parseFloat(this.highValue[i])){
                    this.status.push('up')
                  }else{
                    this.status.push('')
                  }
                }
              }
              if(this.lowValue.length == data.list.length){
                for(var i=0;i<data.list.length;i++){
                    if(parseFloat(data.list[i].expResultNum) < parseFloat(this.lowValue[i])){
                      this.lowStatus.push('down')
                    }else{
                      this.lowStatus.push('')
                    }
                }
              }

              console.log(this.status)
              console.log(this.lowStatus)
              console.log(this.completeRange)
              console.log(this.lowValue)
              console.log(this.highValue)
              console.log(this.experiment[0].expResultNum)
              console.log(this.lowValue[0])
              console.log(data)
            }else if(!(data.msg)){
               weui.alert("网络错误，请稍后重试")
            }else{
               weui.alert(data.msg)
            }
        })
      },
      methods:{
          _initReportDetailScroll(){
              this.reportDetailScroll = new BScroll(this.$refs.reportDetail,{
                  click:true
              })
            console.log(this.reportDetailScroll)
          }
      },
      components:{
          "VHeader":header
      },
      watch:{
        experiment(){
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this._initReportDetailScroll()
                },20)
            })
        }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .reportDetail{
    position: absolute;
    top: 55px;
    left:0;
    right:0;
    bottom: 0px;
    background-color: rgb(250,250,250);
    .topBanner{
      width:100%;
      min-height:80rem/$rem;
      background-color: $buttonColor;
      p{
        width:690rem/$rem;
        min-height: 80rem/$rem;
        display: flex;
        align-items: center;
        margin: 0 auto;
        color: white;
        font-size: 32rem/$rem;
      }
    }
    .testType{
      width:750rem/$rem;
      /*<!--height: 495rem/$rem;-->*/
      margin:0 auto;
      background-color: #ffffff;
      .type{
        display: flex;
        justify-content: space-between;
        padding-top: 5px;
        padding-bottom: 10px;
        h4{
          font-weight:normal;
          font-size: 32rem/$rem;
          color: #333333;
          padding-left: 15rem/$rem;
        }
        p{
          font-size: 32rem/$rem;
          color: #333333;
        }
      }
      .name{
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        p{
          font-size: 28rem/$rem;
          color: #999999;
          padding-left: 15rem/$rem;
        }
        p.first{
          flex-basis: 300rem/$rem;
        }
        p:nth-child(2),p:nth-child(3){
          flex:1;
        }
      }
      .lastArrangeName{
        padding-bottom: 15rem/$rem;
      }
      .checkDoctor{
        text-align: left;
        padding-top: 10px;
        p{
          font-size: 28rem/$rem;
          color: #999999;
          padding-left: 15rem/$rem;
        }
      }
      .detailTips{
        font-size: 28rem/$rem;
        color: #666666;
        padding-left: 15rem/$rem;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      >p{
        font-size: 28rem/$rem;
        color: #999999;
        padding-left: 15rem/$rem;
        padding-top: 10px;
      }
      p.checkDoctor{
        padding-top: 0;
      }
    }
    .blank{
      width:100%;
      height: 20rem/$rem;
      background-color: rgb(245,245,245);
    }
    .testInfo{
      width:750rem/$rem;
      margin: 0 auto;
      background-color: #ffffff;
      table{
        width:750rem/$rem;
        border-collapse: collapse;
        line-height: 50px;
        td{
          font-size: 28rem/$rem;
          color: #666666;
          text-align: center;
          img{
            width:10px;
          }
        }
        tr:nth-child(even){
          background-color: rgb(250,250,250);
        }
        .title{
          td{
            font-size: 32rem/$rem;
            color: #333333;
          }
        }
      }
    }
  }
</style>
