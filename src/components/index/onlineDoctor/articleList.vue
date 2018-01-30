<template>
    <div>
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
         <scroll class="articleList" :data="articleTime">
           <div>
             <div class="blank border-1px"></div>
             <router-link tag="div" :to="{path:'/articleDetail',query:{articleId:item.articleId}}" v-for="(item,index) in doctorArticle" :key="item.id">
               <p>{{ item.title }}</p>
               <p> <span v-if="item.isGrade == true" class="recommend">推荐</span> <span>{{ item.readTimes }}阅读</span> | <span>{{ articleTime[index] }}</span> </p>
               <div class="blank border-1px"></div>
             </router-link>
           </div>
         </scroll>
    </div>
</template>
<script>
  import header from '../../../base/header'
  import api from '../../../lib/api'
  import Scroll from '../../../base/scroll'
  import {formatDate} from '../../../utils/formatTimeStamp'
  export default{
      data(){
          return{
              title:"医生文章",
              rightTitle:"",
              doctorId:"",
            doctorArticle:"",
            articleTime:[]
          }
      },
       created(){
         this.doctorId = this.$route.query.docId
         this.$router.replace({
           path:'/doc/article/list',
           query:{
             docId:this.doctorId
           }
         });

         /*api("nethos.doc.card",{
           docId:this.doctorId
         }).then((data)=>{
           console.log(data)
           this.doctorArticle = data.obj.docArticleList
           for(var i=0;i<this.doctorArticle.length;i++){
             this.articleTime.push(formatDate( new Date(this.doctorArticle[i].createTime)))
           }
         })*/
       },
      components:{
          "VHeader":header,
           Scroll
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
.articleList{
   position: absolute;
   top: 50px;
    left:0;
    right:0;
    bottom:0;
  .blank{
    width:100%;
    height: 10px;
    background-color: rgb(245,245,245);
  }
   >div{
     p:nth-child(1){
       width:690rem/$rem;
       margin:0 auto;
       display: -webkit-box;
       -webkit-box-orient: vertical;
       -webkit-line-clamp: 1;
       overflow: hidden;
       word-break: break-all;
       text-align: left;
       padding-top: 10px;
       padding-bottom: 3px;
       font-size: 32rem/$rem;
     }
     p:nth-child(2){
       width:690rem/$rem;
       margin:0 auto;
       text-align: left;
       padding-bottom: 10px;
       padding-top: 3px;
       color: #999999;
       font-size: 28rem/$rem;
       span.recommend{
         background-color: $assistColorBrown;
         display: inline-block;
         width:70rem/$rem;
         height:40rem/$rem;
         line-height: 40rem/$rem;
         text-align: center;
         color: white;
         margin-right: 10px;
       }
     }
   }
}
</style>
