<template>
  <div class="page team-consult">
    <app-header ref="header" :title="title">
      <i slot="back"></i>
      <div @click="sub" slot="right" class="right">
        提交
      </div>
    </app-header>
    <div class="main" ref="main">
      <div class="notice">
        请务必保证填写资料的真实、详细;<br>{{type=='team'?'若该团队医生48小时未回答将为您自动退款':'医生会在48小时内回复您，否则将为您退款。'}}
      </div>
      <div class="info wrap">
        <div class="h3">咨询信息</div>
        <div class="flex">
          <div class="label flex1">咨询对象</div>
          <div class="text flex0" v-if="Object.keys(info).length>0">{{info.teamName||info.sysDoc.docName}}</div>
        </div>
        <compat @compat="getCompat"></compat>
        <div class="flex">
          <div class="label flex1">疾病名称</div>
          <div class="text flex0"><input type="text" class="right" v-model="form.illnessName"
                                         placeholder="未确诊请不要填写"/></div>
        </div>

        <!--<div class="flex">
          <div class="label flex1">填写病情资料</div>
          <div class="text flex0">{{total}}/500</div>
        </div>-->
      </div>

      <div class="wrap">
        <div class="h3 overflow-hidden">填写病情资料<span class="float-right color_777">{{total}}/500</span></div>
        <div class="flex textarea">
          <textarea v-model="form.consultContent" class="flex1"
                    placeholder="请详细描述患者的主要症状、持续时间、已经确诊的疾病和接诊医生的意见。(如有症状照片、病历、检查单，可在下方上传)"
                    rows="20"></textarea>
        </div>
        <piclist-upload class="piclist" @uploaded="getPics"></piclist-upload>
      </div>


    </div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import weuijs from "weui.js"
  import {mainHeightMixin, scrollIntoViewMixin} from "../../lib/mixin";
  import Compat from "../../plugins/user/compat"
  import api from "../../lib/api"
  import PiclistUpload from "../../plugins/piclist-upload"

  export default {
    data() {
      return {
        id: "",
        info: {},
        pics: [],
        compat: {},
        form: {},
        type: "",
        title: ""
      };
    },
    computed: {
      total() {
        return this.form.consultContent ? this.form.consultContent.length : 0
      }
    },
    mixins: [mainHeightMixin, scrollIntoViewMixin],
    components: {
      Compat, PiclistUpload
    },
    created() {
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

      getCompat(compat) {
        this.compat = compat;
      },

      async sub() {
        let {compatName: consulterName, compatIdcard: consulterIdcard, compatMobile: consulterMobile} = this.compat;
        let form = {
          consulterName, consulterIdcard, consulterMobile,
          teamId: this.id,
          docId: this.id,
          ...this.form
        }, attaIdList = [];

        if (this.pics) {
          this.pics.forEach((res) => {
            attaIdList.push(res.id);
          });
          form.attaIdList = attaIdList;
          form.attaList = form.attaIdList;
        }

        let loading = weuijs.loading("加载中...");
        let ret = await api(this.type == 'team' ? 'nethos.consult.info.teampic.issue' : 'nethos.consult.info.docpic.issue', form)
        if (ret.code != 0) {
          this.$refs.msg.show(ret.msg || `错误代码${ret.code}`);
          if (ret.msg == "咨询人证件号 不能为空") this.$router.push({
            path: '/account/perfect',
            query: {back: this.$route.fullPath}
          })
        } else {
          let price = this.type == 'team' ? this.info.consultPrice : this.info.sysDoc.docPicConsultPrice;
          if (parseFloat(price) > 0) {
            this.$router.replace({path: `/videoPay`, query: {consultId: ret.obj.consultId}});
            return
          }

          this.$router.replace({path: `/team/consult/${ret.obj.consultId}`})
        }
        loading.hide();
      },

      async getDetail() {
        let {query} = this.$route;
        if (query && query.type) {
          this.type = query.type;
          this.title = "图文咨询";
        } else {
          this.type = 'team';
          this.title = "团队咨询"
        }
        let loading = weuijs.loading("加载中...");
        let ret = await api(this.type == "team" ? 'smarthos.team.info.card' : 'nethos.doc.card', {
          id: this.id,
          docId: this.id
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

  .team-consult {
    background-color: #f8f8f8;
    .main {
      overflow-y: auto;
    }
    .notice {
      background-color: $mainColor;
      padding: 5px px2rem(15px);
      color: white;
      font-size: 12px;
    }
    .wrap + .wrap {
      margin-top: px2rem(15px);
    }
    .wrap {
      background-color: white;
      .h3 {
        padding-right: px2rem(15px);
        padding-left: px2rem(15px);
        @include h_lh(50px);
        @include border(left, #f1b659, after, solid, 5px);
        &:after {
          top: 15px;
          height: 20px;
        }
      }
    }
    .piclist {
      @include border(top);
      padding-top: px2rem(10px);
      padding-left: px2rem(15px);
    }
    .textarea {
      @include border(top);
      padding: 5px px2rem(15px);
      height: px2rem(100px);
      textarea {
        height: px2rem(110px);
      }
    }
    .info {
      > div + div {
        @include border(top);
      }
      > div {
        padding: 0 px2rem(15px);
        @include h_lh(50px);
        .text {
          color: #777777;
        }
      }
    }
  }
</style>
