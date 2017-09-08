<template>
  <transition name="slide">
    <div>
      <v-header :title="title" :rightTitle="rightTitle" @on-pay="goPay()" v-if="textLength <=500"></v-header>
      <v-header :title="title" :rightTitle="rightTitle" @on-pay="goAlert()" v-else></v-header>
      <div class="want">
        <!--<div class="basic border-1px">-->
          <!--<div>-->
            <!--选择就诊人：-->
          <!--</div>-->
        <!--</div>-->
        <div class="illness border-1px" @click="selectPatient">
          <div>
            选择就诊人：
            <div v-if="patientAll != ''">
              <span>{{patientAll[chosedIndex].compatName}} {{ (patientAll[chosedIndex].compatGender == "M")  ? "男":"女" }} {{ patientAll[chosedIndex].compatAge }} </span>
              <img src="../../../../static/img/查看更多.png" alt="">
            </div>
          </div>
        </div>
        <div class="basic border-1px">
          <div>
            填写病情资料 <span> {{ textLength }}/500</span>
          </div>
        </div>
        <div class="detail border-1px">
          <div class="detailInput">
            <textarea  @keyup="keypress()" id="myArea" placeholder="请详细描述患者的主要症状、持续时间、已经确诊的疾病和接诊医生的意见。(如有症状照片、病历、检查单，可在下方上传)" v-model="description"></textarea>
          </div>
        </div>
        <div class="uploadWrap">
          <div class="upload">
            <div class="addPicture" v-for="(singleImage,index) in previewImg" v-if="previewImg.length != 0">
              <!--<span class="deleteImg">X</span>-->
              <img :src="singleImage" alt="" ref="replaceImg" @click="makeLarge(index)">
            </div>
            <div class="addPicture">
              <input type="file" name="upload" id="upload" ref="upload" multiple="multiple" @change="onFileChange">
              <img src="../../../../static/img/添加图片.png" alt=""  @click="selectImg()">
            </div>
            <div class="wordFor" v-if="!previewImg">
              <span>添加图片</span>
              <span>请上传患处图片,让医生更了解您的病情</span>
            </div>
          </div>
        </div>
      </div>
      <patient-toggle :patList="patientAll" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closePatient()"></patient-toggle>
      <alert :firstLine="firstLine" :secondLine="secondLine" :bottomLine="bottomLine" v-if="showAlert" @on-iKnow="iKnow()"></alert>
    </div>
  </transition>
