<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <scroll class="commentList" ref="list" :data="createTime" :pullup="pullup" @scrollToEnd="scrollToEnd()">
      <div>
        <div class="doctorFunc" v-if="allInfo.length != 0">
          <div class="doctorImg">
            <img :src="allInfo[0].sysDoc.docAvatar" alt="">
          </div>
          <div class="doctorIntro">
            <h4><span class="mainTitle">{{allInfo[0].sysDoc.docName}}</span><span class="chief"
                                                                                  v-if="allInfo[0].sysDoc.docFamousConsultStatus == true">名医</span><span
              v-else> &nbsp;</span></h4>
            <div class="checkRating">
              <star :size="36" :score="allInfo[0].sysDoc.docScoure"></star>
              <span v-if="allInfo">{{ allInfo[0].sysDoc.docScoure.toFixed(1) }}分 </span></div>
          </div>
        </div>
        <div class="blank border-1px"></div>
        <div class="list border-1px" v-for="(item,index) in allInfo">
          <div class="listWrap">
            <div class="leftImg">
              <img v-if="!(item.sysPat.patAvatar) && item.sysPat.patGender== 'M'"
                   src="../../../../static/img/doctor.m.png" alt="">
              <img v-else-if="!(item.sysPat.patAvatar) && item.sysPat.patGender== 'F'"
                   src="../../../../static/img/pat.f.jpg" alt="">
              <img :data-gender="item.sysPat.patGender" v-else :src="item.sysPat.patAvatar"
                   @error="__avaError($event)" alt="">
            </div>
            <div class="rightImg">
              <div class="top">
                <div class="topLeft">
                  <p>{{ item.sysPat.patName.substr(0, 1) }}**</p>
                  <p class="item">{{ item.sysComment.moudleType == 'DOCPIC' ? '图文咨询' : '名医视频'}} {{ createTime[index]
                    }}</p>
                </div>
                <div class="topRight">
                  <star :size="24" :score="item.sysComment.score"></star>
                </div>
              </div>
              <div class="bottom">
                <p>{{ item.sysComment.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="loadMore" v-if="loadingStatus">
                <span class="pullMore">
                   <img src="../../../../static/img/loading.gif" alt="">
                   数据加载中...
                </span>
        </div>
        <div class="loadMore" v-if="allInfo.length == 0 && !loadingStatus">
                <span class="pullMore">
                    无医生评价信息
                </span>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import header from '../../../base/header'
  import BScroll from 'better-scroll'
  import Star from '../../../base/star/star'
  import api from '../../../lib/api'
  import Scroll from '../../../base/scroll'
  import {formatDate} from '../../../utils/formatTimeStamp'
  import {avaErrorMixin} from "../../../lib/mixin"

  export default {
    data() {
      return {
        title: "医生评价",
        rightTitle: "",
        docId: "",
        allInfo: [],
        pullup: true,
        listPage: 1,
        dataLength: "",
        loadingStatus: false,
        createTime: []
      }
    },
    created() {
      this.docId = this.$route.query.docId
      this.loadingStatus = true
      api("nethos.doc.comment.list", {
        docId: this.docId,
        pageNo: 1,
        pageSize: 10
      }).then((data) => {
        if (data.code == 0) {
          this.loadingStatus = false
          for (var i = 0; i < data.list.length; i++) {
            this.allInfo.push(data.list[i])
            this.createTime.push(formatDate(new Date(this.allInfo[i].sysComment.createTime)))
          }
        }
      })
    },
    methods: {
      scrollToEnd() {
        if (this.preventRepeatRequest) {
          return
        }
        this.loadingStatus = true
        this.preventRepeatRequest = true;
        this.listPage += 1;
        let that = this
        api("nethos.doc.comment.list", {
          docId: this.docId,
          pageNo: that.listPage,
          pageSize: 10
        }).then((data) => {
          if (data.code == 0) {
            for (var i = 0; i < data.list.length; i++) {
              this.allInfo.push(data.list[i])
              this.createTime.push(formatDate(new Date(this.allInfo[i].sysComment.createTime)))
            }
            this.loadingStatus = false
            that.dataLength = data.list.length
            if (data.list.length >= 10) {
              this.preventRepeatRequest = false;
            }
          }
        })
      },
    },
    mixins: [avaErrorMixin],
    components: {
      "VHeader": header,
      Star,
      Scroll
    },
    watch: {
//        allInfo(){
//            this.$nextTick(()=>{
//                setTimeout(()=>{
//                    this._initListScroll()
//                },20)
//            })
//        }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';

  .commentList {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    .doctorFunc {
      width: 100%;
      height: 210px;
      background-color: white;
      .doctorImg {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
      .doctorIntro {
        width: 100%;
        height: 70px;
        margin-top: 10px;
        text-align: center;
        h4 {
          font-weight: normal;
          margin: 0;
          span.mainTitle {
            margin-left: 60rem/$rem;
            font-size: 32rem/$rem;
            color: #333333;
          }
          span.chief {
            position: relative;
            font-size: 28rem/$rem;
            color: white;
            background-color: $assistColorBrown;
            display: inline-block;
            width: 58rem/$rem;
            height: 29rem/$rem;
            margin: 0;
            line-height: 31rem/$rem;
            text-align: center;
            left: 12rem/$rem;
          }
          span.empty {
            border: none;
          }
        }
        h6 {
          font-weight: normal;
          color: gray;
          margin: 0;
        }
        .checkRating {
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            color: #666666;
            font-size: 28rem/$rem;
            margin-left: 10px;
          }
        }
        /*background-color: #0BB20C;*/
      }
    }
    .blank {
      width: 100%;
      height: 10px;
      background-color: rgb(245, 245, 245);
    }
    .list {
      width: 100%;
      margin-top: 10rem/$rem;
      .listWrap {
        display: flex;
        width: 690rem/$rem;
        margin: 0 auto;
        padding-top: 10px;
        padding-bottom: 10px;
        .leftImg {
          width: 130rem/$rem;
          img {
            width: 100rem/$rem;
            height: 100rem/$rem;
            border-radius: 50%;
          }
        }
        .rightImg {
          width: 560rem/$rem;
          /*height: 50px;*/
          /*background-color: #3CC51F;*/
          .top {
            display: flex;
            justify-content: space-between;
            .topLeft {
              p:nth-child(1) {
                font-size: 28rem/$rem;
                color: #333333;
              }
              p.item {
                font-size: 28rem/$rem;
                color: #999999;
              }
            }
          }
          .bottom {
            width: 560rem/$rem;
            word-wrap: break-word;
            /*background-color: #E64340;*/
            p {
              font-size: 32rem/$rem;
              color: #333333;
            }
          }
        }
      }
    }
    .loadMore {
      display: flex;
      justify-content: center;
      align-items: center;
      span.pullMore {
        display: flex;
        align-items: center;
        font-size: 12px;
        img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }
  }
</style>
