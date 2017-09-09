<template>
  <transition name="slide">
    <div class='fileIndex'>
      <v-header :title="title" :rightTitle="rightTitle"></v-header>
      <div class="healthFile" ref="healthFile">
        <div>
          <ul>
            <li>
              <div class="cancelImg">
                <img :src="docObj.patAvatar" alt="">
              </div>
              <div class="cancelIntro">
                <div class="introTitle">
                  <span class="subTitle">{{docObj.patName}}</span>
                  <p>姓名:{{docObj.patName}}</p>
                  <p>{{docObj.patGender=='M'?'男':'女'}} {{docObj.age}} </p>
                </div>
              </div>
            </li>
          </ul>
          <div class="basic">
            <div>
              基本情况
            </div>
          </div>
          <div tag="div" @click="goIll(history.presentingComplaint)"  class="illness border-1px">
            <div>
              所患疾病
              <div>
                <span v-show="flag">{{history.presentingComplaint?history.presentingComplaint.substring(0,5)+'......':'无'}}</span>
                <img src="../../../static/img/查看更多.png" alt="">
              </div>
            </div>
          </div>
          <div tag="div"  @click="goPastHistory(history.pastHistory)" class="history border-1px">
            <div>
              既往史
              <div>
                <span  v-show="flag">
                {{history.pastHistory?history.pastHistory.substring(0,5)+'......':'无'}}
                </span>
                <img src="../../../static/img/查看更多.png" alt="">
              </div>
            </div>
          </div>
          <div tag="div" @click="goFamilyHistory(history.familyHistory)" class="family border-1px">
            <div>
              家族史
              <div>
                <span  v-show="flag">
                 {{history.familyHistory?history.familyHistory.substring(0,5)+'......':'无'}}
                </span>
                <img src="../../../static/img/查看更多.png" alt="">
              </div>
            </div>
          </div>
          <div tag="div" @click="goAllergyHistory(history.allergyHistory)" class="alergic border-1px">
            <div>
              过敏史
              <div>
                <span  v-show="flag">
                  {{history.allergyHistory?history.allergyHistory.substring(0,5)+'......':'无'}}
                </span>
                <img src="../../../static/img/查看更多.png" alt="">
              </div>
            </div>
          </div>
          <div class="basic">
            <div>
              诊疗记录
            </div>
          </div>
          <div class="recordList border-1px" v-show="historyList">
            <div class="wrapList" v-for="item of historyList" @click="goDelete(item)">
              <p class="listTime number">{{item.createTime | Todate}}</p>
              <p class="listContent">{{item.medContent}}</p>
              <div class="recordImg">
                <div v-for="url of item.sysAttachmentList">
                  <img :src="url.url" alt="" @load="getImg">
                </div>

              </div>
            </div>
          </div>
          <div class="addFile">
            <router-link tag="div" :to="{path:'/addRecord',
            query:{
            patId:patId}}" class="button">
              <button>+ 添加诊疗记录</button>
            </router-link>
          </div>
        </div>

      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  import {Todate} from '../../lib/filter'
  export default{
    data(){
      return{
        title:'健康档案',
        rightTitle:'',
        token:localStorage.getItem('token'),
        docObj:{},
        history:{},
        historyList:[],
        patId:'',
        flag:false
      }
    },
    filters:{
      Todate
    },
    mounted(){
      this.$nextTick(()=>{
        this._initFileScroll()
      });

      api('nethos.pat.info.get',{
        "token":localStorage.getItem('token')
      }).then(res=>{
        if(res.succ){
          this.docObj = res.obj;
          this.getData();
          this.getHistory();
          this.patId = res.obj.patId
        }else {
          alert(res.msg)
        }
      })
    },
    methods:{
      goAllergyHistory(val){
        this.$router.push({
          name:'allergyHistory',
          params:{
            val:val,
            patId:this.patId
          }
        })
      },
      goFamilyHistory(val){
        this.$router.push({
          name:'familyHistory',
          params:{
            val:val,
            patId:this.patId
          }
        })
      },
      goIll(val){
        this.$router.push({
          name:'ill',
          params:{
            val:val,
            patId:this.patId
          }
        })
      },
      goPastHistory(val){
        this.$router.push({
          name:'pastHistory',
          params:{
            val:val,
            patId:this.patId
          }
        })
      },
      goDelete(value){
        this.$router.push({
          name:'deleteRecord',
          params:{
            obj:value
          }
        })
      },
      _initFileScroll(){
        this.fileScroll = new BScroll(this.$refs.healthFile,{
          click:true
        })
      },
      getData(){
        api('nethos.pat.medicalinfo.details',{
          patId:this.docObj.patId,
          "token":localStorage.getItem('token')
        }).then(res=>{
          if(res.succ){
            console.log(res,9999);
            if(res.obj){
              console.log(this.flag)
              this.flag=true;
              this.history = res.obj;
            }

          }else {
            alert(res.msg)
          }
        })
      },
      getHistory(){
        api('nethos.pat.medicalhistroy.list',{
          "token":localStorage.getItem('token'),
          patId:this.docObj.patId,
        }).then(res=>{
          if(res.succ){
            console.log(res,88888);
            this.historyList = res.list
          }else {
            alert(res.msg)
          }
        })
      },
      getImg(){
        console.log(212121);
        this._initFileScroll()
      },
    },
    components:{
      'VHeader':header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .fileIndex{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .healthFile{
    width:100%;
    position: fixed;
    top:50px;
    bottom:0;
    left:0;
    right:0;
    background-color: white;
    ul{
      padding:0;
      margin:0 auto;
      width: 690rem/$rem;
      height: 204rem/$rem;
      border-radius: 10px;
      /*background-color: rgb(245,251,251);*/
      li{
        list-style-type: none;
        height: 204rem/$rem;
        display: flex;
        .cancelImg{
          width: 134rem/$rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 30rem/$rem;
          img{
            width:134rem/$rem;
            height:134rem/$rem;
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
              margin:5px 0 5px 0;
              font-size: 26rem/$rem;
              color: #999999;
            }
          }
        }
        img{
          width: 134rem/$rem;
          height: 134rem/$rem;

        }
      }
    }
    .basic,.illness,.history,.family,.alergic,.record{
      width: 100%;
      height: 90rem/$rem;
      /*border-top: 1px solid rgb(205,205,205);*/
      >div{
        width: 690rem/$rem;
        height: 90rem/$rem;
        margin:0 auto;
        display: flex;
        font-size:32rem/$rem;
        font-family: PingFangSC;
        color: #333333;
        align-items: center;
        justify-content: space-between;
        >div{
          span{
            font-size:32rem/$rem;
            font-family: PingFangSC;
            color: #666666;
            display: inline-block;
          }
          img{
            width: 7.5px;
          }
        }
      }
    }
    .basic,.record{
      background-color: rgb(245,245,245);
    }
    .basic{
      height:80rem/$rem;
      >div{
        font-size: 28rem/$rem;
        font-family: PingFangSC;
        color: #666666;
      }
    }
    .recordList{
      width:100%;
      /*border-bottom: 1px solid rgb(205,205,205);*/
      .wrapList{
        width: 690rem/$rem;
        margin:0 auto;
        .listTime{
          font-size: 32rem $rem;
          color: #666666;
          font-family: PingFangSC;
          margin-top: 30rem/$rem;
          margin-bottom: 20rem/$rem;
        }
        .listContent{
          font-size: 28rem/$rem;
          font-family: PingFangSC;
          line-height: 20px;
          color: #666666;
        }
        .recordImg{
          width: 690rem/$rem;
          margin: 10px auto;
          display: flex;
          flex-wrap: wrap;
          >div{
            width: 25%;
            text-align: center;
            img{
              width: 140rem/$rem;
              height: 140rem/$rem;
            }
          }
        }
      }
    }
    .addFile{
      width:100%;
      height: 100px;
      margin-top: 50px;
      margin-bottom: 50px;
      /*background-color: #0FBDFF;*/
      display: flex;
      justify-content: center;
      div.button{
        width: 690rem/$rem;
        height: 94rem/$rem;
        /*background-color: #E64340;*/
        button{
          width: 690rem/$rem;
          height: 94rem/$rem;
          border:none;
          outline: medium;
          border-radius: 10px;
          color: white;
          background-color: #0FBDFF;
        }
      }
    }
  }
  .number{
    color: #3399FF!important;
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform:  translate3d(100%,0,0);
  }
</style>
