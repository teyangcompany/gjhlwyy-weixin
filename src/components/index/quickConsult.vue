<template>
  <div>
    <div class="terms" ref="terms">
     <div>
      <img src="../../../static/img/allConsult/返回.png" alt="" class="back" @click="goBack()">
      <div class="banner">
        <img src="../../../static/img/allConsult/导航栏.png" alt="">
        <img src="../../../static/img/allConsult/banner.png" alt="">
      </div>
      <div class="middle">
        <div>
          <div class="selectRoom">
            <img src="../../../static/img/allConsult/选科室.png" alt="">
            <div>
              <p class="mainTitle">选科室</p>
              <p class="assistTitle">生病不会选科室?</p>
            </div>
          </div>
          <div class="selectExpert">
            <img src="../../../static/img/allConsult/挑专家.png" alt="">
            <div>
              <p class="mainTitle">挑专家</p>
              <p class="assistTitle">专家大咖挑花眼？</p>
            </div>
          </div>
          <div class="eatPill">
            <img src="../../../static/img/咋吃药.png" alt="">
            <div>
              <p class="mainTitle">咋吃药</p>
              <p class="assistTitle">小痛小病咋吃药？</p>
            </div>
          </div>
        </div>
      </div>
      <div class="call">
        <div  @click="goALL()">
          <button>别担心,一键呼叫快速解答</button>
        </div>
        <div class=" weui-cells_checkbox">
          <label class="weui-cell weui-check__label" for="s11">
            <div class="weui-cell__hd">
              <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked"  v-model="picked"/>
              <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd">
              <p>我已阅读并同意<span>《浙二网络医学中心服务协议》</span></p>
            </div>
          </label>
        </div>

      </div>
      <alert :firstLine="firstLine" :secondLine="secondLine" :bottomLine="bottomLine" @on-iKnow="iKnow()" v-if="showAlert"></alert>
    </div>
    </div>
  </div>

</template>

<script>
  import header from '../../base/header'
  import Alert from '../../base/alert'
  import BScroll from 'better-scroll'
  export default{
    data(){
       return{
           title:"全科分诊",
           rightTitle:"",
           picked:true,
           firstLine:"您需要同意《浙二网络医学中心服务协议》",
           secondLine:"",
           bottomLine:"确定",
           showAlert:false
       }
    },
    mounted(){
       this.$nextTick(()=>{
           this._initWrapScroll()
       })
    },
    methods:{
      _initWrapScroll(){
          this.termsScroll = new BScroll(this.$refs.terms,{
               click:true
          })
      },
      goNext(){
            this.$router.push({path:'/consult/detail'})
      },
      goALL(){
          if(this.picked === true){
            this.$router.push({path:'/allConsultNext'})
          }else{
              this.showAlert = true
          }
      },
      goBack(){
          console.log("123")
          this.$router.back(-1)
      },
      iKnow(){
          this.showAlert = false
      }
    },
    components:{
      'vHeader':header,
      Alert
    },
    watch:{
      picked(){
          console.log(this.picked)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../common/public.scss';
  .terms{
    width:100%;
    position: fixed;
    top: 0px;
    bottom: 0px;
    /*background-color: #04BE02;*/
    .back{
      position: absolute;
      top: 20px;
      left: 15px;
      color: white;
      height:15px;
    }
   .banner{
     width:100%;
     img{
       width:100%;
     }
     img:nth-child(2){
       margin-top: -20rem/$rem;
     }
   }
   .middle{
     width:100%;
     /*<!--height:600rem/$rem;-->*/
     display: flex;
     /*align-items: center;*/
     margin-left: 88rem/$rem;
     /*justify-content: center;*/
     >div{
       .selectRoom,.selectExpert,.eatPill{
         display: flex;
         align-items: center;
         /*<!--p{-->*/
           /*<!--font-size: 32rem/$rem;-->*/
           /*<!---->*/
         /*<!--}-->*/
         .mainTitle{
           font-size: 42rem/$rem;
           color: #333333;
           font-family: PingFangSC;
         }
         .assistTitle{
           font-size: 32rem/$rem;
           font-family: PingFangSC;
           color: #999999;
         }
         img{
           width:100rem/$rem;
           height:100rem/$rem;
           margin-right: 55rem/$rem;
         }
       }
       .selectRoom{
          margin-top: 60rem/$rem;
       }
       .selectExpert{
         margin-top: 82rem/$rem;
       }
       .eatPill{
         margin-top: 82rem/$rem;
       }
     }
   }
    .call{
      /*position: fixed;*/
      /*bottom:0;*/
      /*left:0;*/
      /*right:0;*/
      margin-top: 115rem/$rem;
      .weui-cells_checkbox .weui-icon-checked:before{
        font-size: 18px;
        margin-top: -6rem/$rem;
      }
      >div{
        width:690rem/$rem;
        margin: 0 auto;
        label{
          padding-left: 0;
          padding-right: 0;
        }
        button{
          width:690rem/$rem;
          height:88rem/$rem;
          border:none;
          outline: medium;
          background-color: $assistColorBrown;
          border-radius: 16px;
          font-size: 30rem/$rem;
          color: #FEFEFE;
        }
        p{
          padding:0;
          margin:0;
          font-size: 28rem/$rem;
          color: #999999;
          span{
            color: $mainColor;
          }
        }
      }
    }
  }
</style>
