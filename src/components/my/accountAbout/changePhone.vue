<template>
    <div>
          <v-header :title="title" :rightTitle="rightTitle" @on-confirm="goConfirm"></v-header>
             <div class="verifyArea">
               <div class="formContent">
                 <div class="form phone">
                   <label for="" class="phoneLabel">手机号</label>
                   <input type="text" placeholder="请输入手机号" class="numberInput" v-model="phoneNumber">
                 </div>
                 <div class="form verifyCode">
                   <label for="" class="codeLabel">验证码</label>
                   <input type="text" placeholder="请输入验证码" class="codeInput" v-model="verifyCode">
                   <button @click="getVerifyCode()">获取验证码</button>
                 </div>
               </div>
             </div>
    </div>
</template>
<script>
  import header from '../../../base/header'
  import api from '../../../lib/api'
  export default{
      data(){
          return{
              title:"修改绑定手机号",
              rightTitle:"确认修改",
              phoneNumber:"",
              verifyCode:"",
              cid:"",
              compatId:"",
              index:"",
              allPatient:"",
              changeID:""
          }
      },
      created(){
        this.index = this.$route.query.index
        api("nethos.pat.compat.list",{
          token:localStorage.getItem("token")
        }).then((data)=>{
          this.allPatient= data.list
          this.changeID = this.allPatient[this.index].compatIdcard
          this.compatId = this.allPatient[this.index].compatId
          console.log(data.list)
        })
      },
      methods:{
        goConfirm(){
            api("nethos.pat.compat.modify",{
              compatIdcard:this.changeID,
              compatId:this.compatId,
              cid:this.cid,
              captcha:this.verifyCode
            }).then((data)=>{
                console.log(data)
                console.log(this.cid)
                console.log(this.verifyCode)
                console.log(this.compatId)
                if(data.code == 0){
//                    alert("成功")

                    this.$router.push({
                      path:'/detailUsual',
                      query:{index:this.index}
                    })

                }
            })
        },
        getVerifyCode(){
          api("nethos.system.captcha.generate",{
//            token:localStorage.getItem("token"),
            captchaType:"SMS",
            mobile:this.phoneNumber
          }).then((data)=>{
              console.log(data)
            this.cid = data.obj
          })

        }
      },
      components:{
          "VHeader":header
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public';
  .verifyArea{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
  }
  .formContent{
    width: 690rem/$rem;
    margin: 0 auto;
    margin-top: 10px;
    .form{
      width:100%;
      height: 40px;
      line-height: 40px;
      display: flex;
      margin-top: 1px;
      label{
        width: 100px;
        font-size: 16px;
        padding-left:1rem;
        font-size: 32rem/$rem;
        color: #333333;
        background-color: $bgColor2;
      }
      label.phoneLabel{
        border-top-left-radius: 7px;
      }
      label.codeLabel{
        border-bottom-left-radius: 7px;
      }
      input{
        flex: 1;
        border: none;
        outline: medium;
        font-size: 32rem/$rem;
        color: #999999;
        background-color: $bgColor2;
      }
      input.codeInput{
        border-bottom-right-radius: 7px;
      }
      input.numberInput{
        border-top-right-radius: 7px;
      }
    }
    .phone{
      /*margin-top: 20px;*/
    }
    .verifyCode{
      position: relative;

    }
    .verifyCode button{
      position: absolute;
      top:5px;
      right:0;
      height: 30px;
      line-height: 30px;
      width: 100px;
      border:none;
      outline: medium;
      border-radius: 7px;
      font-size: 32rem/$rem;
      color: white;
      background-color: $buttonColor;
    }
  }
</style>
