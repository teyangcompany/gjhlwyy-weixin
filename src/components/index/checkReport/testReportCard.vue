<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="reportDetail" ref="reportDetail">
      <div>
        <div class="testType">
          <div class="type">
            <h4>{{ reportInfoArray[index].inspectType }}</h4>
            <p>{{ reportInfoArray[index].recordId }}</p>
          </div>
          <div class="name">
            <p class="first">姓名：{{ reportInfoArray[index].name }}</p>
            <p>科室：{{ reportInfoArray[index].inspectDept }}</p>
            <p>标本类型：{{ reportInfoArray[index].specimenType }}</p>
          </div>
          <div class="name">
            <p class="first">性别：{{ reportInfoArray[index].gender == 2? '女':'男' }}</p>
            <p>病区：{{ reportInfoArray[index].inspectDept }}</p>
            <p>送检医生：</p>
          </div>
          <div class="name">
            <p class="first">年龄：{{ reportInfoArray[index].age }}</p>
            <p>床号：{{  reportInfoArray[index].bedNo }}</p>
            <p>检验医生：{{  reportInfoArray[index].inspectDoc }}</p>
          </div>
          <p>临床诊断：{{ reportInfoArray[index].diagnosis }}</p>
          <p>送检样本号：{{ reportInfoArray[index].sampleNum }}</p>
          <p>采集日期：{{ reportInfoArray[index].collectionDate }}</p>
          <p>检验日期：{{ reportInfoArray[index].inspectDate }}</p>
          <div class="checkDoctor">
            <p>审核医生：{{ reportInfoArray[index].examineDoc }}</p>
          </div>
          <div class="detailTips">
            <p>具体报告信息请以医院纸质报告为准！</p>
          </div>
        </div>
        <div class="blank border-1px"></div>
        <div class="testInfo">
          <table>
            <tr style="text-align: center" class="title">
              <td>NO</td>
              <td>项目</td>
              <td>结果</td>
              <td>参考值</td>
              <td>单位</td>
            </tr>
            <tr v-for=" item in experiment">
              <td>{{ item.expCode }}</td>
              <td>{{ item.expName }}</td>
              <td>{{ item.expResultNum }}</td>
              <td>{{ item.consult }}</td>
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
  export default{
      data(){
          return{
              title:"检验报告",
              rightTitle:"",
              recordId:"",
              reportInfoArray:"",
              index:"",
              experiment:""
          }
      },
      created(){
        this.recordId = this.$route.query.recordId
        this.reportInfoArray = JSON.parse(this.$route.query.item)
        this.index = this.$route.query.index
        console.log(this.index)
        console.log(this.reportInfoArray)
        api("nethos.book.inspect.info",{
          token:localStorage.getItem("token"),
          recordId:this.recordId
        }).then((data)=>{
            if(data.code == 0){
              this.experiment = data.list
              console.log(data)
            }else{
               alert("服务器错误")
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
    position: fixed;
    top: 55px;
    left:0;
    right:0;
    bottom: 50px;
    background-color: white;
    .testType{
      width:720rem/$rem;
      /*<!--height: 495rem/$rem;-->*/
      margin:10px auto;
      background-color: $bgColor2;
      .type{
        display: flex;
        justify-content: space-between;
        padding-top: 5px;
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
        padding-bottom: 3px;
        p{
          font-size: 28rem/$rem;
          color: #999999;
          padding-left: 15rem/$rem;
        }
        p.first{
          flex-basis: 200rem/$rem;
        }
        p:nth-child(2),p:nth-child(3){
          flex:1;
        }
      }
      .checkDoctor{
        text-align: right;
        p{
          font-size: 32rem/$rem;
          color: #333333;
          padding-right: 15rem/$rem;
        }
      }
      .detailTips{
        font-size: 28rem/$rem;
        color: #666666;
        padding-left: 15rem/$rem;
      }
      >p{
        font-size: 28rem/$rem;
        color: #999999;
        padding-left: 15rem/$rem;
      }
    }
    .blank{
      width:100%;
      height: 20rem/$rem;
      background-color: rgb(245,245,245);
    }
    .testInfo{
      width:720rem/$rem;
      margin: 0 auto;
      margin-top: 10px;
      background-color: $bgColor2;
      table{
        width:720rem/$rem;
        td{
          font-size: 28rem/$rem;
          color: #666666;
          text-align: center;
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
