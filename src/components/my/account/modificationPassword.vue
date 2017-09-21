<template>
    <div>
        <top>
            <div class="middle big bf">修改密码</div>
        </top>
      <div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf">旧密码</label></div>
            <div class="weui-cell__bd" >
              <input   class="weui-input" type="password" v-model="patPassword"  placeholder="请输入密码"/>
            </div>
          </div>

          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label bf">新密码</label></div>
            <div class="weui-cell__bd" :class="{ 'form-group--error':$v.againPatPassword.$error }">
              <input   @blur="$v.againPatPassword.$touch()"  class="weui-input" type="password" v-model="againPatPassword"  placeholder="请输入密码"/>
            </div>
          </div>
        </div>
        <span class="form-group__message" v-show="!$v.againPatPassword.minLength&&showPatPassWord">密码至少6位</span>
      </div>
      <div class="btn">
        <a style="background: rgb(48, 207, 208)" href="javascript:;" class="weui-btn weui-btn_primary" @click="goNext">下一步</a>
      </div>
    </div>



</template>
<script type="text/ecmascript-6">

    import { required, minLength, alphaNum, maxLength} from 'vuelidate/lib/validators'
    import top from '../../../base/app-header.vue'
    import Api from '../../../lib/api'
    import phone from '../../../lib/regex'
//     var token = localStorage.getItem('token')
    export default{
        components: {
            top
        },
      validations: {
        againPatPassword: {
          required,
          alphaNum,
          minLength:minLength(6)
        }
      },
        data(){
            return {
              token:localStorage.getItem('token'),
              patPassword:'',
              showPatPassWord:false,
              againPatPassword:'',
              mobile:"" ,
              equal:false
            }
        },
        mounted(){
          this.$set(this.$data,'mobile',this.$route.params.mobile)
        },
      watch:{
        againPatPassword(){
          this.equal = (this.patPassword===this.againPatPassword?false:true)
        }
      },
      methods:{
//        goNext(){
//          this.$router.push('/succeed')
//        },

        goNext(){
          if(this.$v.againPatPassword.$invalid){
            this.$set(this.$data,'showPatPassWord',true)
          }else {
            var patPassword = sha512(hex_md5(this.patPassword) + this.patPassword );
            var againPatPassword = sha512(hex_md5(this.againPatPassword) + this.againPatPassword );
            Api('nethos.pat.password.modify',{
              patMobile:this.mobile,
              patPassword:this.patPassword
            }).then(req=>{
              console.log(req,999)
              if(req.succ){
                this.$router.push({
                  name:'succeed',
                  params:{
                    msg:'密码修改成功'
                  }
                })
              }
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
    .form-group__message{
      color: red;
      box-sizing: border-box;
      padding-left: 15px;
      font-size: 12px;
    }
  .weui-cells{
    margin-top: 0px;
  }

  .weui-label{
    width: 80px;
  }
</style>
