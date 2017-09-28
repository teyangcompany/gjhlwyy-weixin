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
                   <button @click="getVerifyCode()" v-if="countdown == 60 || countdown == 0">获取验证码</button>
                   <button v-else>{{ countdown }}s后重新获取</button>
                 </div>
               </div>
             </div>
    </div>
</template>
<script>
  import header from '../../../base/header'
  import weui from 'weui.js'
  import api from '../../../lib/api'
  export default{
      data(){
          return{
              title:"修改手机号",
              rightTitle:"确认修改",
              phoneNumber:"",
              verifyCode:"",
              cid:"",
              compatId:"",
              index:"",
              allPatient:"",
              changeID:"",
              countdown:60,
              a:"",
          }
      },
      created(){
        this.index = this.$route.query.index
        api("nethos.pat.compat.list",{
          token:localStorage.getItem("token")
        }).then((data)=>{
           if(data.code == 0){
             this.allPatient= data.list
             this.changeID = this.allPatient[this.index].compatIdcard
             this.compatId = this.allPatient[this.index].compatId
             console.log(data.list)
           }else{
               weui.alert(data.msg)
           }
        })
      },
      methods:{
        goConfirm(){
            api("nethos.system.captcha.checkcaptcha.v2",{
              captcha:this.verifyCode,
              cid:this.cid,
            }).then((data)=>{
                if(data.code == 0){
                  api("nethos.pat.compat.modify.v2",{
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

                    }else{
                        weui.alert(data.msg)
                    }
                  })
                }else{
                    weui.alert(data.msg)
                }
                console.log(data)
            })

        },
        getVerifyCode(){
          api("nethos.system.captcha.commpat.mobile.modify",{
//            token:localStorage.getItem("token"),
            commpatId:this.compatId,
            mobile:this.phoneNumber
          }).then((data)=>{
              console.log(data)
            if(data.code == 0){
              this.a = setInterval(()=>{
                this.countdown--
              },1000)
              this.cid = data.obj.cid
            }else{
                weui.alert(data.msg)
            }
          })

        }
      },
      components:{
          "VHeader":header
      },
      watch:{
        countdown(){
          if(this.countdown == 0){
            clearInterval(this.a)
            this.countdown = 60
          }
        }
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
      width: 225rem/$rem;
      border:none;
      outline: medium;
      border-radius: 7px;
      font-size: 32rem/$rem;
      color: white;
      background-color: $buttonColor;
    }
  }
</style>
