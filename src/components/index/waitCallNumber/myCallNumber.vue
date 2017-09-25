<template>
    <div>
       <v-header :title="title" :rightTitle="rightTitle"></v-header>
      <div class="doctorInfo">
        <div class="circleAngle">
          <ul>
            <li>
              <div class="cancelImg">
                <img src="" alt="">
              </div>
              <div class="cancelIntro">
                <div class="introTitle">
                  <span class="subTitle">丁礼仁 主任医生</span>
                  <!--<span class="myDoctor">我的医生</span>-->
                  <p>浙江大学附属第二人民医院</p>
                  <p>滨江耳鼻咽喉科</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="aboutConsult">
            <div class="list border-1px">
              <p>就诊日期 <span>2017-08-25 下午</span> </p>
            </div>
            <div class="list border-1px">
              <p>预估就诊时间 <span>15:24:00</span> </p>
            </div>
            <div class="list border-1px">
              <p>当前叫号 <span>233</span> </p>
            </div>
            <div class="list">
              <p>前面还有 <span>30 名</span> </p>
            </div>
          </div>
        </div>
      </div>
      <div class="doctorInfo">
        <div class="circleAngle">
          <ul>
            <li>
              <div class="cancelImg">
                <img src="" alt="">
              </div>
              <div class="cancelIntro">
                <div class="introTitle">
                  <span class="subTitle">普通门诊</span>
                  <!--<span class="myDoctor">我的医生</span>-->
                  <p>浙江大学附属第二人民医院</p>
                  <p>滨江耳鼻咽喉科</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="aboutConsult">
            <div class="list border-1px">
              <p>就诊日期 <span>2017-08-25 下午</span> </p>
            </div>
            <div class="list border-1px">
              <p>预估就诊时间 <span>15:24:00</span> </p>
            </div>
            <div class="list border-1px">
              <p>当前叫号 <span>233</span> </p>
            </div>
            <div class="list">
              <p>前面还有 <span>30 名</span> </p>
            </div>
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
              title:"我的叫号",
              rightTitle:"",
              compatId:""
          }
      },
      created(){
          this.compatId = this.$route.query.compatId
          console.log(this.compatId)
          api("nethos.my.queue.num",{
              token:localStorage.getItem("token"),
              compatId:this.compatId
          }).then((data)=>{
              console.log(data)
          })
      },
      components:{
          "VHeader":header
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .doctorInfo{
    width:100%;
    margin-top: 10px;
  .circleAngle{
    width:690rem/$rem;
    margin:0 auto;
  .aboutConsult{
    width:690rem/$rem;
    margin: 0 auto;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color:$bgColor2;
  .list{
    width:100%;
    height: 50px;
    display: block;
  p{
    width:690rem/$rem;
    height: 50px;
    margin:0 auto;
    height: 50px;
    font-size: 32rem/$rem;
    color: #333333;
    padding-left: 20rem/$rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  span{
    padding-right: 40rem/$rem;
    color: #999999;
  }
  }
  }
  }
  ul{
    padding:0;
    margin:0 auto;
    width: 690rem/$rem;
    height: 190rem/$rem;
    background-color: $bgColor2;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  li{
    list-style-type: none;
    height: 190rem/$rem;
    display: flex;
  .cancelImg{
    width: 160rem/$rem;
    display: flex;
    justify-content: center;
    align-items: center;
  /*padding-left: 15px;*/
  img{
    width: 120rem/$rem;
    height: 120rem/$rem;
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
    margin:0;
    font-size: 28rem/$rem;
    color: #999999;
  }
  }


  span{

  }
  }
  }
  }
  }

  }
</style>
