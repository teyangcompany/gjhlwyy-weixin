<template>
  <div class="flex doc-info">
    <div class="ava flex0">
      <img :src="info.docAvatar" alt="">
    </div>
    <div class="info">
      <h3>
        {{info.docName}}&nbsp;&nbsp;<span>名医</span>
      </h3>
      <div class="dept">
        {{info.docDeptName}} {{info.docTitle}}
      </div>
      <div class="hos">
        {{info.docHosName}}
      </div>
      <div class="score">
        <b>{{info.docScoure}}</b>
        <star :score="info.docScoure" :size="24"></star>
      </div>
      <div class="rate">
        {{info.commentCount}}个评价 <router-link :to="{path:'/commentDetail',query:{docId:info.docId}}">查看></router-link>
      </div>

    </div>
  </div>
</template>

<script>
  import Star from '../../base/star/star'

  export default {
    props: {
      info: {
        type: Object
      }
    },
    data() {
      return {};
    },
    computed: {},
    components: {
      Star
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .doc-info {
    padding: 0 $commonSpace;
    padding-bottom: px2rem(15px);
    .ava {
      img {
        border-radius: 50%;
        @include w_h(px2rem(80px), px2rem(80px));
      }
    }
    .info {
      padding-top: px2rem(9px);
      line-height: 1;
      margin-left: px2rem(15px);
      h3 {
        font-size: px2rem(17px);
        color: #333333;
        span {
          border-radius: 5px;
          border: 1px solid #fabe00;
          padding: 2px 5px;
          font-size: px2rem(11px);
          color: #FABE00;
        }
      }
      .dept, .hos,.rate {
        color: #999999;
        font-size: px2rem(15px);
        margin-top: px2rem(9px);
      }
      .score {
        margin-top: px2rem(15px);
        b {
          font-size: px2rem(24px);
          color: #666666;
        }
        .star {
          margin-left: px2rem(6px);
          display: inline-block;
        }
      }
      .rate{
        a{
          color: #2AB6B3;
          margin-left: px2rem(5px);
        }
      }
    }
  }
</style>
