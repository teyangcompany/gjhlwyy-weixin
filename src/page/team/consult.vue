<template>
    <div class="page team-consult">
        <app-header ref="header" title="团队咨询">
            <i slot="back"></i>
            <div @click="sub" slot="right" class="right">
                提交
            </div>
        </app-header>
        <div class="main" ref="main">
            <div class="info">
                <compat @compat="getCompat"></compat>
                <div class="flex">
                    <div class="label flex1">医生团队</div>
                    <div class="text flex0">{{info.teamName}}</div>
                </div>
                <div class="flex">
                    <div class="label flex1">疾病名称</div>
                    <div class="text flex0"><input type="text" class="right" v-model="form.illnessName"
                                                   placeholder="已经确诊的疾病"/></div>
                </div>
                <div class="flex">
                    <div class="label flex1">填写病情资料</div>
                    <div class="text flex0">{{total}}/500</div>
                </div>
                <div class="flex textarea">
          <textarea v-model="form.consultContent" class="flex1"
                    placeholder="请详细描述患者的主要症状、持续时间、已经确诊的疾病和接诊医生的意见。(如有症状照片、病历、检查单，可在下方上传)"
                    rows="20"></textarea>
                </div>
            </div>
            <piclist-upload class="piclist" @uploaded="getPics"></piclist-upload>
        </div>
        <msg ref="msg"></msg>
    </div>
</template>

<script>
  import weuijs from "weui.js"
  import AppHeader from "../../plugins/app-header"
  import {mainHeightMixin} from "../../lib/mixin";
  import Compat from "../../plugins/user/compat"
  import api from "../../lib/api"
  import PiclistUpload from "../../plugins/piclist-upload"
  import {debug} from "../../lib/util";
  import validate from "../../lib/validate"
  import Msg from "../../plugins/msg"

  export default {
    data() {
      return {
        id: "",
        info: {},
        pics: [],
        compat: {},
        form: {}
      };
    },
    computed: {
      total() {
        return this.form.consultContent ? this.form.consultContent.length : 0
      }
    },
    mixins: [mainHeightMixin],
    components: {
      AppHeader, Compat, PiclistUpload, Msg
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
        const Validate = new validate();
        let {compatName: consulterName, compatIdcard: consulterIdcard, compatMobile: consulterMobile} = this.compat;

        let form = {
          consulterName, consulterIdcard, consulterMobile,
          teamId: this.id,
          ...this.form
        };

        let loading = weuijs.loading("加载中...");
        let ret = await api('nethos.consult.info.teampic.issue', form)
        if (ret.code != 0) {
          this.$refs.msg.show(ret.msg || `错误代码${ret.code}`);
        }
        loading.hide();


        debug(this.form);
      },

      async getDetail() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.team.info.card', {id: this.id});
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
        .piclist {
            @include border(top);
            padding-top: px2rem(10px);
            padding-left: px2rem(15px);
        }
        .info {
            > div + div {
                @include border(top);
            }
            .textarea {
                padding: 5px px2rem(15px);
                height: px2rem(150px);
                textarea {
                    height: px2rem(160px);
                }
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
