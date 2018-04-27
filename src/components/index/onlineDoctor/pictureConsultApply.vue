<template>
    <transition name="slide">
        <div>
            <v-header :title="title" :rightTitle="rightTitle"></v-header>
            <div class="doctorInfo">
                <ul>
                    <li>
                        <div class="cancelImg">
                            <img :src="doctorInfo.docAvatar?doctorInfo.docAvatar:'./static/img/doctor.m.png'" alt="">
                        </div>
                        <div class="cancelIntro">
                            <div class="introTitle">
                                <span class="subTitle">{{ doctorInfo.docName }}</span>
                                <span class="myDoctor">{{ doctorInfo.docTitle }}</span>
                                <p>{{ doctorInfo.docHosName }}</p>
                                <p>{{ doctorInfo.docDeptName }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="attach">
                <div>
                    <section>
                        <span>图文咨询价格</span>
                        <span class="money">价格：¥ {{ doctorInfo.docPicConsultPrice }}</span>
                    </section>
                </div>
            </div>
            <div class=" weui-cells_checkbox weuiMargin">
                <label class="weui-cell weui-check__label" for="s11">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked"
                               v-model="picked"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>我已阅读并同意
                            <router-link tag="span" to="/internetTerms">浙二网络医学中心服务协议</router-link>
                        </p>
                    </div>
                </label>
            </div>
            <div class="applyRule">
                <div class="ruleCenter">
                    <h4>图文问诊规则</h4>
                    <p>1、您需要填写自己的就诊资料，并付费</p>
                    <p>2、医生会在空闲时回复您的咨询</p>
                    <p>3、若医生没有在48小时内回复您，我们会为您自动退款</p>
                    <p>4、在等待医生回复的期间，您无法取消该次咨询</p>
                </div>
            </div>
            <div @click="goNextStep" class="nextStep">
                <div>
                    <button>下一步</button>
                </div>
            </div>
            <router-view></router-view>
            <alert :firstLine="firstLine" :secondLine="secondLine" :bottomLine="bottomLine" @on-iKnow="iKnow()"
                   v-if="showAlert"></alert>
        </div>
    </transition>
</template>
<script>
  import header from '../../../base/header'
  import Alert from '../../../base/alert'
  import api from '../../../lib/api'
  import weui from 'weui.js'
  import {isLoginMixin} from "../../../lib/mixin"
  import {tokenCache} from '../../../lib/cache'
  import {isBindMixin} from "../../../lib/mixin";

  export default {
    mixins: [isLoginMixin, isBindMixin],
    data() {
      return {
        title: "申请须知",
        rightTitle: "",
        firstLine: "您需要先同意《浙二网络医学中心服务协议》",
        secondLine: "",
        bottomLine: "确定",
        showAlert: false,
        path: "",
        doctorId: "",
        doctorInfo: "",
        picked: true,
        price: ""
      }
    },
    mounted() {
      this.path = this.$route.path
      this.$nextTick(() => {
//        document.addEventListener('touchmove', function(e){e.preventDefault()}, false);
      })
    },
    created() {
      this.doctorId = this.$route.query.docId
      api("nethos.doc.card", {
        docId: this.doctorId
      }).then((data) => {
        if (data.code == 0) {
          this.doctorInfo = data.obj.sysDoc
          this.price = this.doctorInfo.docPicConsultPrice
          console.log(this.doctorInfo)
        } else {
          weui.alert(data.msg)
        }
      })
    },
    methods: {
      goPicture() {
        this.$router.push('apply/picture')
      },
      iKnow() {
        this.showAlert = false
      },
      async goNextStep() {
        let loading = this.$weuijs.loading("加载中...");
        let data = await this._isBind();
        loading.hide();
        if (data !== false) {
          if (!data.patIdcard) {
            this.$weuijs.confirm('证件号不能为空，是否去完善信息？', {
                title: "温馨提示",
                buttons: [
                  {
                    label: "再等等",
                    type: "default",
                    onClick: () => {
                    }
                  },
                  {
                    label: '立即完善',
                    type: 'primary',
                    onClick: () => {
                      this.$router.replace({
                        path: '/account/perfect',
                        query: {back: this.$route.fullPath}
                      })
                    }
                  }
                ]
              });
            return false;
          }


          if (this.picked === true) {
            this.$router.replace({
              path: '/pictureConsultNext',
              query: {docId: this.doctorId, price: this.price}
            })
          } else {
            this.showAlert = true
          }
        } else {
          this.$router.replace({
            path: "/bindRelativePhone",
            query: {backPath: this.path}
          });
        }
      },
      back() {
        this.$router.back(-1)
      }
    },
    components: {
      "VHeader": header,
      Alert
    },
    watch: {
      "$route": function () {
        this.path = this.$route.path
      }
    }
  }
</script>
<style scoped lang="scss">
    @import '../../../common/public.scss';

    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }

    /*.apply{*/
    /*position: fixed;*/
    /*top:0;*/
    /*left:0;*/
    /*right:0;*/
    /*bottom:0;*/
    .doctorInfo {
        margin-top: 10px;
        ul {
            padding: 0;
            margin: 0 auto;
            width: 690rem/$rem;
            /*<!--height: 204rem/$rem;-->*/
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            background-color: rgb(245, 251, 251);
            li {
                list-style-type: none;
                height: 204rem/$rem;
                display: flex;
                .cancelImg {
                    width: 180rem/$rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 140rem/$rem;
                        height: 140rem/$rem;
                    }
                    /*padding-left: 15px;*/
                }
                .cancelIntro {
                    flex: 2;
                    display: flex;
                    align-items: center;
                    /*line-height: 10px;*/
                    .introTitle {
                        .subTitle {
                            font-size: 32rem/$rem;
                            color: #333333;
                        }
                        .myDoctor {
                            /*<!--width: 120rem/$rem;-->*/
                            /*<!--height: 36rem/$rem;-->*/
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
                img {
                    width: 130rem/$rem;

                }

            }
        }
    }

    .attach {
        width: 690rem/$rem;
        height: 80rem/$rem;
        margin: 2px auto;
        display: flex;
        align-items: center;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: rgb(245, 251, 251);
        > div {
            section {
                width: 690rem/$rem;
                display: flex;
                justify-content: space-between;
                span {
                    padding-left: 20rem/$rem;
                    padding-right: 20rem/$rem;
                    font-size: 32rem/$rem;
                    color: #333333;
                }
                span.money {
                    color: $assistWordBrown;
                }
                span.time {
                    color: $assistWordBlue;
                }
            }
        }
    }

    .weuiMargin {
        margin: 0;
        p {
            font-size: 28rem/$rem;
            span {
                color: $mainColor;
            }
        }
    }

    .weui-cells_checkbox .weui-icon-checked:before {
        font-size: 28rem/$rem;
    }

    .applyRule {
        width: 100%;
        height: 200px;
        background-color: white;
        .ruleCenter {
            width: 690rem/$rem;
            margin: 0 auto;
            h4 {
                font-size: 32rem/$rem;
                font-weight: normal;
            }
            p {
                font-size: 28rem/$rem;
                line-height: 20px;
                color: #999999;
            }
        }
    }

    .nextStep {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 50rem/$rem;
        width: 100%;
        > div {
            width: 690rem/$rem;
            margin: 0 auto;
            height: 80rem/$rem;
        }
        button {
            width: 690rem/$rem;
            height: 80rem/$rem;
            border: none;
            outline: medium;
            background-color: $buttonColor;
            border-radius: 10px;
            font-size: 32rem/$rem;
            color: white;
        }
    }

    /*}*/
</style>
