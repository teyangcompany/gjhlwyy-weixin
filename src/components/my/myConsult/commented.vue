<template>
  <scroll class="canceled" :data="consultList" :pullup="pullup" @scrollToEnd="scrollToEnd()" ref="cancel">
    <div>
      <router-link tag="ul" :to="{path:'/waitArrange',query:{consultId:item.consultId}}" class="border-1px" v-for="(item,index) in consultList" :key="item.id">
        <li v-if="item.consultTypeName != '名医视频' && item.consultTypeName != '在线医生视频'" >
          <div>
            <span class="picConsult">{{ item.consultTypeName }}</span>
            <span class="consultTim">{{ createTime[index] }}</span>
          </div>
          <div class="mainContent">
            <p>{{ item.consultContent }}</p>
          </div>
          <div class="ConsultRelate">
            <span class="name"><span class="circle" v-if="(item.docName)"> </span><span class="number">{{ item.docName }}</span></span>
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
  </scroll>
</template>
<script>
  import BScroll from 'better-scroll'
  import api from '../../../lib/api'
  import Scroll from '../../../base/scroll'
  import {isLoginMixin} from "../../../lib/mixin"
  import {formatDate} from '../../../utils/formatTimeStamp'
  export default{
    mixins: [isLoginMixin],
    data(){
        return{
          consultList:[],
          pullup:true,
          listPage:1,
          dataLength:"",
          loadingStatus:true,
          createTime:[]
        }
    },
    mounted(){

    },
    created(){
      api("nethos.pat.info.get", {
        token:localStorage.getItem('token')
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
           token:localStorage.getItem("token")
       }).then((data)=>{
           this.loadingStatus = false
         for(var i=0;i<data.list.length; i++){
           this.consultList.push(data.list[i])
           this.createTime.push(formatDate(new Date(data.list[i].createTime)))
         }
//          this.consultList.push(data.list)
         console.log(data)
         console.log(this.createTime)
          console.log(this.consultList)
       })
    },
    methods:{
      _initCancel(){
        this.cancel = new BScroll(this.$refs.cancel,{
          click:true
        })
      },
      scrollToEnd(){
        if (this.preventRepeatRequest) {
          return
        }
        this.loadingStatus = true
        this.preventRepeatRequest = true;
        this.listPage +=1;
        let that = this
        api("nethos.consult.info.list",{
          token:localStorage.getItem("token"),
          sort:"create_time.desc",
          pageNo:that.listPage,
          pageSize:"10"
        }).then((data)=>{
          for(var i=0;i<data.list.length; i++){
            this.consultList.push(data.list[i])
            this.createTime.push(formatDate(new Date(data.list[i].createTime)))
          }
          this.loadingStatus = false
          that.dataLength = data.list.length
          if(data.list.length >= 10){
            this.preventRepeatRequest = false;
          }
        })
      },
    },
    watch:{
//      consultList(){
//        this.$nextTick(()=>{
//          setTimeout(()=>{
//            this. _initCancel()
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
        /*<!--height: 200rem/$rem;-->*/
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
          height: 52px;
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
            font-size: 30rem/$rem;
            color: #666666;
            word-break: break-all;
            /*height: 52px;*/
            padding: 5px 5px 5px 5px;
            border-radius: 7px;
          }
        }
        div.ConsultRelate {
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
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
            color: $mainColor!important;
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
