<template>
  <transition name="slide">
    <div class="apply">
      <v-header :title="title" :rightTitle="rightTitle"></v-header>
      <div class="applyInfo">
        <div class="doctorInfo">
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../../../static/img/ys2.jpg" alt="">
              </div>
              <div class="cancelIntro">
                <div class="introTitle">
                  <span class="subTitle">宋永茂</span>
                  <span class="myDoctor">主任医师</span>
                  <p>浙医二院</p>
                  <p>肿瘤外科</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="attach">
          <div>
            <section>
              <span>视频问诊价格</span>
              <span class="money">价格：¥1000</span>
            </section>
          </div>
        </div>
        <div class=" weui-cells_checkbox weuiMargin">
          <label class="weui-cell weui-check__label" for="s11">
            <div class="weui-cell__hd">
              <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked"/>
              <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd">
              <p>我已阅读并同意<span>浙二网络医学中心服务协议</span> </p>
            </div>
          </label>
        </div>
        <div class="applyRule">
          <div class="ruleCenter">
            <h4>名医视频问诊规则</h4>
            <p>1、您需要填写自己的就诊资料，并付费</p>
            <p>2、我们会尽快为您安排专家、视频问诊时间</p>
            <p>3、如果无法成功问诊，我们会为您退款，您也可以主动申请退款</p>
          </div>
        </div>
        <router-link tag="div" to="/videoWriteInfo" class="nextStep">
          <div>
            <button>下一步</button>
          </div>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script>
  import header from '../../../base/header'
  export default{
    data(){
      return{
        title:"申请须知",
        rightTitle:"",
        path:""
      }
    },
    mounted(){
      this.path = this.$route.path
    },
    methods:{
      goPicture(){
        this.$router.push('apply/picture')
      },
      back(){
        this.$router.back(-1)
      }
    },
    components:{
      "VHeader":header
    },
    watch:{
      "$route":function(){
        this.path = this.$route.path
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform:  translate3d(100%,0,0);
  }
  .apply{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    .applyInfo{
      position: fixed;
      top:50px;
      left:0;
      right:0;
      bottom:0;
      .doctorInfo{
        margin-top: 10px;
        ul{
          padding:0;
          margin:0 auto;
          width: 690rem/$rem;
          /*<!--height: 204rem/$rem;-->*/
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          background-color: rgb(245,251,251);
          li{
            list-style-type: none;
            height: 204rem/$rem;
            display: flex;
            .cancelImg{
              width: 180rem/$rem;
              display: flex;
              justify-content: center;
              align-items: center;
              /*padding-left: 15px;*/
            }
            .cancelIntro{
              flex:2;
              display: flex;
              align-items: center;
              /*line-height: 10px;*/
              .introTitle{
                .subTitle{
                  font-size: 32rem/$rem;
                  color: #333333;
                }
                .myDoctor{
                  width: 120rem/$rem;
                  height: 36rem/$rem;
                  display: inline-block;
                  font-size: 28rem/$rem;
                  /*line-height: 18px;*/
                  color: #666666;
                  text-align: center;
                }
                p{
                  margin:0;
                  font-size: 28rem/$rem;
                  color: #999999;
                }
              }


              span{

              }
            }
            img{
              width: 130rem/$rem;

            }

          }
        }
      }
      .attach{
        width:690rem/$rem;
        height:80rem/$rem;
        margin: 2px auto;
        display: flex;
        align-items: center;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: rgb(245,251,251);
        >div{
          section{
            width:690rem/$rem;
            display: flex;
            justify-content: space-between;
            span{
              padding-left: 20rem/$rem;
              padding-right: 20rem/$rem;
              font-size: 32rem/$rem;
              color: #333333;
            }
            span.money{
              color: $assistWordBrown;
            }
            span.time{
              color: $assistWordBlue;
            }
          }
        }
      }
      .weuiMargin{
        margin: 0;
        p{
          font-size: 28rem/$rem;
          span{
            color: $mainColor;
          }
        }
      }
      .weui-cells_checkbox .weui-icon-checked:before{
        font-size: 28rem/$rem;
      }
      .applyRule{
        width:100%;
        height: 200px;
        background-color: white;
        .ruleCenter{
          width:690rem/$rem;
          margin:0 auto;
          h4{
            font-size: 32rem/$rem;
            font-weight: normal;
          }
          p{
            font-size: 32rem/$rem;
            line-height: 20px;
            color: #999999;
          }
        }
      }
      .nextStep{
        position: fixed;
        bottom:50rem/$rem;
        width:100%;
        >div{
          width:690rem/$rem;
          margin:0 auto;
          height:80rem/$rem;
        }
        button{
          width:690rem/$rem;
          height:80rem/$rem;
          border:none;
          outline: medium;
          background-color: $buttonColor;
          border-radius: 10px;
          font-size: 32rem/$rem;
          color: white;
        }
      }
    }
  }
</style>
