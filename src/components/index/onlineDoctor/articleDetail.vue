<template>
    <div>
         <v-header :title="title" :rightTitle="rightTitle"></v-header>
        <div class="wrapArticle" ref="wrapArticle">
          <div>
            <div class="articleTop">
              <p class="title">{{ article.title }}</p>
              <p class="time"> {{ time }}  阅读：{{ article.readTimes }}次</p>
            </div>
            <div class="contentWrap">
              <div v-html="article.content">
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
  import header from '../../../base/header'
  import api from '../../../lib/api'
  import {formatDate} from '../../../utils/formatTimeStamp'
  export default{
      data(){
          return{
              title:"文章详情",
               rightTitle:"",
              article:"",
              articleId:"",
              time:""
          }
      },
      created(){
         this.articleId = this.$route.query.articleId
         api("nethos.doc.article.detail",{
           articleId:this.articleId
         }).then((data)=>{
             this.article = data.obj.docArticle
             this.time = formatDate(new Date(this.article.createTime))
             console.log(data)
         })
      },
      components:{
          "VHeader":header
      }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
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
