<template>
    <div>
      <v-header :title="title" :rightTitle="rightTitle" @on-index="goIndex()"></v-header>
      <div class="book">
        <div>
          <ul class="border-1px" @click="alertBook(index)" v-for="(item,index) in hosList">
            <div>
              <li>
                <div class="cancelImg">
                  <img :src="item.hosPic" alt="">
                </div>
                <div class="cancelIntro">
                  <div>
                    <span class="myDoctor">{{ item.hosShortname }}</span>
                    <p>{{ item.hosLevel }}</p>
                    <p>{{ item.hosAddress }}</p>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div class="mask" v-show="book" >

      </div>
      <div class="bookCenter" v-show="book" @click="hideBook()">
        <div class="forPosition">
          <router-link tag="div" :to="{path:'/selectType',query:{bookHosId:this.bookHosId,bookSort:'预约挂号'}}">
            <img src="../../../static/img/book/doctor.png" alt="">
            <div class="middlePosition">
              <p>预约挂号</p>
              <p>七天内普通号、专家号预约</p>
            </div>
            <div class="seeMore">
              <img src="../../../static/img/查看更多.png" alt="">
            </div>
          </router-link>
          <router-link tag="div" :to="{path:'/selectType',query:{bookHosId:this.bookHosId,bookSort:'实时挂号'}}">
            <img src="../../../static/img/book/doctor.png" alt="">
            <div class="middlePosition">
              <p>当天挂号</p>
              <p>今天号源立挂立取</p>
            </div>
            <div class="seeMore">
              <img src="../../../static/img/查看更多.png" alt="">
            </div>
          </router-link>
        </div>
      </div>
    </div>
</template>
<script>
  import header from '../../base/header'
  import api from '../../lib/api'
  export default{
      data(){
          return{
              title:"预约挂号",
              rightTitle:"",
              book:false,
              hosList:"",
              bookHosId:"",
              bookSort:""
          }
      },
      created(){
          api("nethos.book.hos.area.list",{

          }).then((data)=>{
              this.hosList = data.list
              console.log(this.hosList)
          })
      },
      methods:{
        alertBook(index){
            this.bookHosId = this.hosList[index].bookHosId
            this.book = true
        },
        hideBook(){
            console.log("123")
            this.book = false
        },
        goIndex(){
            this.$router.push('/myProfile/index')
        }
      },
      components:{
          "VHeader":header
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .book{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
    >div{
      ul{
        padding:0;
        margin:0;
        position: relative;
        height: 180rem/$rem;
        /*border-bottom: 1px solid rgb(205,205,205);*/
        li{
          list-style-type: none;
          height: 180rem/$rem;
          display: flex;
          .cancelImg{
            width: 220rem/$rem;
            display: flex;
            justify-content: center;
            align-items: center;
            img{

            }
          }
          .cancelIntro{
            flex:2;
            display: flex;
            align-items: center;
            /*line-height: 25px;*/
            >div{
              .myDoctor{
                border-radius:5px;
                display: inline-block;
                font-size: 32rem/$rem;
                color: #333333;
                /*line-height: 18px;*/
                text-align: center;
              }
              p{
                margin:0;
                color: #999999;
                font-size: 28rem/$rem;
              }
            }
          }
          .distance{
            position: absolute;
            right:30rem/$rem;
            top:78rem/$rem;
            font-size: 28rem/$rem;
            color: #999999;
          }
          img{
            width: 160rem/$rem;
            height: 140rem/$rem;
          }
        }
      }
    }
  }
  .mask{
    width:100%;
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index:15;
    background-color: gray;
    opacity: 0.5;
  }
  .bookCenter{
    width:100%;
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index:20;
    display: flex;
    align-items: center;
    justify-content: center;
    div.forPosition{
       >div{
         width:600rem/$rem;
         height:140rem/$rem;
         display: flex;
         align-items: center;
         justify-content: space-around;
         background-color: white;
         margin-bottom: 20rem/$rem;
         border-radius: 7px;
         >img{
           width:90rem/$rem;
         }
         .middlePosition{
           width: 340rem/$rem;
           p{
             font-size: 32rem/$rem;
             color: #333333;
             font-weight: bold;
           }
           p:last-child{
             font-weight: normal;
             font-size: 28rem/$rem;
             color: #999999;
           }
         }
         >div{

         }
         .seeMore{
           img{
             width: 16rem/$rem;
             height:24rem/$rem;
           }
         }
       }
    }
  }
</style>
