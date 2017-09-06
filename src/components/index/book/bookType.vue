<template>
  <div>
    <div class="top_bar main_head border-1px">
      <section class="goBack" @click="goRoomList()">
        <img src="../../../../static/img/返回.png" alt="">
      </section>
      <section class="title">
        <span class="word">
          <div>
            <router-link tag="div" :to="{path:'/bookType/expert',query:{bookDeptId:this.bookDeptId,bookHosId:this.bookHosId,bookSort:this.bookSort}}" class="expert tab-item">
             <p class="expertP">按专家预约</p>
           </router-link>
           <router-link tag="div" :to="{path:'/bookType/date',query:{bookDeptId:this.bookDeptId,bookHosId:this.bookHosId,bookSort:this.bookSort}}" class="date tab-item">
             <p class="dateP">按时间预约</p>
           </router-link>
          </div>
        </span>
      </section>
      <section class="nav">
        <span class="rightWord"></span>
      </section>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
    import api from '../../../lib/api'
    export default{
      data(){
          return{
            commonNum:"",
            bookDeptId:"",
            bookHosId:""
          }
      },
      created(){
        this.bookDeptId = this.$route.query.bookDeptId
        this.bookHosId = this.$route.query.bookHosId
        this.bookSort=this.$route.query.bookSort
        console.log(this.bookSort)
        console.log(this.bookDeptId)
//        api("nethos.book.doc.normal.scheme.list",{
//          bookDeptId:this.bookDeptId
//        }).then((data)=>{
//          this.commonNum = data.obj
//          console.log(data)
//        })
      },
        methods:{
          goRoomList(){
              this.$router.push({
                path:'/selectType',
                query:{bookHosId:this.bookHosId,bookSort:this.bookSort}
              })
          }
        }
    }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .top_bar{
    background-color: white;
    height: 50px;
    line-height: 50px;
    width:100%;
    position: fixed;
    top:0;
    z-index:20000000000000000;
    display: flex;
    section{
      text-align: center;
      height: 50px;
      .word{
        font-size: 18px;
        color: #333333;
        font-family: PingFang SC;
        >div{
          display: flex;
          align-items: center;
          .router-link-exact-active{
            p{
              background-color: $mainColor;
              color: white;
            }
          }
          >div{
            height: 50px;
            display: flex;
            align-items: center;
            p{
              height: 25px;
              line-height: 25px;
              width:180rem/$rem;
              border:1px solid $mainColor;
              color: $mainColor;
              font-size: 32rem/$rem;
              padding:0 5px 0 5px;
            }
            .expertP{
              border-bottom-left-radius: 7px;
              border-top-left-radius: 7px;
              border-right: none;
            }
            .dateP{
              border-left: none;
              border-top-right-radius: 7px;
              border-bottom-right-radius: 7px;
            }
          }
        }
      }
      span{
        display: block;
      }
    }
    .goBack{
      flex:1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      img{
        height: 15px;
        padding-left: 30rem/$rem;
      }
    }
    .scanImg{
      flex:1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      /*padding-left: 15px;*/
      img{
        width:40rem/$rem;
        padding-left: 30rem/$rem;
      }
    }
    .title{
      flex:2;
    }
    .nav{
      flex:1;
      .rightWord{
        font-size: 32rem/$rem;
        color: $mainColor;
      }
    }
  }
</style>
