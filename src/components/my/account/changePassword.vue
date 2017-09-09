<template>
  <div class="page">
    <top>
      <div class="middle big bf">修改密码</div>
    </top>
    <div >
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label bf">手机号</label></div>
          <div class="weui-cell__bd" v-bind:class="{ 'form-group--error': $v.mobile.$error }">
            <input  @blur="$v.mobile.$touch()" class="weui-input" type="number" v-model="mobile" placeholder="请输入手机号"/>
          </div>
        </div>
        <span class="form-group__message" v-show="!$v.mobile.phone&&showError">请输入正确的手机号</span>
        <div class="weui-cell weui-cell_vcode">
          <div class="weui-cell__hd">
            <label class="weui-label bf">验证码</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="tel" v-model="captcha" placeholder="请输入验证码"/>
          </div>
          <div class="weui-cell__ft">
            <button class="weui-vcode-btn" @click="getCode">获取验证码</button>
          </div>
        </div>
      </div>
      <div class="btn">
        <a href="javascript:;" style="background: #0aace9" class="weui-btn weui-btn_primary" @click="goNext">下一步</a>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { required, between, minLength, maxLength} from 'vuelidate/lib/validators'
  import top from '../../../base/app-header.vue'
  import Api from '../../../lib/api'
  import phone from '../../../lib/regex'
  export default{
    components:{
      top
    },
    data(){
      return {
        mobile:'',
        captcha:'',
        cid:'',
        showError:false,
      }
    },
    validations: {
      mobile: {
        required,
        phone:phone(1)
      }
    },
    mounted(){

    },
    methods:{
      goNext(){
        if(this.mobile.length!=11){
          alert('请输入手机号')
        }else {
          this.$router.push({
            name: "modificationPassword", params: {
              mobile: this.mobile
            }
          })
        }


//        if(this.mobile.length!=11){
//          alert('请输入手机号')
//        }else {
//          this.$router.push({
//            name:'confrimPhone',
//            params:{
//              captcha:this.captcha,
//              cid:this.cid
//            }
//          })
//        }

      },
      getCode(){
        console.log(this.$v.$invalid);
        if(this.$v.$invalid){
          this.$set(this.$data,'showError',true)
        }else {
          console.log(898989)
          Api('nethos.system.captcha.generate',{
            captchaType:'SMS',
            mobile:this.mobile
          }).then(req=>{
            this.$set(this.$data,'cid',req.obj)
            console.log(this.cid,3333)
          })
        }

      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .btn{
    box-sizing: border-box;
    text-align: center;
    margin: 142rem/$rem auto 0 auto;
    width: 670rem/$rem;
  }
  .weui-btn_primary{
    background: #0aace9;
  }
  .page{
    display: flex;
    overflow: auto;
    flex-direction: column;
    flex: 1;
  }
  .weui-cells{
    margin-top: 0px;
  }

  .form-group__message{
    color: red;
    box-sizing: border-box;
    padding-left: 15px;
    font-size: 12px;
  }
  .weui-vcode-btn{
    color:  #0aace9;
    padding: 0 .5rem 0 .6rem;
  }
</style>