</template>
<script>
  import header from '../../../base/header'
  import patientToggle from '../../../base/patientToggle'
  import Alert from '../../../base/alert'
  import api from '../../../lib/api'
  export default{
    data(){
      return{
        title:"图文问诊",
        rightTitle:'下一步',
        firstLine:"请详细填写您的症状，疾病和身体状况",
        secondLine:"",
        bottomLine:"确定",
        showAlert:false,
        description:"",
        previewImg:[],
        patOption:"请选择就诊人",
        patientAll:[],
        showPat:false,
        displayPatient:"",
        chosedIndex:0,
        patientInfo:"",
        patId:"",
        attaId:[],
        doctorId:"",
        consultId:"",
        fileName:[],
        fileLegth:"",
        textLength:0,
        text:""
      }
    },
    created(){
       this.doctorId = this.$route.query.docId
      api("nethos.pat.info.get",{
        token:localStorage.getItem("token")
      }).then((data)=>{
        this.patientInfo = data.obj
        this.patId = data.obj.patId
        console.log(this.patientInfo)
        api("nethos.pat.compat.list",{
          token:localStorage.getItem("token"),
          patId:this.patId
        }).then((data)=>{
          this.patientAll = data.list
          console.log(this.patientAll)
        })
      })
    },
    methods:{
      keypress(){
            this.text = document.getElementById("myArea").value
             this.textLength = this.text.length
             if(this.textLength > 500){
               document.getElementById("myArea").value = this.text.substr(0,500)
               alert("字数不能超过500")
             }
      },
      goAlert(){
        alert("字数不能超过500")
      },
      selectPatient(){
        this.showPat=true;
      },
      check(item){
        this.showPat=false;
        this.chosedIndex=item;
      },
      closePatient(){
        this.showPat=false;
      },
      iKnow(){
         this.showAlert = false
      },
      goPay(){
          if(this.description == ''){
              this.showAlert = true
          }else{
            console.log("1232413245354364642343243214241")
            api("nethos.consult.info.docpic.issue",{
              token:localStorage.getItem("token"),
              docId:this.doctorId,
              consulterName:this.patientAll[this.chosedIndex].compatName,
              consulterIdcard:this.patientAll[this.chosedIndex].compatIdcard,
              consulterMobile:this.patientAll[this.chosedIndex].compatMobile,
              consultContent:this.description,
              attaIdList:this.attaId,
            }).then((data)=>{
              if(data.code == 0){
                this.consultId = data.obj.consultId
                this.$router.push({
//                  path:"/videoPay",
                  path:"/videoPay",
                  query:{
                    consultId:this.consultId
                  }
                })
                console.log("成功")
                console.log(data)
              }
            })
          }

      },
      selectImg(e){
        if(this.previewImg.length < 9){
          this.$refs.upload.click()
        }else{
          this.showAlert = true
        }
      },
      onFileChange(e){
        console.log(e)
        var file = e.target.files
        this.createImage(file)
      },
      createImage(file){
        if(typeof FileReader === "undefined"){
          alert("您的浏览器不支持图片上传，请升级您的浏览器")
          return false
        }
        this.fileLegth = file.length
        let that = this
        var q = d3.queue()
        for(var i=0;i<file.length;++i){


              let reader = new FileReader()
              reader.readAsDataURL(file[i])
              that.fileName.push(file[i].name)
          q.defer(  function() {  (function(i) {
              reader.onload = function () {
                that.previewImg.push(this.result)

                    api("nethos.system.atta.upload.image.base64", {
                      base64: that.previewImg[i],
                      originalName: that.fileName[i]
                    })
//                      .then((data) => {
////                console.log(that.previewImg[i])
//                      console.log(that.fileName[i])
//                      console.log(data)
//                      console.log(i)
//                      console.log(data.obj.attaId)
//                      that.attaId.push(data.obj.attaId)
////                console.log(that.attaId)
//                    })




              }
              })(i)
          })
        }
        q.await(function(error,data) {
          if (error) throw error;
          console.log(data)
          console.log("Goodbye!");
        });
        console.log(that.fileName)
        console.log(that.previewImg)



      },
    },
    components:{
      "VHeader":header,
      patientToggle,
      Alert
    },
//    watch:{
//      textLength(){
//        if(this.textLength>500){
//          document.getElementById("myArea").value = this.text.substr(0,500)
//        }
//      }
//    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .want{
    position: fixed;
    top: 50px;
    bottom:0;
    left:0;
    right:0;
    background-color: $bgColor1;
    .basic,.illness,.history,.family,.alergic,.record{
      width: 100%;
      height: 90rem/$rem;
      background-color: white;
      >div{
        width: 690rem/$rem;
        height: 90rem/$rem;
        font-family: PingFangSC;
        font-size: 32rem/$rem;
        color: #333333;
        margin:0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >div{
          span{
            font-size: 32rem/$rem;
            color: #666666;
            font-family: PingFangSC;
            display: inline-block;
            margin:0;
          }
          img{
            width: 7.5px;
          }
        }
      }
    }
    .basic,.record{
      /*background-color: rgb(245,245,245);*/
    }
    .basic{
      height:80rem/$rem;
      >div{
        font-size: 32rem/$rem;
        font-family: PingFangSC;
        color: #333333;
      }
    }
    .detail{
      width:100%;
      height:230rem/$rem;
      background-color: white;
      padding-top: 5px;
      .detailInput{
        width: 690rem/$rem;
        height: 230rem/$rem;
        border-radius: 10px;
        margin:0 auto;
        textarea{
          width: 690rem/$rem;
          height:230rem/$rem;
          border:none;
          resize: none;
          outline: medium;
          font-size: 32rem/$rem;
          color: #333333;
        }
        ::-webkit-input-placeholder{
          font-size: 28rem/$rem;
        }
      }
    }
    .uploadWrap{
      width:100%;
      height:560rem/$rem;
      background-color: white;
    }
    .upload{
      width: 690rem/$rem;
      height: 560rem/$rem;
      border-radius: 10px;
      word-break: break-all;
      position: relative;
      margin: 0 auto;
      padding-top: 15px;
      /*display: flex;*/
      .addPicture{
        float: left;
        margin-right: 16.2px;
        .deleteImg{
          position: absolute;
          top:0;
          left:0;
          background-color: #E64340;
        }
        >input{
          display: none;
        }
        img{
          width: 140rem/$rem;
          height: 140rem/$rem;
        }
      }
      .wordFor{
        span:first-child{
          font-size: 32rem/$rem;
          color: #333333;
          display: block;
        }
        span:last-child{
          font-size: 28rem/$rem;
          display: block;
          margin-top: 14.5px;
          color: #999999;
        }
      }
    }
  }
  .ratings{
    color: #FF9900!important;
  }
  .number{
    color: #3399FF!important;
  }
  .green{
    color: green!important;
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform:  translate3d(100%,0,0);
  }
</style>
