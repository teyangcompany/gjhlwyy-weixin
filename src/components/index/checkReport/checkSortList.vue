<template>
    <div>
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
         <div class="checkList">
             <div class="checkCenter">
               <div class="weui-cells weuiMargin">
                 <router-link tag="a" :to="{path:'/testReportDetail',query:{specialIndex:specialIndex,selectValue:'检验报告',index:index,patCard:patCard,compatId:compatId}}" class="weui-cell weui-cell_access" href="javascript:;">
                   <div class="weui-cell__bd">
                     <p>检验报告</p>
                   </div>
                   <div class="weui-cell__ft">
                   </div>
                 </router-link>
                 <router-link tag="a" :to="{path:'/checkReportDetail',query:{specialIndex:specialIndex,selectValue:'检查报告',index:index,patCard:patCard,compatId:compatId}}" class="weui-cell weui-cell_access" href="javascript:;">
                   <div class="weui-cell__bd">
                     <p>检查报告</p>
                   </div>
                   <div class="weui-cell__ft">
                   </div>
                 </router-link>
               </div>
               <div class="warmTips">
                   <h3>温馨提示：</h3>
                   <p>1.检验报告：查看血常规、尿检等生化类报告单信息；</p>
                   <p>2.检查报告：查看CT、MRI（磁共振）、X光、B超等检查类报告单信息；</p>
                   <p>3.报告仅供参考，请以医院实际纸质报告为准。</p>
               </div>
             </div>
         </div>
    </div>
</template>
<script>
  import header from '../../../base/header'
  export default{
      data(){
          return{
              title:"查报告单",
              rightTitle:"",
              patCard:"",
              compatId:"",
              index:"",
            specialIndex:""

          }
      },
      created(){
          this.index= this.$route.query.index
          this.patCard = this.$route.query.patCard
          this.compatId = this.$route.query.compatId
          this.specialIndex = this.$route.query.specialIndex
      },
      components:{
          "VHeader":header
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
.checkList{
   position: fixed;
  top: 50px;
  left:0;
  right:0;
  bottom:0;
  .checkCenter{
    width:690rem/$rem;
    margin: 0 auto;
    .weuiMargin{
      margin-top: 10px;
      background-color: $bgColor2;
      border-radius: 7px;
    }
    .warmTips{
      margin-top: 30rem/$rem;
       h3,p{
         font-size: 24rem/$rem;
         color: #666666;
         font-weight: normal;
         line-height: 36rem/$rem;
       }
    }
  }
}
</style>
