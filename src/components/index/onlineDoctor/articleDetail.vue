<template>
  <div class="page">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div :style="style" class="wrapArticle" ref="wrapArticle">
      <div>
        <div class="articleTop">
          <p class="title">{{ article.title }}</p>
          <p class="time"> {{ time }} 阅读：{{ article.readTimes }}次</p>
        </div>
        <div class="contentWrap">
          <!--          <span style="padding: 0px 15px 30px 15px;font-size: 16px;line-height: 1.5"></span>
                    <img src="" alt="" style="margin-bottom: 30px;margin: 0 15px 30px 15px;width: 100%;height: auto">-->
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
  import {OPEN_ARTICLE_DETAIL_VERSION} from "../../../lib/config";

  export default {
    data() {
      return {
        title: "文章详情",
        rightTitle: "",
        article: "",
        articleId: "",
        time: "",
        style: {}
      }
    },
    created() {
      this.style = {
        height: `${window.innerHeight - 50}px`
      }
      this.articleId = this.$route.query.articleId
      if (OPEN_ARTICLE_DETAIL_VERSION) {
        this.$router.replace({path: '/doc/article/' + this.articleId});
      } else {
        api("nethos.doc.article.detail", {
          articleId: this.articleId
        }).then((data) => {
          this.article = data.obj.docArticle
          this.time = formatDate(new Date(this.article.createTime))
        })
      }

    },
    components: {
      "VHeader": header
    }
  }
</script>
<style lang="scss">
  @import '../../../common/public.scss';

  .wrapArticle {
    flex: 0 0 auto;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .articleTop {
      width: 690rem/$rem;
      margin: 0 auto;
      text-align: center;
      p.title {
        font-size: 40rem/$rem;
        color: #333333;
        margin-top: 10px;
      }
      p.time {
        font-size: 28rem/$rem;
        color: #999999;
        margin-top: 10px;
      }
    }
    .contentWrap {
      width: 690rem/$rem;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
  }
</style>
