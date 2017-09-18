<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle" @on-myProfile="goMyProfile"></v-header>
    <div v-if="!orderList" class="loading">
      <img src="../../../static/img/loading.gif" alt="">
      <span>正在很努力的加载中...</span>
    </div>
    <div class="myBookNumber" v-else ref="myBookNumber">
      <div>
        <router-link tag="div" :to="{path:'/bookNumberDetail',query:{bookHosId:item.bookHosId,index:index}}" class="numberCenter" v-for="(item,index) in orderList" :key="item.id">
          <ul>
            <li>
              <p class="hosTitle">{{ item.hosName }}</p>
              <p class="date border-1px">{{ item.bookTime }}</p>
              <p class="aboutRoom"> <span>{{ item.deptName }}</span> <span>{{ item.docName }}</span> </p>
            </li>
          </ul>
        </router-link>
        <div class="assistScroll">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../base/header'
  import api from '../../lib/api'
  import BScroll from 'better-scroll'
  export default{
    data(){
      return{
        title:"我的挂号",
        rightTitle:"",
        orderList:""
      }
    },
    created(){
      api("nethos.book.order.list",{
        token:localStorage.getItem('token')
      }).then((data)=>{
        this.orderList = data.list
        console.log(data)
      })
    },
    methods:{
      goMyProfile(){
        this.$router.push('/myProfile')
      },
      _initMyBookNumber(){
          this.bookNumber = new BScroll(this.$refs.myBookNumber,{
              click:true
          })
      }
    },
    components:{
      "VHeader":header
    },
    watch:{
      orderList(){
          this.$nextTick(()=>{
              setTimeout(()=>{
                  this._initMyBookNumber()
              },20)
          })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .loading{
    position: fixed;
    top: 90px;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      width:100rem/$rem;
      margin-bottom: 10px;
    }
    span{
      font-size: 32rem/$rem;
      color: #999999;
    }
  }
  .myBookNumber{
    position: fixed;
    top:60px;
    left:0;
    right:0;
    bottom:0;
    .numberCenter{
      width:690rem/$rem;
      margin: 10px auto;
      background-color: $bgColor2;
      border-radius: 7px;
      p{
        padding:0px 5px 0px 5px;
        height:80rem/$rem;
        line-height: 80rem/$rem;
        font-size: 32rem/$rem;
      }
      p.hosTitle{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      p.date{
        text-align: right;
        color: #999999;
      }
      p.aboutRoom{
        display: flex;
        color: #999999;
        justify-content: space-between;
      }
    }
    .assistScroll{
      height: 20px;
    }
  }
</style>
