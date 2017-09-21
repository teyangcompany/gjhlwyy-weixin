<template>
    <div id="onlinepage">
        <top>
            <div class="middle big bf">消费记录</div>
        </top>

        <scroll v-show="!flag" class="page" pullup="true" @scrollToEnd="scrollToEnd" :data="list">
            <div class="wrap">
                <div class="detail" v-for="item of list">
                    <div class="patImg">
                        <img :src="item.patAvatar" alt="">
                    </div>
                    <div class="patName">
                        <ul>
                            <li class="bf">{{item.patName}} {{item.createTime | Todate}}</li>
                            <li class="bf"> {{item.paySubject}}</li>
                        </ul>
                    </div>
                    <div class="state bf">
                       <span style="color: blue" v-show="item.payType=='PAY'||item.payType=='CASHOUT'">{{item.payType=='PAY'?'支付':'提现'}}</span>
                       <span v-show="item.payType=='REFUND'">退款</span>
                        <span>
                            {{item.payFee}}
                        </span>

                    </div>
                </div>
            </div>
        </scroll>
        <loading v-show="flag"></loading>
        <div v-show="!flag&&list.length==0" class="test">暂无消费记录</div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../../base/app-header.vue'
    import scroll from '../../../base/scroll.vue'
    import api from '../../../lib/api'
    import {Todate} from '../../../lib/filter'
    import loading from '../../../base/loading/loading.vue'
    export default{
        components: {
            top,
            scroll,
            loading
        },
        filters:{
            Todate
        },
        data(){
            return {
                list:[],
                token:localStorage.getItem('token'),
                pageNo:1,
                pageSize:10,
                flag:true
            }
        },
        mounted(){
            this.getDate()
        },
        methods:{
            getDate(){
                api('nethos.pay.order.list',{
                    token:this.token,
                    pageNo:this.pageNo,
                    pageSize:this.pageSize
                }).then(res=>{
                    if(res.succ){
                        this.list = res.list;
                        this.flag = false
                    }else {
                        alert(res.msg)
                    }
                    console.log(res,7686)
                })
            },
            scrollToEnd(){
                this.pageSize+=10;
                this.getDate()
                console.log(2121)
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../../../common/public.scss";

  #onlinepage{
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
  }
    .page{
        position: fixed;
        left: 0;
        top: 44px;
        right: 0;
        bottom: 0;
    }
.wrap{
  overflow: auto;
  /*-webkit-overflow-scrolling: touch;*/
  margin-top: 10px;
  box-sizing: border-box;
  padding-bottom: 10px;
  border-top: 1px solid gainsboro;
}
.test{
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
}
  .detail{
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: white;
    box-sizing: border-box;
    padding: 10px 0;
    border-bottom: 1px solid gainsboro;

  }

  .patImg img{
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

</style>
