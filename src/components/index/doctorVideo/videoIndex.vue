<template>
    <div>
        <v-header :title="title" :rightTitle="rightTitle" @on-consult="goMyConsult()"></v-header>
        <div class="videoIndex" ref="videoIndex">
          <div v-if="famousList.length == 0" class="loading">
            <img src="../../../../static/img/loading.gif" alt="">
            <span>正在很努力的加载中...</span>
          </div>
          <div v-else>
            <ul  class="border-1px" v-for="item in famousList">
              <router-link tag="div" :to='{path:"/doctorCard",query:{docId:item.docId}}'>
                <li>
                  <div class="cancelImg">
                    <img :src="item.docAvatar" alt="">
                  </div>
                  <div class="cancelIntro">
                    <div>
                      <span class="chatDoctor">{{ item.docName }}</span> <span class="doctorTitle">{{ item.docTitle }}</span>
                      <p>{{ item.docHosName }}</p>
                      <p>{{ item.docDeptName }}</p>
                    </div>
                  </div>
                  <div class="cancelTime">
                    <div >
                      <span class="year">{{ item.docScoure }}</span> <span class="star">星</span>
                      <img src="../../../../static/img/查看更多.png" alt="">
                    </div>
                  </div>
                </li>
              </router-link>
            </ul>
          </div>
          <div class="help border-1px-top">
            <div @touchend.prevent="goWrite()">
              <button>帮我找名医</button>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
  import header from '../../../base/header'
  import api from '../../../lib/api'
  import BScroll from 'better-scroll'
  export default{
      data(){
          return{
              title:"名医视频",
              rightTitle:"我的问诊",
              famousList:""
          }
      },
      mounted(){

      },
      created(){
          api("nethos.doc.list",{
            token:localStorage.getItem("token"),
            docFamousConsultStatus:true
          }).then((data)=>{
              this.famousList = data.list
              console.log(data.list)
          })
      },
      methods:{
        goMyConsult(){
            this.$router.push('/myConsult/commented')
        },
        goWrite(){
//            this.$router.push('/writeInfo')
              this.$router.push('/famousConsultNext')
        },
        _initVideo(){
            this.video = new BScroll(this.$refs.videoIndex,{
                click:true
            })
        }
      },
      components:{
          "VHeader":header
      },
      watch:{
        famousList(){
          this.$nextTick(()=>{
            this._initVideo()
          })
        }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
.videoIndex{
  position: fixed;
  top: 50px;
  left:0;
  right:0;
  bottom: 50px;
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
  ul{
    padding:0;
    margin:0;
    height: 180rem/$rem;
    li{
      list-style-type: none;
      height: 180rem/$rem;
      display: flex;
      .cancelImg{
        width: 160rem/$rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 7px;
        img{
          width: 110rem/$rem;
          height: 110rem/$rem;
          border-radius: 7px;
        }
      }
      .avartarImg{
        width: 160rem/$rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 110rem/$rem;
          height: 110rem/$rem;
        }
      }
      .cancelIntro{
        flex:2;
        display: flex;
        align-items: center;
        line-height: 40rem/$rem;
        .badgeDoc{
          display: inline-block;
          padding-top: -5px;
          .myDoctor{
            width: 80rem/$rem;
            height: 36rem/$rem;
            background-color: darkturquoise;
            border-radius:5px;
            display: inline-block;
            font-size: 10px;
            color: white;
            line-height: 40rem/$rem;
            text-align: center;
          }
        }
        p{
          margin:0;
          color: #999999;
          font-size: 28rem/$rem;
        }
        span.chatDoctor{
          font-size: 32rem/$rem;
          color: #333333;
        }
        span.doctorTitle{
          font-size: 28rem/$rem;
          color: #666666;
        }
      }
      .cancelTime{
        flex:1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 20rem/$rem;
        .star{
          font-size: 28rem/$rem;
          color: #999999;
        }
        img{
          width:16rem/$rem;
          height: 24rem/$rem;
        }
        span.year{
          font-size: 32rem/$rem;
          color: $assistWordBrown;
        }
        span.full{
          color: #999999;
        }
      }
    }
  }
  .help{
    position: fixed;
    bottom: 0px;
    height: 50px;
    line-height: 50px;
    background-color: white;
    width:100%;
    >div{
      width:690rem/$rem;
      margin: 0 auto;
      button{
        width:690rem/$rem;
        height:80rem/$rem;
        border:none;
        outline: medium;
        background-color: $buttonColor;
        border-radius: 7px;
        font-size: 32rem/$rem;
        color: white;
      }
      p{
        padding:0;
        margin:0;
        font-size: 28rem/$rem;
        color: #999999;
        span{
          color: $mainColor;
        }
      }
    }
  }
}
</style>
