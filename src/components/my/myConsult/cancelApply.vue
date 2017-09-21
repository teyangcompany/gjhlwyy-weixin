<template>
    <div>
          <v-header :title="title" :rightTitle="rightTitle"></v-header>
          <div class="cancelApply">
            <div class="tips">
               {{ aboutConsult.consultStatusDescription }}
            </div>
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
            <div class="chatContent">

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
              title:"医助",
              rightTitle:"取消申请",
              consultId:"",
              aboutConsult:""
          }
      },
      created(){
          this.consultId = this.$route.query.consultId
         api("nethos.consult.info.detail",{
           token:localStorage.getItem("token"),
           consultId:this.consultId
         }).then((data)=>{
              this.aboutConsult = data.obj.consult
              console.log(data)
              console.log(this.aboutConsult)
         })
      },
      components:{
          "VHeader":header
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
.cancelApply{
  position: fixed;
  top: 50px;
  left:0;
  right:0;
  bottom:0;
  .tips{
    width:100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 32rem/$rem;
    color: white;
    background-color: $buttonColor;
  }
  .doctorInfo{
    margin-top: 10px;
    height: 113px;
    ul{
      padding:0;
      margin:0 auto;
      width: 690rem/$rem;
      border-radius: 7px;
      /*<!--height: 204rem/$rem;-->*/
      background-color: rgb(245,251,251);
      li{
        list-style-type: none;
        height: 113px;
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
  .chatContent{
    position: fixed;
    top: 213px;
    left:0;
    right:0;
    bottom: 0;
  }
}
</style>
