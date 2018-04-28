<template>
  <div class="page team-consult">
    <app-header ref="header" title="团队咨询">
      <i slot="back"></i>
    </app-header>
    <div class="main overflow-touch" ref="main">
      <div class="notice">
        请务必保证填写资料的真实、详细;<br>若该团队医生48小时未回答将为您自动退款
      </div>
      <div class="info wrap">
        <div class="h3">咨询信息</div>
        <div class="flex">
          <div class="label flex1">咨询对象</div>
          <div class="text flex0" v-if="Object.keys(info).length>0">{{info.teamName||info.sysDoc.docName}}</div>
        </div>

        <div class="flex">
          <div class="label flex1">就诊人</div>
          <div class="text flex0">{{compat.compatName}} {{compat.compatGender|getGender}} {{compat.compatAge}}岁</div>
        </div>
      </div>

      <div id="test-detail2" class="test wrap">
        <div class="h3">咨询内容</div>
        <div class="wrap fs14">医生您好！这是我的体检结果（报告日期为<span class="red">{{test.zONGJIANRQ.substr(0,10)}}</span>，您可在第一栏的院内报告中查看我的具体检报告）
        </div>
        <div class="wrap" v-html="test.htmlXJ"></div>

      </div>

      <div class="wrap">
        <div class="flex textarea">
          <textarea v-model="form.consultContent" class="flex1"
                    placeholder="您还可继续输入您要咨询的内容"
                    rows="20"></textarea>
        </div>
        <piclist-upload class="piclist" @uploaded="getPics"></piclist-upload>
      </div>

      <div class="team wrap" style="margin-top: 0px">
        <div class="h3">{{info.teamName}}</div>
        <div class="flex p15">
          <div class="thumb flex0">
            <img :src="info.teamAvatar" alt="">
          </div>
          <div class="resume flex1 fs12 color_666" v-html="info.teamResume"></div>
        </div>
        <h3 class="fs14 pl15 pr15">团队擅长</h3>
        <div class="fs12 color_666 p15" v-html="info.teamSkill"></div>
      </div>
    </div>
    <div class="sub" @click="sub" ref="bottom">提交咨询(咨询费{{info.consultPrice}}元)</div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import {mainHeightMixin, scrollIntoViewMixin} from "../../lib/mixin";
  import PiclistUpload from "../../plugins/piclist-upload"
  import {compatCache, testCache} from "../../lib/cache";
  import {getGender, TijianxjToHtml} from "../../lib/filter";

  export default {
    data() {
      return {
        id: "",
        info: {},
        pics: [],
        compat: {},
        form: {},
        test: {}
      };
    },
    computed: {
      total() {
        return this.form.consultContent ? this.form.consultContent.length : 0
      }
    },
    filters: {getGender},
    mixins: [mainHeightMixin, scrollIntoViewMixin],
    components: {
      PiclistUpload
    },
    created() {
      this.test = testCache.get();
      this.test.htmlXJ = TijianxjToHtml(this.test.htmlXJ);
      this.compat = compatCache.get();
      let {id} = this.$route.params;
      id && (this.id = id) && (this.getDetail());
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      getPics(pics) {
        this.pics = pics;
      },

      async sub() {
        let {compatName: consulterName, compatIdcard: consulterIdcard, compatMobile: consulterMobile} = this.compat;
        let form = {
          consulterName, consulterIdcard, consulterMobile,
          teamId: this.id,
          ...this.form
        }, attaIdList = [];

        if (this.pics) {
          this.pics.forEach((res) => {
            attaIdList.push(res.id);
          });
          form.attaIdList = attaIdList;
          form.attaList = form.attaIdList;
        }

        !form.consultContent && (form.consultContent = this.test.zONGJIANXJ.substr(0, 500));

        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http('nethos.consult.info.teampic.issue', form)
        if (ret.code != 0) {
          this.$refs.msg.show(ret.msg || `错误代码${ret.code}`);
          if (ret.msg == "咨询人证件号 不能为空") this.$router.replace({
            path: '/account/perfect',
            query: {back: this.$route.fullPath}
          })
        } else {
          let price = this.info.consultPrice;
          if (parseFloat(price) > 0) {
            this.$router.replace({path: `/videoPay`, query: {consultId: ret.obj.consultId}});
            return
          }

          this.$router.replace({path: `/team/consult/${ret.obj.consultId}`})
        }
        loading.hide();
      },

      async getDetail() {
        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http('smarthos.team.info.card', {
          id: this.id
        });
        if (ret.code == 0) {
          this.info = ret.obj;
        }
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .p15 {
    padding: px2rem(15px);
  }

  .pl15 {
    padding-left: px2rem(15px)
  }

  ;
  .pr15 {
    padding-right: px2rem(15px);
  }

  .team-consult {
    background-color: #f8f8f8;
    .main {
      overflow-y: auto;
    }
    .notice {
      background: rgba(241, 90, 74, 0.20);
      padding: 5px px2rem(15px);
      color: #f15a4a;
      font-size: 12px;
    }
    .wrap + .wrap + .wrap {
      margin-top: px2rem(15px);
    }
    .wrap {
      background-color: white;
      .h3 {
        background-color: #f8f8f8;
        padding-right: px2rem(15px);
        padding-left: px2rem(15px);
        @include h_lh(50px);
      }
    }
    .piclist {
      @include border(top);
      padding-top: px2rem(10px);
      padding-left: px2rem(15px);
    }
    .textarea {
      @include border(top);
      height: px2rem(100px);
      textarea {
        padding: 10px 15px;
        height: px2rem(100px);
      }
    }
    .info {
      > div + div + div {
        @include border(top);
      }
      > div {
        padding: 0 px2rem(15px);
        @include h_lh(px2rem(45px));
        .text {
          color: #777777;
        }
      }
    }
  }

  .sub {
    @include h_lh(45px);
    text-align: center;
    color: white;
    background-color: $mainColor;
  }

  .team {
    .thumb {
      @include thumb(80px, 60px);
    }
    .resume {
      margin-left: 10px;
      @include lines(3);
    }
  }
</style>
