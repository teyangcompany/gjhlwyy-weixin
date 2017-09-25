<template>
  <div class="success">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="successContent" ref="success">
      <div>
        <div class="reasonWrap">
          <div class="refuseReason">
            <div class="wrapImg">
              <img src="../../../../static/img/聊天界面-添加.png" alt="">
            </div>
            <div class="wrapWord">
              <div>
                <span>等待付款</span>
              </div>
            </div>
          </div>
        </div>
        <p class="doctorInfoTitle">申请信息:</p>
        <div class="doctorInfo">
          <ul>
            <li>
              <div class="cancelImg">
                <img src="" alt="">
              </div>
              <div class="cancelIntro">
                <div class="introTitle">
                  <span class="subTitle">王小仙</span>
                  <span class="myDoctor">我的医生</span>
                  <p>浙江大学附属第二人民医院</p>
                  <p>急诊外科 副主任医生</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="attach">
          <div>
            <section>
              <span>视频问诊价格</span>
              <span class="money">¥500</span>
            </section>
            <section>
              <span>期望视频问诊时间</span>
              <span class="time">2016/04/07 16:02:13</span>
            </section>
          </div>
        </div>
        <p class="patientInfoTitle">就诊信息:</p>
        <div class="state">
          <p>
            你只分管馆范德萨刚发的割发代首那个放到讽德诵功发的官方肯定是个红烧冬瓜单方事故会计分录多少个涸鲋得水讽德诵功讽德诵功
          </p>
          <div>
             <img src="" alt="">
            <img src="" alt="">
            <img src="" alt="">
            <img src="" alt="">
            <img src="" alt="">
          </div>
        </div>
        <div class="patientInfo">
          <div class="leftTitle">
            <span>就 诊 人:</span>
            <span>手 机 号:</span>
            <span>身份证号:</span>
          </div>
          <div class="rightMatch">
            <span>老王 男 34岁</span>
            <span>34321432144324324324</span>
            <span>3416536423857</span>
          </div>
        </div>
        <div class="applyNumber">
           <p>申请单编号: 12345678</p>
           <p>创建时间: 2016/08/03 12:05:33</p>
        </div>
      </div>
      <div class="bottom border-1px-top">
        <div class="fixedBottom">
          <button>取消申请</button>
          <button class="pay">付款</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../../base/header'
  import BScroll from 'better-scroll'
  export default{
    data(){
      return{
        title:'名医视频问诊',
        rightTitle:''
      }
    },
    mounted(){
      this._initSuccessScroll()
    },
    methods:{
      _initSuccessScroll(){
        this.success = new BScroll(this.$refs.success,{
          click:true
        })
        console.log(this.success)
      }
    },
    components:{
      'VHeader':header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .bottom{
    position: fixed;
    left:0;
    right:0;
    bottom:0;
    width: 100%;
    height:90rem/$rem;
    .fixedBottom{
      height:90rem/$rem;
      width:690rem/$rem;
      margin: 0 auto;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      button{
        width:140rem/$rem;
        height:60rem/$rem;
        border:none;
        outline: medium;
        color: #666666;
        border-radius: 7px;
        background-color: white;
        border:1px solid gray;
      }
      button.pay{
        background-color: $assistColorBrown;
        border:none;
        color: white;
        border-radius: 7px;
        font-size: 32rem/$rem;
        margin-left: 10px;
      }
    }
  }
  .successContent{
    width:100%;
    position: fixed;
    top: 50px;
    bottom:0;
    left:0;
    right:0;
    z-index:10;
    overflow: hidden;
    background-color: white;
    .remark,.doctorInfoTitle,.patientInfoTitle,.repeatTitle{
      width: 690rem/$rem;
      margin: 30rem/$rem auto;
      font-size: 32rem/$rem;
      display: flex;
      justify-content: space-between;
      span{
        font-size: 28rem/$rem;
        color: #0FBDFF;
      }
    }
    .reasonWrap{
      display: flex;
      align-items:center;
      .refuseReason{
        width:100%;
        height: 90rem/$rem;
        display: flex;
        background-color: $buttonColor;
        .wrapImg{
          height: 140rem/$rem;
          width: 140rem/$rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: 30rem/$rem;
          img{
            width: 60rem/$rem;
            height: 60rem/$rem;
          }
        }
        .wrapWord{
          height: 140rem/$rem;
          display: flex;
          align-items: center;
          span{
            display: block;
            font-size: 24rem/$rem;
            line-height: 19px;
            color: #4BCEC8;
            .time{
              display: inline-block;
              color: red;
            }
          }
        }
      }
    }
    .doctorInfo{
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
      height:150rem/$rem;
      margin: 5px auto;
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
    .state{
      width:690rem/$rem;
      margin:0 auto;
      margin-bottom: 5px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: rgb(245,251,251);
      p{
        margin:0;
        padding:20rem/$rem 20rem/$rem 20rem/$rem 20rem/$rem;
        font-size: 32rem/$rem;
        color: #666666;
      }
      >div{
        img{
          padding-left: 20rem/$rem;
          /*<!--padding-right: 20rem/$rem;-->*/
          width: 18%;
          height: 120rem/$rem;
        }
      }
    }
    .patientInfo{
      width: 690rem/$rem;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      margin:0 auto;
      background-color: rgb(245,251,251);
      display: flex;
      .leftTitle{
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          font-size: 28rem/$rem;
          color: #999999;
        }
      }
      .rightMatch{
        display: flex;
        flex-direction: column;
        span{
          font-size: 28rem/$rem;
          color: #333333;
        }
      }
    }
    .applyNumber{
      width:690rem/$rem;
      height:400rem/$rem;
      margin: 15px auto;
      p{
        font-size: 28rem/$rem;
        color: #999999;
      }
    }
  }
</style>
