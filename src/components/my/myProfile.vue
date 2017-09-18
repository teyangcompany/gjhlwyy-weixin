<template>
    <div>
        <v-header :title="title" :rightTitle="rightTitle" v-if="tellPath == '/myProfile'"></v-header>
        <v-header :title="healthTitle" :rightTitle="healthRightTitle" v-else-if="tellPath == '/myProfile/healthIndex'"></v-header>
        <v-header :title="healthTitle" :rightTitle="healthRightTitle" v-else-if="tellPath == '/myProfile/healthIndex'" @on-profile="goProfile()"></v-header>
        <!--<v-header :title="indexTitle" :rightTitle="indexRightTitle" v-else-if="tellPath == '/myProfile/index'" @on-look="look()"></v-header>-->
        <v-header :title="serviceTitle" :rightTitle="serviceRightTitle" v-else-if="tellPath == '/myProfile/serviceIndex'" @on-look="look()"></v-header>
        <div class="myArea">
          <div class="blank border-1px"></div>
          <div  class="avatar border-1px" >
            <div class="avatarCenter">
              <img class="profile" src="../../../static/img/p1.jpg" alt="" v-if="previewImg == ''" @click="selectImg()">
              <img class="profile" :src="previewImg" alt="" v-else @click="selectImg()">
              <input type="file" name="upload" id="upload" ref="upload" @change="onFileChange">
              <router-link tag="div" to="/personInfo" class="rightWord">
                <div v-if="patientInfo">
                  <span>姓名:{{ patientInfo.patName }}</span><span>{{ patientInfo.patGender == 'M' ? '男':'女' }} {{ patientInfo.age }}岁</span>
                </div>
                <img class="look" src="../../../static/img/查看更多.png" alt="">
              </router-link>
            </div>
          </div>
          <div class="blank border-1px"></div>
          <div class="weui-cells weuiMargin">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goMyConsult()">
              <div class="weui-cell__hd"><img src="../../../static/img/my/ic_interrogation@2x.png" alt="" style="width:20px;margin-right:7px;display:block"></div>
              <div class="weui-cell__bd">
                <p>我的问诊</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goMyBookNumber()">
              <div class="weui-cell__hd"><img src="../../../static/img/my/ic_register@2x.png" alt="" style="width:20px;margin-right:7px;display:block"></div>
              <div class="weui-cell__bd">
                <p>我的挂号</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goUsualPatient()">
              <div class="weui-cell__hd"><img src="../../../static/img/my/ic_Contacts@2x.png" alt="" style="width:20px;margin-right:7px;display:block"></div>
              <div class="weui-cell__bd">
                <p>常用就诊人</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goHealthFile()">
              <div class="weui-cell__hd"><img src="../../../static/img/my/ic_archives@2x.png" alt="" style="width:20px;margin-right:7px;display:block"></div>
              <div class="weui-cell__bd">
                <p>健康档案</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a>
            <div class="blank border-1px"></div>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goCostLog()">
              <div class="weui-cell__hd"><img src="../../../static/img/my/ic_consumption@2x.png" alt="" style="width:20px;margin-right:7px;display:block"></div>
              <div class="weui-cell__bd">
                <p>消费记录</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a>
            <div class="blank border-1px"></div>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goAccount()">
              <div class="weui-cell__hd"><img src="../../../static/img/my/我的收入.png" alt="" style="width:20px;margin-right:7px;display:block"></div>
              <div class="weui-cell__bd">
                <p>账户相关</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="userHelp">
              <div class="weui-cell__hd"><img src="../../../static/img/my/ic_help@2x.png" alt="" style="width:20px;margin-right:7px;display:block"></div>
              <div class="weui-cell__bd">
                <p>使用帮助</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goAbout()">
              <div class="weui-cell__hd"><img src="../../../static/img/my/ic_about@2x.png" alt="" style="width:20px;margin-right:7px;display:block"></div>
              <div class="weui-cell__bd">
                <p>关于</p>
              </div>
              <div class="weui-cell__ft"></div>
            </a>
          </div>
        </div>
        <router-view></router-view>
        <div class="footer border-1px-top">
          <router-link tag="div" :to="item.tabLink" v-for="item in bottomTags" :key="item.id">
            <img v-if="tellPath == '/myProfile'" :src="item.imgLastOn">
            <img v-else-if="tellPath == '/myProfile/healthIndex'" :src="item.imgLinkMyOn">
            <img v-else-if="tellPath == '/myProfile/index'" :src="item.imgLinkIndexOn">
            <img v-else-if="tellPath == '/myProfile/serviceIndex'" :src="item.imgLinkOn">
          </router-link>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import header from '../../base/header'
  import api from '../../lib/api'
  export default{
      data(){
          return{
              title:"我的",
              rightTitle:"",
              healthTitle:"健康资讯",
              healthRightTitle:"",
              serviceTitle:"服务",
              serviceRightTitle:"",
              indexTitle:"首页",
              indexRightTitle:"",
              patientInfo:"",
              bottomTags:[
                {tabLink:"/myProfile/index",imgLinkIndexOn:"./static/img/tab/home1.png",imgLinkOn:"./static/img/tab/honme.png",imgLinkMyOn:"./static/img/tab/honme.png",imgLastOn:"./static/img/tab/honme.png"},
                {tabLink:"/myProfile/serviceIndex",imgLinkIndexOn:"./static/img/tab/服务1.png",imgLinkOn:"./static/img/tab/服务.png",imgLinkMyOn:"./static/img/tab/服务1.png",imgLastOn:"./static/img/tab/服务1.png"},
                {tabLink:"/myProfile/healthIndex",imgLinkIndexOn:"./static/img/tab/健康资讯1.png",imgLinkOn:"./static/img/tab/健康资讯1.png",imgLinkMyOn:"./static/img/tab/健康资讯.png",imgLastOn:"./static/img/tab/健康资讯1.png"},
                {tabLink:"/Profile",imgLinkIndexOn:"./static/img/tab/mine1.png",imgLinkOn:"./static/img/tab/mine1.png",imgLinkMyOn:"./static/img/tab/mine1.png",imgLastOn:"./static/img/tab/mine.png"}
              ],
              tellPath:"",
              previewImg:""
          }
      },
      created(){
            api("nethos.pat.info.get",{
                token:localStorage.getItem("token")
            }).then((data)=>{
                this.patientInfo = data.obj
                console.log(data)
            })
      },
      methods:{
        userHelp(){
          this.$router.push({
            name:'userHelp'
          })
        },
        goAbout(){
            this.$router.push('/about')
        },
        goAccount(){
             this.$router.push('/accountAbout')
        },
        goMyWait(){
            this.$router.push('/myWait')
        },
        goMyBookNumber(){
            this.$router.push('/myBookNumber')
        },
        goUsualPatient(){
            this.$router.push('/usualPatient')
        },
        goHealthFile(){
            this.$router.push('/HealthFile')
        },
        goMyConsult(){
            this.$router.push('/myConsult/commented')
        },
        goCostLog(){
          this.$router.push('/expenseHistory')
        },
        goProfile(){
          this.$router.push('/myProfile/healthIndex/beautify')
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
            api("nethos.system.atta.upload.image.base64",{
              base64:this.result,
              originalName:fileName
            }).then((data)=>{
              console.log(data)
              that.$set(that.$data,'previewImg',data.obj.url)
              this.previewImg = data.obj.url
            })
          }
        },
      },
      components:{
          "VHeader":header
      },
      mounted(){
        this.$nextTick(()=>{
          this.tellPath = this.$route.path
        })
      },
      watch:{
        "$route":function(){
          this.tellPath = this.$route.path
        }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public';
.myArea{
  position: fixed;
  top: 50px;
  left:0;
  right:0;
  bottom:98rem/$rem;
  .avatar{
    width:100%;
    height:85px;
    background-color: white;
    .avatarCenter{
      width:690rem/$rem;
      height: 80px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .rightWord{
        height: 80px;
        width:690rem/$rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >div{
          display: flex;
          flex-direction: column;
        }
        img.look{
          width: 16rem/$rem;
          height: 20rem/$rem;
        }
        span{
          height: 25px;
          font-size: 32rem/$rem;
          font-family: PingFangSC;
          color: #333333;
        }
        span:nth-child(2),span:nth-child(3){
          color: #999999;
        }
      }
      img.profile{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .blank{
    width:100%;
    height: 20rem/$rem;
    background-color: rgb(245,245,245);
  }
  .weuiMargin{
    margin:0;
    p{
      font-size: 32rem/$rem;
      color: #333333;
    }
  }
}
  .footer{
    width:100%;
    height:98rem/$rem;
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    background-color: #FFFFFF;
    display: flex;
    >div{
      flex:1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10rem/$rem;
      img{
        height:70rem/$rem;
      }
    }


    /*background-color: #3CC51F;*/
  }
  input{
    display: none!important;
  }
</style>
