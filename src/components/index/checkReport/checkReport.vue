<template>
  <transition name="slide">
    <div>
      <v-header :title="title" :rightTitle="rightTitle" @on-check="goCheck()" @on-index="goIndex()"></v-header>
      <div class="usual" v-if="allPatient">
        <div  class="usualLine">
          <div class="usualCenter">
            <ul >
              <li>{{ allPatient[index].compatName }} <span>&nbsp;&nbsp; {{allPatient[index].compatAge}} &nbsp;&nbsp;{{allPatient[index].compatGender == 'M'? '男':'女'}}</span></li>
              <li>身份证号： <span>{{ allPatient[index].compatIdcard }}</span></li>
              <li>电话号码：<span>{{allPatient[index].compatMobile}}</span></li>
              <li v-if="!(allPatient[index].compatMedicalRecord)">病&nbsp;&nbsp;案&nbsp;号：<span>暂未绑定病案号</span></li>
              <li v-else>病&nbsp;&nbsp;案&nbsp;号：<span>{{ allPatient[index].compatMedicalRecord }}</span></li>
            </ul>
          </div>
        </div>
        <span @click="goUsual()" class="change">切换就诊人</span>
      </div>
      <v-dialog :dialogTitle="dialogTitle"
                :dialogMain="dialogMain"
                :dialogLeftFoot="dialogLeftFoot"
                :dialogRightFoot="dialogRightFoot"
                v-if="showDialog"
                @on-cancel="cancelDialog" @on-download="bindCard"></v-dialog>
      <div class="emptyHistory" v-if="fail">
        <bind-fail :title="failDes" :failKnow="failKnow" :failDetail="alertStatus"  @on-iSee="iSee()"></bind-fail>
      </div>
      <div class="emptyHistory" v-if="successDisplay">
        <bind-success :title="description" :illNumber="alertStatus" :failKnow="failKnow" @on-iSee="iSee()"></bind-success>
      </div>
      <toast v-if="showToast"></toast>
      <v-mask v-if="fail || successDisplay"></v-mask>
    </div>
  </transition>
</template>
<script>
  import header from '../../../base/header'
  import api from '../../../lib/api'
  import Dialog from '../../../base/dialog'
  import bindSuccess from '../../../base/bindSuccess/bindSuccess'
  import bindFail from '../../../base/bindFail/bindFail'
  import VMask from '../../../base/mask'
  import Toast from '../../../base/toast'
  export default{
    data(){
      return{
        title:"查报告单",
        rightTitle:"查询",
        allPatient:"",
        index:0,
        dialogTitle:"",
        dialogMain:"该就诊人没有绑定病案号，无法执行该操作",
        dialogLeftFoot:"取消",
        dialogRightFoot:"去绑卡",
        showDialog:false,
        fail:false,
        successDisplay:false,
        showToast:false,
        alertStatus:"",
        description:"绑定成功，您的病案号是：",
        failDes:"未查询到病案号",
        failDetail:"请保证该就诊人姓名、身份证号、手机和医院留的一致；如真实信息发生变化、请前往医院窗口修改",
        failDetailSecond:"若该就诊人未在医院建档，请前往医院窗口办理",
        failKnow:"我知道了",
        illNumber:"314324",
      }
    },
    created(){

      if(this.$route.query.index){
        this.index = this.$route.query.index
      }else{
        this.index= 0
      }
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
    methods:{
      cancelDialog(){
        this.showDialog = false
      },
      bindCard(){
        this.showDialog = false
        this.showToast = true
        api("nethos.book.compat.bind",{
          token:localStorage.getItem("token"),
          compatId:this.allPatient[this.index].compatId
        }).then((data)=>{
          this.alertStatus = data.msg
          this.showToast = false
          if(data.code == 0){
            this.fail = false
            this.successDisplay = true
          }else{
            this.successDisplay = false
            this.fail = true
          }
          console.log(data)
        })
      },
      iSee(){
        this.successDisplay = false
        this.fail = false
      },
      goCheck(){
         if(!(this.allPatient[this.index].compatMedicalRecord)){
           this.showDialog = true
         }else{
           this.$router.push({
             path:'/checkSortList',
             query:{specialIndex:this.index,patCard:this.allPatient[this.index].compatMedicalRecord,compatId:this.allPatient[this.index].compatId}
           })
         }
      },
      goUsual(){
        this.$router.push('/checkTogglePatient')
      },
      goIndex(){
//          this.$router.push('/myProfile/index')
      }
    },
    components:{
      "VHeader":header,
      "VDialog":Dialog,
        bindSuccess,
        VMask,
        bindFail,
        Toast
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .emptyHistory{
    position: absolute;
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation:makeBigger 0.6s;
    @keyframes makeBigger {
      0%{
        transform: scale(0.5);
      }
      25%{
        transform: scale(0.9);
      }
      50%{
        transform: scale(1.3);
      }
      75%{
        transform: scale(0.9);
      }
      100%{
        transform: scale(1.0);
      }
    }
  }
  .usual{
    width:100%;
    height: 100%;
    position: fixed;
    top: 50px;
    background-color: white;
    .usualLine{
      width:100%;
      background-color: white;
    }
    .usualCenter{
      width:690rem/$rem;
      margin:0 auto;
      /*margin-top: 5px;*/
      background-color: white;
      ul{
        margin:0;
        padding:0;
        margin-top: 10px;
        li{
          list-style-type: none;
          height:80rem/$rem;
          line-height: 80rem/$rem;
          margin-top: 1px;
          background-color: $bgColor2;
          font-size: 32rem/$rem;
          padding-left: 10px;
          span{
            font-size: 32rem/$rem;
            color: #999999;
          }
        }
        li:first-child{
          border-top-left-radius: 7px;
          border-top-right-radius: 7px;
        }
        li:last-child{
          border-bottom-left-radius: 7px;
          border-bottom-right-radius: 7px;
        }
      }
    }
    span.change{
      padding-left: 50rem/$rem;
      font-size: 32rem/$rem;
      color: $mainColor;
    }
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
    opacity: 1;
  }
  .slide-enter,.slide-leave-to{
    transform:  translate3d(100%,0,0);
    opacity: 1;
  }
</style>
