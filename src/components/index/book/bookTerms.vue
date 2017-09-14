<template>
    <div>
          <v-header :title="title" :rightTitle="rightTitle"></v-header>
          <div class="termContent" ref="termContent">
            <div class="termWrap">
              <div class="page__bd">
                <article class="weui-article">
                  <!--<h1>大标题</h1>-->
                  <section>
                    <!--<h2 class="title">章标题</h2>-->
                    <section>
                      <h3>各位病友：</h3>
                      <p style="margin: 0;">
                        感谢您对本院的信任，选择来我院就诊，为保证您能顺利完成手机挂号及后续就诊，请您认真阅读并遵守本手机挂号规则，充分理解各条款内容，并选择同意接受或不同意接受。
                      </p>
                    </section>
                    <section>
                      <p>
                        1.浙医二院官方掌上医院包括 <span style="color: red;">浙二好医生APP、浙医二院微信公众号等形式</span>，预约挂号实行实名制预约，请您提供准确的档案信息和手机号码，以便医生出诊时间有变动时与您联系。
                      </p>
                      <p style="color: red;">
                        2.特别提示：<br/>
                          a)  浙二好医生APP、浙医二院微信公众号仅支持已建档就诊人（已分配医院病案号）预约挂号，前提需要通过病案号实名认证；<br/>
                          b)  在线建档成功后即可通过浙二好医生APP、浙医二院微信公众号预约挂号一次。预约挂号成功后，就诊人须持本人身份证原件在医院现场自助机或收费窗口进行身份认证，制作就诊卡后凭纸质或电子挂号单就诊。
                      </p>
                      <p>
                        3.   普通号、专家号提前7天放号，每天16:30更新排班号源，号源更新后，次日的号需在“当日挂号”模块中查看
                      </p>
                      <p>
                        4.   请于就诊日上午11：00（下午16：00；周日下午15：00）前到自助机或收费窗口取号。手机支付在线预约以及当日挂号费用后无需取号可直接至就诊科室候诊。
                      </p>
                      <p>
                        5.   当日挂号必须在5分钟内支付，超时自动取消。
                      </p>
                      <p>
                        6.   预约挂号可在就诊当天使用支付宝、医保挂账以及医院现场自助机、收费窗口支付的方式完成费用支付
                      </p>
                      <p>
                        7.   每个绑定了病案号的已认证就诊人每次最多只能预约2个号源，且在该预约就诊或取消前，不可再预约其他挂号。
                      </p>
                      <p>
                        8.   同一账户同一就诊日在同一科室只能预约挂号一次。
                      </p>
                      <p>
                        9.   已认证账户一天（24小时）之内取消预约挂号2次，从当日起（含）七天（7*24小时）内不能再预约 <span style="color: red;">（包括手机注册用户以及手机注册就诊人）</span>。
                      </p>
                      <p>
                        10. 取消预约挂号截止时间在就诊日前一天24：00之前，过时将无法取消预约挂号。
                      </p>
                      <p style="color: red;">
                        11. 就诊人预约挂号成功后未按时现场取号（或支付费用）或取消预约挂号，从当日起（含）七天(7*24小时)内不能再预约（包括手机注册用户以及手机注册就诊人）。
                      </p>
                      <p>
                        12. 若因就诊人提供的信息不正确或未按时取号，导致预约就诊未成功，医院不承担任何责任。
                      </p>
                      <p style="color: red;">
                        13. 温馨提醒：初诊且未做过相关检查的病人，建议先看普通门诊。
                      </p>
                      <p>
                        14. 国际医学中心只能预约挂号，不支持在线支付。
                      </p>
                    </section>
                  </section>
                </article>
              </div>

            </div>
          </div>
      <div class="call">
        <div class="weui-cells_checkbox">
          <label class="weui-cell weui-check__label" for="s11">
            <div class="weui-cell__hd">
              <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked"  v-model="picked"/>
              <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd">
              <p>我已阅读并同意预约须知</p>
            </div>
          </label>
        </div>
        <div class="forButton" @click="goALL()">
          <button>我知道了</button>
        </div>
      </div>
      <alert :firstLine="firstLine" :secondLine="secondLine" :bottomLine="bottomLine" @on-iKnow="iKnow()" v-if="showAlert"></alert>
    </div>
</template>
<script>
  import header from '../../../base/header'
  import BScroll from 'better-scroll'
  import Alert from '../../../base/alert'
  export default{
      data(){
          return{
              title:"预约须知",
              rightTitle:"",
              picked:true,
              firstLine:"您需要先同意预约须知",
              secondLine:"",
              bottomLine:"确定",
              showAlert:false
          }
      },
      mounted(){
         this.$nextTick(()=>{
             this. _initTermScroll()
         })
      },
      methods:{
         _initTermScroll(){
             this.termScroll = new BScroll(this.$refs.termContent,{
                 click:true
             })
         },
        goALL(){
          if(this.picked === true){
            this.$router.push({path:'/book'})
          }else{
            this.showAlert = true
          }
        },
        iKnow(){
          this.showAlert = false
        }
      },
      components:{
          "VHeader":header,
          Alert
      },
      watch:{
        picked(){
            if(this.picked == false){
                document.getElementsByClassName('forButton')[0].getElementsByTagName('button')[0].style.backgroundColor = '#999999'
            }else{
              document.getElementsByClassName('forButton')[0].getElementsByTagName('button')[0].style.backgroundColor = '#30CFD0'
            }
        }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
.termContent{
  position: fixed;
  top: 50px;
  left:0;
  right:0;
  bottom:170rem/$rem;
  overflow: hidden;
  background-color: $bgColor2;
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
    .forButton{
      margin-bottom: 10px;
    }
    >div{
      width:690rem/$rem;
      margin: 3px auto;
      label{
        padding: 0;
      }
      button{
        width:660rem/$rem;
        height:80rem/$rem;
        border:none;
        outline: medium;
        background-color: $buttonColor;
        border-radius: 7px;
        font-size: 36rem/$rem;
        font-weight: bold;
        font-family: "PingFang SC";
        color: rgb(255,255,255);
      }
      p{
        padding:0;
        margin:0;
        font-size: 28rem/$rem;
        color:#333333;
        span{
          color:#333333;
        }
      }
    }
  }
</style>
