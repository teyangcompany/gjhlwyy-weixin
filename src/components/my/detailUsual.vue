<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle" @on-changePatient="goChangePatient()"></v-header>
    <div class="verifyArea" v-if="allPatient != ''">
      <div class="formContent nameContent">
        <div class="form phone">
          <label for="">姓名：</label>
          <input  v-if="allPatient[index].compatMedicalRecord" readonly="readonly" type="text" placeholder="请输入真实的姓名"  :value="changeName" v-model="changeName">
          <input  v-else type="text" placeholder="请输入真实的姓名"  :value="changeName" v-model="changeName">
        </div>
        <div class="form verifyCode">
          <label for="">身份证：</label>
          <input v-if="allPatient[index].compatMedicalRecord" readonly="readonly" type="text" placeholder="请输入真实的身份证号" :value="changeID" v-model="changeID">
          <input v-else type="text" placeholder="请输入真实的身份证号" :value="changeID" v-model="changeID">
        </div>
      </div>
      <div class="usual">
        <router-link tag="div" to="/detailUsual" class="usualLine">
          <div class="usualCenter">
            <ul>
              <router-link tag="li" :to="{path:'/changePhone',query:{index:index}}">电话号码：<span>{{allPatient[index].compatMobile}}</span></router-link>
              <li>年龄： <span>{{allPatient[index].compatAge}} &nbsp;&nbsp;</span></li>
              <li>性别： <span>{{allPatient[index].compatGender == 'M'? '男':'女'}}</span></li>
              <li v-if="allPatient[index].compatMedicalRecord">病案号： <span>{{allPatient[index].compatMedicalRecord}}</span></li>
            </ul>
          </div>
        </router-link>
      </div>
      <div class="bindNumber" @click="bindSuccess()" v-if="!(allPatient[index].compatMedicalRecord)">
           + 绑定病案号
      </div>
    </div>
    <div class="deletePatient" @click="deletePatient()">
        <img src="../../../static/img/错误-拷贝.png" alt="">删除就诊人
    </div>
    <div class="emptyHistory" v-if="fail">
      <bind-fail :title="failDes" :failKnow="failKnow" :failDetail="alertStatus"  @on-iSee="iSee()"></bind-fail>
    </div>
    <div class="emptyHistory" v-if="success">
      <bind-success :title="description" :illNumber="alertStatus" :failKnow="failKnow" @on-iSee="iSee()"></bind-success>
    </div>
      <v-mask v-if="fail || success"></v-mask>
    <alert :firstLine="firstLine" :secondLine="secondLine" :bottomLine="bottomLine" v-if="showAlert" @on-iKnow="iKnow()"></alert>
    <toast v-if="showToast"></toast>
    <v-dialog v-if="showDialog" @on-cancel="cancel()" @on-download="confirmDelete()" :dialogMain="dialogMain" :dialogLeftFoot="dialogLeftFoot" :dialogRightFoot="dialogRightFoot"></v-dialog>
  </div>
