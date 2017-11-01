<template>
  <div class="success">
    <v-header :title="title" :rightTitle="rightTitle" @on-bookService="goBookService()"></v-header>
    <div class="successContent" ref="success">
      <div>
        <p class="doctorInfoTitle">申请信息</p>
        <div class="doctorInfo">
          <div class="circleAngle">
            <ul>
              <li>
                <div class="cancelImg" v-if="!(allInfoArray.bookDocId)">
                  <img src="../../../../static/img/普通-门诊.png" alt="">
                </div>
                <div class="cancelImg" v-else>
                  <img :src="docAvatar" alt="" onerror="javascript:this.src='./static/img/doctor.m.png'">
                </div>
                <div class="cancelIntro">
                  <div class="introTitle">
                    <span class="subTitle">{{ allInfoArray.docName }}</span>
                    <!--<span class="myDoctor">我的医生</span>-->
                    <p>浙江大学附属第二人民医院</p>
                    <!--<p>滨江耳鼻咽喉科</p>-->
                  </div>
                </div>
              </li>
            </ul>
            <div class="aboutConsult">
              <div class="list border-1px">
                <p>就诊日期 <span>{{ numTime.substr(0, 10) }} {{ allInfoArray.schemeAmpm == 'am' ? '上午' : '下午' }} </span>
                </p>
              </div>
              <div class="list border-1px">
                <p>就诊预估时间 <span>{{ numTime.substr(11) }}</span></p>
              </div>
              <div class="list border-1px">
                <p>支付方式 <span>现场支付</span></p>
              </div>
              <div class="list">
                <p>挂号费用 <span>¥ {{ allInfoArray.bookFee }}</span></p>
              </div>
            </div>
          </div>
        </div>
        <p class="patientInfoTitle" @click="goToggle">切换就诊人</p>
        <div class="patientInfo">
          <div class="leftTitle">
            <span>姓&nbsp;&nbsp;名:</span>
            <span>身份证号:</span>
            <span>手机号:</span>
            <span>病案号:</span>
          </div>
          <div class="rightMatch" v-if="compatInfo">
            <span>{{ compatInfo[index].compatName }}</span>
            <span>{{ compatInfo[index].compatIdcard }}</span>
            <span>{{ compatInfo[index].compatMobile }}</span>
            <span v-if=" compatInfo[index].compatMedicalRecord">{{ compatInfo[index].compatMedicalRecord }} </span>
            <span v-else>暂未绑定病案号</span>
          </div>
        </div>
        <!--<div class="aboutCode">-->
        <!--<div>-->
        <!--<p>验证码</p>-->
        <!--<input type="text" v-model="writeCode">-->
        <!--<p class="codeDisplay">-->
        <!--<img :src="'data:image/png;base64,'+verifyCode" alt="">-->
        <!--</p>-->
        <!--<p @click="getCode()" style="color: #2AB6B3;">刷新验证码</p>-->
        <!--</div>-->
        <!--</div>-->
        <div class="assistScroll">

        </div>
      </div>

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
      <bind-success :title="description" :illNumber="alertStatus" :failKnow="failKnow" @on-iSee="iSee()"></bind-success>
    </div>
    <toast v-if="showToast"></toast>
    <v-mask v-if="fail || successDisplay"></v-mask>
    <alert v-if="showAlert" @on-iKnow="iKnow" :secondLine="secondLine" :bottomLine="bottomLine"></alert>
  </div>
