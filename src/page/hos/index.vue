<template>
  <div class="auth page flex">
    <app-header title="选择医院" class="flex0">
      <i slot="back"></i>
    </app-header>
    <div class="main">
      <ul>
        <li @click="handle(hos)" class="flex flex-center" v-for="hos in list">
          <div class="text flex1">
            {{hos.hosName}}
          </div>
          <div class="icon flex0">
            <img src="../../../static/img/arrow.png" alt="">
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import AppHeader from "../../plugins/app-header.vue"
  import api from "../../lib/api"
  import {debug} from "../../lib/util"
  import weuijs from "weui.js"

  export default {
    data() {
      return {
        action: "",
        list: []
      };
    },
    computed: {},
    components: {AppHeader},
    created() {
      this.action = this.$route.query.action;
      this.getHos();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      handle(hos) {
        this[`handle_${this.action}`] && this[`handle_${this.action}`](hos);
      },//nethos.book.compat.bind.new
      async next(compatId, bookHosId, service = "nethos.book.compat.bind") {
        let loading = weuijs.loading("加载中");
        let ret = await api(service, {compatId, bookHosId})
        loading.hide();
        if (ret.code != 0) {
          setTimeout(() => {
            weuijs.alert(ret.msg, () => {
              this.$router.go(-1);
            });
          }, 500)
        } else {

        }

      },
      async handle_auth(hos) {
        debug("hos", hos);
        let bookHosId = hos.bookHosId;
        let compatId = this.$route.query.compatId;
        let loading = weuijs.loading("加载中...")
        let ret = await api("nethos.book.compat.bind.check", {compatId, bookHosId});
        loading.hide();
        if (ret.code == 0) {
          if (ret.obj == "needBind") {
            weuijs.confirm(
              "该就诊人没有绑定医院帐号，无法使用该功能。请先绑定医院帐号。",
              {
                buttons: [{
                  label: "取消",
                  type: "default"
                }, {
                  label: "去绑定",
                  type: "primary",
                  onClick: () => {
                    this.next(compatId, bookHosId);
                  }
                }]
              });
          }
          else if (ret.obj == "needCreate") {
            weuijs.confirm(
              "该就诊人没有在医院建过档，需要实名认证并新建病案号，才能使用该功能。", {
                buttons: [{
                  label: "取消",
                  type: "default",
                  onClick: () => {
                    debug("cancel")
                  }
                }, {
                  label: "新建病案号",
                  type: "primary",
                  onClick: () => {
                    this.next(compatId, bookHosId, "nethos.book.compat.bind.new");
                  }
                }]
              });
          } else {
            weuijs.toast("已经绑定");
          }

        }

      },
      async getHos() {
        let loading = weuijs.loading("加载中...")
        let res = await api("nethos.pat.compat.record");
        loading.hide();
        if (res.code == 0) {
          this.list = res.list
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .auth {
    flex-direction: column;
    .main {
      ul > li {
        @include border(bottom);
        padding: 15px;
        .icon {
          img {
            height: 15px;
          }
        }
      }
    }
  }
</style>
