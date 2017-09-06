<template>
  <scroll class="canceled" ref="waitPay" :data="payList">
    <div>
      <router-link tag="ul" :to="{path:'/waitArrange',query:{consultId:item.consultId}}" class="border-1px"  v-for="item in payList" :key="item.id">
        <li>
          <div>
            <span class="picConsult">{{ item.consultTypeName }}</span>
            <span class="consultTim">2016/11/28 18:17</span>
          </div>
          <div class="mainContent">
            <p>{{ item.consultContent }}</p>
          </div>
          <div class="ConsultRelate">
            <span class="name"><span class="circle"> </span><span class="number">{{ item.docName }}</span></span>
            <span class="money">{{ item.consultStatusDescription }}</span>
          </div>
        </li>
      </router-link>
    </div>
  </scroll>
</template>
<script>
  import BScroll from 'better-scroll'
  import api from '../../../lib/api'
  import Scroll from '../../../base/scroll'
  export default{
    data(){
       return{
         payList:[]
       }
    },
    mounted(){

    },
    created(){
       api("nethos.consult.info.list",{
         statusList:['0'],
         token:localStorage.getItem("token"),
       }).then((data)=>{
           this.payList = data.list
           console.log(data)
       })
    },
    methods:{
//      _initWaitPay(){
//        this.waitPay = new BScroll(this.$refs.waitPay,{
//          click:true
//        })
//      }
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
  }
</style>