</template>
<script>
  import header from '../../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../../lib/api'
  import Dialog from '../../../base/dialog'
  import bindSuccess from '../../../base/bindSuccess/bindSuccess'
  import bindFail from '../../../base/bindFail/bindFail'
  import VMask from '../../../base/mask'
  import Toast from '../../../base/toast'
  import Alert from '../../../base/alert'
  import weui from 'weui.js'
  import {isLoginMixin} from "../../../lib/mixin"
  import {tokenCache} from '../../../lib/cache'
  import {debug} from "../../../lib/util"

  export default {
    mixins: [isLoginMixin],
    data() {
      return {
        title: '就诊信息确认',
        rightTitle: '提交',
        dialogTitle: "",
        dialogMain: "该就诊人没有绑定病案号，无法执行该操作",
        dialogLeftFoot: "取消",
        dialogRightFoot: "去绑卡",
        showDialog: false,
        showAlert: false,
        fail: false,
        successDisplay: false,
        showToast: false,
        alertStatus: "",
        firstLine: "",
        secondLine: "",
        bottomLine: "我知道了",
        description: "绑定成功，您的病案号是：",
        failDes: "未查询到病案号",
        failDetail: "请保证该就诊人姓名、身份证号、手机和医院留的一致；如真实信息发生变化、请前往医院窗口修改",
        failDetailSecond: "若该就诊人未在医院建档，请前往医院窗口办理",
        failKnow: "我知道了",
        illNumber: "314324",
        bookDeptId: "",
        bookNumId: "",
        numTime: "",
        allInfoArray: [],
        docAvatar: "",
        listIndex: "",
        selectedInfo: "",
        selfInfo: "",
        bookSort: "",
        compatInfo: "",
        verifyCode: "",
        writeCode: "",
        cid: "",
        orderInfo: "",
        index: 0
      }
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          this._initSuccessScroll()
        }, 20)
      })
    },
    created() {

      this.bookDeptId = this.$route.query.bookDeptId
      this.bookNumId = this.$route.query.bookNumId
      this.numTime = this.$route.query.numTime
      this.allInfo = this.$route.query.allInfo
      this.allInfoArray = JSON.parse(this.allInfo)
      this.listIndex = this.$route.query.listIndex
      this.bookSort = this.$route.query.bookSort
      if (this.$route.query.index) {
        this.index = this.$route.query.index
      } else {
        this.index = 0
      }

      api("nethos.book.doc.info", {
        bookDocId: this.allInfoArray.bookDocId
      }).then((data) => {
        if (data.code == 0) {
          if (data.obj.docAvatar) {
            this.docAvatar = data.obj.docAvatar
          }
        } else {
//                weui.alert(data.msg)
        }
      })
      api("nethos.book.doc.list.scheme.list", {
        bookDeptId: this.bookDeptId,
        date: this.numTime.substr(0, 10)
      }).then((data) => {
        if (data.code == 0) {
          this.selectedInfo = data.list
          console.log(data)
        } else {
//                weui.alert(data.msg)
        }
      })

      api("nethos.pat.info.get", {
        token: tokenCache.get()
      }).then((data) => {
        if (data.code == 0) {
          this.selfInfo = data.obj
          this.getCompatInfo();
        } else {
          this.$router.push({
            path: "/bindRelativePhone",
            query: {backPath: this.path}
          });
        }
      })
    },
    methods: {
      getCompatInfo() {
        api("nethos.pat.compat.list", {
          token: tokenCache.get(),
          patId: this.selfInfo.patId
        }).then((data) => {
          if (data.code == 0) {
            this.compatInfo = data.list
          } else {
            weui.alert(data.msg)
          }
        })
      },
      cancelDialog() {
        this.showDialog = false
      },
      iKnow() {
        this.showAlert = false
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
          this.getCompatInfo();
        }
      },
      bindCard() {
        this.showDialog = false
        this.showToast = true
        api("nethos.book.compat.bind", {
          bookHosId: this.allInfoArray.bookHosId,
          compatId: this.compatInfo[this.index].compatId,
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
        })
      },
      iSee() {
        this.successDisplay = false
        this.fail = false
      },
      _initSuccessScroll() {
        this.success = new BScroll(this.$refs.success, {
          click: true
        })
        console.log(this.success)
      },
      goToggle() {
        this.$router.push({
          path: '/bookTogglePatient',
          query: {
            bookDeptId: this.bookDeptId,
            bookNumId: this.bookNumId,
            numTime: this.numTime,
            allInfo: this.allInfo,
            listIndex: this.listIndex,
            bookSort: this.bookSort
          }
        })
      },
      goBookService() {
        if (this.bookSort == '预约挂号') {
          let compat = this.compatInfo[this.index], compatMedicalRecord = compat.compatMedicalRecord || "",
            bookHosId = this.allInfoArray.bookHosId, compatId = compat.compatId;
          debug("compatMedicalRecord", compatMedicalRecord);
          if (!compatMedicalRecord) {
            let loading = weui.loading("提交中...");
            api("nethos.book.compat.bind.check", {compatId, bookHosId}).then((res) => {
              loading.hide();
              if (res.code == 0) {
                if (res.obj == "needBind") {
                  this.showDialog = true
                } else if (res.obj == "needCreate") {
                  weui.confirm(
                    "该就诊人没有病案号，无法执行该操作", {
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

            return
          }


          api("nethos.book.order.register", {
            token: tokenCache.get(),
            bookNumId: this.bookNumId,
            bookHosId: this.allInfoArray.bookHosId,
            compatId: this.compatInfo[this.index].compatId,
            captcha: "1234"
          }).then((data) => {
            if (data.code == 0) {
              this.orderInfo = JSON.stringify(data.obj)
              this.$router.push({
                path: '/bookSuccess',
                query: {orderInfo: this.orderInfo}
              })
            } else if (data.msg == '请先绑定病历号') {
              this.showDialog = true
            } else if (!(data.msg)) {
              this.showAlert = true
              this.secondLine = "服务器错误"
            } else {
              this.showAlert = true
              this.secondLine = data.msg
            }
          })
        } else {
          api("nethos.book.z2order.register", {
            token: tokenCache.get(),
            bookNumId: this.bookNumId,
            bookHosId: this.allInfoArray.bookHosId,
            compatId: this.compatInfo[this.index].compatId,
//                    captcha:this.writeCode
          }).then((data) => {
            console.log("下面挂号部分")
            console.log(data)
            console.log("上面挂号部分")


            if (data.code == 0) {
              this.orderInfo = JSON.stringify(data.obj)
              this.$router.push({
                path: '/bookSuccess',
                query: {orderInfo: this.orderInfo}
              })
            } else if (data.msg == '请先绑定就诊卡号') {
              this.showDialog = true
            } else if (!(data.msg)) {
              this.showAlert = true
              this.secondLine = "服务器错误"
            } else {
              this.showAlert = true
              this.secondLine = data.msg
            }
          })
        }
      },
    },
    components: {
      'VHeader': header,
      "VDialog": Dialog,
      bindSuccess,
      VMask,
      bindFail,
      Toast,
      Alert
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

  .successContent {
    width: 100%;
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    overflow: hidden;
    background-color: white;
    .remark, .doctorInfoTitle {
      width: 690rem/$rem;
      margin: 30rem/$rem auto;
      font-size: 32rem/$rem;
      display: flex;
      justify-content: space-between;
    }
    .patientInfoTitle {
      width: 690rem/$rem;
      margin: 30rem/$rem auto;
      font-size: 28rem/$rem;
      text-align: right;
      color: $mainColor;
      padding-right: 40rem/$rem;
    }
    .reasonWrap {
      display: flex;
      align-items: center;
      .refuseReason {
        width: 100%;
        height: 140rem/$rem;
        display: flex;
        background-color: $bgColor2;
        .wrapImg {
          height: 140rem/$rem;
          width: 140rem/$rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: 30rem/$rem;
          img {
            width: 60rem/$rem;
            height: 60rem/$rem;
          }
        }
        .wrapWord {
          height: 140rem/$rem;
          display: flex;
          align-items: center;
          span {
            display: block;
            font-size: 24rem/$rem;
            line-height: 19px;
            color: #4BCEC8;
            .time {
              display: inline-block;
              color: red;
            }
          }
        }
      }
    }
    .doctorInfo {
      width: 100%;
      .circleAngle {
        width: 690rem/$rem;
        margin: 0 auto;
        .aboutConsult {
          width: 690rem/$rem;
          margin: 0 auto;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
          background-color: $bgColor2;
          .list {
            width: 100%;
            height: 50px;
            display: block;
            p {
              width: 690rem/$rem;
              height: 50px;
              margin: 0 auto;
              height: 50px;
              font-size: 32rem/$rem;
              color: #333333;
              padding-left: 20rem/$rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              span {
                padding-right: 40rem/$rem;
                color: #999999;
              }
            }
          }
        }
        ul {
          padding: 0;
          margin: 0 auto;
          width: 690rem/$rem;
          height: 190rem/$rem;
          background-color: $bgColor2;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
          li {
            list-style-type: none;
            height: 190rem/$rem;
            display: flex;
            .cancelImg {
              width: 160rem/$rem;
              display: flex;
              justify-content: center;
              align-items: center;
              /*padding-left: 15px;*/
              img {
                width: 120rem/$rem;
                height: 120rem/$rem;
                border-radius: 50%;
              }
            }
            .cancelIntro {
              flex: 2;
              display: flex;
              align-items: center;
              /*line-height: 10px;*/
              .introTitle {
                line-height: 1.5;
                .subTitle {
                  font-size: 32rem/$rem;
                  color: #333333;
                }
                .myDoctor {
                  width: 120rem/$rem;
                  height: 36rem/$rem;
                  display: inline-block;
                  font-size: 28rem/$rem;
                  /*line-height: 18px;*/
                  color: #666666;
                  text-align: center;
                }
                p {
                  margin: 0;
                  font-size: 28rem/$rem;
                  color: #999999;
                }
              }

              span {

              }
            }
          }
        }
      }

    }
    .patientInfo {
      width: 690rem/$rem;
      border-radius: 10px;
      margin: 0 auto;
      background-color: $bgColor2;
      display: flex;
      .leftTitle {
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          height: 80rem/$rem;
          line-height: 80rem/$rem;
          font-size: 32rem/$rem;
          color: #333333;
        }
      }
      .rightMatch {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        span {
          padding-right: 20rem/$rem;
          height: 80rem/$rem;
          line-height: 80rem/$rem;
          font-size: 32rem/$rem;
          color: #999999;
        }
      }
    }
    .aboutCode {
      width: 690rem/$rem;
      margin: 30rem/$rem auto;
      height: 80rem/$rem;
      display: flex;
      align-items: center;
      background-color: $bgColor2;
      > div {
        width: 690rem/$rem;
        display: flex;
        justify-content: space-between;
        p {
          font-size: 32rem/$rem;
          padding-left: 20rem/$rem;
          padding-right: 20rem/$rem;
          color: #333333;
        }
        p.codeDisplay {
          width: 150rem/$rem;
          background-color: #FFFFFF;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 90px;
            height: 30px;
          }
        }
        input {
          width: 150rem/$rem;
          border: none;
          outline: medium;
          text-align: center;
        }
      }
    }
    .assistScroll {
      height: 50px;
    }
  }
</style>
