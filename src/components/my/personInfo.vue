<template>
    <div class="personInfo">
          <v-header :title="title" :rightTitle="rightTitle"></v-header>
          <div class="infoArea">
            <div class="weui-cells weuiMargin">
              <!--<a class="weui-cell weui-cell_access" href="javascript:;">-->
                <!--<div class="weui-cell__hd"></div>-->
                <!--<div class="weui-cell__bd">-->
                  <!--<p>头像</p>-->
                <!--</div>-->
                <!--<div class="weui-cell__ft">-->
                  <!--<img src="../../../static/img/p1.jpg" alt="" v-if="previewImg == ''">-->
                  <!--<img :src="previewImg" alt="" v-else>-->
                <!--</div>-->
              <!--</a>-->
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd">
                  <p>姓名</p>
                </div>
                <div class="weui-cell__ft">马建军</div>
              </a>
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd">
                  <p>性别</p>
                </div>
                <div class="weui-cell__ft">男</div>
              </a>
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd">
                  <p>年龄</p>
                </div>
                <div class="weui-cell__ft">28</div>
              </a>
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd">
                  <p>地区</p>
                </div>
                <div class="weui-cell__ft">浙江 杭州</div>
              </a>
              <div class="blank border-1px"></div>
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd">
                  <p>手机号</p>
                </div>
                <div class="weui-cell__ft">1432148132564315</div>
              </a>
              <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__hd"></div>
                <div class="weui-cell__bd">
                  <p>身份证号</p>
                </div>
                <div class="weui-cell__ft">4213143312424512535</div>
              </a>
            </div>
            <div class="blank border-1px"></div>
            <div class="bindNumber border-1px">
                 + 绑定病案号
            </div>
          </div>
    </div>
</template>
<script>
  import header from '../../base/header'
  export default{
      data(){
          return{
              title:"我",
              rightTitle:"",
              previewImg:""
          }
      },
      methods:{
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
            that.previewImg=this.result
          }
        },
      },
      components:{
          "VHeader":header
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public';
.personInfo{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color: white;
  .infoArea{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
    .bindNumber{
      margin-top: 10px;
      width:100%;
      height:80rem/$rem;
      text-align: center;
      font-size: 32rem/$rem;
      color: $mainColor;
    }
    .blank{
      width:100%;
      height: 20rem/$rem;
      background-color: rgb(245,245,245);
    }
    .weuiMargin{
      margin:0;
    }
    img{
      width:80rem/$rem;
      height:80rem/$rem;
      border-radius: 50%;
    }
  }
}
</style>
