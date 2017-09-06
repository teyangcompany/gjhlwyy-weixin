<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle" @on-success="success()"></v-header>
    <div class="recordDetail">
      <div class="wrapInput border-1px">
        <div class="inputTitle">
          请填写您的病情描述
        </div>
      </div>
      <div class="wrapText border-1px">
        <div>
          <textarea placeholder="请详细描述您的症状、疾病和身体情况。(请放心您的个人信息不会泄露)"></textarea>
        </div>
      </div>
      <div class="upload">
        <div class="addPicture" v-for="(singleImage,index) in previewImg" v-if="previewImg.length != 0">
          <!--<span class="deleteImg">X</span>-->
          <img :src="singleImage" alt="" ref="replaceImg" @click="makeLarge(index)">
        </div>
        <div class="addPicture">
          <input type="file" name="upload" id="upload" ref="upload" @change="onFileChange">
          <img src="../../../static/img/添加图片.png" alt=""  @click="selectImg()">
        </div>
        <div class="wordFor">
          <span>添加图片</span>
          <span>请上传患处图片,让医生更了解您的病情</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import weui from 'weui.js'
  import {getCurrentTime} from '../../utils/getTime'
  export default{
    data(){
      return{
        title:'填写就诊资料',
        rightTitle:'提交',
        time:"",
        date:"",
        previewImg:[],
      }
    },
    mounted(){
      this.time = getCurrentTime()
    },
    methods:{
      success(){
        this.$router.push('/submitSuccess')
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
        let that = this
        let fileName = file.name
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function(){
          that.previewImg.push(this.result)
        }
      },
    },
    components:{
      'VHeader':header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
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
          font-size: 32rem/$rem;
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
