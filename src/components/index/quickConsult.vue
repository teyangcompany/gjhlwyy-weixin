<template>
  <div>
    <div class="terms" ref="terms">
      <div class="background">
        <img src="../../../static/img/quanke.png" alt="">
      </div>
      <div class="call">
        <div  @click="goALL()">
          <button>立即咨询</button>
        </div>
        <div class="weui-cells_checkbox">
          <label class="weui-cell weui-check__label" for="s11">
            <div class="weui-cell__hd">
              <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked"  v-model="picked"/>
              <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd">
              <p>我已阅读并同意<router-link tag="span" to="/internetTerms">《浙二网络医学中心服务协议》</router-link></p>
            </div>
          </label>
        </div>
      </div>
      <alert :firstLine="firstLine" :secondLine="secondLine" :bottomLine="bottomLine" @on-iKnow="iKnow()" v-if="showAlert"></alert>
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
    .background{
      width:100%;
      img{
        width:100%;
      }

    }
    .call{
      position: fixed;
      bottom:0;
      left:0;
      right:0;
      /*<!--margin-top: 115rem/$rem;-->*/
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
          width:660rem/$rem;
          height:80rem/$rem;
          border:none;
          outline: medium;
          background-color: $assistColorBrown;
          border-radius: 40px;
          font-size: 36rem/$rem;
          font-weight: bold;
          font-family: "PingFang SC";
          color: rgb(255,255,255);
        }
        p{
          padding:0;
          margin:0;
          font-size: 28rem/$rem;
          color: rgb(255,255,255);
          span{
            color: rgb(255,255,255);
          }
        }
      }
    }
  }
</style>
