<template>
  <transition name="slide">
    <div>
      <v-header :title="title" :rightTitle="rightTitle" @on-check="goCheck()" @on-index="goIndex()"></v-header>
      <div class="usual" v-if="allPatient">
        <div class="usualLine">
          <div class="usualCenter">
            <ul>
              <li>{{ allPatient[index].compatName
                }} <span>&nbsp;&nbsp; {{allPatient[index].compatAge}} &nbsp;&nbsp;{{allPatient[index].compatGender == 'M' ? '男' : '女'}}</span>
              </li>
              <li>身份证号： <span>{{ allPatient[index].compatIdcard }}</span></li>
              <li>电话号码：<span>{{allPatient[index].compatMobile}}</span></li>
              <li v-if="!(allPatient[index].compatMedicalRecord)">病&nbsp;&nbsp;案&nbsp;号：<span>暂未绑定病案号</span></li>
              <li v-else>病&nbsp;&nbsp;案&nbsp;号：<span>{{ allPatient[index].compatMedicalRecord }}</span></li>
            </ul>
          </div>
        </div>
        <span @click="goUsual()" class="change">切换就诊人</span>
      </div>
      <v-dialog :dialogTitle="dialogTitle"
                :dialogMain="dialogMain"
                :dialogLeftFoot="dialogLeftFoot"
                :dialogRightFoot="dialogRightFoot"
                v-if="showDialog"
                @on-cancel="cancelDialog" @on-download="bindCard"></v-dialog>
      <div class="emptyHistory" v-if="fail">
        <bind-fail :title="failDes" :failKnow="failKnow" :failDetail="alertStatus" @on-iSee="iSee()"></bind-fail>
      </div>
      <div class="emptyHistory" v-if="successDisplay">
        <bind-success :title="description" :illNumber="alertStatus" :failKnow="failKnow"
                      @on-iSee="iSee()"></bind-success>
      </div>
      <toast v-if="showToast"></toast>
      <v-mask v-if="fail || successDisplay"></v-mask>
    </div>
  </transition>
