<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle" @on-single="goSingle()"> </v-header>
    <div class="conversation" @click="goDown()" ref="conversation">
      <section class="conversationList" ref="slideList" >
        <ul>
          <li ref="chatLi">
            <div class=" other mysay">
              <img src="../../../static/img/p1.jpg" alt="">
              <div class="whatsay">
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-right"></use>
                  </svg>
                </div>
                <div class="whatsay_text">
                  医生您好!在吗？
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!--<ul>-->
        <!--<li v-for="(item,index) in chatText" ref="chatLi">-->
        <!--<div class="other">-->
        <!--<img src="../../../static/img/ys1.jpg" alt="" >-->
        <!--<div class="whatsay">-->
        <!--<div class="whatsay_svg">-->
        <!--<svg>-->
        <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-left"></use>-->
        <!--</svg>-->
        <!--</div>-->
        <!--<div class="whatsay_text">-->
        <!--{{item}}-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</li>-->
        <!--</ul>-->
        <ul>
          <li  ref="chatLi">
            <div class="other">
              <img src="" alt="" >
              <div class="whatsay">
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-left"></use>
                  </svg>
                </div>
                <div class="whatsay_text onlyThis">
                  <div>
                    2′53″
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul>
          <li ref="chatLi">
            <div class=" other mysay">
              <img src="../../../static/img/p1.jpg" alt="">
              <div class="whatsay">
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-right"></use>
                  </svg>
                </div>
                <div class="whatsay_text">
                  我最近腰有点酸，站久了会发麻，想要问下您什么时候有空，我想做一个推拿理疗。
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul>
          <li  ref="chatLi">
            <div class="other">
              <img src="" alt="" >
              <div class="whatsay">
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-left"></use>
                  </svg>
                </div>
                <div class="whatsay_text onlyThis">
                  <div>
                    1′17″
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul v-if="displayPicked != undefined">
          <li ref="chatLi">
            <div class=" other mysay">
              <img src="../../../static/img/p1.jpg" alt="">
              <div class="whatsay">
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-right"></use>
                  </svg>
                </div>
                <div class="whatsay_text onlySquare">
                  <div>
                    <p class="border-1px">申请了一个服务</p>
                    <p>{{ displayPicked }}</p>
                    <span>共12次，剩余8次</span><br/>
                    <span>{{ displayDate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul>
          <li v-for="(item,index) in previewImg"  ref="chatLi">
            <div class=" other mysay">
              <img src="../../../static/img/p1.jpg" alt="">
              <div class="whatsay">
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-right"></use>
                  </svg>
                </div>
                <div class="whatsay_text">
                  <img :src="item" alt="">
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul>
          <li v-for="(item,index) in chatText"  ref="chatLi">
            <div class=" other mysay">
              <img src="../../../static/img/p1.jpg" alt="">
              <div class="whatsay">
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon-right"></use>
                  </svg>
                </div>
                <div class="whatsay_text">
                  {{item}}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <footer :class="{footshow:seeMore}" ref="footer">
      <section class="foot_top">
        <div class="chatInput">
          <input type="text"  maxlength="100" v-model="inputInfo" @input="whatInput" @keyup.enter="enterThing()">
        </div>
        <div class="chatSend">
          <div class="send" @touchstart.prevent="send()" v-if="light">
            <span>发送</span>
          </div>
          <div v-else @click="upMore()" class="addmore">
            <img src="../../../static/img/聊天界面-添加.png" alt="">
          </div>
        </div>
      </section>
      <section class="foot_bottom" v-if="gift">
        <div class="picture">
          <input type="file" name="picture" id="upPicture" ref="picture" @change="onFileChange">
          <img src="../../../static/img/图片.png" alt="" @click="selectImg()">
          <span>图片</span>
        </div>
        <div class="camera">
          <input type="file" name="picture"  ref="picture" @change="onFileChange">
          <img src="../../../static/img/拍照.png" alt="" @click="selectImg()">
          <span>拍照</span>
        </div>
        <div class="camera" @click="goService()">
          <img src="../../../static/img/拍照.png" alt="">
          <span>预约服务</span>
        </div>
        <div class="camera" @click="selectGift()">
          <img src="../../../static/img/拍照.png" alt="">
          <span>小礼物</span>
        </div>
      </section>
      <section class="foot_bottom" v-else>
        <div class="picture">
          <img src="../../../static/img/图片.png" alt="" >
          <span>苹果</span>
          <span class="red">50心意</span>
        </div>
        <div class="camera">
          <img src="../../../static/img/拍照.png" alt="">
          <span>奖章</span>
          <span class="red">100心意</span>
        </div>
        <div class="camera">
          <img src="../../../static/img/拍照.png" alt="">
          <span>鲜花</span>
          <span class="red">500心意</span>
        </div>
        <div class="camera">
          <img src="../../../static/img/拍照.png" alt="">
          <span>锦旗</span>
          <span class="red">1000心意</span>
        </div>
      </section>
    </footer>
  </div>
</template>
<script>
  import header from '../../base/header'
  export default{
    data(){
      return{
        title:"华立",
        rightTitle:"医生名片",
        seeMore:false,
        light:false,
        gift:true,
        inputInfo:"",
        chatText:[ ],
        displayDate:"",
        displayMessage:"",
        displayPicked:"",
        previewImg:[],
      }
    },
    components:{
      "VHeader":header
    },
    created(){
      this.displayDate = this.$route.query.date
      this.displayMessage = this.$route.query.message
      this.displayPicked = this.$route.query.picked
      console.log(this.displayDate)
    },
    methods:{
      goSingle(){
        this.$router.push('/signSingle')
      },
      goDown(){
        this.seeMore = false
      },
      whatInput(){
        if(this.inputInfo.replace(/\s+/g,"") == ''){
          this.light=false
        }else{
          this.light=true
        }
      },
      enterThing(){
        if(this.light){
          this.send()
        }
      },
      send(){
        this.chatText.push(this.inputInfo)
        this.inputInfo = ''
        this.light=false
        this.$nextTick(()=>{
          console.log("123")
          window.scrollTo(0,this.$refs.conversation.offsetHeight-window.innerHeight)
        })
      },
      selectImg(e){
        this.$refs.picture.click()
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
      upMore(){
        this.seeMore = !this.seeMore
        if(this.seeMore == true){
          this.gift = true
        }
      },
      selectGift(){
        this.gift = false
      },
      goService(){
        this.$router.push('/bookService1')
      }
    },
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .conversation{
    width:100%;
    /*padding-top: 50px;*/
    /*overflow: auto;*/
    /*height: 500px;*/
    position: fixed;
    top: 50px;
    bottom: 40px;
    overflow: hidden;
    overflow-y: scroll;
    /*-webkit-overflow-scrolling: touch;*/
    /*overflow: auto;*/
    background-color: white;
    ul{
      padding:0;
      margin:0;
      margin-top: 10px;
    }
  }
  .conversationList{
    width:100%;
    overflow: auto;
    /*position: relative;*/
    .loadTip{
      width:100%;
      span.pullMore{
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        img{
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      }
    }
    li{
      .other{
        width:96%;
        display: flex;
        justify-content: flex-start;
        /*padding-top: 25px;*/
        margin-bottom: 25px;
        /*align-items: top;*/
        position: relative;
        img{
          width: 80rem/$rem;
          height: 80rem/$rem;
          border-radius: 50%;
          display: inline-block;
          margin-left: 30rem/$rem;
        }
        .whatsay{
          position: relative;
          margin-top: 0.4rem;
          .onlyThis{
            height: 50rem/$rem;
            width:280rem/$rem;
            >div{
              position: absolute;
              left: 210rem/$rem;
            }
          }
          .whatsay_svg{
            width:0.4266666667rem;
            height: 0.64rem;
            position: absolute;
            top:.5546667rem;
            left:.63rem;
            z-index:2;
            svg{
              display:block;
              width:0.4266666667rem;
              height: 0.64rem;
            }
          }
          .whatsay_text{
            margin-left: 20px;
            max-width: 490rem/$rem;
            background:#f5f5f5;
            padding:0.42rem 0.384rem;
            border-radius:10px;
            font-size: 28rem $rem;
            line-height: 48rem/$rem;
            color: #333333;
            word-break: break-all;
            img{
              border-radius: 0;
              margin-left: 0;
              width:100%;
              height:100%;
            }
          }
        }
      }
      .mysay{
        display:flex;
        flex-direction:row-reverse;
        .say-time{
          left:8.8rem;
        }
        .whatsay{
          .onlySquare{
            p{
              font-size:32rem/$rem;
            }
            span{
              font-size: 28rem/$rem;
              color: #666666;
            }
          }
          .whatsay_svg{
            right: 0rem;
            left:auto;
          }
          .whatsay_text{
            margin-right: 0.38rem;
            margin-left:0;
            background:#9fe658;
          }
        }
      }
    }
  }
  footer{
    width:100%;
    height: 200px;
    position: fixed;
    bottom: -160px;
    background-color: white;
    .foot_top{
      display: flex;
      .chatInput{
        width: 566rem/$rem;
        margin-left: 30rem/$rem;
        text-align: center;
        input{
          width: 566rem/$rem;
          height: 64rem/$rem;
          border:none;
          font-size: 32rem/$rem;
          outline: medium;
          border-radius:7px;
          background-color: rgb(243,243,243);
          border-bottom: 1px solid #e0e0e0;
        }
        .greenBorder{
          border-bottom: 1px solid #19ad17;
          /*border-color:#19ad17;*/
        }
      }
      .chatSend{
        width: 110rem/$rem;
        height: 70rem/$rem;
        margin-left: 20rem/$rem;
        /*background-color: dodgerblue;*/
        text-align: center;
        .send{
          width: 110rem/$rem;
          height: 70rem/$rem;
          background:#16af17;
          border-radius:5px;
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            display: block;
            color: white;
          }
        }
        .addmore{
          img{
            width: 58rem/$rem;
            height: 58rem/$rem;
          }
        }
      }
    }
    .foot_bottom{
      display: flex;
      .camera, .picture{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 60rem/$rem;
        margin-top: 60rem/$rem;
        img{
          width: 114rem/$rem;
          height: 114rem/$rem;
          display: block;
          margin-bottom: 15px;
        }
        span{
          font-size: 28rem/$rem;
          color:#666666
        }
        span.red{
          margin-top: 5px;
          color: red;
        }
      }
      .picture,.camera{
        >input{
          display: none;
        }
      }
    }
  }
  .footshow{
    bottom:0;
    transition: all .2s;
  }
</style>
