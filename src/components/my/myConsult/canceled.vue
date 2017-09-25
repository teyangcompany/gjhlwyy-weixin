<template>
  <div class="canceled" ref="cancel">
    <div>
      <ul class="border-1px">
        <li >
          <div>
            <span class="picConsult">名医视频问诊</span>
            <!--<span class="consultTim">2016/11/28 18:17</span>-->
          </div>
          <div class="mainContent">
            <p>我有一个问题想要咨询一下，是这样的，去年我在我们那里的医院做了一个检查，你知道德玛关于这个事情，比较复杂的你知道吗</p>
            <div @click="makeLarge()">
              <img src="" alt="">
              <img src="" alt="">
              <img src="" alt="">
              <img src="" alt="">
              <img src="" alt="">
            </div>
          </div>
          <div class="ConsultRelate">
            <span class="name">2016/07/08 16:00:00</span>
            <span class="money">已取消</span>
          </div>
        </li>
      </ul>
      <ul class="border-1px">
        <li >
          <div>
            <span class="picConsult">在线医生视频问诊</span>
            <!--<span class="consultTim">2016/11/28 18:17</span>-->
          </div>
          <div class="mainContent">
            <p>我有一个问题想要咨询一下，是这样的，去年我在我们那里的医院做了一个检查，你知道德玛关于这个事情，比较复杂的你知道吗</p>
          </div>
          <div class="ConsultRelate">
            <span class="name">2016/07/08 16:00:00</span>
            <span class="money">已取消</span>
          </div>
        </li>
      </ul>
      <ul class="border-1px">
        <li >
          <div>
            <span class="picConsult">在线医生图文问诊</span>
            <!--<span class="consultTim">2016/11/28 18:17</span>-->
          </div>
          <div class="mainContent">
            <p>我有一个问题想要咨询一下，是这样的，去年我在我们那里的医院做了一个检查，你知道德玛关于这个事情，比较复杂的你知道吗</p>
            <div @click="makeLarge()">
              <img src="" alt="">
              <img src="" alt="">
            </div>
          </div>
          <div class="ConsultRelate">
            <span class="name">2016/07/08 16:00:00</span>
            <span class="money">已取消</span>
          </div>
        </li>
      </ul>
      <ul class="border-1px">
        <li >
          <div>
            <span class="picConsult">[男 24岁][高血压]</span>
            <!--<span class="consultTim">2016/11/28 18:17</span>-->
          </div>
          <div class="mainContent">
            <p>我有一个问题想要咨询一下，是这样的，去年我在我们那里的医院做了一个检查，你知道德玛关于这个事情，比较复杂的你知道吗</p>
            <div @click="makeLarge()">
              <img src="" alt="">
              <img src="" alt="">
              <img src="" alt="">
              <img src="" alt="">
            </div>
          </div>
          <div class="ConsultRelate">
            <span class="name">2016/07/08 16:00:00</span>
            <span class="money">已取消</span>
          </div>
        </li>
      </ul>
      <ul class="border-1px">
        <li >
          <div>
            <span class="picConsult">[男 24岁][肩周炎]</span>
            <!--<span class="consultTim">2016/11/28 18:17</span>-->
          </div>
          <div class="mainContent">
            <p>我有一个问题想要咨询一下，是这样的，去年我在我们那里的医院做了一个检查，你知道德玛关于这个事情，比较复杂的你知道吗</p>
            <div @click="makeLarge()">
              <img src="" alt="">
              <img src="" alt="">
            </div>
          </div>
          <div class="ConsultRelate">
            <span class="name">2016/07/08 16:00:00</span>
            <span class="money">已取消</span>
          </div>
        </li>
      </ul>
      <ul class="border-1px">
        <li >
          <div>
            <span class="picConsult">[男 24岁][腰腿疼痛]</span>
            <!--<span class="consultTim">2016/11/28 18:17</span>-->
          </div>
          <div class="mainContent">
            <p>我有一个问题想要咨询一下，是这样的，去年我在我们那里的医院做了一个检查，你知道德玛关于这个事情，比较复杂的你知道吗</p>
            <div @click="makeLarge()">
              <img src="" alt="">
            </div>
          </div>
          <div class="ConsultRelate">
            <span class="name">2016/07/08 16:00:00</span>
            <span class="money">已取消</span>
          </div>
        </li>
      </ul>
      <ul class="border-1px">
        <li >
          <div>
            <span class="picConsult">[男 24岁][关节炎]</span>
            <!--<span class="consultTim">2016/11/28 18:17</span>-->
          </div>
          <div class="mainContent">
            <p>我有一个问题想要咨询一下，是这样的，去年我在我们那里的医院做了一个检查，你知道德玛关于这个事情，比较复杂的你知道吗</p>
            <div @click="makeLarge()">
              <img src="" alt="">
              <img src="" alt="">
              <img src="" alt="">
            </div>
          </div>
          <div class="ConsultRelate">
            <span class="name">2016/07/08 16:00:00</span>
            <span class="money">已取消</span>
          </div>
        </li>
      </ul>
      <ul class="border-1px">
        <li >
          <div>
            <span class="picConsult">[李世石 男 24岁][骨质疏松]</span>
            <!--<span class="consultTim">2016/11/28 18:17</span>-->
          </div>
          <div class="mainContent">
            <p>我有一个问题想要咨询一下，是这样的，去年我在我们那里的医院做了一个检查，你知道德玛关于这个事情，比较复杂的你知道吗</p>
          </div>
          <div class="ConsultRelate">
            <span class="name">2016/07/08 16:00:00</span>
            <span class="money">已取消</span>
          </div>
        </li>
      </ul>
      <ul class="border-1px">
        <li >
          <div>
            <span class="picConsult">[赵青 男 24岁][糖尿病]</span>
            <!--<span class="consultTim">2016/11/28 18:17</span>-->
          </div>
          <div class="mainContent">
            <p>我有一个问题想要咨询一下，是这样的，去年我在我们那里的医院做了一个检查，你知道德玛关于这个事情，比较复杂的你知道吗</p>
            <div @click="makeLarge()">
              <img src="" alt="">
            </div>
          </div>
          <div class="ConsultRelate">
            <span class="name">2016/07/08 16:00:00</span>
            <span class="money">已取消</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default{
    mounted(){
      this.$nextTick(()=>{
        setTimeout(()=>{
          this. _initCancel()
        },20)
      })
    },
    methods:{
      _initCancel(){
        this.cancel = new BScroll(this.$refs.cancel,{
          click:true
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .canceled{
    position: fixed;
    top: 90px;
    left:0;
    right:0;
    bottom:0;
    ul {
      /*margin-top: 10px;*/
      /*padding-bottom: 5px;*/
      li {
        width: 690rem/$rem;
        /*height: 166px;*/
        border-radius: 7px;
        background-color:white;
        list-style-type: none;
        margin: 0 auto;
        padding: 0px 8px 8px 8px;
        >div {
          display: flex;
          justify-content: space-between;
          span.picConsult {
            font-size: 16px;
          }
          span.consultTim {
            font-size: 12px;
            color: gray;
          }
        }
        div.mainContent {
          display: flex;
          flex-direction: column;
          justify-content: center;
          >div{
            img{
              width: 22.5%;
              height: 120rem/$rem;
            }
          }
          p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 15px;
            color: gray;
            height: 52px;
            padding-top: 5px;
            /*background-color: #E64340;*/
          }
        }
        div.ConsultRelate {
          margin-top: 5px;
          span.name {
            font-size: 28rem/$rem;
            color: gray;
          }
          span.money {
            font-size: 28rem/$rem;
            color: #999999;
          }
        }
      }
      li:nth-child(1){
        padding-top: 5px;
      }
    }
  }
</style>
