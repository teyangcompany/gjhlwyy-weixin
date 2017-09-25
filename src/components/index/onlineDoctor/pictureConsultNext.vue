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
            <textarea  onselectstart="return false;" @keyup="keypress()" id="myArea" placeholder="请详细描述患者的主要症状、持续时间、已经确诊的疾病和接诊医生的意见。(如有症状照片、病历、检查单，可在下方上传)" v-model="description"></textarea>
          </div>
        </div>
        <div class="uploadWrap">
          <div class="upload">
            <div class="addPicture" v-for="(singleImage,index) in displayImg" v-if="displayImg.length != 0">
              <!--<span class="deleteImg">X</span>-->
              <img :src="singleImage" alt="" ref="replaceImg"  @click="makeBig(index)">
              <div class="mask" v-if="progress < 100"> </div>
            </div>
            <div class="addPicture" v-if="displayImg.length < 9">
              <input type="file" accept="image/*" name="upload" id="upload" ref="upload" multiple="multiple" @change="onFileChange">
              <img src="../../../../static/img/添加图片.png" alt=""  @click="selectImg()">
            </div>
            <div class="wordFor" v-if="displayImg.length == 0">
              <span>添加图片</span>
              <span>请上传患处图片,让医生更了解您的病情</span>
            </div>
          </div>
        </div>
      </div>
      <patient-toggle :patList="patientAll" :showPat="showPat" :option="patOption" @activate="check" @toggleClosed="closePatient()"></patient-toggle>
      <alert :firstLine="firstLine" :secondLine="secondLine" :bottomLine="bottomLine" v-if="showAlert" @on-iKnow="iKnow()"></alert>
      <v-dialog v-if="showDialog" @on-cancel="cancel()" @on-download="confirmDelete()" :dialogMain="dialogMain" :dialogLeftFoot="dialogLeftFoot" :dialogRightFoot="dialogRightFoot"></v-dialog>
      <div class="verifyTips" v-if="showVerify">
          <verify :verifyTips="verifyTips"></verify>
      </div>
      <div class="largeImg" v-if="showLarge">
        <div>
          <img :src="largeImg" alt="" @click="makeSmall">
        </div>
        <i class="weui-icon-delete weui-icon_gallery-delete" @click="deleteImg"></i>

      </div>
    </div>
  </transition>
