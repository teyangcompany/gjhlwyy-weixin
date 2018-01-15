<template>
  <div class="special top_bar main_head border-1px" v-if="path == '/onlineDoctorCard'">
    <section class="goBack">
    </section>
    <section class="title">
      <span class="word">{{title}}</span>
    </section>
    <section class="nav">

    </section>
  </div>
  <div class="top_bar main_head border-1px" v-else>
    <section class="goBack" v-if="path == '/myDoctor/recentChat'" @click="goMain()">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="goBack" v-else-if="path == '/myDoctor/followDoctor'" @click="goMain()">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="goBack" v-else-if="path == '/myConsult/waitPay'" @click="goProfile()">
      <!--<img src="../../static/img/返回.png" alt="">-->
    </section>
    <section class="goBack" v-else-if="path == '/myConsult/doing'" @click="goProfile()">
      <!--<img src="../../static/img/返回.png" alt="">-->
    </section>
    <section class="goBack" v-else-if="path == '/myConsult/waitComment'" @click="goProfile()">
      <!--<img src="../../static/img/返回.png" alt="">-->
    </section>
    <section class="goBack" v-else-if="path == '/myConsult/commented'" @click="goProfile()">
      <!--<img src="../../static/img/返回.png" alt="">-->
    </section>
    <section class="goBack" v-else-if="path == '/myConsult/online/waitPay'" @click="goInternet()">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="goBack" v-else-if="path == '/myConsult/online/doing'" @click="goInternet()">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="goBack" v-else-if="path == '/myConsult/online/waitComment'" @click="goInternet()">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="goBack" v-else-if="path == '/myConsult/online/commented'" @click="goInternet()">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="goBack" v-else-if="path == '/usualPatient'" @click="goForceMy()">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="goBack" v-else-if="path == '/internetRoom'" @click="goIndex()">
      <!--<img src="../../static/img/返回.png" alt="">-->
    </section>
    <section class="goBack" v-else-if="path == '/selectType'" @click="gohosList()">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <!--<section class="goBack"  v-else-if="path == '/selectType'" @click="goMyBookNumber()">-->
    <!--<img src="../../static/img/返回.png" alt="">-->
    <!--</section>-->
    <section class="goBack" v-else-if="path == '/book'" @click="goIndex()">
      <!--<img src="../../static/img/返回.png" alt="">-->
    </section>
    <section class="goBack" v-else-if="path == '/checkReport'" @click="goIndex()">
      <!--<img src="../../static/img/返回.png" alt="">-->
    </section>
    <section class="goBack" v-else-if="path == '/waitCallNumber'" @click="goIndex()">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="goBack" v-else-if="path == '/togglePatient'" @click="goCheckReport()">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="goBack" v-else-if="path == '/myBookNumber'" @click="goMyProfile()">
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="goBack" v-else-if="path == '/myProfile'">
    </section>
    <section class="goBack" v-else-if="path == '/bookTerms'">
    </section>
    <section class="goBack" v-else-if="path == '/todayBook'">
    </section>
    <section class="goBack" v-else-if="path == '/Profile'">
    </section>
    <section class="goBack" v-else-if="path == '/myProfile/healthIndex'">
    </section>
    <section class="goBack" v-else-if="path == '/myProfile/healthIndex/beautify'">
    </section>
    <section class="goBack" v-else-if="path == '/myProfile/healthIndex/healthContent'">
    </section>
    <section class="goBack" v-else-if="path == '/myProfile/healthIndex/season'">
    </section>
    <section class="goBack" v-else-if="path == '/myProfile/healthIndex/gender'">
    </section>
    <section class="goBack" v-else-if="path == '/myProfile/index'">
    </section>
    <section class="goBack" v-else-if="path == '/waitArrange' && historyLength <= 1">
    </section>
    <section class="goBack" v-else-if="path == '/myProfile/serviceIndex'">
    </section>
    <section class="goBack" @click="back()" v-else>
      <img src="../../static/img/返回.png" alt="">
    </section>
    <section class="title" v-if="path == '/waitArrange'">
      <img :src="waitImg" alt="">
      <span class="word">{{title}}</span>
    </section>
    <section class="title" v-else>
      <span class="word">{{title}}</span>
    </section>
    <section class="nav" @click="detailPage()" v-if="path == '/addRecord'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goSuccess()" v-else-if="path == '/writeSubmit'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goBookSuccess()" v-else-if="path == '/infoConfirm'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goAddUsual()" v-else-if="path == '/usualPatient'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goAddUsual()" v-else-if="path == '/togglePatient'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goAddUsual()" v-else-if="path == '/bookTogglePatient'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goAddUsual()" v-else-if="path == '/waitTogglePatient'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goAddUsual()" v-else-if="path == '/checkTogglePatient'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goAdd()" v-else-if="path == '/addUsualPatient'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goAdd()" v-else-if="path == '/checkToggleAddUsual'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goAdd()" v-else-if="path == '/waitToggleAddUsual'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goAdd()" v-else-if="path == '/bookToggleAddUsual'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goMyConsult()" v-else-if="path == '/videoIndex'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goMyConsult()" v-else-if="path.toLowerCase() == '/internetroom'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goMyVideoPay()" v-else-if="path == '/videoSubmit'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goMyVideoPay()" v-else-if="path == '/pictureConsultNext'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goMyVideoPay()" v-else-if="path == '/videoConsultNext'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goMyVideoPay()" v-else-if="path == '/allConsultNext'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goMyVideoPay()" v-else-if="path == '/famousConsultNext'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goChangePhone()" v-else-if="path == '/oldPhone'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @touchstart.prevent="goPhoneConfirm()" v-else-if="path == '/changeUsualPhone'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goChangePass()" v-else-if="path == '/oldPass'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goPassConfirm()" v-else-if="path == '/changePassWord'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goCheck()" v-else-if="path == '/checkReport'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goMyNumber()" v-else-if="path == '/waitCallNumber'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goCancel()" v-else-if="path == '/waitArrange'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @click="goMyBookNumber()" v-else-if="path == '/selectType'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" @touchend.prevent="goChangePatient()" v-else-if="path == '/detailUsual'">
      <span class="rightWord">{{rightTitle}}</span>
    </section>
    <section class="nav" v-else>
      <span class="rightWord">{{rightTitle}}</span>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        path: "",
        historyLength: ""
      }
    },
    props: {
      title: {
        type: String
      },
      rightTitle: {
        type: String
      },
      waitImg: {},
      imgSrc: {
        default: "../../static/img/返回.png"
      },
      isFollow: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.path = this.$route.path
      console.log(this.path)
      console.log(window.history, "路径")
      this.historyLength = window.history.length
      console.log(this.historyLength)
    },
    methods: {
      back() {
        this.$router.back(-1)
      },
      detailPage() {
        this.$emit("on-detail")
      },
      goSuccess() {
        this.$emit("on-success")
      },
      goBookSuccess() {
        this.$emit("on-bookService")
      },
      goForceMy() {
        this.$emit("on-forceMy")
      },
      goAddUsual() {
        this.$emit('0n-addUsual')
      },
      goAdd() {
        this.$emit('0n-add')
      },
      goMyConsult() {
        this.$emit("on-consult")
      },
      goMyVideoPay() {
        this.$emit("on-pay")
      },
      goChangePhone() {
        this.$emit('on-phone')
      },
      goPhoneConfirm() {
        this.$emit("on-confirm")
      },
      goChangePass() {
        this.$emit('on-pass')
      },
      goPassConfirm() {
        this.$emit("on-passConfirm")
      },
      goCheck() {
        this.$emit("on-check")
      },
      goMyNumber() {
        this.$emit("on-myNumber")
      },
      goMain() {
        this.$emit("on-main")
      },
      goProfile() {
        this.$emit("on-profile")
      },
      goInternet() {
        this.$emit("on-internet")
      },
      goCancel() {
        this.$emit("on-cancel")
      },
      goIndex() {
        this.$emit("on-index")
      },
      goChangePatient() {
        this.$emit("on-changePatient")
      },
      gohosList() {
        this.$emit("on-hosList")
      },
      goCheckReport() {
        this.$emit("on-checkReport")
      },
      goMyProfile() {
        this.$emit("on-myProfile")
      },
      goMyBookNumber() {
        this.$emit("on-myBookNumber")
      },
    },
    watch: {
      "$route": function () {
        this.path = this.$route.path
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../common/public.scss';

  .special {
    opacity: 0;
    background-color: white;
    height: 50px;
    line-height: 50px;
    width: 100%;
    top: 0;
    position: fixed;
    display: flex;
    z-index: 6;
  }

  .top_bar {
    position: relative;
    background-color: white;
    height: 50px;
    line-height: 50px;
    width: 100%;
    top: 0;
    display: flex;

    /*z-index:160;*/

    z-index: 6;
    section {
      text-align: center;
      .word {
        font-size: 18px;
        color: #333333;
        font-family: PingFang SC;
      }
      span {
        display: block;
      }
    }
    .goBack {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      img {
        height: 15px;
        padding-left: 30rem/$rem;
      }
    }
    .scanImg {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      /*padding-left: 15px;*/
      img {
        width: 40rem/$rem;
        padding-left: 30rem/$rem;
      }
    }
    .title {
      flex: 3 3 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 36rem/$rem !important;
        color: #333333;
        display: inline-block;
      }
      img {
        width: 55rem/$rem;
        height: 55rem/$rem;
        display: inline-block;
        margin-right: 10rem/$rem;
        /*<!--position: absolute;-->*/
        /*<!--left:270rem/$rem;-->*/
        /*<!--top:15px;-->*/
        border-radius: 50%;
      }
    }
    .nav {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .rightWord {
        font-size: 32rem/$rem;
        color: $mainColor;
      }
    }
  }
</style>
