<template>
  <scroll class="canceled" ref="waitPay" :data="payList" :pullup="pullup" @scrollToEnd="scrollToEnd()">
    <div>
      <router-link tag="ul" :to="{path:'/waitArrange',query:{consultId:item.consultId}}" class="border-1px"  v-for="(item,index) in payList" :key="item.id">
        <li v-if="item.consultTypeName != '名医视频' && item.consultTypeName != '在线医生视频'  && item.consultTypeName != '全科分诊'">
          <div>
            <span class="picConsult">{{ item.consultTypeName }}</span>
            <span class="consultTim">{{ createTime[index] }}</span>
          </div>
          <div class="mainContent">
            <p>{{ item.consultContent }}</p>
          </div>
          <div class="ConsultRelate">
            <span class="name"><span class="number">{{ item.docName }}</span></span>
            <span class="money">{{ item.consultStatusDescription }}</span>
          </div>
        </li>
      </router-link>
      <div class="loadMore" v-if="loadingStatus">
        <span class="pullMore">
           <img src="../../../../static/img/loading.gif" alt="">
           数据加载中...
        </span>
      </div>
    </div>
    <div class="emptyTips" v-if="payList.length == 0 && endStatus== true">
      暂无问诊记录
    </div>
  </scroll>
</template>
<script>
  import BScroll from 'better-scroll'
  import api from '../../../lib/api'
  import weui from 'weui.js'
  import {isLoginMixin} from "../../../lib/mixin"
  import {tokenCache} from '../../../lib/cache'
  import {formatDate} from '../../../utils/formatTimeStamp'
  import Scroll from '../../../base/scroll'
  export default{
    mixins: [isLoginMixin],
    data(){
       return{
         payList:[],
         createTime:[],
         pullup:true,
         listPage:1,
         dataLength:"",
         loadingStatus:true,
         endStatus:false
       }
    },
    mounted(){

    },
    created(){
      api("nethos.pat.info.get", {
        token:tokenCache.get()
      }).then((data) => {
        if (data.code == 0) {
//          this.patientInfo = data.obj
        } else {
          this.$router.push({
            path:"/bindRelativePhone",
            query:{backPath:this.path}
          });
        }
      })
       api("nethos.consult.info.list",{
         pageNo:1,
         pageSize:10,
         sort:"create_time.desc",
         statusList:['0'],
         token: tokenCache.get(),
       }).then((data)=>{
          if(data.code == 0){
            this.loadingStatus = false
            this.endStatus = true
            for(var i=0;i<data.list.length; i++){
              this.payList.push(data.list[i])
              this.createTime.push(formatDate(new Date(data.list[i].createTime)))
            }
          }else if(!(data.msg)){
            this.loadingStatus = false
              weui.alert("网络错误，请稍后重试")
          }else{
            this.loadingStatus = false
              weui.alert(data.msg)
          }
           console.log(data)
       })
    },
    methods:{
//      _initWaitPay(){
//        this.waitPay = new BScroll(this.$refs.waitPay,{
//          click:true
//        })
//      }
      scrollToEnd(){
        if (this.preventRepeatRequest) {
          return
        }
        this.loadingStatus = true
        this.preventRepeatRequest = true;
        this.listPage +=1;
        let that = this
        api("nethos.consult.info.list",{
          token: tokenCache.get(),
          sort:"create_time.desc",
          statusList:['0'],
          pageNo:that.listPage,
          pageSize:"10"
        }).then((data)=>{
           if(data.code == 0){
             for(var i=0;i<data.list.length; i++){
               this.payList.push(data.list[i])
               this.createTime.push(formatDate(new Date(data.list[i].createTime)))
             }
             this.loadingStatus = false
             that.dataLength = data.list.length
             if(data.list.length >= 10){
               this.preventRepeatRequest = false;
             }
           }else if(!(data.msg)){
             this.loadingStatus = false
               weui.alert("网络错误，请稍后重试")
           }else{
             this.loadingStatus = false
               weui.alert(data.msg)
           }
        })
      },
    },
    watch:{
//      payList(){
//        this.$nextTick(()=>{
//          setTimeout(()=>{
//            this._initWaitPay()
//          },20)
//        })
//      }
    },
    components:{
      Scroll
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .canceled{
    position: absolute;
    top: 90px;
    left:0;
    right:0;
    bottom:0;
    .emptyTips{
      position: absolute;
      top:0;
      right:0;
      left:0;
      bottom:0;
      color: #666666;
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
            word-break: break-all;
            /*background-color: #E64340;*/
          }
        }
        div.ConsultRelate {
          margin-top: 5px;
          span.name {
            font-size: 28rem/$rem;
            color: #999999;
            .circle {
              display: inline-block;
              width: 10px;
              height: 10px;
              margin-right: 3px;
              background-color: red;
              border-radius: 50%;
            }
          }
          span.money {
            font-size: 28rem/$rem;
            color: $assistWordBrown;
          }
        }
      }
      li:nth-child(1){
        padding-top: 5px;
      }
    }
    .loadMore{
      display: flex;
      justify-content: center;
      align-items: center;
      span.pullMore{
        display: flex;
        align-items: center;
        font-size: 12px;
        img{
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }
  }
  .number{
    color: #3399FF!important;
  }
</style>
