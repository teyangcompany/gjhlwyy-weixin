<template>
  <transition name="slide">
    <div class="wrapWhole">
      <v-header :title="title" :rightTitle="rightTitle" @0n-addUsual="addPatient()"></v-header>
      <div class="usual" ref="usual">
        <div>
          <router-link tag="div" :to="{path:'/detailUsual',query:{index:index}}" class="usualLine" v-for="(item,index) in patientList" :key="item.id">
            <div class="usualCenter">
              <ul>
                <li><span class="patientName">{{ item.compatName }}</span><span>{{ item.compatAge }} &nbsp;{{ item.compatGender == "M" ? "男":"女"}}</span></li>
                <li>身份证号：<span>{{ item.compatIdcard.substr(0,6) }}********{{item.compatIdcard.substr(14)}}</span></li>
                <li>手机号：<span>{{ item.compatMobile.substr(0,3) }}****{{item.compatMobile.substr(7)}}</span></li>
                <li v-if="!(item.compatMedicalRecord)">病案号：<span >暂未绑定病案号</span></li>
                <li v-else>病案号：<span >{{ item.compatMedicalRecord }}</span></li>
              </ul>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  export default{
    data(){
      return{
        title:"常用就诊人",
        rightTitle:"添加",
        patientList:[]
      }
    },
    created(){
       api("nethos.pat.compat.list",{
             token:localStorage.getItem("token")
       }).then((data)=>{
           this.patientList = data.list
           console.log(this.patientList)
       })
    },
    methods:{
      addPatient(){
        this.$router.push('/addUsualPatient')
      },
      _initUsualScroll(){
        this.usualScroll = new BScroll(this.$refs.usual,{
          click:true
        })
      }
    },
    components:{
      "VHeader":header
    },
    watch:{
      patientList(){
        this.$nextTick(()=>{
          setTimeout(()=>{
            this._initUsualScroll()
          },20)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .wrapWhole{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
  }
  .usual{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom: 20px;
    background-color: white;
    .usualLine{
      width:100%;
      background-color: white;
    }
    .usualCenter{
      width:690rem/$rem;
      margin:0 auto;
      /*margin-top: 5px;*/
      background-color: white;
      ul{
        margin:0;
        padding:0;
        margin-top: 10px;
        li{
          list-style-type: none;
          height:80rem/$rem;
          line-height: 80rem/$rem;
          margin-top: 1px;
          background-color: $bgColor2;
          font-size: 32rem/$rem;
          padding-left: 10px;
          span{
            font-size: 32rem/$rem;
            color: #999999;
          }
          .patientName{
            color: #333333;
            display: inline-block;
            min-width:150rem/$rem;
          }
        }
        li:first-child{
          border-top-left-radius: 7px;
          border-top-right-radius: 7px;
        }
        li:last-child{
          border-bottom-left-radius: 7px;
          border-bottom-right-radius: 7px;
        }
      }
    }
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
    opacity: 1;
  }
  .slide-enter,.slide-leave-to{
    transform:  translate3d(100%,0,0);
    opacity: 1;
  }
</style>
