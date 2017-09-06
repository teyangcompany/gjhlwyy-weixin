<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle" @on-myNumber="goMyNumber()" @on-index="goIndex"></v-header>
    <div class="patientInfo">
      <div  v-if="allPatient">
        <div class="weui-cells wholeWeUi">
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p>{{ allPatient[index].compatName }}</p>
            </div>
            <div class="weui-cell__ft specialWord">{{allPatient[index].compatGender == 'M'? '男':'女'}} {{allPatient[index].compatAge}}</div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p>身份证号</p>
            </div>
            <div class="weui-cell__ft specialWord">{{ allPatient[index].compatIdcard }}</div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p>手机号</p>
            </div>
            <div class="weui-cell__ft specialWord">{{allPatient[index].compatMobile}}</div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">
              <p>病案号</p>
            </div>
            <div class="weui-cell__ft specialWord">暂无绑定病案号</div>
          </a>
        </div>
        <span @click="goUsual()">切换就诊人</span>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../../base/header'
  import api from '../../../lib/api'
  export default{
    data(){
      return{
        title:"排队叫号",
        rightTitle:"查询",
        allPatient:"",
        index:0
      }
    },
    mounted(){
      this.path = this.$route.path
    },
    created(){

      if(this.$route.query.index){
        this.index = this.$route.query.index
      }else{
        this.index= 0
      }
      api("nethos.pat.compat.list",{
        token:localStorage.getItem("token")
      }).then((data)=>{
        this.allPatient=data.list
//        this.changeName = this.allPatient[this.index].compatName
//        this.changeID = this.allPatient[this.index].compatIdcard
//        this.compatId = this.allPatient[this.index].compatId
        console.log(data.list)
      })
    },
    methods:{
      goUsual(){
        this.$router.push('/waitTogglePatient')
      },
      goMyNumber(){
         this.$router.push({
           path:'/myCallNumber',
           query:{compatId:this.allPatient[this.index].compatId}
         })
      },
      goIndex(){
          this.$router.push('/myProfile/index')
      }
    },
    components:{
      "VHeader":header
    },

  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .patientInfo{
    position: fixed;
    top: 50px;
    left:0;
    right:0;
    bottom:0;
    >div{
      width:690rem/$rem;
      margin: 0 auto;
      .wholeWeUi{
        background-color: $bgColor2;
        border-radius: 7px;
        p{
          font-size: 32rem/$rem;
          color: #333333;
        }
        .specialWord{
          font-size: 32rem/$rem;
          color: #999999;
        }
      }
      span{
        font-size: 32rem/$rem;
        color: $mainColor;
      }
    }
  }
</style>
