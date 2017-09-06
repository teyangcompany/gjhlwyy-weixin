<template>
  <transition name="slide">
    <div class='fileIndex'>
      <v-header :title="title" :rightTitle="rightTitle"></v-header>
      <div class="healthFile" ref="healthFile">
        <div>
          <ul>
            <li>
              <div class="cancelImg">
                <img src="../../../static/img/p1.jpg" alt="">
              </div>
              <div class="cancelIntro">
                <div class="introTitle">
                  <span class="subTitle">王小仙</span>
                  <p>姓名:刘劲松</p>
                  <p>男 27岁 浙江杭州</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="basic">
            <div>
              基本情况
            </div>
          </div>
          <router-link tag="div" to="/ill" class="illness border-1px">
            <div>
              所患疾病
              <div>
                <span>未填写</span>
                <img src="../../../static/img/查看更多.png" alt="">
              </div>
            </div>
          </router-link>
          <router-link tag="div" to="/pastHistory" class="history border-1px">
            <div>
              既往史
              <div>
                <span>无</span>
                <img src="../../../static/img/查看更多.png" alt="">
              </div>
            </div>
          </router-link>
          <router-link tag="div" to="/familyHistory" class="family border-1px">
            <div>
              家族史
              <div>
                <span>无</span>
                <img src="../../../static/img/查看更多.png" alt="">
              </div>
            </div>
          </router-link>
          <router-link tag="div" to="/allergyHistory" class="alergic border-1px">
            <div>
              过敏史
              <div>
                <span>无</span>
                <img src="../../../static/img/查看更多.png" alt="">
              </div>
            </div>
          </router-link>
          <div class="basic">
            <div>
              诊疗记录
            </div>
          </div>
          <router-link tag="div" to="/deleteRecord" class="recordList border-1px">
            <div class="wrapList">
              <p class="listTime number">2017-13-12</p>
              <p class="listContent">我最近因为经常在晚上看书，光线又十分不明亮的时候看导致最近视力降的很快</p>
              <div class="recordImg">
                <div>
                  <img src="../../../static/img/c3.jpg" alt="">
                </div>
                <div>
                  <img src="../../../static/img/c9.jpg" alt="">
                </div>
                <div>
                  <img src="../../../static/img/c10.jpg" alt="">
                </div>
                <div>
                  <img src="../../../static/img/c6.jpg" alt="">
                </div>
                <div>
                  <img src="../../../static/img/c3.jpg" alt="">
                </div>
              </div>
            </div>
          </router-link>
          <router-link tag="div" class="recordList border-1px" to="/deleteRecord">
            <div class="wrapList">
              <p class="listTime number">2017-13-12</p>
              <p class="listContent">腰腿疼属于一种非常常见的疾病，主要是在突然用力过猛的时候容易出现，并且身体瞬间感觉到向闪电一样的疼痛，然后直接放射到臀部、大腿最后到小脚趾</p>
              <div class="recordImg">
                <div>
                  <img src="../../../static/img/c1.jpg" alt="">
                </div>
                <div>
                  <img src="../../../static/img/c2.jpg" alt="">
                </div>
                <div>
                  <img src="../../../static/img/c5.jpg" alt="">
                </div>
              </div>
            </div>
          </router-link>
          <div class="addFile">
            <router-link tag="div" to="/addRecord" class="button">
              <button>+ 添加诊疗记录</button>
            </router-link>
          </div>
        </div>

      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script>
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  export default{
    data(){
      return{
        title:'健康档案',
        rightTitle:''
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this._initFileScroll()
      })
    },
    methods:{
      _initFileScroll(){
        this.fileScroll = new BScroll(this.$refs.healthFile,{
          click:true
        })
        console.log( this.fileScroll)
      }
    },
    components:{
      'VHeader':header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .fileIndex{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .healthFile{
    width:100%;
    position: fixed;
    top:50px;
    bottom:0;
    left:0;
    right:0;
    background-color: white;
    ul{
      padding:0;
      margin:0 auto;
      width: 690rem/$rem;
      height: 204rem/$rem;
      border-radius: 10px;
      /*background-color: rgb(245,251,251);*/
      li{
        list-style-type: none;
        height: 204rem/$rem;
        display: flex;
        .cancelImg{
          width: 134rem/$rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 30rem/$rem;
          img{
            width:134rem/$rem;
            height:134rem/$rem;
          }
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
              margin:5px 0 5px 0;
              font-size: 26rem/$rem;
              color: #999999;
            }
          }
        }
        img{
          width: 134rem/$rem;
          height: 134rem/$rem;

        }
      }
    }
    .basic,.illness,.history,.family,.alergic,.record{
      width: 100%;
      height: 90rem/$rem;
      /*border-top: 1px solid rgb(205,205,205);*/
      >div{
        width: 690rem/$rem;
        height: 90rem/$rem;
        margin:0 auto;
        display: flex;
        font-size:32rem/$rem;
        font-family: PingFangSC;
        color: #333333;
        align-items: center;
        justify-content: space-between;
        >div{
          span{
            font-size:32rem/$rem;
            font-family: PingFangSC;
            color: #666666;
            display: inline-block;
          }
          img{
            width: 7.5px;
          }
        }
      }
    }
    .basic,.record{
      background-color: rgb(245,245,245);
    }
    .basic{
      height:80rem/$rem;
      >div{
        font-size: 28rem/$rem;
        font-family: PingFangSC;
        color: #666666;
      }
    }
    .recordList{
      width:100%;
      /*border-bottom: 1px solid rgb(205,205,205);*/
      .wrapList{
        width: 690rem/$rem;
        margin:0 auto;
        .listTime{
          font-size: 32rem $rem;
          color: #666666;
          font-family: PingFangSC;
          margin-top: 30rem/$rem;
          margin-bottom: 20rem/$rem;
        }
        .listContent{
          font-size: 28rem/$rem;
          font-family: PingFangSC;
          line-height: 20px;
          color: #666666;
        }
        .recordImg{
          width: 690rem/$rem;
          margin: 10px auto;
          display: flex;
          flex-wrap: wrap;
          >div{
            width: 25%;
            text-align: center;
            img{
              width: 140rem/$rem;
              height: 140rem/$rem;
            }
          }
        }
      }
    }
    .addFile{
      width:100%;
      height: 100px;
      margin-top: 50px;
      margin-bottom: 50px;
      /*background-color: #0FBDFF;*/
      display: flex;
      justify-content: center;
      div.button{
        width: 690rem/$rem;
        height: 94rem/$rem;
        /*background-color: #E64340;*/
        button{
          width: 690rem/$rem;
          height: 94rem/$rem;
          border:none;
          outline: medium;
          border-radius: 10px;
          color: white;
          background-color: #0FBDFF;
        }
      }
    }
  }
  .number{
    color: #3399FF!important;
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform:  translate3d(100%,0,0);
  }
</style>
