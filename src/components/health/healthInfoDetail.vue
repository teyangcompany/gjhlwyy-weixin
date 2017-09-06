<template>
    <div>
          <v-header :title="title" :rightTitle="rightTitle"></v-header>
          <div class="wrapArticle" ref="wrapArticle">
            <div>
              <div class="articleTop">
                <p class="title">{{ articleTitle }}</p>
                <p class="time">{{ articleTime }} 阅读：{{ infoDetail.viewCount }}次</p>
              </div>
              <div class="contentWrap">
                <div v-html="infoDetail.content">
                </div>
              </div>
            </div>
          </div>
    </div>
</template>
<script>
   import header from '../../base/header'
   import BScroll from 'better-scroll'
   import { formatDate } from '../../utils/formatTimeStamp'
   import api from '../../lib/api'
   export default{
       data(){
           return{
               title:"资讯详情",
               rightTitle:"",
               newId:"",
               infoDetail:"",
               articleTitle:"",
               articleTime:""
           }
       },
       created(){
           this.articleTitle= this.$route.query.title
           this.newId = this.$route.query.newId
            console.log(this.newId)
           api("nethos.system.information.details",{
             newId: this.newId
           }).then((data)=>{
               this.infoDetail = data.obj
               this.articleTime = formatDate(new Date(this.infoDetail.createTime))
               console.log(data)
           })
       },
       mounted(){

       },
       methods:{
           _initArticleScroll(){
               this.articleScroll = new BScroll(this.$refs.wrapArticle,{
                   click:true
               })
           }
       },
       components:{
           "VHeader":header
       },
       watch:{
         infoDetail(){
             this.$nextTick(()=>{
                 setTimeout(()=>{
                     this._initArticleScroll()
                 },20)
             })
         }
       }
   }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
.wrapArticle{
   position: fixed;
  top: 50px;
  left:0;
  right:0;
  bottom:40px;
  .articleTop{
    width:690rem/$rem;
    margin:0 auto;
    text-align: center;
    p.title{
      font-size: 40rem/$rem;
      color: #333333;
      margin-top: 10px;
    }
    p.time{
      font-size: 28rem/$rem;
      color: #999999;
      margin-top: 10px;
    }
  }
  .contentWrap{
    width:690rem/$rem;
    margin: 0 auto;
  }
}
</style>
