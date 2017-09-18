<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="reportDetail">
      <div class="testType" v-if="allPatient">
        <div class="type">
          <h4>[医疗名称]</h4>
        </div>
        <div class="name">
          <p class="first">姓名:{{allPatient[specialIndex].compatName}}</p>
          <p>送检医生:{{ reportInfoArray[index].sendDoc }}</p>
        </div>
        <div class="name">
          <p class="first">性别:{{allPatient[specialIndex].compatGender == 'F'?'女':'男'}}</p>
          <p>检验医生:</p>
        </div>
        <div class="name">
          <p class="first">年龄:{{allPatient[specialIndex].compatAge}}</p>
          <p>审核医生:{{ reportInfoArray[index].examineDoc }}</p>
        </div>
        <p>采集日期:</p>
        <p>检验日期:{{ reportInfoArray[index].checkTime }}</p>
        <div class="detailTips">
          <p>具体报告信息请以医院纸质报告为准！</p>
        </div>
      </div>
      <div class="blank"></div>
      <div class="testInfo">
        <div class="result">
          <h5>检验结果:</h5>
          <p>{{ reportInfoArray[index].checkResult }}</p>
        </div>
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
        reportInfoArray:"",
        index:"",
        allPatient:"",
        specialIndex:""
      }
    },
    created(){
        this.reportInfoArray = JSON.parse(this.$route.query.reportInfoString)
        this.index = this.$route.query.index
        this.specialIndex = this.$route.query.specialIndex
        console.log( this.index)
        console.log(this.reportInfoArray)
        api("nethos.pat.compat.list",{
          token:localStorage.getItem("token")
        }).then((data)=>{
          this.allPatient=data.list
  //        this.changeName = this.allPatient[this.index].compatName
  //        this.changeID = this.allPatient[this.index].compatIdcard
  //        this.compatId = this.allPatient[this.index].compatId
          console.log(data.list)
      })
    },
    components:{
      "VHeader":header
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
    bottom:0;
    background-color: rgb(250,250,250);
    .testType{
      width:750rem/$rem;
      height: 240px;
      margin:0 auto;
      background-color: #ffffff;
      .type{
        display: flex;
        justify-content: space-between;
        padding-top: 15rem/$rem;
        h4{
          font-weight:normal;
          font-size: 32rem/$rem;
          color: #333333;
          padding-left: 15rem/$rem;
          padding-bottom: 5px;
        }
        p{
          font-size: 32rem/$rem;
          color: #333333;
          padding-left: 15rem/$rem;
        }
      }
      .name{
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
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
      .detailTips{
        font-size: 28rem/$rem;
        color: #666666;
        padding-left: 15rem/$rem;
        margin-top: 10px;
      }
      >p{
        font-size: 28rem/$rem;
        color: #999999;
        padding-left: 15rem/$rem;
        margin-bottom: 3px;
      }
    }
    .blank{
      width:100%;
      height: 20rem/$rem;
      background-color: rgb(245,245,245);
    }
    .testInfo{
      width:750rem/$rem;
      height: 500px;
      margin: 0 auto;
      background-color: #ffffff;
      .result,.resultDes{
        h5{
          font-weight: normal;
          color: #333333;
          font-size: 32rem/$rem;
          padding-left: 15rem/$rem;
        }
        p{
          font-size: 32rem/$rem;
          color: #999999;
          padding-left: 15rem/$rem;
        }
      }
      .result{
        padding-top: 5px;
      }
      .resultDes{
         margin-top: 10px;
      }
    }
  }
</style>
