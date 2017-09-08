<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle" @on-detail="detail()"></v-header>
    <div class="recordDetail">
      <div class="wrapTime border-1px" @click="selectOther()">
        <div class="timeCenter">
          日期
          <div v-if="date == ''">
            {{ time }}
            <img src="../../../../static/img/查看更多.png" alt="">
          </div>
          <div  v-else>
            {{date[0].label + date[1].label + date[2].label}}
            <img src="../../../../static/img/查看更多.png" alt="">
          </div>
        </div>
      </div>
      <div class="wrapInput border-1px">
        <div class="inputTitle">
          请输入病历详情
        </div>
      </div>
      <div class="wrapText border-1px">
        <div>
          <textarea v-model="text" placeholder="请详细描述您的症状、疾病和身体情况。(请放心您的个人信息不会泄露)"></textarea>
        </div>
      </div>
      <!--<div class="upload">-->
        <!--<div class="addPicture" v-for="(singleImage,index) in previewImg" v-if="previewImg.length != 0">-->
          <!--&lt;!&ndash;<span class="deleteImg">X</span>&ndash;&gt;-->
          <!--<img :src="singleImage" alt="" ref="replaceImg" @click="makeLarge(index)">-->
        <!--</div>-->
        <!--<div class="addPicture">-->
          <!--<input type="file" name="upload" id="upload" ref="upload" @change="onFileChange">-->
          <!--<img src="../../../../static/img/添加图片.png" alt=""  @click="selectImg()">-->
        <!--</div>-->
        <!--<div class="wordFor">-->
          <!--<span>添加图片</span>-->
          <!--<span>请上传患处图片,让医生更了解您的病情</span>-->
        <!--</div>-->
      <!--</div>-->
      <div class="addImg">
        <upload v-on:getAttaIdsList="getAttaIdsList"></upload>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from '../../../base/header'
  import weui from 'weui.js'
  import {getCurrentTime} from '../../../utils/getTime.js'
    import api from '../../../lib/api'
  import upload from '../../../base/upload.vue'
  export default{
    data(){
      return{
        title:'添加病历',
        rightTitle:'保存',
        time:"",
        date:"",
        previewImg:[],
        attaId:[],
        patId:'',
        text:'',
        times:''
      }
    },
    mounted(){
      this.time = getCurrentTime();
      this.times = this.time;
     this.patId=this.$route.query.patId;
      console.log(this.patId,3333)
    },
    methods:{
      getAttaIdsList(value){
        console.log(value,88888)
        this.$set(this.$data,'attaId',value)
      },
      selectOther(){
        let that =this
        weui.datePicker({
          start: new Date(),
          end: 2030,
          defaultValue: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()],
          onChange: function(result){
          },
          onConfirm: function(result){

            var timess = result[0].value+'-'+result[1].value+'-'+result[2].value
             var times = Date.parse(new Date(timess))/1000
            that.$set(that.$data,'date',result);
            that.$set(that.$data,'times',times);
            console.log(that.times,55555);
          },
        })
      },
      detail(){
        console.log(this.patId,2222);
        api('nethos.pat.medicalhistroy.add',{
          patId:this.patId,
          medicalContent:this.text,
          attaIdList:this.attaId,
          medicalTime:this.times,
          "token":localStorage.getItem('token')
        }).then(res=>{
          console.log(res,11111);
          if(res.succ){
             this.$router.push('/detailPage')
          }else {
            alert(res.msg)
          }
        })

      },
      selectImg(e){
        this.$refs.upload.click()
      },
      onFileChange(e){
        console.log(e)
        var file = e.target.files[0]
        this.createImage(file)
      },
      createImage(file){
        if(typeof FileReader === "undefined"){
          alert("您的浏览器不支持图片上传，请升级您的浏览器")
          return false
        }
        let that = this;
        let fileName = file.name
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function(){
          that.previewImg.push(this.result);
          api("nethos.system.atta.upload.image.base64",{
            base64:this.result,
            originalName:fileName
          }).then((data)=>{
            console.log(data,77777)
            that.attaId.push(data.obj.attaId)

          console.log( that.attaId,33333)
        })
        }
      },
    },
    components:{
      'VHeader':header,
      upload
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  @import '../../../common/mixin.scss';
  .recordDetail{
    width:100%;
    position: fixed;
    top: 50px;
    bottom:0;
    left:0;
    right:0;
    background-color: white;
    .upload{
      width: 690rem/$rem;
      height: 460rem/$rem;
      border-radius: 10px;
      word-break: break-all;
      position: relative;
      margin: 30rem/$rem auto;
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
    .wrapTime{
      width:100%;
      height: 90rem/$rem;
      .timeCenter{
        width: 690rem/$rem;
        height: 90rem/$rem;
        margin:0 auto;
        display: flex;
        align-items:center;
        font-size: 32rem/$rem;
        color: #333333;
        justify-content: space-between;
        >div{
          font-size: 32rem/$rem;
          color: #333333;
          img{
            width: 15rem/$rem;
            display: inline-block;

          }
        }
      }
    }
    .wrapInput{
      width:100%;
      height: 90rem $rem;
      .inputTitle{
        width: 690rem/$rem;
        height: 90rem/$rem;
        line-height: 90rem/$rem;
        margin:0 auto;
        font-size: 32rem/$rem;
        color: #333333;
      }
    }
    .wrapText{
      width:100%;
      height: 300rem/$rem;
      >div{
        width: 690rem/$rem;
        margin:0 auto;
        textarea{
          width: 690rem/$rem;
          height: 300rem/$rem;
          resize: none;
          border:none;
          outline:medium;
          padding-top: 30rem/$rem;
          font-size: 28rem/$rem;
          line-height: 42rem/$rem;
          color: #999999;
          box-sizing: border-box;
        }
      }
    }
    .wrapImg{
      width:100%;
      >div{
        width: 690rem/$rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        img{
          width: 140rem/$rem;
          height: 140rem/$rem;
          display: inline-block;
          margin-top: 30rem/$rem;
          margin-right: 24rem/$rem;
        }
        div.uploadTip{
          margin-left: 30rem/$rem;
          h3{
            font-size: 28rem/$rem;
            color: #333333;
            font-weight: normal;
          }
          h5{
            font-size: 24rem/$rem;
            color: #999999;
            margin-top: 20rem/$rem;
            font-weight: normal;
          }
        }
      }
    }

  }
</style>