</template>
<script>
  import header from '../../../base/header'
  import api from '../../../lib/api'
  import Dialog from '../../../base/dialog'
  import bindSuccess from '../../../base/bindSuccess/bindSuccess'
  import bindFail from '../../../base/bindFail/bindFail'
  import VMask from '../../../base/mask'
  import Toast from '../../../base/toast'
  import weui from 'weui.js'
  import {isLoginMixin, isBindMixin} from "../../../lib/mixin"
  import {tokenCache} from '../../../lib/cache'

  export default {
    mixins: [isLoginMixin, isBindMixin],
    data() {
      return {
        title: "查报告单",
        rightTitle: "查询",
        allPatient: "",
        index: 0,
        dialogTitle: "",
        dialogMain: "该就诊人没有绑定医院帐号，无法使用该功能。请先绑定医院帐号。",
        dialogLeftFoot: "取消",
        dialogRightFoot: "去绑卡",
        showDialog: false,
        fail: false,
        successDisplay: false,
        showToast: false,
        alertStatus: "",
        description: "绑定成功，您的病案号是：",
        failDes: "未查询到病案号",
        failDetail: "请保证该就诊人姓名、身份证号、手机和医院留的一致；如真实信息发生变化、请前往医院窗口修改",
        failDetailSecond: "若该就诊人未在医院建档，请前往医院窗口办理",
        failKnow: "我知道了",
        illNumber: "314324",
      }
    },
    created() {

      if (this.$route.query.index) {
        this.index = this.$route.query.index
      } else {
        this.index = 0
      }

      this._isBind().then((res) => {
        //console.log(res);
        if (res === false) {
          this.$router.replace({
            path: "/bindRelativePhone",
            query: {backPath: this.path}
          });
        } else {
          this.getList();
        }
      });
    },
    methods: {
      getList() {
        api("nethos.pat.compat.list", {
          token: tokenCache.get()
        }).then((data) => {
          if (data.code == 0) {
            this.allPatient = data.list
          } else if (!(data.msg)) {
            weui.alert("网络错误，请稍后重试")
          } else {
            weui.alert(data.msg)
          }
        })
      },

      cancelDialog() {
        this.showDialog = false
      },
      async createCard(compatId, bookHosId) {
        let loading = weui.loading("加载中");
        let ret = await api("nethos.book.compat.bind.new", {compatId, bookHosId})
        loading.hide();
        if (ret.code != 0) {
          setTimeout(() => {
            weui.alert(ret.msg, () => {

            });
          }, 500)
        } else {
          this.getList();
        }
      },
      bindCard() {
        this.showDialog = false
        this.showToast = true
        api("nethos.book.compat.bind", {
          token: tokenCache.get(),
          compatId: this.allPatient[this.index].compatId
        }).then((data) => {
          this.alertStatus = data.msg
          this.showToast = false
          if (data.code == 0) {
            this.fail = false
            this.successDisplay = true
          } else {
            this.successDisplay = false
            this.fail = true
          }
          console.log(data)
        })
      },
      iSee() {
        this.successDisplay = false
        this.fail = false
      },
      goCheck() {
        let compat = this.allPatient[this.index],
          compatId = compat.compatId,
          compatMedicalRecord = compat.compatMedicalRecord;
        if (!compatMedicalRecord) {
          let loading = weui.loading("提交中...");
          let bookHosId = "";
          api("nethos.book.compat.bind.check", {compatId, bookHosId}).then((res) => {
            loading.hide();
            if (res.code == 0) {
              if (res.obj == "needBind") {
                this.showDialog = true
              } else if (res.obj == "needCreate") {
                weui.confirm(
                  "该就诊人没有在医院建过档，需要实名认证并新建病案号，才能使用该功能。", {
                    buttons: [{
                      label: "取消",
                      type: "default"
                    }, {
                      label: "新建病案号",
                      type: "primary",
                      onClick: () => {
                        this.createCard(compatId, bookHosId);
                      }
                    }]
                  });
              }
              else {

              }
            }
          });
          this.showDialog = true
        } else {
          this.$router.push({
            path: '/checkSortList',
            query: {
              specialIndex: this.index,
              patCard: this.allPatient[this.index].compatMedicalRecord,
              compatId: this.allPatient[this.index].compatId
            }
          })
        }
      },
      goUsual() {
        this.$router.push('/checkTogglePatient')
      },
      goIndex() {
//          this.$router.push('/myProfile/index')
      }
    },
    components: {
      "VHeader": header,
      "VDialog": Dialog,
      bindSuccess,
      VMask,
      bindFail,
      Toast
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';

  .emptyHistory {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: makeBigger 0.6s;
    @keyframes makeBigger {
      0% {
        transform: scale(0.5);
      }
      25% {
        transform: scale(0.9);
      }
      50% {
        transform: scale(1.3);
      }
      75% {
        transform: scale(0.9);
      }
      100% {
        transform: scale(1.0);
      }
    }
  }

  .usual {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50px;
    background-color: white;
    .usualLine {
      width: 100%;
      background-color: white;
    }
    .usualCenter {
      width: 690rem/$rem;
      margin: 0 auto;
      /*margin-top: 5px;*/
      background-color: white;
      ul {
        margin: 0;
        padding: 0;
        margin-top: 10px;
        li {
          list-style-type: none;
          height: 80rem/$rem;
          line-height: 80rem/$rem;
          margin-top: 1px;
          background-color: $bgColor2;
          font-size: 32rem/$rem;
          padding-left: 10px;
          span {
            font-size: 32rem/$rem;
            color: #999999;
          }
        }
        li:first-child {
          border-top-left-radius: 7px;
          border-top-right-radius: 7px;
        }
        li:last-child {
          border-bottom-left-radius: 7px;
          border-bottom-right-radius: 7px;
        }
      }
    }
    span.change {
      display: inline-block;
      padding-left: 50rem/$rem;
      font-size: 32rem/$rem;
      color: $mainColor;
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
    opacity: 1;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
    opacity: 1;
  }
</style>
