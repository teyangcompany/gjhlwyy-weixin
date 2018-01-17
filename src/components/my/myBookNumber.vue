<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle" @on-myProfile="goMyProfile"></v-header>
    <div v-if="!orderList" class="loading">
      <img src="../../../static/img/loading.gif" alt="">
      <span>正在很努力的加载中...</span>
    </div>
    <div v-else-if="orderList.length == 0" class="loading">
      <span>暂无挂号记录，去挂号吧</span>
    </div>
    <div class="myBookNumber" v-else ref="myBookNumber">
      <div>
        <router-link tag="div" :to="{path:'/bookNumberDetail',query:{bookHosId:item.bookHosId,index:index}}"
                     class="numberCenter" v-for="(item,index) in orderList" :key="item.id">
          <ul>
            <li>
              <p class="hosTitle">{{ item.hosName }}</p>
              <p class="date border-1px">{{ item.bookTime }} {{ item.bookAmpm == 'pm' ? '下午':'上午' }} {{ item.gotoTime
                }}</p>
              <p class="aboutRoom"><span>{{ item.deptName }}</span> <span>{{ item.docName }}</span></p>
            </li>
          </ul>
        </router-link>
        <div class="assistScroll">

        </div>
      </div>
    </div>
    <div v-if="showAlertTips" class="loading">
      <alert-tips></alert-tips>
    </div>
    <alert v-if="showAlert" :firstLine="firstLine" :bottomLine="bottomLine" @on-iKnow="iKnow"></alert>
  </div>
</template>
<script>
  import {OPEN_NEW_MYBOOK_VERSION} from "../../lib/config";
  import header from '../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  import AlertTips from '../../base/alertTips'
  import Alert from '../../base/alert'
  import {tokenCache} from '../../lib/cache'

  export default {
    data() {
      return {
        title: "我的挂号",
        rightTitle: "",
        orderList: "",
        showAlertTips: false,
        firstLine: "",
        bottomLine: "",
        showAlert: false
      }
    },
    created() {
      if (OPEN_NEW_MYBOOK_VERSION) {
        this.$router.replace(`/my/book`)
      } else {
        api("nethos.book.order.list", {
          token: tokenCache.get()
        }).then((data) => {
          if (data.code == 0) {
            this.orderList = data.list
          } else if (!(data.msg)) {
            this.orderList = true
            this.showAlertTips = true
            setTimeout(() => {
              this.showAlertTips = false
            }, 1000)
          } else {
            this.orderList = true
            this.showAlert = true
            this.firstLine = data.msg
          }
        })
      }
    },
    methods: {
      goMyProfile() {
        this.$router.push('/Profile')
      },
      iKnow() {
        this.showAlert = false
      },
      _initBookNumberScroll() {
        if (this.orderList) {
          this.bookNumberScroll = new BScroll(this.$refs.myBookNumber, {
            click: true
          })
        }
      }
    },
    components: {
      "VHeader": header,
      AlertTips,
      Alert
    },
    watch: {
      orderList() {
        this.$nextTick(() => {
          setTimeout(() => {
            this._initBookNumberScroll()
          }, 20)
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';

  .loading {
    position: absolute;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 100rem/$rem;
      margin-bottom: 10px;
    }
    span {
      font-size: 32rem/$rem;
      color: #999999;
    }
  }

  .myBookNumber {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    .numberCenter {
      width: 690rem/$rem;
      margin: 10px auto;
      background-color: $bgColor2;
      border-radius: 7px;
      p {
        padding: 0px 5px 0px 5px;
        height: 80rem/$rem;
        line-height: 80rem/$rem;
        font-size: 32rem/$rem;
      }
      p.hosTitle {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      p.date {
        text-align: right;
        color: #999999;
      }
      p.aboutRoom {
        display: flex;
        color: #999999;
        justify-content: space-between;
      }
    }
    .assistScroll {
      height: 50px;
    }
  }
</style>