</template>
<script>
  import header from '../../../base/header'
  import patientToggle from '../../../base/patientToggle'
  import Alert from '../../../base/alert'
  import Dialog from '../../../base/dialog'
  import api from '../../../lib/api'
  import upload from '../../../lib/upload'
  import verify from '../../../base/verify'
  import weui from 'weui.js'
  import {isLoginMixin} from "../../../lib/mixin"
  import {tokenCache} from '../../../lib/cache'
  export default{
    mixins: [isLoginMixin],
    data(){
      return{
        title:"图文问诊",
        rightTitle:'下一步',
        firstLine:"请详细填写您的症状，疾病和身体状况",
        secondLine:"",
        bottomLine:"确定",
        showAlert:false,
        dialogMain:"确定删除此照片",
        dialogLeftFoot:"取消",
        dialogRightFoot:"确定",
        showDialog:false,
        description:"",
        previewImg:"",
        displayImg:[],
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
        text:"",
        uploadTips:"",
        deleteImgIndex:"",
        progress:'',
        verifyTips:"图片已全部上传",
        showVerify:false,
        largeImg:"",
        showLarge:false,
        price:""
      }
    },
    created(){
      this.doctorId = this.$route.query.docId
      this.price = this.$route.query.price
      console.log(this.price)
      api("nethos.pat.info.get", {
        token:tokenCache.get()
      }).then((data) => {
        if (data.code == 0) {
          this.patientInfo = data.obj
          this.patId = data.obj.patId
          console.log(this.patientInfo)
          api("nethos.pat.compat.list",{
            token:tokenCache.get(),
            patId:this.patId
          }).then((data)=>{
             if(data.code == 0){
               this.patientAll = data.list
               console.log(this.patientAll)
             }else if(!(data.msg)){
                 weui.alert("网络错误，请稍后重试")
             }else{
                 weui.alert(data.msg)
             }
          })
        } else {
          this.$router.push({
            path:"/bindRelativePhone",
            query:{backPath:this.path}
          });
        }
      })



//      api("nethos.pat.info.get",{
//        token:localStorage.getItem("token")
//      }).then((data)=>{
//
//      })
    },
    methods:{
      keypress(){
            this.text = document.getElementById("myArea").value
             this.textLength = this.text.length
             if(this.textLength > 500){
               document.getElementById("myArea").value = this.text.substr(0,500)
               weui.alert("字数不能超过500")
             }
      },
      cancel(){
        this.showDialog = false
      },
      confirmDelete(){
         this.displayImg.splice(this.deleteImgIndex,1)
         this.attaId.splice(this.deleteImgIndex,1)
         this.$set(this.$data,'displayImg',this.displayImg)
         this.showDialog = false
         this.showLarge = false
      },
      makeBig(index){
        this.deleteImgIndex = index
         this.largeImg = this.displayImg[index]
        this.showLarge = true
      },
      makeSmall(){
        this.showLarge = false
      },
      deleteImg(index){
//          console.log(index)
//          this.deleteImgIndex = index
          if(this.uploadTips = '上传完毕'){
            this.showDialog = true
          }
      },
      goAlert(){
        weui.alert("字数不能超过500")
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
              token:tokenCache.get(),
              docId:this.doctorId,
              consulterName:this.patientAll[this.chosedIndex].compatName,
              consulterIdcard:this.patientAll[this.chosedIndex].compatIdcard,
              consulterMobile:this.patientAll[this.chosedIndex].compatMobile,
              consultContent:this.description,
              attaIdList:this.attaId,
            }).then((data)=>{
              if(data.code == 0){
                this.consultId = data.obj.consultId

                if(this.price == 0){
                    api("nethos.consult.info.pay",{
                      consultId:this.consultId,
                      payChannel:"WECHAT"
                    }).then((data)=>{
                        console.log(data)
                        if(data.code == 0){
                            this.$router.push({
                              path:"/allConsultSuccess",
                              query:{consultId:this.consultId}
                            })
                        }else if(data.code == -2){
                            weui.alert("当前订单已支付")
                        }else{
                            weui.alert(data.msg)
                        }
                    })
                }else{
                  this.$router.push({
//                  path:"/videoPay",
                    path:"/videoPay",
                    query:{
                      consultId:this.consultId
                    }
                  })
                }
                console.log("成功")
                console.log(data)
              }else{
                  weui.alert(data.msg)
              }
            })
          }

      },
      selectImg(e){
        if(this.displayImg.length < 9){
          this.$refs.upload.click()
        }else{
          this.showAlert = true
        }
      },
      onFileChange(e){
        console.log(e)
        var file = e.target.files
        if(this.displayImg.length + file.length > 9){
            weui.alert("最多只可上传九张照片")
        }else{
          this.createImage(file,file.length)
        }
      },
      createImage(file,i){
        if(i>9){
            weui.alert("最多只可上传九张照片")
        }else if(i<=0){
          return
        }else{
          if(typeof FileReader === "undefined"){
            weui.alert("您的浏览器不支持图片上传，请升级您的浏览器")
            return false
          }else{
            let reader = new FileReader()
            reader.readAsDataURL(file[i-1])
            this.fileName = file[i-1].name
            let that =this
            reader.onload = function () {
              that.previewImg = this.result

              that.displayImg.push(that.previewImg)



              let xhr = new XMLHttpRequest()
              let formData = new FormData()
              formData.append("file",file[i-1])
              for(let key in upload.base){
                formData.append(key,upload.base[key])
              }
              xhr.open('POST','https://nethos.diandianys.com/api/app')
              xhr.setRequestHeader('sign','test')
              xhr.upload.onprogress = function(event){
//                var done = e.position || e.loaded, total = e.totalSize || e.total;
                console.log( Math.floor(event.loaded / event.total * 100));
                that.progress = Math.floor(event.loaded / event.total * 100)

              }
              xhr.onreadystatechange = function(e){
                  if(xhr.readyState == 4){
                      if(xhr.status == 200){
                          let ret = xhr.response || xhr.responseText || {}
                          ret = typeof ret == 'string' ? JSON.parse(ret) : ret;
                          if(ret.code == 0){
                              console.log(ret,666)

                            that.attaId.push(ret.obj.attaId)
                             that.createImage(file,--i)
                          }
                          console.log(i)
                          if(i ==0){
                            that.uploadTips = '上传完毕'
                            that.showVerify = true
                            setTimeout(()=>{
                              that.showVerify = false
                            },2000)

                          }
                      }
                  }
              }
              xhr.send(formData)


//              api("nethos.system.atta.upload.image.base64",{
//                base64:that.previewImg,
//                originalName:that.fileName
//              }).then((data)=>{
//                  if(data.code == 0){
//                    that.attaId.push(data.obj.attaId)
//                    that.displayImg.push(that.previewImg)
//                    console.log(i)
//                  }
//                that.createImage(file,--i)
//                console.log(data.obj.attaId)
//                console.log("123")
//                if(i = 1){
//                     this.uploadTips = '上传完毕'
//                }
//              })
            }
//            console.log(this.previewImg)
          }
        }
      },
    },
    components:{
      "VHeader":header,
      patientToggle,
      Alert,
      "VDialog":Dialog,
      verify
    },
    watch:{
      description(){
        this.text = document.getElementById("myArea").value
        this.textLength = this.text.length
        if(this.textLength > 500){
          document.getElementById("myArea").value = this.text.substr(0,500)
          weui.alert("字数不能超过500")
        }
      }
    }
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
  .largeImg{
    position: fixed;
    left:0;
    right:0;
    top:0px;
    bottom:0px;
    display: flex;
    z-index:1000;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #666666;
    >div{
      position: absolute;
      top: 50px;
      bottom: 50px;
      display: flex;
      /*background-color: #3CC51F;*/
      align-items: center;
      img{
        width:100%;
      }
    }
    i{
      position: fixed;
      left:47%;
      bottom: 10px;
    }
  }
  .verifyTips{
    position: fixed;
    left:0;
    right:0;
    top:0;
    bottom:0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .want{
    /*position: fixed;*/
    /*top: 50px;*/
    /*bottom:0;*/
    /*left:0;*/
    /*right:0;*/
    /*<!--background-color: $bgColor1;-->*/
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
        position: relative;
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
        div.mask{
          width: 140rem/$rem;
          height: 140rem/$rem;
          position: absolute;
          top:0rem/$rem;
          opacity: 0.5;
          background-color: rgba(0, 0, 0, .4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index:100;
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
