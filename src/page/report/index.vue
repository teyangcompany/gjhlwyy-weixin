<template>
  <div class="page flex">
    <app-header title="查报告单">
      <i class="back" slot="back"></i>
    </app-header>
    <div class="main flex1">
      <ul>
        <li>{{pat.compatName}} {{pat.compatGender|getGender}} {{pat.compatAge}}</li>
        <li class="flex">
          <label class="flex1">身份证</label>
          <span class="flex0">{{pat.compatIdcard|formatCardAndMobile(3,4,11)}}</span>
        </li>
        <li class="flex">
          <label class="flex1">手机号</label>
          <span class="flex0">{{pat.compatMobile|formatCardAndMobile(3,4,4)}}</span>
        </li>
        <li class="flex">
          <label class="flex1">病案号</label>
          <span class="flex0">{{pat.compatMedicalRecord||'暂未绑定病案号'}}</span>
        </li>
      </ul>

      <!---->

      <router-link :to="{path:'/my/patient',query:{redirect:'report'}}" replace class="color_main">切换就诊人</router-link>

      <p @click="sub">查询</p>
    </div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import {formatCardAndMobile, getGender} from "../../lib/filter";
  import {isBindMixin} from "../../lib/mixin";
  import CompatMixin from '../../lib/mixins/compat'

  export default {
    data() {
      return {
        index: 0,
        list: []
      };
    },
    computed: {
      pat() {
        if (this.list.length > 0) {
          let pat = this.list[this.index]
          let {compatIdcard} = pat;
          this.hasIdCardBind(compatIdcard);
          return pat;
        }
        else return {}
      }
    },
    filters: {getGender, formatCardAndMobile},
    components: {},
    mixins: [isBindMixin, CompatMixin],
    async created() {
      let res = await this._isBind();
      if (res === false) {
        this.$router.replace({
          path: "/bindRelativePhone",
          query: {backPath: this.path}
        })
        return false;
      }
      let {query} = this.$route;
      if (query && query.index) {
        this.index = query.index
      }
      await this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async bindCard(compatId) {
        let loading = thsi.$weuijs.loading("加载中...");
        let data = await this.$http('nethos.book.compat.bind', {compatId})
        loading.hide();
        if (data.code == 0) {
          this.$weuijs.toast("绑定成功",
            {
              callback: () => {
                this.getList();
              }
            }
          )
        } else {
          this.$weuijs.alert(data.msg);
        }
      },


      async createCard(compatId, bookHosId) {
        let loading = this.$weuijs.loading("加载中");
        let ret = await this.$http("nethos.book.compat.bind.new", {compatId, bookHosId})
        loading.hide();
        if (ret.code == 0) {
          this.getList();
        } else {
          this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
        }
      },

      async sub() {
        let {compatId, compatIdcard, compatMedicalRecord} = this.pat;

        if (!compatIdcard) {
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

        if (!compatMedicalRecord) {
          let loading = this.$weuijs.loading("提交中...");
          let bookHosId = "";
          let res = await this.$http("nethos.book.compat.bind.check", {compatId, bookHosId});
          loading.hide();
          if (res.code == 0) {
            if (res.obj == "needBind") {
              this.$weuijs.confirm(
                "该就诊人没有绑定医院帐号，无法使用该功能。请先绑定医院帐号。", {
                  buttons: [{
                    label: "取消",
                    type: "default"
                  }, {
                    label: "绑定病案号",
                    type: "primary",
                    onClick: () => {
                      this.bindCard(compatId, bookHosId);
                    }
                  }]
                });
            } else if (res.obj == "needCreate") {
              this.$weuijs.confirm(
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
          } else {
            this.$refs.msg.show(res.msg || "接口错误" + res.code);
          }
        } else {
          this.$router.push({
            path: '/report/type',
            query: {
              index: this.index,
            }
          })
        }
      },


      async getList() {
        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http('nethos.pat.compat.list', {});
        loading.hide();
        if (ret.code == 0) {
          this.list = ret.list;
        } else {
          //this.$refs.msg.show(ret.msg||"错误代码"+ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .page {
    flex-direction: column;
  }

  .main {
    padding: px2rem(40px, 1080);
  }

  ul {
    border-radius: px2rem(40px, 1080);
    background-color: #f5fbfb;
  }

  li + li {
    @include border(top);
  }

  li {
    padding: 0 px2rem(40px, 1080);
    @include h_lh(px2rem(135px, 1080));
  }

  span {
    color: #666666;
  }

  a {
    display: block;
    margin-top: px2rem(40px, 1080);
  }

  p {
    text-align: center;
    margin-top: px2rem(80px, 1080);
    @extend %a;
    border-radius: 5px;
  }
</style>