</template>
<script>
  import header from '../../base/header'
  import bindSuccess from '../../base/bindSuccess/bindSuccess'
  import bindFail from '../../base/bindFail/bindFail'
  import api from '../../lib/api'
  import VMask from '../../base/mask'
  import Alert from '../../base/alert'
  import Toast from '../../base/toast'
  import Dialog from '../../base/dialog'
  import weui from 'weui.js'
  import {tokenCache} from '../../lib/cache'
  export default{
    data(){
      return{
        title:"常用就诊人",
        rightTitle:"保存修改",
        fail:false,
        success:false,
        alertStatus:"",
        showToast:false,
        description:"绑定成功，您的病案号是：",
        failDes:"未查询到病案号",
        failDetail:"请保证该就诊人姓名、身份证号、手机和医院留的一致；如真实信息发生变化、请前往医院窗口修改",
        failDetailSecond:"若该就诊人未在医院建档，请前往医院窗口办理",
        failKnow:"我知道了",
        illNumber:"314324",
        firstLine:"",
        secondLine:"",
        bottomLine:"确定",
        showAlert:false,
        dialogMain:"确定删除就诊人",
        dialogLeftFoot:"取消",
        dialogRightFoot:"确定",
        showDialog:false,
        changeName:"",
        changeID:"",
        allPatient:[],
        index:"",
        compatId:""
      }
    },
    created(){
        this.index = this.$route.query.index
       api("nethos.pat.compat.list",{
         token:tokenCache.get()
       }).then((data)=>{
            if(data.code == 0){
              this.allPatient= data.list
              this.changeName = this.allPatient[this.index].compatName
              this.changeID = this.allPatient[this.index].compatIdcard
              this.compatId = this.allPatient[this.index].compatId
              console.log(data.list)
            }else{
                weui.alert(data.msg)
            }
       })
    },
    methods:{
      bindSuccess(){
          this.showToast = true
          api("nethos.book.compat.bind",{
            token:tokenCache.get(),
            compatId:this.allPatient[this.index].compatId
          }).then((data)=>{
            this.showToast = false
              if(data.code == 0){
                this.alertStatus = data.obj.compatMedicalRecord
                this.fail = false
                this.success = true
              }else{
                this.alertStatus = data.msg
                this.success = false
                this.fail = true
              }
              console.log(data)
          })
      },
      iSee(){
        this.success = false
        this.fail = false
      },
      iKnow(){
         this.showAlert = false
      },
      cancel(){
          this.showDialog= false
      },
      goChangePatient(){
          if(this.allPatient[this.index].compatMedicalRecord){
            this.showAlert = true
            this.secondLine = "不能修改已绑定病案号的就诊人信息"
          }else{
            api("nethos.pat.compat.modify",{
              token:tokenCache.get(),
              compatName:this.changeName,
              compatMobile:this.allPatient[this.index].compatMobile,
              compatIdcard:this.allPatient[this.index].compatIdcard,
              compatId:this.allPatient[this.index].compatId
            }).then((data)=>{
              console.log(this.changeName)
              console.log(this.allPatient[this.index].compatId)
              console.log(data)
              if(data.code == 0){
                this.$router.push('/usualPatient')
              }else{
                  weui.alert(data.msg)
              }
            })
          }
      },
      deletePatient(){
          console.log("123")
        this.showDialog= true
      },
      confirmDelete(){
        api("nethos.pat.compat.delete",{
          token:tokenCache.get(),
          compatId:this.allPatient[this.index].compatId
        }).then((data)=>{
          console.log(this.allPatient[this.index].compatId)
          console.log(data)
          if(data.code == 0){
            this.$router.push('/usualPatient')
          }else{
            this.firstLine = data.msg
            this.showAlert = true
          }
        })
        this.showDialog= false
      }

    },
    components:{
      "VHeader":header,
      bindSuccess,
      VMask,
      bindFail,
      Alert,
      Toast,
      "VDialog":Dialog
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .verifyArea{
    /*position: absolute;*/
    /*top: 50px;*/
    /*left:0;*/
    /*right:0;*/
    /*bottom:0;*/
    /*overflow: auto;*/
  }
  .deletePatient{
    /*position: absolute;*/
    /*bottom: 50px;*/
    width:100%;
    height:80rem/$rem;
    margin: 100px auto;
    font-size: 32rem/$rem;
    color: #333333;
    /*background-color: #3CC51F;*/
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width:50rem/$rem;
      margin-right: 5px;
    }
  }
  .emptyHistory{
    position: absolute;
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
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
  .formContent{
    width:690rem/$rem;
    margin: 10px auto;
    margin-bottom: 0;
    .form{
      width:690rem/$rem;
      height: 40px;
      line-height: 40px;
      margin-top: 1px;
      display: flex;
      background-color:$bgColor2;
      label{
        width: 165rem/$rem;
        font-size: 32rem/$rem;
        padding-left: 10px;
        color: #333333;
      }
      input{
        flex: 1;
        border: none;
        outline: medium;
        font-size: 32rem/$rem;
        color: #999999;
        background-color:$bgColor2;
      }
    }
    .phone{
      /*margin-top: 20px;*/
    }
    .verifyCode{
      position: relative;
    }
  }
  .usual{
    width:100%;
    /*height: 100%;*/
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
            margin-left: 7rem/$rem;
          }
        }
        li:last-child{
          border-bottom-left-radius: 7px;
          border-bottom-right-radius: 7px;
        }
      }
    }
  }
  .bindNumber{
    width:690rem/$rem;
    height:90rem/$rem;
    line-height: 90rem/$rem;
    margin: 10rem/$rem auto;
    text-align: center;
    color: $mainColor;
    font-size: 32rem/$rem;
    background-color: $bgColor2;
  }
</style>
